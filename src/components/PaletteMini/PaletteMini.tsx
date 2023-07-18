import { observer } from "mobx-react-lite";
import { useContext } from 'react';
import { AppStoreContext } from '../../context/AppStoreContext';

interface IPaletteMiniProps {
    hatColor: string,
    topColor: string,
    bottomColor: string,
    shoeColor: string,
    paletteId: string
}

const PaletteMini = observer((props: IPaletteMiniProps) => {

    const store = useContext(AppStoreContext);
    const { assignAreaColorsFromPalette } = store;

    return (
        <div className="flex flex-col items-center cursor-pointer" onClick={() => assignAreaColorsFromPalette(props.hatColor, props.topColor, props.bottomColor, props.shoeColor, props.paletteId)}>
            <div className="h-10 w-10 rounded-none" style={{ backgroundColor: props.hatColor }}></div>
            <div className="h-10 w-10 rounded-none" style={{ backgroundColor: props.topColor }}></div>
            <div className="h-10 w-10 rounded-none" style={{ backgroundColor: props.bottomColor }}></div>
            <div className="h-10 w-10 rounded-none" style={{ backgroundColor: props.shoeColor }}></div>
        </div>
    );

});

export default PaletteMini;