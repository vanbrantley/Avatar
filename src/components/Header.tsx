import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import { useUser } from '../context/AuthContext';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import { Dispatch, SetStateAction } from 'react';

export interface IHeaderProps {
    handleModeChange: (toClosetMode: boolean) => void
}

export default function Header(props: IHeaderProps) {

    const { user } = useUser();
    const router = useRouter();

    const signUserOut = async () => {
        // Clear the access and refresh tokens from local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        // Sign out the user using Amplify's Auth.signOut()
        try {
            await Auth.signOut();
            // Handle any additional sign-out logic or UI updates
        } catch (error) {
            // Handle the sign-out error
            console.log('Sign-out error:', error);
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>

            <AppBar position="static" style={{ marginBottom: "32px" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <AccessibilityIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Avatar
                    </Typography>
                    {user && (
                        <>
                            <Button onClick={() => props.handleModeChange(false)} style={{ color: "white" }}>Lab</Button>
                            {/* <Button style={{ color: "white" }}>Palettes</Button> */}
                            <Button onClick={() => props.handleModeChange(true)} style={{ color: "white", marginRight: "10px" }}>Closet</Button>
                            <Button variant='contained' onClick={() => signUserOut()}>Sign Out</Button>
                        </>
                    )}
                    {!user && (
                        <>
                            <Button variant='contained' onClick={() => router.push('/login')}>Login</Button>
                            <Button
                                variant='contained'
                                color='secondary'
                                style={{ marginLeft: "10px" }}
                                onClick={(() => router.push('/signup'))}>
                                Sign Up</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
