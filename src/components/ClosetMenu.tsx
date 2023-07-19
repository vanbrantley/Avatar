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
    const { selectedColor, handleColorChangePicker,
        randomizePalette, randomizeOutfit,
        showPicker, setShowPicker } = store;

    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full h-2/5 flex flex-col justify-center">

                <SwatchesMenu />

                <div className="flex">
                    <IconButton size="large" onClick={() => setShowPicker(!showPicker)}>
                        {showPicker ? <RemoveIcon fontSize="large" style={{ color: "white" }} /> : <AddIcon fontSize="large" style={{ color: "white" }} />}
                    </IconButton>
                    <IconButton size="large" onClick={() => randomizeOutfit()}>
                        <ShuffleIcon fontSize="large" style={{ color: "white" }} />
                    </IconButton>
                </div>
            </div >

            < div className="w-full h-3/5 flex items-center" >

                {showPicker && (

                    <div className="flex">
                        <div className="sketch-wrapper">
                            <SketchPicker
                                disableAlpha
                                color={selectedColor}
                                onChangeComplete={color => handleColorChangePicker(color.hex)}
                            />
                        </div>
                        <div>
                            <Palette lock={true} />
                            <div>
                                <IconButton size="large" onClick={() => randomizePalette()}>
                                    <ShuffleIcon fontSize="large" style={{ color: "white" }} />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                )}
            </div >

        </div >
    );


});

export default ClosetMenu;