import { useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useUser } from '../context/AuthContext';

export default function Home() {

  const { user } = useUser();
  console.log("USER: ", user);

  const [topColor, setTopColor] = useState<string>("#000");
  const [bottomColor, setBottomColor] = useState<string>("#000");
  const [shoeColor, setShoeColor] = useState<string>("#000");

  const topColors: string[] = ["#000", "#fff", "#d6d6d6"];
  const bottomColors: string[] = ["#000", "#fff", "#d6d6d6"];
  const shoeColors: string[] = ["#000", "#fff", "#d6d6d6"];

  return (
    <>
      {/* <Typography variant='h1'>Hello World!</Typography> */}

      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <div className="face" style={{ height: "100px", width: "80px", marginLeft: "auto", marginRight: "auto", backgroundColor: "#a18057", borderTopRightRadius: "25%", borderTopLeftRadius: "25%", borderBottomLeftRadius: "40%", borderBottomRightRadius: "40%" }}></div>
            </Grid>
            <Grid item>
              <div className="square" style={{ height: "90px", width: "125px", marginLeft: "auto", marginRight: "auto", backgroundColor: topColor, borderTopLeftRadius: "40% 40%", borderTopRightRadius: "40% 40%" }}></div>
              <div className="square" style={{ height: "90px", width: "125px", marginLeft: "auto", marginRight: "auto", backgroundColor: topColor }}></div>
            </Grid>
            <Grid item>
              <div className="square" style={{ height: "90px", width: "125px", marginLeft: "auto", marginRight: "auto", backgroundColor: bottomColor }}></div>
              <div className="square" style={{ height: "90px", width: "125px", marginLeft: "auto", marginRight: "auto", backgroundColor: bottomColor }}></div>
            </Grid>
            <Grid item>
              <div className="sm-square" style={{ height: "50px", width: "170px", marginLeft: "auto", marginRight: "auto", backgroundColor: shoeColor, borderTopRightRadius: "15% 60%", borderTopLeftRadius: "15% 60%", borderBottomLeftRadius: "15% 60%", borderBottomRightRadius: "15% 60%" }}></div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container direction="column" alignItems="center">
            <Grid item>Top</Grid>
            <Grid item container style={{ maxHeight: "80px", overflowY: "auto" }}>
              {topColors.map((color) => (
                <Grid item key={color}><Button onClick={() => setTopColor(color)} style={{ height: "30px", backgroundColor: color }}></Button></Grid>
              ))}
            </Grid>
            <Grid item>Bottom</Grid>
            <Grid item container style={{ maxHeight: "80px", overflowY: "auto" }}>
              {bottomColors.map((color) => (
                <Grid item key={color}><Button onClick={() => setBottomColor(color)} style={{ height: "30px", backgroundColor: color }}></Button></Grid>
              ))}
            </Grid>
            <Grid item>Shoe</Grid>
            <Grid item container style={{ maxHeight: "80px", overflowY: "auto" }}>
              {shoeColors.map((color) => (
                <Grid item key={color}><Button onClick={() => setShoeColor(color)} style={{ height: "30px", backgroundColor: color }}></Button></Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    </>
  )
}
