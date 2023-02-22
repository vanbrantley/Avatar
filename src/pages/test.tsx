/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { Grid, IconButton } from "@mui/material";
import ShuffleIcon from '@mui/icons-material/Shuffle';
export default function Test() {

    const [background, setBackground] = useState<string>(""); // 0
    const [hat, setHat] = useState<string>(""); // 1
    const [glassesFrame, setGlassesFrame] = useState<string>(""); // 2
    const [lensTop, setLensTop] = useState<string>(""); // 3
    const [lensBottom, setLensBottom] = useState<string>(""); // 4

    const colorArray = [background, hat, glassesFrame, lensTop, lensBottom, "#bc996f", "#000"];


    // make 24x24 number array
    // map over array, render a grid with backgroundColor=colorArray[index]
    const colorAssignment: number[][] = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 6, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 6, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 6, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 6, 5, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 6, 5, 5, 5, 5, 5, 5, 6, 6, 5, 5, 6, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 6, 5, 5, 5, 5, 6, 6, 6, 5, 5, 6, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 6, 5, 5, 5, 5, 5, 5, 5, 5, 6, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 6, 5, 5, 5, 5, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 6, 5, 5, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 6, 5, 5, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];



    const randomizeColors = () => {

        const randomBackground = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
        const randomHat = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
        const randomGlassesFrame = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
        const randomLensTop = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
        const randomLensBottom = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");

        setBackground(randomBackground);
        setHat(randomHat);
        setGlassesFrame("#fff");
        setLensTop(randomLensTop);
        setLensBottom(randomLensBottom);

    }

    useEffect(() => {
        randomizeColors();
    }, [])

    return (
        <Grid container alignItems="center">
            <Grid item xs={7}>

                {colorAssignment.map((row) => (
                    <Grid container>
                        {row.map((index) => (
                            <Grid item style={{ height: "20px", width: "20px", backgroundColor: colorArray[index] }}></Grid>
                        ))}
                    </Grid>
                ))}

                <Grid item>
                    <IconButton onClick={() => randomizeColors()}>
                        <ShuffleIcon style={{ color: "white" }} />
                    </IconButton>
                </Grid>

                {/* <Grid container>
                    <Grid item style={{ height: "10px", width: "10px", backgroundColor: background }}></Grid>
                    <Grid item style={{ height: "10px", width: "10px", backgroundColor: background }}></Grid>
                    <Grid item style={{ height: "10px", width: "10px", backgroundColor: background }}></Grid>
                </Grid>
                <Grid container>
                    <Grid item style={{ height: "10px", width: "10px", backgroundColor: background }}></Grid>
                    <Grid item style={{ height: "10px", width: "10px", backgroundColor: background }}></Grid>
                    <Grid item style={{ height: "10px", width: "10px", backgroundColor: background }}></Grid>
                </Grid>
                <Grid container>
                    <Grid item style={{ height: "10px", width: "10px", backgroundColor: background }}></Grid>
                    <Grid item style={{ height: "10px", width: "10px", backgroundColor: background }}></Grid>
                    <Grid item style={{ height: "10px", width: "10px", backgroundColor: background }}></Grid>
                </Grid> */}
            </Grid>
            <Grid item xs={5}></Grid>
        </Grid>
    )
}