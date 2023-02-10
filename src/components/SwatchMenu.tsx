import { Dispatch, SetStateAction } from "react";
import { Button, Grid } from "@mui/material";

export interface ISwatchMenuProps {
    setShowHat: Dispatch<SetStateAction<boolean>>,
    hatSwatches: string[],
    topSwatches: string[],
    bottomSwatches: string[],
    shoeSwatches: string[],
    handler: (color: string, area: string) => void
}

export default function SwatchMenu(props: ISwatchMenuProps) {


    return (
        <Grid container direction="column">
            <Grid item container wrap="nowrap" style={{ maxWidth: "300px", overflowX: "auto" }}>
                {/* <Grid item style={{ width: "75px" }}>Hat</Grid> */}
                <Grid item><Button onClick={() => props.setShowHat(false)} variant="outlined" style={{ height: "30px" }}></Button></Grid>
                {props.hatSwatches.map((color) => (
                    <Grid item key={color}><Button onClick={() => props.handler(color, "hat")} style={{ height: "30px", backgroundColor: color }}></Button></Grid>
                ))}
            </Grid>
            <br></br>
            <Grid item container wrap="nowrap" style={{ maxWidth: "400px", overflowX: "auto" }}>
                {/* <Grid item style={{ width: "75px" }}>Top</Grid> */}
                {props.topSwatches.map((color) => (
                    <Grid item key={color}><Button onClick={() => props.handler(color, "top")} style={{ height: "30px", backgroundColor: color }}></Button></Grid>
                ))}
            </Grid>
            <br></br>
            <Grid item container wrap="nowrap" style={{ maxWidth: "400px", overflowX: "auto" }}>
                {/* <Grid item style={{ width: "75px" }}>Bottom</Grid> */}
                {props.bottomSwatches.map((color) => (
                    <Grid item key={color}><Button onClick={() => props.handler(color, "bottom")} style={{ height: "30px", backgroundColor: color }}></Button></Grid>
                ))}
            </Grid>
            <br></br>
            <Grid item container wrap="nowrap" style={{ maxWidth: "400px", overflowX: "auto" }}>
                {/* <Grid item style={{ width: "75px" }}>Shoe</Grid> */}
                {props.shoeSwatches.map((color) => (
                    <Grid item key={color}><Button onClick={() => props.handler(color, "shoes")} style={{ height: "30px", backgroundColor: color }}></Button></Grid>
                ))}
            </Grid>
            <br></br>
        </Grid>
    );

}