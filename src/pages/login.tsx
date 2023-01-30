import React, { useState } from "react";
import { Alert, Button, Grid, Snackbar, TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUser } from "../context/AuthContext";
import { Auth } from "aws-amplify";
import { CognitoUser } from "@aws-amplify/auth";
import { useRouter } from "next/router";

interface IFormInput {
    username: string;
    password: string;
}

export default function Login() {
    const { user, setUser } = useUser();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [signInError, setSignInError] = useState<string>("");

    const { register, formState: { errors }, handleSubmit } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const { username, password } = data;
        const amplifyUser = await Auth.signIn(username, password);
        if (amplifyUser) router.push(`/`);
        else throw new Error("Something went wrong.");
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
                            {...register("username", {
                                required: { value: true, message: "Please enter a username." },
                                minLength: { value: 3, message: "Please enter a username between 3 and 16 characters." },
                                maxLength: { value: 16, message: "Please enter a username between 3 and 16 characters." },
                            })} />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            error={errors.password ? true : false}
                            helperText={errors.password ? errors.password.message : null}
                            {...register("password", {
                                required: { value: true, message: "Please enter a password." },
                                minLength: { value: 8, message: "Please enter a stronger password." },
                            })} />
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
}