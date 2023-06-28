import AccessibilityIcon from '@mui/icons-material/Accessibility';
import { useUser } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';

// interface IHeaderProps {
//     closetMode: boolean,
//     handleModeChange: (toClosetMode: boolean) => void,
//     setClosetMode: (mode: boolean) => void;
// }


const Header = observer(function Header() {

    const store = useContext(AppStoreContext);
    const { mode, handleModeChange, navbarOpen, setNavbarOpen, layout } = store;

    const { user } = useUser();
    const router = useRouter();

    const signUserOut = async () => {
        // Clear the access and refresh tokens from local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        try {
            await Auth.signOut();
            handleModeChange("lab");
        } catch (error) {
            console.log('Sign-out error:', error);
        }
    };

    return (

        <>

            <nav className="flex items-center justify-between flex-wrap p-3 zoom-125" style={{ backgroundColor: "#484848" }}>
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <button
                        type="button"
                        className="p-2 text-gray-500"
                        aria-label="menu"
                    >
                        <AccessibilityIcon className="w-6 h-6" />
                    </button>
                    <span className="font-semibold text-xl tracking-tight">Avatar</span>
                </div>
                <div className="block lg:hidden">
                    <button onClick={() => setNavbarOpen(!navbarOpen)} className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white">
                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                    </button>
                </div>
                <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${navbarOpen ? 'block' : 'hidden'}`}>

                    {user ? (
                        <div className="text-sm lg:flex-grow">
                            <button
                                onClick={() => handleModeChange("lab")}
                                className={`${(mode === "lab") ? 'text-black' : 'text-white'} block mt-4 lg:inline-block lg:mt-0 mr-4`}>
                                Lab
                            </button>

                            {(layout !== "mobile") && (
                                <>

                                    <button
                                        onClick={() => handleModeChange("closet")}
                                        className={`${(mode === "closet") ? 'text-black' : 'text-white'} block mt-4 lg:inline-block lg:mt-0 mr-4`}>
                                        Closet
                                    </button>

                                </>
                            )}

                            <button
                                onClick={() => handleModeChange("mockup")}
                                className={`${(mode === "mockup") ? 'text-black' : 'text-white'} block mt-4 lg:inline-block lg:mt-0 mr-4`}>
                                Mockups
                            </button>

                            <button
                                onClick={() => signUserOut()}
                                className="block mt-4 lg:inline-block lg:mt-0 text-white">
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <div className="text-sm lg:flex-grow">
                            <button
                                onClick={() => router.push('/login')}
                                className="text-white block mt-4 lg:inline-block lg:mt-0 mr-4">
                                Login
                            </button>
                            <button
                                onClick={() => router.push('/signup')}
                                className="text-white block mt-4 lg:inline-block lg:mt-0 mr-4">
                                Sign Up
                            </button>
                        </div>
                    )}

                </div>
            </nav>
        </>
    );

});

export default Header;