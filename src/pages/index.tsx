import { useState } from 'react';
import { Button, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import { useUser } from '../context/AuthContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useForm, SubmitHandler } from 'react-hook-form';
import { API } from 'aws-amplify';
import { createGarment } from '@/graphql/mutations';
import { CreateGarmentInput, CreateGarmentMutation } from '@/API';

interface IFormInput {
  color: string;
  type: string;
}

export default function Home() {

  const { user } = useUser();
  console.log("USER: ", user);

  const [hatColor, setHatColor] = useState<string>("");
  const [topColor, setTopColor] = useState<string>("#000");
  const [bottomColor, setBottomColor] = useState<string>("#000");
  const [shoeColor, setShoeColor] = useState<string>("#000");

  const [showHat, setShowHat] = useState<boolean>(false);
  const [showAdd, setShowAdd] = useState<boolean>(false);

  const hatColors: string[] = ["#000", "#fff"];
  const topColors: string[] = ["#000", "#fff"];
  const bottomColors: string[] = ["#000", "#fff"];
  const shoeColors: string[] = ["#000", "#fff"];

  const { register, formState: { errors }, handleSubmit } = useForm<IFormInput>();

  const handleHatChange = (color: string) => {

    setHatColor(color);
    // go from no hat to hat
    if (!showHat) setShowHat(true);

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
        <Grid item xs={8}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              {showHat ? (
                <div className="hat" style={{ height: "40px", width: "62px", marginLeft: "auto", marginRight: "auto", backgroundColor: hatColor, borderTopLeftRadius: "60% 90%", borderTopRightRadius: "60% 90%" }}></div>
              )
                : (
                  <div style={{ height: "15px" }}></div>
                )}
            </Grid>
            <Grid item>
              {showHat ? (
                <div className="face" style={{ height: "55px", width: "60px", marginLeft: "auto", marginRight: "auto", backgroundColor: "#a18057", borderBottomLeftRadius: "120%", borderBottomRightRadius: "120%" }}></div>
              )
                : (
                  <div className="face" style={{ height: "80px", width: "60px", marginLeft: "auto", marginRight: "auto", backgroundColor: "#a18057", borderTopRightRadius: "40%", borderTopLeftRadius: "40%", borderBottomLeftRadius: "45%", borderBottomRightRadius: "45%" }}></div>
                )}

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
            <Grid item>Hat</Grid>
            <Grid item container style={{ maxHeight: "80px", overflowY: "auto" }}>
              <Grid item><Button onClick={() => setShowHat(false)} variant="outlined" style={{ height: "30px" }}></Button></Grid>
              {hatColors.map((color) => (
                <Grid item key={color}><Button onClick={() => handleHatChange(color)} style={{ height: "30px", backgroundColor: color }}></Button></Grid>
              ))}
            </Grid>
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
            <br></br>
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
            <br></br>
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
                      <MenuItem value="Top">Top</MenuItem>
                      <MenuItem value="Bottom">Bottom</MenuItem>
                      <MenuItem value="Shoes">Shoe</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid>
                    <Button type="submit" variant="contained">Add</Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
