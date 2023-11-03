import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { GarmentType } from '@/lib/types';

const Palette = observer(function PaletteComponent() {
    const store = useContext(AppStoreContext);
    const { hatColor, topColor, bottomColor, shoeColor, selectedCategory, handleAreaChange } = store;

    return (

        <>
            <div
                className={`h-[72px] w-20 rounded-none cursor-pointer ${selectedCategory === GarmentType.Hat ? 'border-2 border-white' : ''}`}
                style={{ backgroundColor: hatColor }}
                onClick={() => handleAreaChange(GarmentType.Hat)}
            ></div>
            <div
                className={`h-[72px] w-20 rounded-none cursor-pointer ${selectedCategory === GarmentType.Top ? 'border-2 border-white' : ''}`}
                style={{ backgroundColor: topColor }}
                onClick={() => handleAreaChange(GarmentType.Top)}
            ></div>
            <div
                className={`h-[72px] w-20 rounded-none cursor-pointer ${selectedCategory === GarmentType.Bottom ? 'border-2 border-white' : ''}`}
                style={{ backgroundColor: bottomColor }}
                onClick={() => handleAreaChange(GarmentType.Bottom)}
            ></div>
            <div
                className={`h-[72px] w-20 rounded-none cursor-pointer ${selectedCategory === GarmentType.Shoe ? 'border-2 border-white' : ''}`}
                style={{ backgroundColor: shoeColor }}
                onClick={() => handleAreaChange(GarmentType.Shoe)}
            ></div>
        </>
    );

});

export default Palette;