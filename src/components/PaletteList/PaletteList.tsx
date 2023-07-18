import { observer } from "mobx-react-lite";
import { useContext } from 'react';
import { AppStoreContext } from '../../context/AppStoreContext';
import PaletteMini from '../PaletteMini/PaletteMini';

const PaletteList = observer(() => {

    const store = useContext(AppStoreContext);
    const { palettes } = store;

    return (

        <>

            {(palettes.length === 0) ? (
                <div>
                    <p>Click the heart icon to save a palette</p>
                </div>
            ) : (
                <div className="w-full overflow-x-auto whitespace-no-wrap">
                    <div className="flex w-auto">
                        {palettes.map((palette, i) => {
                            const { hatColor, topColor, bottomColor, shoeColor, id } = palette;
                            return <PaletteMini key={i} hatColor={hatColor} topColor={topColor} bottomColor={bottomColor} shoeColor={shoeColor} paletteId={id} />;
                        })}
                    </div>
                </div>
            )}

        </>
    );
});

export default PaletteList;