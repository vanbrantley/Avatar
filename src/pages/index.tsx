import { useState } from 'react';
import { Button, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material';
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

  // const hexNumber = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
  // console.log(hexNumber);

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

    setSelectedColor(color);

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
          <Palette
            handler={addColorSwatch}
            hatColor={hatColor}
            topColor={topColor}
            bottomColor={bottomColor}
            shoeColor={shoeColor} />
        </Grid>
        <Grid item xs={6}>
          <Avatar
            handler={handleAreaChange}
            showHat={showHat}
            hatColor={hatColor}
            topColor={topColor}
            bottomColor={bottomColor}
            shoeColor={shoeColor} />
        </Grid>
        <Grid item xs={3}>
          <SwatchMenu
            handler={handleColorChangeSwatch}
            setShowHat={setShowHat}
            hatSwatches={hatSwatches}
            topSwatches={topSwatches}
            bottomSwatches={bottomSwatches}
            shoeSwatches={shoeSwatches} />
          <Grid container flexWrap="nowrap">
            <Grid item>
              <SketchPicker
                disableAlpha
                color={selectedColor}
                onChangeComplete={color => handleColorChangePicker(color.hex)} />
            </Grid>
            <Grid item>
              <Palette
                handler={addColorSwatch}
                hatColor={hatColor}
                topColor={topColor}
                bottomColor={bottomColor}
                shoeColor={shoeColor} />
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </>
  )
}