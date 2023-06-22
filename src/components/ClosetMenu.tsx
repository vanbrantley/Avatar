import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import dynamic from 'next/dynamic';
import Palette from './Palette';
import SwatchesMenu from './SwatchesMenu';
const SketchPicker = dynamic(
    () => import('react-color').then((mod) => mod.SketchPicker),
    { ssr: false }
);

const ClosetMenu = observer(() => {

    const store = useContext(AppStoreContext);
    const { selectedColor, handleColorChangePicker, randomizePalette, randomizeOutfit, showPicker, setShowPicker } = store;

    return (
        <div className="justify-center">

            <SwatchesMenu />

            <div className="flex">
                <IconButton onClick={() => setShowPicker(!showPicker)}>
                    {showPicker ? <RemoveIcon style={{ color: "white" }} /> : <AddIcon style={{ color: "white" }} />}
                </IconButton>
                <IconButton onClick={() => randomizeOutfit()}>
                    <ShuffleIcon style={{ color: "white" }} />
                </IconButton>
            </div>

            {showPicker && (
                <>

                    <div>
                        <div className="flex">
                            <div className="sketch-wrapper">
                                <SketchPicker
                                    disableAlpha
                                    className="sketch-zoom"
                                    color={selectedColor}
                                    onChangeComplete={color => handleColorChangePicker(color.hex)}
                                />
                            </div>
                            <div className="pal+locks">
                                <Palette lock={true} />
                                <div>
                                    <IconButton onClick={() => randomizePalette()}>
                                        <ShuffleIcon style={{ color: "white" }} />
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );


});

export default ClosetMenu;