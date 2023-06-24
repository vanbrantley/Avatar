import { observer } from "mobx-react-lite";
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import PaletteMini from './PaletteMini';

const PaletteList = observer(() => {

    const store = useContext(AppStoreContext);
    const { palettes } = store;

    return (
        <div className="container mx-auto">
            <div className="flex max-w-sm overflow-x-auto">
                {palettes.map((palette, i) => {
                    const { hatColor, topColor, bottomColor, shoeColor, id } = palette;
                    return <PaletteMini key={i} hatColor={hatColor} topColor={topColor} bottomColor={bottomColor} shoeColor={shoeColor} paletteId={id} />;
                })}
            </div>
        </div>
    );
});

export default PaletteList;