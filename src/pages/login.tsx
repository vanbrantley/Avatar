import React, { useState } from "react";
import { Alert, Button, Grid, Snackbar, TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';


interface IFormInput {
    username: string;
    password: string;
}

const Login = observer(() => {

    const store = useContext(AppStoreContext);
    const { setNavbarOpen } = store;

    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [signInError, setSignInError] = useState<string>("");

    const { register, formState: { errors }, handleSubmit } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const { username, password } = data;

        try {
            await Auth.signIn(username, password);
            setNavbarOpen(false);
            router.push(`/`);
        } catch (error: any) {
            setSignInError(error.message);
            setOpen(true);
        }
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        <div style={{ paddingTop: "50px" }}>

            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">

                <Grid container direction="column" alignItems="center" spacing={2} >
                    <Grid item>
                        <TextField
                            id="username"
                            label="Username"
                            type="text"
                            error={errors.username ? true : false}
                            helperText={errors.username ? errors.username.message : null}
                            {...register("username")} />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            error={errors.password ? true : false}
                            helperText={errors.password ? errors.password.message : null}
                            {...register("password")} />
                    </Grid>
                    <br />
                    <Grid>
                        <Button type="submit" variant="contained">Sign In</Button>
                    </Grid>
                </Grid>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {signInError}
                    </Alert>
                </Snackbar>
            </form>
        </div>
    );
});

export default Login;

// export default function Login() {
//     const router = useRouter();
//     const [open, setOpen] = useState(false);
//     const [signInError, setSignInError] = useState<string>("");

//     const { register, formState: { errors }, handleSubmit } = useForm<IFormInput>();

//     const onSubmit: SubmitHandler<IFormInput> = async (data) => {
//         const { username, password } = data;

//         try {
//             await Auth.signIn(username, password);
//             router.push(`/`);
//         } catch (error: any) {
//             setSignInError(error.message);
//             setOpen(true);
//         }
//     };

//     const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
//         if (reason === "clickaway") {
//             return;
//         }

//         setOpen(false);
//     };

//     return (

//         <div style={{ paddingTop: "50px" }}>

//             <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">

//                 <Grid container direction="column" alignItems="center" spacing={2} >
//                     <Grid item>
//                         <TextField
//                             id="username"
//                             label="Username"
//                             type="text"
//                             error={errors.username ? true : false}
//                             helperText={errors.username ? errors.username.message : null}
//                             {...register("username")} />
//                     </Grid>
//                     <Grid item>
//                         <TextField
//                             id="password"
//                             label="Password"
//                             type="password"
//                             error={errors.password ? true : false}
//                             helperText={errors.password ? errors.password.message : null}
//                             {...register("password")} />
//                     </Grid>
//                     <br />
//                     <Grid>
//                         <Button type="submit" variant="contained">Sign In</Button>
//                     </Grid>
//                 </Grid>
//                 <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//                     <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
//                         {signInError}
//                     </Alert>
//                 </Snackbar>
//             </form>
//         </div>
//     );
// }