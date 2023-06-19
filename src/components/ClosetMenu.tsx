import { Dispatch, SetStateAction } from 'react';
import { IconButton } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShuffleIcon from '@mui/icons-material/Shuffle';

import dynamic from 'next/dynamic';
const SketchPicker = dynamic(
    () => import('react-color').then((mod) => mod.SketchPicker),
    { ssr: false }
);

export interface IClosetMenuProps {

    hatColor: string,
    topColor: string,
    bottomColor: string,
    shoeColor: string,

    hatSwatches: string[],
    topSwatches: string[],
    bottomSwatches: string[],
    shoeSwatches: string[],
    selectedColor: string,

    hatLock: boolean,
    setHatLock: Dispatch<SetStateAction<boolean>>,
    topLock: boolean,
    setTopLock: Dispatch<SetStateAction<boolean>>,
    bottomLock: boolean,
    setBottomLock: Dispatch<SetStateAction<boolean>>,
    shoeLock: boolean,
    setShoeLock: Dispatch<SetStateAction<boolean>>,
    showPicker: boolean,
    setShowPicker: Dispatch<SetStateAction<boolean>>,

    randomizeOutfit: () => void,
    randomizePalette: () => void,
    handleColorChangePicker: (color: string) => void,
    handleColorChangeSwatch: (color: string, area: string) => void,
    addColorSwatch: (area: string) => void,

}

export default function ClosetMenu(props: IClosetMenuProps) {

    return (
        <div className="justify-center">
            <div className="flex">
                <div className="flex max-w-3xl overflow-x-auto">
                    {props.hatSwatches.map((color) => (
                        <div key={color} onClick={() => props.handleColorChangeSwatch(color, "hat")} className="w-16 h-8 rounded-md cursor-pointer" style={{ backgroundColor: color }}></div>
                    ))}
                </div>
                <div className="flex items-center">
                    <IconButton onClick={() => props.setHatLock(prev => !prev)}>
                        <LockIcon style={{ color: props.hatLock ? "white" : "grey" }} />
                    </IconButton>
                </div>
            </div>
            <div className="flex">
                <div className="flex max-w-3xl overflow-x-auto">
                    {props.topSwatches.map((color) => (
                        <div key={color} onClick={() => props.handleColorChangeSwatch(color, "top")} className="w-16 h-8 rounded-md cursor-pointer" style={{ backgroundColor: color }}></div>
                    ))}
                </div>
                <div className="flex items-center">
                    <IconButton onClick={() => props.setTopLock(prev => !prev)}>
                        <LockIcon style={{ color: props.topLock ? "white" : "grey" }} />
                    </IconButton>
                </div>
            </div>
            <div className="flex">
                <div className="flex max-w-3xl overflow-x-auto">
                    {props.bottomSwatches.map((color) => (
                        <div key={color} onClick={() => props.handleColorChangeSwatch(color, "bottom")} className="w-16 h-8 rounded-md cursor-pointer" style={{ backgroundColor: color }}></div>
                    ))}
                </div>
                <div className="flex items-center">
                    <IconButton onClick={() => props.setBottomLock(prev => !prev)}>
                        <LockIcon style={{ color: props.bottomLock ? "white" : "grey" }} />
                    </IconButton>
                </div>
            </div>
            <div className="flex">
                <div className="flex max-w-3xl overflow-x-auto">
                    {props.shoeSwatches.map((color) => (
                        <div key={color} onClick={() => props.handleColorChangeSwatch(color, "shoes")} className="w-16 h-8 rounded-md cursor-pointer" style={{ backgroundColor: color }}></div>
                    ))}
                </div>
                <div className="flex items-center">
                    <IconButton onClick={() => props.setShoeLock(prev => !prev)}>
                        <LockIcon style={{ color: props.shoeLock ? "white" : "grey" }} />
                    </IconButton>
                </div>
            </div>

            <div className="flex">
                <IconButton onClick={() => props.setShowPicker(prev => !prev)}>
                    {props.showPicker ? <RemoveIcon style={{ color: "white" }} /> : <AddIcon style={{ color: "white" }} />}
                </IconButton>
                <IconButton onClick={() => props.randomizeOutfit()}>
                    <ShuffleIcon style={{ color: "white" }} />
                </IconButton>
            </div>

            {props.showPicker && (
                <>

                    <div>
                        <div className="flex">
                            <div className="sketch-wrapper">
                                <SketchPicker
                                    disableAlpha
                                    className="sketch-zoom"
                                    color={props.selectedColor}
                                    onChangeComplete={color => props.handleColorChangePicker(color.hex)}
                                />
                            </div>
                            <div className="pal+locks">
                                <div className="flex">
                                    <div onClick={() => props.addColorSwatch("hat")} className="h-14 w-16 rounded-none cursor-pointer" style={{ backgroundColor: props.hatColor }} ></div>
                                    <IconButton onClick={() => props.setHatLock(prev => !prev)}>
                                        <LockIcon style={{ color: props.hatLock ? "white" : "grey" }} />
                                    </IconButton>
                                </div>
                                <div className="flex">
                                    <div onClick={() => props.addColorSwatch("top")} className="h-14 w-16 rounded-none cursor-pointer" style={{ backgroundColor: props.topColor }} ></div>
                                    <IconButton onClick={() => props.setTopLock(prev => !prev)}>
                                        <LockIcon style={{ color: props.topLock ? "white" : "grey" }} />
                                    </IconButton>
                                </div>
                                <div className="flex">
                                    <div onClick={() => props.addColorSwatch("bottom")} className="h-14 w-16 rounded-none cursor-pointer" style={{ backgroundColor: props.bottomColor }} ></div>
                                    <IconButton onClick={() => props.setBottomLock(prev => !prev)}>
                                        <LockIcon style={{ color: props.bottomLock ? "white" : "grey" }} />
                                    </IconButton>
                                </div>
                                <div className="flex">
                                    <div onClick={() => props.addColorSwatch("shoes")} className="h-14 w-16 rounded-none cursor-pointer" style={{ backgroundColor: props.shoeColor }} ></div>
                                    <IconButton onClick={() => props.setShoeLock(prev => !prev)}>
                                        <LockIcon style={{ color: props.shoeLock ? "white" : "grey" }} />
                                    </IconButton>
                                </div>
                                <div>
                                    <IconButton onClick={() => props.randomizePalette()}>
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

}