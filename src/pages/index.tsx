import { useEffect, useState } from 'react';
import { Button, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import LockIcon from '@mui/icons-material/Lock';
import { useUser } from '../context/AuthContext';
import { useForm, SubmitHandler } from 'react-hook-form';
import { API } from 'aws-amplify';
import { createGarment } from '@/graphql/mutations';
import { CreateGarmentInput, CreateGarmentMutation } from '@/API';
import dynamic from 'next/dynamic';
import Palette from '@/components/Palette';
import Avatar from '@/components/Avatar';
import SwatchMenu from '@/components/SwatchMenu';
// from https://you.com/search?q=warning%3A%20prop%20%60style%60%20did%20not%20match
const SketchPicker = dynamic(
  () => import('react-color').then((mod) => mod.SketchPicker),
  { ssr: false }
);
// const CirclePicker = dynamic(
//   () => import('react-color').then((mod) => mod.CirclePicker),
//   { ssr: false }
// );


interface IFormInput {
  color: string;
  type: string;
}

export default function Home() {

  const { user } = useUser();
  console.log("USER: ", user);

  const [hatColor, setHatColor] = useState<string>("#000");
  const [topColor, setTopColor] = useState<string>("#fff");
  const [bottomColor, setBottomColor] = useState<string>("#000");
  const [shoeColor, setShoeColor] = useState<string>("#000");

  const [selectedArea, setSelectedArea] = useState<string>("top");
  const [selectedColor, setSelectedColor] = useState<string>("#000");

  const [showHat, setShowHat] = useState<boolean>(false);

  const [hatSwatches, setHatSwatches] = useState<string[]>(["#fff"]);
  const [topSwatches, setTopSwatches] = useState<string[]>(["#fff"]);
  const [bottomSwatches, setBottomSwatches] = useState<string[]>(["#fff"]);
  const [shoeSwatches, setShoeSwatches] = useState<string[]>(["#fff"]);

  useEffect(() => {
    randomizePalette()
  }, [])

  const { register, formState: { errors }, handleSubmit } = useForm<IFormInput>();

  const handleAreaChange = (area: string) => {

    setSelectedArea(area);

    switch (area) {
      case "hat":
        setSelectedColor(hatColor);
        break;
      case "top":
        setSelectedColor(topColor);
        break;
      case "bottom":
        setSelectedColor(bottomColor);
        break;
      case "shoes":
        setSelectedColor(shoeColor);
        break;
    }
  }

  const handleColorChangePicker = (color: string) => {

    // sets the color of the selectedArea to the color picker color
    switch (selectedArea) {
      case "hat":
        setHatColor(color);
        if (!showHat) setShowHat(true);
        break;
      case "top":
        setTopColor(color);
        break;
      case "bottom":
        setBottomColor(color);
        break;
      case "shoes":
        setShoeColor(color);
        break;
      default:
        break;
    }

    setSelectedColor(color);

    // add color to history


  }

  const handleColorChangeSwatch = (color: string, area: string) => {

    switch (area) {
      case "hat":
        setHatColor(color);
        if (!showHat) setShowHat(true);
        break;
      case "top":
        setTopColor(color);
        break;
      case "bottom":
        setBottomColor(color);
        break;
      case "shoes":
        setShoeColor(color);
        break;
      default:
        break;
    }

    setSelectedArea(area);
    setSelectedColor(color);

  }

  const addColorSwatch = (area: string) => {

    // add color to the corresponding swatches array if it isn't already
    switch (area) {
      case "hat":
        if (!(hatSwatches.includes(hatColor))) setHatSwatches([hatColor, ...hatSwatches]);
        setSelectedColor(hatColor);
        break;
      case "top":
        if (!(topSwatches.includes(topColor))) setTopSwatches([topColor, ...topSwatches]);
        setSelectedColor(topColor);
        break;
      case "bottom":
        if (!(bottomSwatches.includes(bottomColor))) setBottomSwatches([bottomColor, ...bottomSwatches]);
        setSelectedColor(bottomColor);
        break;
      case "shoes":
        if (!(shoeSwatches.includes(shoeColor))) setShoeSwatches([shoeColor, ...shoeSwatches]);
        setSelectedColor(shoeColor);
        break;
      default:
        break;
    }

    setSelectedArea(area);

  }

  const randomizePalette = () => {

    const randomHatColor = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
    const randomTopColor = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
    const randomBottomColor = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
    const randomShoeColor = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");

    setHatColor(randomHatColor);
    setTopColor(randomTopColor);
    setBottomColor(randomBottomColor);
    setShoeColor(randomShoeColor);

    // set the selected color to the color of the selected area
    switch (selectedArea) {
      case "hat":
        setSelectedColor(hatColor);
        break;
      case "top":
        setSelectedColor(topColor);
        break;
      case "bottom":
        setSelectedColor(bottomColor);
        break;
      case "shoe":
        setSelectedColor(shoeColor);
        break;
    }

  }

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { color, type } = data;

    console.log(data);

    // try {

    //   const createNewGarmentInput: CreateGarmentInput = {
    //     name: name,
    //     brand: brand,
    //     color: color,
    //     own: own,
    //     type: type
    //   };

    //   const createNewGarment = (await API.graphql({
    //     query: createGarment,
    //     variables: { input: createNewGarmentInput }
    //   })) as CreateGarmentMutation;

    //   console.log("Garment added successfully: ", createNewGarment);

    //   // see if you need to refresh

    // } catch (error: any) {
    //   console.error("Error adding garment: ", error);
    // }

  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={1}>
          {/* <Palette handler={addColorSwatch} hatColor={hatColor} topColor={topColor} bottomColor={bottomColor} shoeColor={shoeColor} /> */}
          <Grid item><Button onClick={() => addColorSwatch("hat")} style={{ height: "55px", width: "60px", backgroundColor: hatColor }}></Button></Grid>
          <Grid item><Button onClick={() => addColorSwatch("top")} style={{ height: "55px", width: "60px", backgroundColor: topColor }}></Button></Grid>
          <Grid item><Button onClick={() => addColorSwatch("bottom")} style={{ height: "55px", width: "60px", backgroundColor: bottomColor }}></Button></Grid>
          <Grid item><Button onClick={() => addColorSwatch("shoes")} style={{ height: "55px", width: "60px", backgroundColor: shoeColor }}></Button></Grid>
        </Grid>
        <Grid item xs={6}>
          {/* <Avatar handler={handleAreaChange} showHat={showHat} hatColor={hatColor} topColor={topColor} bottomColor={bottomColor} shoeColor={shoeColor} /> */}
          <Grid container direction="column" alignItems="center">
            <Grid item>
              {showHat ? (
                <Button onClick={() => handleAreaChange("hat")} style={{ height: "40px", width: "62px", marginLeft: "auto", marginRight: "auto", backgroundColor: hatColor, borderTopLeftRadius: "60% 90%", borderTopRightRadius: "60% 90%" }}></Button>
              )
                : (
                  <div style={{ height: "15px" }}></div>
                )}
            </Grid>
            <Grid item>
              <div className="face" style={showHat ?
                { height: "55px", width: "60px", marginLeft: "auto", marginRight: "auto", backgroundColor: "#a18057", borderBottomLeftRadius: "120%", borderBottomRightRadius: "120%" }
                : { height: "80px", width: "60px", marginLeft: "auto", marginRight: "auto", backgroundColor: "#a18057", borderTopRightRadius: "40%", borderTopLeftRadius: "40%", borderBottomLeftRadius: "45%", borderBottomRightRadius: "45%" }}></div>
            </Grid>
            <Grid item>
              <Button onClick={() => handleAreaChange("top")} style={{ height: "180px", width: "125px", marginLeft: "auto", marginRight: "auto", backgroundColor: topColor, borderTopLeftRadius: "30%", borderTopRightRadius: "30%" }}></Button>
            </Grid>
            <Grid item>
              <Button onClick={() => handleAreaChange("bottom")} style={{ height: "180px", width: "125px", marginLeft: "auto", marginRight: "auto", backgroundColor: bottomColor }}></Button>
            </Grid>
            <Grid item>
              <Button onClick={() => handleAreaChange("shoes")} style={{ height: "50px", width: "170px", marginLeft: "auto", marginRight: "auto", backgroundColor: shoeColor, borderTopRightRadius: "15% 60%", borderTopLeftRadius: "15% 60%", borderBottomLeftRadius: "15% 60%", borderBottomRightRadius: "15% 60%" }}></Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          {/* <SwatchMenu handler={handleColorChangeSwatch} setShowHat={setShowHat} hatSwatches={hatHistory} topSwatches={topHistory} bottomSwatches={bottomHistory} shoeSwatches={shoeHistory} /> */}
          <Grid container direction="column">
            <Grid item container wrap="nowrap" style={{ maxWidth: "300px", overflowX: "auto" }}>
              {/* <Grid item style={{ width: "75px" }}>Hat</Grid> */}
              <Grid item><Button onClick={() => setShowHat(false)} variant="outlined" style={{ height: "30px" }}></Button></Grid>
              {hatSwatches.map((color) => (
                <Grid item key={color}><Button onClick={() => handleColorChangeSwatch(color, "hat")} style={{ height: "30px", backgroundColor: color }}></Button></Grid>
              ))}
            </Grid>
            <br></br>
            <Grid item container wrap="nowrap" style={{ maxWidth: "400px", overflowX: "auto" }}>
              {/* <Grid item style={{ width: "75px" }}>Top</Grid> */}
              {topSwatches.map((color) => (
                <Grid item key={color}><Button onClick={() => handleColorChangeSwatch(color, "top")} style={{ height: "30px", backgroundColor: color }}></Button></Grid>
              ))}
            </Grid>
            <br></br>
            <Grid item container wrap="nowrap" style={{ maxWidth: "400px", overflowX: "auto" }}>
              {/* <Grid item style={{ width: "75px" }}>Bottom</Grid> */}
              {bottomSwatches.map((color) => (
                <Grid item key={color}><Button onClick={() => handleColorChangeSwatch(color, "bottom")} style={{ height: "30px", backgroundColor: color }}></Button></Grid>
              ))}
            </Grid>
            <br></br>
            <Grid item container wrap="nowrap" style={{ maxWidth: "400px", overflowX: "auto" }}>
              {/* <Grid item style={{ width: "75px" }}>Shoe</Grid> */}
              {shoeSwatches.map((color) => (
                <Grid item key={color}><Button onClick={() => handleColorChangeSwatch(color, "shoes")} style={{ height: "30px", backgroundColor: color }}></Button></Grid>
              ))}
            </Grid>
            <br></br>
          </Grid>
          <Grid container flexWrap="nowrap">
            <Grid item>
              <SketchPicker
                disableAlpha
                color={selectedColor}
                onChangeComplete={color => handleColorChangePicker(color.hex)} />
            </Grid>
            <Grid container direction="column">
              <Grid item>
                {/* <Palette handler={addColorSwatch} hatColor={hatColor} topColor={topColor} bottomColor={bottomColor} shoeColor={shoeColor} /> */}
                <Grid item><Button onClick={() => addColorSwatch("hat")} style={{ height: "55px", width: "60px", backgroundColor: hatColor }}></Button></Grid>
                <Grid item><Button onClick={() => addColorSwatch("top")} style={{ height: "55px", width: "60px", backgroundColor: topColor }}></Button></Grid>
                <Grid item><Button onClick={() => addColorSwatch("bottom")} style={{ height: "55px", width: "60px", backgroundColor: bottomColor }}></Button></Grid>
                <Grid item><Button onClick={() => addColorSwatch("shoes")} style={{ height: "55px", width: "60px", backgroundColor: shoeColor }}></Button></Grid>
              </Grid>
              <Grid item>
                <IconButton onClick={() => randomizePalette()}>
                  <ShuffleIcon style={{ color: "white" }} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </>
  )
}