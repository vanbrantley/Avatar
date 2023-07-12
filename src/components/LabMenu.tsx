import { useUser } from '../context/AuthContext';
import { IconButton } from '@mui/material';
import Palette from '@/components/Palette';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { observer } from 'mobx-react-lite';
import { useState, useContext } from 'react';
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
        handleColorChangePicker, randomizePalette,
        removePalette, savePalette, layout
    } = store;

    const { user } = useUser();

    const [messageVisible, setMessageVisible] = useState(false);

    const showMessage = () => {
        setMessageVisible(true);
        setTimeout(() => {
            setMessageVisible(false);
        }, 6000);
    };

    return (
        <>

            <div className="w-full h-full flex flex-col">
                <div className="w-full h-1/2 flex items-center justify-center">
                    <div className={`${(layout === 'mobile') ? "" : "sketch-wrapper"}`}>
                        <SketchPicker
                            disableAlpha
                            color={selectedColor}
                            onChangeComplete={(color) => handleColorChangePicker(color.hex)}
                        />
                    </div>
                    <div>
                        <div>
                            <Palette lock={true} />
                        </div>
                        <div className="float-left">
                            <IconButton size="large" onClick={() => randomizePalette()}>
                                <ShuffleIcon fontSize="large" style={{ color: "white" }} />
                            </IconButton>
                            {user && heartFilled && (
                                <IconButton size="large" onClick={() => removePalette()}>
                                    <FavoriteIcon fontSize="large" style={{ color: "white" }} />
                                </IconButton>
                            )}
                            {!heartFilled && (
                                <IconButton size="large" onClick={user ? () => savePalette() : showMessage}>
                                    <FavoriteBorderIcon fontSize="large" style={{ color: "white" }} />
                                </IconButton>
                            )}

                        </div>
                    </div>
                </div>
                <div className="w-full h-1/2 flex items-center justify-center">
                    {messageVisible && <p>You must be signed in to save a palette</p>}
                    {user && <PaletteList />}
                </div>
            </div>

        </>
    );


});

export default LabMenu;