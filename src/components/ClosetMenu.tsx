import { IconButton } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import dynamic from 'next/dynamic';
const SketchPicker = dynamic(
    () => import('react-color').then((mod) => mod.SketchPicker),
    { ssr: false }
);

const ClosetMenu = observer(() => {

    const store = useContext(AppStoreContext);
    const { hatColor, topColor, bottomColor, shoeColor,
        hatSwatches, topSwatches, bottomSwatches, shoeSwatches, selectedColor,
        hatLock, setHatLock, topLock, setTopLock, bottomLock, setBottomLock, shoeLock, setShoeLock,
        handleColorChangeSwatch, handleColorChangePicker, addColorSwatch, randomizePalette, randomizeOutfit,
        showPicker, setShowPicker,
    } = store;

    return (
        <div className="justify-center">
            <div className="flex">
                <div className="flex max-w-3xl overflow-x-auto">
                    {hatSwatches.map((color) => (
                        <div key={color} onClick={() => handleColorChangeSwatch(color, "hat")} className="w-16 h-8 rounded-md cursor-pointer" style={{ backgroundColor: color }}></div>
                    ))}
                </div>
                <div className="flex items-center">
                    <IconButton onClick={() => setHatLock(!hatLock)}>
                        <LockIcon style={{ color: hatLock ? "white" : "grey" }} />
                    </IconButton>
                </div>
            </div>
            <div className="flex">
                <div className="flex max-w-3xl overflow-x-auto">
                    {topSwatches.map((color) => (
                        <div key={color} onClick={() => handleColorChangeSwatch(color, "top")} className="w-16 h-8 rounded-md cursor-pointer" style={{ backgroundColor: color }}></div>
                    ))}
                </div>
                <div className="flex items-center">
                    <IconButton onClick={() => setTopLock(!topLock)}>
                        <LockIcon style={{ color: topLock ? "white" : "grey" }} />
                    </IconButton>
                </div>
            </div>
            <div className="flex">
                <div className="flex max-w-3xl overflow-x-auto">
                    {bottomSwatches.map((color) => (
                        <div key={color} onClick={() => handleColorChangeSwatch(color, "bottom")} className="w-16 h-8 rounded-md cursor-pointer" style={{ backgroundColor: color }}></div>
                    ))}
                </div>
                <div className="flex items-center">
                    <IconButton onClick={() => setBottomLock(!bottomLock)}>
                        <LockIcon style={{ color: bottomLock ? "white" : "grey" }} />
                    </IconButton>
                </div>
            </div>
            <div className="flex">
                <div className="flex max-w-3xl overflow-x-auto">
                    {shoeSwatches.map((color) => (
                        <div key={color} onClick={() => handleColorChangeSwatch(color, "shoes")} className="w-16 h-8 rounded-md cursor-pointer" style={{ backgroundColor: color }}></div>
                    ))}
                </div>
                <div className="flex items-center">
                    <IconButton onClick={() => setShoeLock(!shoeLock)}>
                        <LockIcon style={{ color: shoeLock ? "white" : "grey" }} />
                    </IconButton>
                </div>
            </div>

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