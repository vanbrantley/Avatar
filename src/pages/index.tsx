import { useEffect, useState } from 'react';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LockIcon from '@mui/icons-material/Lock';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useUser } from '../context/AuthContext';
import { API } from 'aws-amplify';
import { GraphQLQuery, graphqlOperation, GraphQLResult } from '@aws-amplify/api';
import { createGarment, createPalette, deletePalette } from '@/graphql/mutations';
import { listGarments, listPalettes } from '@/graphql/queries';
import { CreateGarmentInput, CreateGarmentMutation, CreatePaletteInput, CreatePaletteMutation, DeletePaletteInput, DeletePaletteMutation, Garment, ListGarmentsQuery, ListPalettesQuery, Palette } from '@/API';
import Header from '@/components/Header';
import Avatar from '@/components/Avatar';
import SwatchMenu from '@/components/SwatchMenu';
import dynamic from 'next/dynamic';
import groupByArea from '@/lib/groupByArea';
const SketchPicker = dynamic(
  () => import('react-color').then((mod) => mod.SketchPicker),
  { ssr: false }
);

export default function Home() {

  const { user } = useUser();

  const [hatColor, setHatColor] = useState<string>("#000");
  const [faceColor, setFaceColor] = useState<string>("#a18057");
  const [topColor, setTopColor] = useState<string>("#fff");
  const [bottomColor, setBottomColor] = useState<string>("#000");
  const [shoeColor, setShoeColor] = useState<string>("#000");

  const [hatLock, setHatLock] = useState<boolean>(false);
  const [topLock, setTopLock] = useState<boolean>(false);
  const [bottomLock, setBottomLock] = useState<boolean>(false);
  const [shoeLock, setShoeLock] = useState<boolean>(false);


  const [selectedArea, setSelectedArea] = useState<string>("top");
  const [selectedColor, setSelectedColor] = useState<string>(topColor);

  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [heartFilled, setHeartFilled] = useState<boolean>(false);
  const [selectedPalette, setSelectedPalette] = useState<string | null>(null);

  const [hatSwatches, setHatSwatches] = useState<string[]>(["#fff"]);
  const [topSwatches, setTopSwatches] = useState<string[]>(["#fff"]);
  const [bottomSwatches, setBottomSwatches] = useState<string[]>(["#fff"]);
  const [shoeSwatches, setShoeSwatches] = useState<string[]>(["#fff"]);

  const [closetMode, setClosetMode] = useState<boolean>(false);
  const [showPicker, setShowPicker] = useState<boolean>(false);


  useEffect(() => {
    randomizePalette();
  }, []);

  useEffect(() => {

    // Execute the fetchPalettes function when the component mounts
    if (user) {
      fetchPalettes();
    }

    // Register the beforeunload event listener to fetch palettes on page refresh
    const handlePageRefresh = () => {
      if (user) {
        fetchPalettes();
      }
    };

    // Add the event listener on component mount
    window.addEventListener('beforeunload', handlePageRefresh);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handlePageRefresh);
    };
  }, [user]);

  const fetchGarmentsFromDB = async (): Promise<Garment[]> => {

    try {
      const response = (await API.graphql<GraphQLQuery<ListGarmentsQuery>>(graphqlOperation(listGarments))) as GraphQLResult<ListGarmentsQuery>;
      const { data } = response;
      if (data && data.listGarments && data.listGarments.items) {
        const userGarments = data.listGarments.items as Garment[];
        const grouped = groupByArea(userGarments);
        setHatSwatches(grouped["hat"]);
        setTopSwatches(grouped["top"]);
        setBottomSwatches(grouped["bottom"]);
        setShoeSwatches(grouped["shoe"]);
        return userGarments;
      } else {
        throw new Error("Could not get garments");
      }
    } catch (error: any) {
      throw new Error("Could not get palettes");
    }

  }

  const handleModeChange = (toClosetMode: boolean): void => {

    // check if mode is switching
    const modeSwitch: boolean = ((toClosetMode && !closetMode) || (!toClosetMode && closetMode));

    if (!modeSwitch) return;

    if (toClosetMode) {

      // fetch garments & set swatches
      fetchGarmentsFromDB()
        .then((userGarments) => {
          const grouped = groupByArea(userGarments);
          setHatSwatches(grouped["hat"]);
          setTopSwatches(grouped["top"]);
          setBottomSwatches(grouped["bottom"]);
          setShoeSwatches(grouped["shoe"]);
        })

      // assign area colors to random colors in swatches - not implemented

      setShowPicker(false);

    }

    setClosetMode(toClosetMode);

  }

  const handleAreaChange = (area: string) => {

    setSelectedArea(area);

    switch (area) {
      case "hat":
        setSelectedColor(hatColor);
        break;
      case "face":
        setSelectedColor(faceColor);
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

    if (heartFilled) setHeartFilled(false);
    if (selectedPalette) setSelectedPalette(null);

    // sets the color of the selectedArea to the color picker color
    switch (selectedArea) {
      case "hat":
        setHatColor(color);
        break;
      case "face":
        setFaceColor(color);
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
        break;
      case "face":
        setFaceColor(color);
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
        if (!(hatSwatches.includes(hatColor))) {
          addGarmentToDB("hat", hatColor);
          setHatSwatches([hatColor, ...hatSwatches]);
        }
        setSelectedColor(hatColor);
        break;
      case "top":
        if (!(topSwatches.includes(topColor))) {
          addGarmentToDB("top", topColor);
          setTopSwatches([topColor, ...topSwatches]);
        }
        setSelectedColor(topColor);
        break;
      case "bottom":
        if (!(bottomSwatches.includes(bottomColor))) {
          addGarmentToDB("bottom", bottomColor);
          setBottomSwatches([bottomColor, ...bottomSwatches]);
        }
        setSelectedColor(bottomColor);
        break;
      case "shoes":
        if (!(shoeSwatches.includes(shoeColor))) {
          addGarmentToDB("shoe", shoeColor);
          setShoeSwatches([shoeColor, ...shoeSwatches]);
        }
        setSelectedColor(shoeColor);
        break;
      default:
        break;
    }

    setSelectedArea(area);

  }

  const addGarmentToDB = async (area: string, color: string) => {

    try {

      const createNewGarmentInput: CreateGarmentInput = {
        color: color,
        area: area
      };

      const response = await API.graphql<GraphQLQuery<CreateGarmentMutation>>(graphqlOperation(createGarment, {
        input: createNewGarmentInput
      })) as GraphQLResult<CreateGarmentMutation>;
      const { data } = response;
      if (data && data.createGarment) {
        const createdGarment = data.createGarment;
        console.log("Garment added successfully: ", createdGarment);
        // add createdGarment to swatches
      } else {
        throw new Error("Could not add garment")
      }

    } catch (error: any) {
      console.error("Error adding garment: ", error);
    }
  }

  const randomizePalette = () => {

    if (heartFilled) setHeartFilled(false);
    if (selectedPalette) setSelectedPalette(null);

    if (!hatLock) {
      const randomHatColor = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
      setHatColor(randomHatColor);
    }

    if (!topLock) {
      const randomTopColor = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
      setTopColor(randomTopColor);
    }

    if (!bottomLock) {
      const randomBottomColor = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
      setBottomColor(randomBottomColor);
    }

    if (!shoeLock) {
      const randomShoeColor = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
      setShoeColor(randomShoeColor);
    }

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

  const randomizeOutfit = () => {

    // generate a random number between 0 and length of each swatch array
    // set each area color to the swatchArray[index]

    if (!hatLock) {
      const hatIndex = Math.floor(Math.random() * hatSwatches.length);
      setHatColor(hatSwatches[hatIndex]);
    }

    if (!topLock) {
      const topIndex = Math.floor(Math.random() * topSwatches.length);
      setTopColor(topSwatches[topIndex]);
    }

    if (!bottomLock) {
      const bottomIndex = Math.floor(Math.random() * bottomSwatches.length);
      setBottomColor(bottomSwatches[bottomIndex]);
    }

    if (!shoeLock) {
      const shoeIndex = Math.floor(Math.random() * shoeSwatches.length);
      setShoeColor(shoeSwatches[shoeIndex]);
    }

  }

  const fetchPalettes = async (): Promise<Palette[]> => {

    try {
      const response = await API.graphql<GraphQLQuery<ListPalettesQuery>>(graphqlOperation(listPalettes)) as GraphQLResult<ListPalettesQuery>;
      const { data } = response;
      if (data && data.listPalettes && data.listPalettes.items) {
        const userPalettes = data.listPalettes.items as Palette[];
        // setPalettes to the hatColor, topColor, bottomColor, shoeColor
        setPalettes(userPalettes);
        return userPalettes;
      } else {
        throw new Error("Could not get palettes.");
      }
    } catch (error: any) {
      console.error(error);
      throw new Error("Could not get palettes");
    }

  }

  const savePalette = async () => {

    try {

      const createNewPaletteInput: CreatePaletteInput = {
        hatColor: hatColor,
        topColor: topColor,
        bottomColor: bottomColor,
        shoeColor: shoeColor
      };

      const response = await API.graphql<GraphQLQuery<CreatePaletteMutation>>(graphqlOperation(createPalette, {
        input: createNewPaletteInput
      })) as GraphQLResult<CreatePaletteMutation>;
      const { data } = response;

      if (data && data.createPalette) {
        const createdPalette = data.createPalette;
        setPalettes((prevPalettes) => [createdPalette, ...prevPalettes]);
        setSelectedPalette(createdPalette.id);
        setHeartFilled(true);
        console.log("Palette added successfully: ", createdPalette);

      } else {
        throw new Error("Could not save palette.");
      }
    } catch (error: any) {
      console.error("Error adding palette: ", error);
    }

  }

  const removePalette = async () => {

    try {

      const paletteDetails: DeletePaletteInput = {
        id: selectedPalette!,
      };

      const response = await API.graphql<GraphQLQuery<DeletePaletteMutation>>(graphqlOperation(deletePalette, {
        input: paletteDetails
      })) as GraphQLResult<DeletePaletteMutation>;
      const { data } = response;

      if (data && data.deletePalette) {
        const removedPalette = data.deletePalette;
        setPalettes(palettes.filter((palette) => palette.id !== removedPalette.id));
        setSelectedPalette(null);
        setHeartFilled(false);
        console.log("Palette removed successfully: ", removedPalette);
      }

    } catch (error: any) {
      console.error("Error removing palette: ", error);
    }

  }

  const assignAreaColorsFromPalatte = (hatColor: string, topColor: string, bottomColor: string, shoeColor: string, id: string) => {

    setHatColor(hatColor);
    setTopColor(topColor);
    setBottomColor(bottomColor);
    setShoeColor(shoeColor);

    setHeartFilled(true);
    setSelectedPalette(id);

  }

  return (
    <>
      {/* {console.log("Closet Mode: ", closetMode)} */}
      <Header closetMode={closetMode} setClosetMode={setClosetMode} handleModeChange={handleModeChange} />
      <Grid container spacing={1} className="grid-container">
        <Grid item xs={1}>
          {/* <Palette handler={addColorSwatch} hatColor={hatColor} topColor={topColor} bottomColor={bottomColor} shoeColor={shoeColor} /> */}
          <Grid item><Button onClick={() => addColorSwatch("hat")} style={{ height: "55px", width: "60px", borderRadius: "0%", backgroundColor: hatColor }}></Button></Grid>
          <Grid item><Button onClick={() => addColorSwatch("top")} style={{ height: "55px", width: "60px", borderRadius: "0%", backgroundColor: topColor }}></Button></Grid>
          <Grid item><Button onClick={() => addColorSwatch("bottom")} style={{ height: "55px", width: "60px", borderRadius: "0%", backgroundColor: bottomColor }}></Button></Grid>
          <Grid item><Button onClick={() => addColorSwatch("shoes")} style={{ height: "55px", width: "60px", borderRadius: "0%", backgroundColor: shoeColor }}></Button></Grid>
        </Grid>
        <Grid item xs={6}>
          {/* <Avatar handler={handleAreaChange} showHat={showHat} hatColor={hatColor} topColor={topColor} bottomColor={bottomColor} shoeColor={shoeColor} /> */}
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Button onClick={() => handleAreaChange("hat")} style={{ height: "40px", width: "62px", marginLeft: "auto", marginRight: "auto", backgroundColor: hatColor, borderTopLeftRadius: "60% 90%", borderTopRightRadius: "60% 90%" }}></Button>
            </Grid>
            <Grid item>
              <div onClick={() => handleAreaChange("face")} style={{ height: "55px", width: "60px", marginLeft: "auto", marginRight: "auto", backgroundColor: faceColor, borderBottomLeftRadius: "120%", borderBottomRightRadius: "120%", cursor: "pointer" }}></div>
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
        {!closetMode && (
          <Grid item xs={3}>
            <Grid container flexWrap="nowrap">
              <Grid item>
                <div className="sketch-wrapper">
                  <SketchPicker
                    disableAlpha
                    className="sketch-zoom"
                    color={selectedColor}
                    onChangeComplete={color => handleColorChangePicker(color.hex)} />
                </div>
              </Grid>
              <Grid item container direction="column">
                <Grid item>
                  {/* <Palette handler={addColorSwatch} hatColor={hatColor} topColor={topColor} bottomColor={bottomColor} shoeColor={shoeColor} /> */}
                  <Grid item container wrap="nowrap">
                    <Grid item>
                      <Button onClick={() => addColorSwatch("hat")} style={{ height: "55px", width: "60px", borderRadius: "0%", backgroundColor: hatColor }}></Button>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={() => setHatLock(prev => !prev)}>
                        <LockIcon style={{ color: hatLock ? "white" : "grey" }} />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Grid item container wrap="nowrap">
                    <Grid item>
                      <Button onClick={() => addColorSwatch("top")} style={{ height: "55px", width: "60px", borderRadius: "0%", backgroundColor: topColor }}></Button>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={() => setTopLock(prev => !prev)}>
                        <LockIcon style={{ color: topLock ? "white" : "grey" }} />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Grid item container wrap="nowrap">
                    <Grid item>
                      <Button onClick={() => addColorSwatch("bottom")} style={{ height: "55px", width: "60px", borderRadius: "0%", backgroundColor: bottomColor }}></Button>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={() => setBottomLock(prev => !prev)}>
                        <LockIcon style={{ color: bottomLock ? "white" : "grey" }} />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Grid item container wrap="nowrap">
                    <Grid item>
                      <Button onClick={() => addColorSwatch("shoes")} style={{ height: "55px", width: "60px", borderRadius: "0%", backgroundColor: shoeColor }}></Button>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={() => setShoeLock(prev => !prev)}>
                        <LockIcon style={{ color: shoeLock ? "white" : "grey" }} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <IconButton onClick={() => randomizePalette()}>
                    <ShuffleIcon style={{ color: "white" }} />
                  </IconButton>
                </Grid>
                {user && heartFilled && (
                  <Grid item>
                    <IconButton onClick={() => removePalette()}>
                      <FavoriteIcon style={{ color: "white" }} />
                    </IconButton>
                  </Grid>
                )}
                {user && !heartFilled && (
                  <Grid item>
                    <IconButton onClick={() => savePalette()}>
                      <FavoriteBorderIcon style={{ color: "white" }} />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <br></br>
            {user && (
              <Grid container>
                <div style={{ display: "flex", maxWidth: "300px", overflowX: "auto" }}>
                  {palettes.map((palette, i) => {
                    const { hatColor, topColor, bottomColor, shoeColor, id } = palette;

                    return (
                      <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
                        onClick={() => assignAreaColorsFromPalatte(hatColor, topColor, bottomColor, shoeColor, id)}>
                        <div style={{ backgroundColor: hatColor, height: "27px", width: "30px", borderRadius: "0%" }} />
                        <div style={{ backgroundColor: topColor, height: "27px", width: "30px", borderRadius: "0%" }} />
                        <div style={{ backgroundColor: bottomColor, height: "27px", width: "30px", borderRadius: "0%" }} />
                        <div style={{ backgroundColor: shoeColor, height: "27px", width: "30px", borderRadius: "0%" }} />
                      </div>
                    );
                  })}
                </div>
              </Grid>
            )}
          </Grid>

        )}

        {closetMode && (
          <Grid item xs={3}>
            {/* <SwatchMenu handler={handleColorChangeSwatch} setShowHat={setShowHat} hatSwatches={hatHistory} topSwatches={topHistory} bottomSwatches={bottomHistory} shoeSwatches={shoeHistory} /> */}
            <Grid container direction="column">
              <Grid item container wrap="nowrap">
                <Grid item container wrap="nowrap" style={{ maxWidth: "300px", overflowX: "auto" }}>
                  {hatSwatches.map((color) => (
                    <Grid item key={color}><Button onClick={() => handleColorChangeSwatch(color, "hat")} style={{ height: "30px", backgroundColor: color }}></Button></Grid>
                  ))}
                </Grid>
                {/* <Grid item>
                  <IconButton onClick={() => console.log('')}>
                    <DeleteIcon style={{ color: "grey" }} />
                  </IconButton>
                </Grid> */}
                <Grid item>
                  <IconButton onClick={() => setHatLock(prev => !prev)}>
                    <LockIcon style={{ color: hatLock ? "white" : "grey" }} />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid item container wrap="nowrap">
                <Grid item container wrap="nowrap" style={{ maxWidth: "400px", overflowX: "auto" }}>
                  {topSwatches.map((color) => (
                    <Grid item key={color}><Button onClick={() => handleColorChangeSwatch(color, "top")} style={{ height: "30px", backgroundColor: color }}></Button></Grid>
                  ))}
                </Grid>
                {/* <Grid item>
                  <IconButton onClick={() => console.log('')}>
                    <DeleteIcon style={{ color: "grey" }} />
                  </IconButton>
                </Grid> */}
                <Grid item>
                  <IconButton onClick={() => setTopLock(prev => !prev)}>
                    <LockIcon style={{ color: topLock ? "white" : "grey" }} />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid item container wrap="nowrap">
                <Grid item container wrap="nowrap" style={{ maxWidth: "400px", overflowX: "auto" }}>
                  {bottomSwatches.map((color) => (
                    <Grid item key={color}><Button onClick={() => handleColorChangeSwatch(color, "bottom")} style={{ height: "30px", backgroundColor: color }}></Button></Grid>
                  ))}
                </Grid>
                {/* <Grid item>
                  <IconButton onClick={() => console.log('')}>
                    <DeleteIcon style={{ color: "grey" }} />
                  </IconButton>
                </Grid> */}
                <Grid item>
                  <IconButton onClick={() => setBottomLock(prev => !prev)}>
                    <LockIcon style={{ color: bottomLock ? "white" : "grey" }} />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid item container wrap="nowrap">
                <Grid item container wrap="nowrap" style={{ maxWidth: "400px", overflowX: "auto" }}>
                  {shoeSwatches.map((color) => (
                    <Grid item key={color}><Button onClick={() => handleColorChangeSwatch(color, "shoes")} style={{ height: "30px", backgroundColor: color }}></Button></Grid>
                  ))}
                </Grid>
                {/* <Grid item>
                  <IconButton onClick={() => console.log('')}>
                    <DeleteIcon style={{ color: "grey" }} />
                  </IconButton>
                </Grid> */}
                <Grid item>
                  <IconButton onClick={() => setShoeLock(prev => !prev)}>
                    <LockIcon style={{ color: shoeLock ? "white" : "grey" }} />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid item container>
                <Grid item>
                  <IconButton onClick={() => setShowPicker(prev => !prev)}>
                    {showPicker ? <RemoveIcon style={{ color: "white" }} /> : <AddIcon style={{ color: "white" }} />}
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton onClick={() => randomizeOutfit()}>
                    <ShuffleIcon style={{ color: "white" }} />
                  </IconButton>
                </Grid>
              </Grid>
              {showPicker && (
                <Grid container flexWrap="nowrap">
                  <Grid item>
                    <div className="sketch-wrapper">
                      <SketchPicker
                        disableAlpha
                        className="sketch-zoom"
                        color={selectedColor}
                        onChangeComplete={color => handleColorChangePicker(color.hex)} />
                    </div>
                  </Grid>
                  <Grid item container direction="column">
                    <Grid item>
                      {/* <Palette handler={addColorSwatch} hatColor={hatColor} topColor={topColor} bottomColor={bottomColor} shoeColor={shoeColor} /> */}
                      <Grid item container wrap="nowrap">
                        <Grid item>
                          <Button onClick={() => addColorSwatch("hat")} style={{ height: "55px", width: "60px", borderRadius: "0%", backgroundColor: hatColor }}></Button>
                        </Grid>
                        <Grid item>
                          <IconButton onClick={() => setHatLock(prev => !prev)}>
                            <LockIcon style={{ color: hatLock ? "white" : "grey" }} />
                          </IconButton>
                        </Grid>
                      </Grid>
                      <Grid item container wrap="nowrap">
                        <Grid item>
                          <Button onClick={() => addColorSwatch("top")} style={{ height: "55px", width: "60px", borderRadius: "0%", backgroundColor: topColor }}></Button>
                        </Grid>
                        <Grid item>
                          <IconButton onClick={() => setTopLock(prev => !prev)}>
                            <LockIcon style={{ color: topLock ? "white" : "grey" }} />
                          </IconButton>
                        </Grid>
                      </Grid>
                      <Grid item container wrap="nowrap">
                        <Grid item>
                          <Button onClick={() => addColorSwatch("bottom")} style={{ height: "55px", width: "60px", borderRadius: "0%", backgroundColor: bottomColor }}></Button>
                        </Grid>
                        <Grid item>
                          <IconButton onClick={() => setBottomLock(prev => !prev)}>
                            <LockIcon style={{ color: bottomLock ? "white" : "grey" }} />
                          </IconButton>
                        </Grid>
                      </Grid>
                      <Grid item container wrap="nowrap">
                        <Grid item>
                          <Button onClick={() => addColorSwatch("shoes")} style={{ height: "55px", width: "60px", borderRadius: "0%", backgroundColor: shoeColor }}></Button>
                        </Grid>
                        <Grid item>
                          <IconButton onClick={() => setShoeLock(prev => !prev)}>
                            <LockIcon style={{ color: shoeLock ? "white" : "grey" }} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={() => randomizePalette()}>
                        <ShuffleIcon style={{ color: "white" }} />
                      </IconButton>
                    </Grid>
                    {user && heartFilled && (
                      <Grid item>
                        <IconButton onClick={() => removePalette()}>
                          <FavoriteIcon style={{ color: "white" }} />
                        </IconButton>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        )}

      </Grid>
      <div className="background-overlay"></div>
    </>
  )
}