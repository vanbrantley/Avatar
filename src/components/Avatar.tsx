import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { GarmentType } from '@/lib/types';

interface IAvatarProps {
    mini: boolean
}

const Avatar = observer((props: IAvatarProps) => {

    const store = useContext(AppStoreContext);

    const { faceColor, selectedHat, selectedTop, selectedBottom, selectedShoe, selectedCategory,
        handleAreaChange, colorPickerOpen, selectedColor } = store;

    return (

        <div className="grid gap-0">
            <div
                onClick={() => handleAreaChange(GarmentType.Hat)}
                className={`${props.mini ? 'h-[25px] w-10' : 'h-[50px] w-20'} mx-auto cursor-pointer`}
                style={{
                    backgroundColor:
                        colorPickerOpen && selectedCategory === GarmentType.Hat
                            ? selectedColor
                            : selectedHat.color,
                    borderTopLeftRadius: '60% 90%',
                    borderTopRightRadius: '60% 90%',
                    borderBottomLeftRadius: "10%",
                    borderBottomRightRadius: "10%"
                }}
            ></div>
            <div
                className={`${props.mini ? 'h-[30px] w-[35px]' : 'h-[60px] w-[70px]'} mx-auto`}
                style={{
                    backgroundColor: faceColor,
                    borderBottomLeftRadius: '120%',
                    borderBottomRightRadius: '120%',
                }}
            ></div>
            <div
                onClick={() => handleAreaChange(GarmentType.Top)}
                className={`${props.mini ? 'h-[110px] w-20' : 'h-[220px] w-40'} mx-auto cursor-pointer`}
                style={{
                    backgroundColor:
                        colorPickerOpen && selectedCategory === GarmentType.Top
                            ? selectedColor
                            : selectedTop.color,
                    borderTopLeftRadius: '30%',
                    borderTopRightRadius: '30%',
                }}
            ></div>


            <div
                onClick={() => handleAreaChange(GarmentType.Bottom)}
                className={`${props.mini ? 'h-[110px] w-20' : 'h-[220px] w-40'} mx-auto cursor-pointer`}
                style={{
                    backgroundColor:
                        colorPickerOpen && selectedCategory === GarmentType.Bottom
                            ? selectedColor
                            : selectedBottom.color
                }}
            ></div>
            <div
                onClick={() => handleAreaChange(GarmentType.Shoe)}
                className={`${props.mini ? 'h-[36px] w-[110px]' : 'h-[72px] w-[220px]'} mx-auto rounded-full cursor-pointer`}
                style={{
                    backgroundColor:
                        colorPickerOpen && selectedCategory === GarmentType.Shoe
                            ? selectedColor
                            : selectedShoe.color
                }}
            ></div>
        </div>

    );
});

export default Avatar;