import { useUser } from '../context/AuthContext';
import { IconButton } from '@mui/material';
import Palette from '@/components/Palette';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import PaletteList from './PaletteList';
import dynamic from 'next/dynamic';
const SketchPicker = dynamic(
    () => import('react-color').then((mod) => mod.SketchPicker),
    { ssr: false }
);

const LabMenu = observer(() => {

    const store = useContext(AppStoreContext);
    const { selectedColor, heartFilled,
        handleColorChangePicker, randomizePalette, removePalette, savePalette
    } = store;

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
                        <Palette lock={true} />
                    </div>
                    <div className="flex flex-col float-left">
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
                        <IconButton onClick={() => randomizePalette()}>
                            <ShuffleIcon style={{ color: "white" }} />
                        </IconButton>
                    </div>
                </div>
            </div>

            <br></br>
            <br></br>
            {user && <PaletteList />}

        </>
    );


});

export default LabMenu;