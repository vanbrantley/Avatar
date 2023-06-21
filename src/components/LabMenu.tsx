import { useUser } from '../context/AuthContext';
import { IconButton } from '@mui/material';
import PaletteComponent from '@/components/Palette';
import LockIcon from '@mui/icons-material/Lock';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import dynamic from 'next/dynamic';
const SketchPicker = dynamic(
    () => import('react-color').then((mod) => mod.SketchPicker),
    { ssr: false }
);

const LabMenu = observer(() => {

    const store = useContext(AppStoreContext);
    const { hatColor, topColor, bottomColor, shoeColor,
        hatLock, setHatLock, topLock, setTopLock, bottomLock, setBottomLock, shoeLock, setShoeLock,
        selectedColor, palettes, heartFilled,
        handleColorChangePicker, randomizePalette, removePalette, savePalette,
        assignAreaColorsFromPalette, addColorSwatch } = store;

    const { user } = useUser();

    return (
        <>
            <div className="flex flex-row">
                <div className="sketch-wrapper">
                    <SketchPicker
                        disableAlpha
                        className="sketch-zoom"
                        color={selectedColor}
                        onChangeComplete={(color) => handleColorChangePicker(color.hex)}
                    />
                </div>
                <div>
                    <div>
                        {/* <PaletteComponent /> */}
                        <div className="flex">
                            <div onClick={() => addColorSwatch("hat")} className="h-14 w-16 rounded-none cursor-pointer" style={{ backgroundColor: hatColor }} ></div>
                            <IconButton onClick={() => setHatLock(!hatLock)}>
                                <LockIcon style={{ color: hatLock ? "white" : "grey" }} />
                            </IconButton>
                        </div>
                        <div className="flex">
                            <div onClick={() => addColorSwatch("top")} className="h-14 w-16 rounded-none cursor-pointer" style={{ backgroundColor: topColor }} ></div>
                            <IconButton onClick={() => setTopLock(!topLock)}>
                                <LockIcon style={{ color: topLock ? "white" : "grey" }} />
                            </IconButton>
                        </div>
                        <div className="flex">
                            <div onClick={() => addColorSwatch("bottom")} className="h-14 w-16 rounded-none cursor-pointer" style={{ backgroundColor: bottomColor }} ></div>
                            <IconButton onClick={() => setBottomLock(!bottomLock)}>
                                <LockIcon style={{ color: bottomLock ? "white" : "grey" }} />
                            </IconButton>
                        </div>
                        <div className="flex">
                            <div onClick={() => addColorSwatch("shoes")} className="h-14 w-16 rounded-none cursor-pointer" style={{ backgroundColor: shoeColor }} ></div>
                            <IconButton onClick={() => setShoeLock(!shoeLock)}>
                                <LockIcon style={{ color: shoeLock ? "white" : "grey" }} />
                            </IconButton>
                        </div>
                    </div>
                    <div className="flex flex-col float-left">
                        <IconButton onClick={() => randomizePalette()}>
                            <ShuffleIcon style={{ color: "white" }} />
                        </IconButton>
                        {user && heartFilled && (
                            <IconButton onClick={() => removePalette()}>
                                <FavoriteIcon style={{ color: "white" }} />
                            </IconButton>
                        )}
                        {user && !heartFilled && (
                            <IconButton onClick={() => savePalette()}>
                                <FavoriteBorderIcon style={{ color: "white" }} />
                            </IconButton>
                        )}
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
            {user && (
                <div className="container mx-auto">
                    <div className="flex max-w-3xl overflow-x-auto">
                        {palettes.map((palette, i) => {
                            const { hatColor, topColor, bottomColor, shoeColor, id } = palette;

                            return (
                                <div key={i} className="flex flex-col items-center cursor-pointer" onClick={() => assignAreaColorsFromPalette(hatColor, topColor, bottomColor, shoeColor, id)}>
                                    <div className="h-8 w-8 rounded-none" style={{ backgroundColor: hatColor }}></div>
                                    <div className="h-8 w-8 rounded-none" style={{ backgroundColor: topColor }}></div>
                                    <div className="h-8 w-8 rounded-none" style={{ backgroundColor: bottomColor }}></div>
                                    <div className="h-8 w-8 rounded-none" style={{ backgroundColor: shoeColor }}></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );


});

export default LabMenu;