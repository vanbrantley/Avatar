import { observer } from "mobx-react-lite";
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';

const PaletteList = observer(() => {

    const store = useContext(AppStoreContext);
    const { palettes, assignAreaColorsFromPalette } = store;

    return (
        <div className="container mx-auto">
            <div className="flex max-w-xs overflow-x-auto">
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
    );
});

export default PaletteList;