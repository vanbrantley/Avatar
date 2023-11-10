import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { GarmentType } from '@/lib/types';

const Palette = observer(function PaletteComponent() {

    const store = useContext(AppStoreContext);
    const { selectedHat, selectedTop, selectedBottom, selectedShoe,
        selectedCategory, handleAreaChange, colorPickerOpen, selectedColor } = store;

    return (

        <>
            <div
                className={`h-[72px] w-20 rounded-none cursor-pointer ${selectedCategory === GarmentType.Hat ? 'border-2 border-white' : ''}`}
                style={{
                    backgroundColor:
                        colorPickerOpen && selectedCategory === GarmentType.Hat
                            ? selectedColor
                            : selectedHat.color
                }}
                onClick={() => handleAreaChange(GarmentType.Hat)}
            ></div>
            <div
                className={`h-[72px] w-20 rounded-none cursor-pointer ${selectedCategory === GarmentType.Top ? 'border-2 border-white' : ''}`}
                style={{
                    backgroundColor:
                        colorPickerOpen && selectedCategory === GarmentType.Top
                            ? selectedColor
                            : selectedTop.color
                }}
                onClick={() => handleAreaChange(GarmentType.Top)}
            ></div>
            <div
                className={`h-[72px] w-20 rounded-none cursor-pointer ${selectedCategory === GarmentType.Bottom ? 'border-2 border-white' : ''}`}
                style={{
                    backgroundColor:
                        colorPickerOpen && selectedCategory === GarmentType.Bottom
                            ? selectedColor
                            : selectedBottom.color
                }}
                onClick={() => handleAreaChange(GarmentType.Bottom)}
            ></div>
            <div
                className={`h-[72px] w-20 rounded-none cursor-pointer ${selectedCategory === GarmentType.Shoe ? 'border-2 border-white' : ''}`}
                style={{
                    backgroundColor:
                        colorPickerOpen && selectedCategory === GarmentType.Shoe
                            ? selectedColor
                            : selectedShoe.color
                }}
                onClick={() => handleAreaChange(GarmentType.Shoe)}
            ></div>
        </>
    );

});

export default Palette;