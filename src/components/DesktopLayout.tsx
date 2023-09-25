import Palette from './Palette';
import PaletteList from './PaletteList';
import Avatar from './Avatar';
import ClosetFull from './ClosetFull';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { useUser } from '../context/AuthContext';
import { AppStoreContext } from '../context/AppStoreContext';
import Header from './Header';
import SwatchesMenu from './SwatchesMenu';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import dynamic from 'next/dynamic';
const SketchPicker = dynamic(
    () => import('react-color').then((mod) => mod.SketchPicker),
    { ssr: false }
);

const DesktopLayout = observer(() => {

    const { user } = useUser();
    const store = useContext(AppStoreContext);
    const { mode, selectedColor, heartFilled, handleColorChangePicker, randomizePalette, removePalette, savePalette } = store;

    return (

        <div className="h-screen flex flex-col">
            <Header />
            <div className="flex-grow flex overflow-y-auto">
                <div className="grid grid-cols-12 w-full h-full">
                    <div className="md:block col-span-1 grid gap-0">
                        <br></br>
                        <br></br>
                        <Palette lock={false} />
                    </div>
                    <div className="col-start-2 col-span-6 flex items-center justify-center">
                        <Avatar mini={false} />
                    </div>
                    <div className="col-span-5 overflow-auto flex flex-col justify-center p-16" style={{ backgroundColor: "#2b2b2b" }}>

                        {(mode === "closet-full") ? (
                            <ClosetFull />
                        )
                            : (
                                <div className="w-full h-full flex flex-col">

                                    <div className="w-full h-3/5 flex flex-col items-center justify-center">

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
                                                    {user && heartFilled && (
                                                        <IconButton size="large" onClick={() => removePalette()}>
                                                            <FavoriteIcon fontSize="large" style={{ color: "white" }} />
                                                        </IconButton>
                                                    )}
                                                    {!heartFilled && (
                                                        <IconButton size="large" onClick={user ? () => savePalette() : () => console.log("")}>
                                                            <FavoriteBorderIcon fontSize="large" style={{ color: "white" }} />
                                                        </IconButton>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="w-full h-2/5 flex flex-col justify-center">

                                        {(mode === "lab") ? (
                                            user && <PaletteList />
                                        ) : <SwatchesMenu />}


                                    </div>

                                </div>
                            )
                        }

                    </div>
                </div>
            </div>
        </div>

    );
});

export default DesktopLayout;