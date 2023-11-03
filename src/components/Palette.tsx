import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';

const Palette = observer(function PaletteComponent() {
    const store = useContext(AppStoreContext);
    const { hatColor, topColor, bottomColor, shoeColor, selectedArea, handleAreaChange } = store;

    return (

        <>
            <div
                className={`h-[72px] w-20 rounded-none cursor-pointer ${selectedArea === 'hat' ? 'border-2 border-white' : ''}`}
                style={{ backgroundColor: hatColor }}
                onClick={() => handleAreaChange("hat")}
            ></div>
            <div
                className={`h-[72px] w-20 rounded-none cursor-pointer ${selectedArea === 'top' ? 'border-2 border-white' : ''}`}
                style={{ backgroundColor: topColor }}
                onClick={() => handleAreaChange("top")}
            ></div>
            <div
                className={`h-[72px] w-20 rounded-none cursor-pointer ${selectedArea === 'bottom' ? 'border-2 border-white' : ''}`}
                style={{ backgroundColor: bottomColor }}
                onClick={() => handleAreaChange("bottom")}
            ></div>
            <div
                className={`h-[72px] w-20 rounded-none cursor-pointer ${selectedArea === 'shoe' ? 'border-2 border-white' : ''}`}
                style={{ backgroundColor: shoeColor }}
                onClick={() => handleAreaChange("shoe")}
            ></div>
        </>
    );

});

export default Palette;