import { Button, Grid } from "@mui/material";

export interface IPaletteProps {
    hatColor: string,
    topColor: string,
    bottomColor: string,
    shoeColor: string,
    handler: (color: string) => void
}

export default function Palette(props: IPaletteProps) {


    return (
        <>
            <Grid item><Button onClick={() => props.handler("hat")} style={{ height: "55px", width: "60px", backgroundColor: props.hatColor }}></Button></Grid>
            <Grid item><Button onClick={() => props.handler("top")} style={{ height: "55px", width: "60px", backgroundColor: props.topColor }}></Button></Grid>
            <Grid item><Button onClick={() => props.handler("bottom")} style={{ height: "55px", width: "60px", backgroundColor: props.bottomColor }}></Button></Grid>
            <Grid item><Button onClick={() => props.handler("shoes")} style={{ height: "55px", width: "60px", backgroundColor: props.shoeColor }}></Button></Grid>
        </>
    );

}