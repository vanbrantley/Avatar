import { useUser } from '../context/AuthContext';
import { IconButton } from '@mui/material';
import { Palette } from '@/API';

import PaletteComponent from '@/components/Palette';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import dynamic from 'next/dynamic';
const SketchPicker = dynamic(
    () => import('react-color').then((mod) => mod.SketchPicker),
    { ssr: false }
);

export interface ILabMenuProps {

    hatColor: string,
    topColor: string,
    bottomColor: string,
    shoeColor: string,
    selectedColor: string,
    palettes: Palette[],
    heartFilled: boolean,

    addColorSwatch: (area: string) => void,
    handleColorChangePicker: (color: string) => void,
    randomizePalette: () => void,
    removePalette: () => Promise<void>,
    savePalette: () => Promise<void>,
    assignAreaColorsFromPalatte: (hatColor: string, topColor: string, bottomColor: string, shoeColor: string, id: string) => void,

}

export default function LabMenu(props: ILabMenuProps) {

    const { user } = useUser();

    return (
        <>
            <div className="flex flex-row">
                <div className="sketch-wrapper">
                    <SketchPicker
                        disableAlpha
                        className="sketch-zoom"
                        color={props.selectedColor}
                        onChangeComplete={(color) => props.handleColorChangePicker(color.hex)}
                    />
                </div>
                <div>
                    <PaletteComponent addColorSwatch={props.addColorSwatch} hatColor={props.hatColor} topColor={props.topColor} bottomColor={props.bottomColor} shoeColor={props.shoeColor} />
                    <IconButton onClick={() => props.randomizePalette()}>
                        <ShuffleIcon style={{ color: "white" }} />
                    </IconButton>
                    {user && props.heartFilled && (
                        <IconButton onClick={() => props.removePalette()}>
                            <FavoriteIcon style={{ color: "white" }} />
                        </IconButton>
                    )}
                    {user && !props.heartFilled && (
                        <IconButton onClick={() => props.savePalette()}>
                            <FavoriteBorderIcon style={{ color: "white" }} />
                        </IconButton>
                    )}
                </div>
            </div>
            <br></br>
            <br></br>
            {user && (
                <div className="container mx-auto">
                    <div className="flex max-w-3xl overflow-x-auto">
                        {props.palettes.map((palette, i) => {
                            const { hatColor, topColor, bottomColor, shoeColor, id } = palette;

                            return (
                                <div key={i} className="flex flex-col items-center cursor-pointer" onClick={() => props.assignAreaColorsFromPalatte(hatColor, topColor, bottomColor, shoeColor, id)}>
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

}