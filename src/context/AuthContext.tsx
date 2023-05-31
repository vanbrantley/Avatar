import { CognitoUser } from "@aws-amplify/auth";
import { Auth, Hub } from "aws-amplify";
import { CognitoUserPool, CognitoUserSession, CognitoAccessToken, CognitoIdToken, CognitoRefreshToken } from 'amazon-cognito-identity-js';
import { createContext, Dispatch, ReactElement, SetStateAction, useContext, useEffect, useState } from "react";

interface UserContextType {
    user: CognitoUser | null;
    setUser: Dispatch<SetStateAction<CognitoUser | null>>
}

const UserContext = createContext<UserContextType>({} as UserContextType);

interface Props {
    children: React.ReactElement;
}

// eslint-disable-next-line no-empty-pattern
export default function AuthContext({ children }: Props): ReactElement {
    const [user, setUser] = useState<CognitoUser | null>(null);

    useEffect(() => {

        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');
        // console.log('Stored Access Token:', storedAccessToken);
        // console.log('Stored Refresh Token:', storedRefreshToken);

        if (storedAccessToken && storedRefreshToken) {
            // console.log('Using stored tokens to authenticate user');

            // Validate and use stored tokens to authenticate the user
            authenticateUser(storedRefreshToken)
                .then((cognitoUser: CognitoUser) => {
                    // console.log('User authenticated:', cognitoUser);
                    setUser(cognitoUser);
                })
                .catch((error: Error) => {
                    // console.log('Authentication error:', error);
                    setUser(null);
                });
        } else {
            // console.log('Checking user authentication');
            checkUser();
        }

    }, []);

    useEffect(() => {
        Hub.listen('auth', ({ payload: { event } }) => {

            // console.log('Auth event:', event);

            checkUser();

            if (event === 'tokenRefresh') {

                // console.log('Token refresh event detected');

                Auth.currentSession()
                    .then((session: CognitoUserSession) => {

                        const accessToken = session.getAccessToken();
                        const refreshToken = session.getRefreshToken();

                        // console.log('New Access Token:', accessToken);
                        // console.log('New Refresh Token:', refreshToken);

                        localStorage.setItem('accessToken', accessToken.getJwtToken());
                        localStorage.setItem('refreshToken', refreshToken.getToken());

                        Auth.currentAuthenticatedUser()
                            .then((user: CognitoUser) => {
                                // console.log('Authenticated user:', user);
                                setUser(user);
                            }).catch(() => {
                                // console.log('Error retrieving authenticated user');
                                setUser(null);
                            });
                    }).catch((error: Error) => {
                        console.log('Token refresh error: ', error);
                    })

            }

        })
    }, []);

    async function checkUser() {
        try {
            const amplifyUser = await Auth.currentAuthenticatedUser();
            if (amplifyUser) {
                // Store user's authentication tokens
                const session = amplifyUser.getSignInUserSession();
                if (session) {
                    const accessToken = session.getAccessToken().getJwtToken();
                    const refreshToken = session.getRefreshToken().getToken();

                    // Store tokens in browser's storage (local storage)
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                }

                setUser(amplifyUser);

            }
        } catch (err) {
            // No current signed in user
            setUser(null);
        }
    }

    async function authenticateUser(refreshToken: string): Promise<CognitoUser> {
        const userData = {
            Username: 'dummyUsername',
            Pool: new CognitoUserPool({
                UserPoolId: 'us-east-1_czTA0SxqB',
                ClientId: '7f4qmoghg43g8bmd5l6r42ucaf',
            }),
            Storage: localStorage,
        };

        const cognitoUser = new CognitoUser(userData);
        const token = new CognitoRefreshToken({ RefreshToken: refreshToken });

        try {
            await new Promise((resolve, reject) => {
                cognitoUser.refreshSession(token, (error, session) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(session);
                    }
                });
            });

            return cognitoUser;
        } catch (error) {
            console.log('Error retrieving session:', error);
            throw error;
        }
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = (): UserContextType => useContext(UserContext);