import AccessibilityIcon from '@mui/icons-material/Accessibility';
import { useUser } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import { observer } from 'mobx-react-lite';
import { useState, useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';

interface IHeaderProps {
    closetMode: boolean,
    handleModeChange: (toClosetMode: boolean) => void,
    setClosetMode: (mode: boolean) => void;
}


const Header = observer(function Header(props: IHeaderProps) {

    const store = useContext(AppStoreContext);
    const { closetMode, handleModeChange } = store;

    const { user } = useUser();
    const router = useRouter();

    const [navbarOpen, setNavbarOpen] = useState<boolean>(false);

    const signUserOut = async () => {
        // Clear the access and refresh tokens from local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        try {
            await Auth.signOut();
            props.setClosetMode(false);
        } catch (error) {
            console.log('Sign-out error:', error);
        }
    };

    return (

        <>

            <nav className="flex items-center justify-between flex-wrap p-3" style={{ backgroundColor: "#484848" }}>
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
                    <button onClick={() => setNavbarOpen((prev) => !prev)} className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white">
                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                    </button>
                </div>
                <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${navbarOpen ? 'block' : 'hidden'}`}>


                    {user ? (
                        <div className="text-sm lg:flex-grow">
                            <button
                                onClick={() => handleModeChange(false)}
                                className={`${closetMode ? 'text-white' : 'text-black'} block mt-4 lg:inline-block lg:mt-0 mr-4`}>
                                Lab
                            </button>
                            <button
                                onClick={() => handleModeChange(true)}
                                className={`${closetMode ? 'text-black' : 'text-white'} block mt-4 lg:inline-block lg:mt-0 mr-4`}>
                                Closet
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
            <br></br>
        </>
    );


});

export default Header;