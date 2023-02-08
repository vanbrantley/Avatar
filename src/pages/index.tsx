import { useState } from 'react';
import { Button, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import { useUser } from '../context/AuthContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useForm, SubmitHandler } from 'react-hook-form';
import { API } from 'aws-amplify';
import { createGarment } from '@/graphql/mutations';
import { CreateGarmentInput, CreateGarmentMutation } from '@/API';
// import { CirclePicker, ChromePicker } from 'react-color';
// from https://you.com/search?q=warning%3A%20prop%20%60style%60%20did%20not%20match
import dynamic from 'next/dynamic';
const ChromePicker = dynamic(
  () => import('react-color').then((mod) => mod.SketchPicker),
  { ssr: false }
);
// CirclePicker for complexions


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
  const [showAdd, setShowAdd] = useState<boolean>(false);

  const hatColors: string[] = ["#000", "#fff"];
  const topColors: string[] = ["#000", "#fff"];
  const bottomColors: string[] = ["#000", "#fff"];
  const shoeColors: string[] = ["#000", "#fff"];

  const { register, formState: { errors }, handleSubmit } = useForm<IFormInput>();

  console.log("Selected area: ", selectedArea);

  const handleAreaChange = (area: string) => {
    // set selected area
    setSelectedArea(area);
    let areaColor: string;
    // get color of the newly selected area
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

  const handleColorChangeSwatch = (color: string, area: string) => {

    // want to also have the selectedColor to be updated in the color picker

    switch (area) {
      case "hat":
        setHatColor(color);
        if (!showHat) setShowHat(true);
        break;
      case "top":
        console.log("Entered case.")
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

  const handleColorChangePicker = (color: string) => {

    // sets the color of the selectedArea to the color
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

    // when selectedArea is changed, selectedColor should be set to the color of the new area

    // handle how saved colors are integrated into this

    setSelectedColor(color);
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
      {/* <Typography variant='h1'>Hello World!</Typography> */}

      <Grid container spacing={1}>
        <Grid item xs={7}>
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
        <Grid item xs={5}>
          <Grid container direction="column">
            <Grid item container style={{ maxHeight: "80px", overflowY: "auto" }}>
              <Grid item style={{ width: "75px" }}>Hat</Grid>
              <Grid item><Button onClick={() => setShowHat(false)} variant="outlined" style={{ height: "30px" }}></Button></Grid>
              {hatColors.map((color) => (
                <Grid item key={color}><Button onClick={() => handleColorChangeSwatch(color, "hat")} style={{ height: "30px", backgroundColor: color }}></Button></Grid>
              ))}
            </Grid>
            <Grid item container style={{ maxHeight: "80px", overflowY: "auto" }}>
              <Grid item style={{ width: "75px" }}>Top</Grid>
              {topColors.map((color) => (
                <Grid item key={color}><Button onClick={() => handleColorChangeSwatch(color, "top")} style={{ height: "30px", backgroundColor: color }}></Button></Grid>
              ))}
            </Grid>
            <Grid item container style={{ maxHeight: "80px", overflowY: "auto" }}>
              <Grid item style={{ width: "75px" }}>Bottom</Grid>
              {bottomColors.map((color) => (
                <Grid item key={color}><Button onClick={() => handleColorChangeSwatch(color, "bottom")} style={{ height: "30px", backgroundColor: color }}></Button></Grid>
              ))}
            </Grid>
            <Grid item container style={{ maxHeight: "80px", overflowY: "auto" }}>
              <Grid item style={{ width: "75px" }}>Shoe</Grid>
              {shoeColors.map((color) => (
                <Grid item key={color}><Button onClick={() => handleColorChangeSwatch(color, "shoes")} style={{ height: "30px", backgroundColor: color }}></Button></Grid>
              ))}
            </Grid>
            <Grid item>
              {showAdd ?
                <IconButton onClick={() => setShowAdd(false)}>
                  <RemoveIcon color="secondary" />
                </IconButton>
                :
                <IconButton onClick={() => setShowAdd(true)}>
                  <AddIcon color="secondary" />
                </IconButton>
              }
            </Grid>
            {showAdd && (
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <Grid container direction="row" alignItems="center" spacing={1}>
                  <Grid item>
                    <TextField
                      id="color"
                      label="Color"
                      type="color"
                      style={{ width: "80px" }}
                      error={errors.color ? true : false}
                      helperText={errors.color ? errors.color.message : null}
                      {...register("color")} />
                  </Grid>
                  <Grid item>
                    <TextField
                      select
                      id="type"
                      label="Type"
                      type="text"
                      defaultValue="Top"
                      error={errors.type ? true : false}
                      helperText={errors.type ? errors.type.message : null}
                      {...register("type")}>
                      <MenuItem value="Hat">Hat</MenuItem>
                      <MenuItem value="Top">Top</MenuItem>
                      <MenuItem value="Bottom">Bottom</MenuItem>
                      <MenuItem value="Shoes">Shoes</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid>
                    <Button type="submit" variant="contained">Add</Button>
                  </Grid>
                </Grid>
              </form>
            )}
            {!showAdd && (
              <ChromePicker color={selectedColor}
                onChangeComplete={color => handleColorChangePicker(color.hex)} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}