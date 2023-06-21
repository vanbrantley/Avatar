import { useUser } from '../context/AuthContext';
import { IconButton } from '@mui/material';
import PaletteComponent from '@/components/Palette';
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
    const { selectedColor, palettes, heartFilled,
        handleColorChangePicker, randomizePalette, removePalette, savePalette,
        assignAreaColorsFromPalette } = store;

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
                        <PaletteComponent lock={true} />
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