import { withAuthenticator } from 'aws-amplify-react';
import { Grid, TextField, Button } from '@mui/material';

function Signup() {
    return (
        <div style={{ paddingTop: '50px' }}>
            <form autoComplete="off">
                <Grid container direction="column" alignItems="center" spacing={2}>
                    <Grid item>
                        <TextField id="username" label="Username" type="text" />
                    </Grid>
                    <Grid item>
                        <TextField id="email" label="Email" type="email" />
                    </Grid>
                    <Grid item>
                        <TextField id="password" label="Password" type="password" />
                    </Grid>
                    <br />
                    <Grid>
                        <Button type="submit" variant="contained">
                            Sign Up
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default withAuthenticator(Signup);
