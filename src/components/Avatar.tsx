import { Button, Grid } from "@mui/material"

export interface IAvatarProps {
    showHat: boolean;
    hatColor: string,
    topColor: string,
    bottomColor: string,
    shoeColor: string,
    handler: (area: string) => void
}

export default function Avatar(props: IAvatarProps) {

    return (
        <Grid container direction="column" alignItems="center">
            <Grid item>
                {props.showHat ? (
                    <Button onClick={() => props.handler("hat")} style={{ height: "40px", width: "62px", marginLeft: "auto", marginRight: "auto", backgroundColor: props.hatColor, borderTopLeftRadius: "60% 90%", borderTopRightRadius: "60% 90%" }}></Button>
                )
                    : (
                        <div style={{ height: "15px" }}></div>
                    )}
            </Grid>
            <Grid item>
                <div className="face" style={props.showHat ?
                    { height: "55px", width: "60px", marginLeft: "auto", marginRight: "auto", backgroundColor: "#a18057", borderBottomLeftRadius: "120%", borderBottomRightRadius: "120%" }
                    : { height: "80px", width: "60px", marginLeft: "auto", marginRight: "auto", backgroundColor: "#a18057", borderTopRightRadius: "40%", borderTopLeftRadius: "40%", borderBottomLeftRadius: "45%", borderBottomRightRadius: "45%" }}></div>
            </Grid>
            <Grid item>
                <Button onClick={() => props.handler("top")} style={{ height: "180px", width: "125px", marginLeft: "auto", marginRight: "auto", backgroundColor: props.topColor, borderTopLeftRadius: "30%", borderTopRightRadius: "30%" }}></Button>
            </Grid>
            <Grid item>
                <Button onClick={() => props.handler("bottom")} style={{ height: "180px", width: "125px", marginLeft: "auto", marginRight: "auto", backgroundColor: props.bottomColor }}></Button>
            </Grid>
            <Grid item>
                <Button onClick={() => props.handler("shoes")} style={{ height: "50px", width: "170px", marginLeft: "auto", marginRight: "auto", backgroundColor: props.shoeColor, borderTopRightRadius: "15% 60%", borderTopLeftRadius: "15% 60%", borderBottomLeftRadius: "15% 60%", borderBottomRightRadius: "15% 60%" }}></Button>
            </Grid>
        </Grid>
    );
}