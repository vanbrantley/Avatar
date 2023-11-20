import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { GarmentType, Mode } from '@/lib/types';

interface IAvatarProps {
    mini: boolean
}

const Avatar = observer((props: IAvatarProps) => {

    const store = useContext(AppStoreContext);

    const { faceColor, selectedHat, selectedTop, selectedBottom, selectedShoe, selectedCategory,
        handleAreaChange, colorPickerOpen, selectedColor, handleAvatarClickMobile, handleModeChange } = store;

    const sizeDictionary = {
        hat: {
            mini: {
                height: '31.625px',
                width: '50.6px',

            },
            regular: {
                height: '50px',
                width: '80px',
            },
        },
        face: {
            mini: {
                height: '37.95px',
                width: '44.275px',
            },
            regular: {
                height: '60px',
                width: '70px',
            },
        },
        top: {
            mini: {
                height: '139.15px',
                width: '101.2px',
            },
            regular: {
                height: '220px',
                width: '160px',
            },
        },
        bottom: {
            mini: {
                height: '139.15px',
                width: '101.2px',
            },
            regular: {
                height: '220px',
                width: '160px',
            },
        },
        shoe: {
            mini: {
                height: '45.54px',
                width: '139.15px',
            },
            regular: {
                height: '72px',
                width: '220px',
            },
        },
    };

    return (

        <div className="grid gap-0">
            <div
                onClick={
                    props.mini ?
                        () => handleAvatarClickMobile(GarmentType.Hat)
                        : () => handleAreaChange(GarmentType.Hat)
                }
                className="mx-auto cursor-pointer"
                style={{
                    backgroundColor:
                        colorPickerOpen && selectedCategory === GarmentType.Hat
                            ? selectedColor
                            : selectedHat.color,
                    height: props.mini ? sizeDictionary.hat.mini.height : sizeDictionary.hat.regular.height,
                    width: props.mini ? sizeDictionary.hat.mini.width : sizeDictionary.hat.regular.width,
                    borderTopLeftRadius: '60% 90%',
                    borderTopRightRadius: '60% 90%',
                    borderBottomLeftRadius: "10%",
                    borderBottomRightRadius: "10%"
                }}
            ></div>
            <div
                className="mx-auto cursor-pointer"
                onClick={() => handleModeChange(Mode.Complexion)}
                style={{
                    backgroundColor: faceColor,
                    height: props.mini ? sizeDictionary.face.mini.height : sizeDictionary.face.regular.height,
                    width: props.mini ? sizeDictionary.face.mini.width : sizeDictionary.face.regular.width,
                    borderBottomLeftRadius: '120%',
                    borderBottomRightRadius: '120%',
                }}
            ></div>
            <div
                onClick={
                    props.mini ?
                        () => handleAvatarClickMobile(GarmentType.Top)
                        : () => handleAreaChange(GarmentType.Top)
                }
                className="mx-auto cursor-pointer"
                style={{
                    backgroundColor:
                        colorPickerOpen && selectedCategory === GarmentType.Top
                            ? selectedColor
                            : selectedTop.color,
                    height: props.mini ? sizeDictionary.top.mini.height : sizeDictionary.top.regular.height,
                    width: props.mini ? sizeDictionary.top.mini.width : sizeDictionary.top.regular.width,
                    borderTopLeftRadius: '30%',
                    borderTopRightRadius: '30%',
                }}
            ></div>


            <div
                onClick={
                    props.mini ?
                        () => handleAvatarClickMobile(GarmentType.Bottom)
                        : () => handleAreaChange(GarmentType.Bottom)
                }
                className="mx-auto cursor-pointer"
                style={{
                    backgroundColor:
                        colorPickerOpen && selectedCategory === GarmentType.Bottom
                            ? selectedColor
                            : selectedBottom.color,
                    height: props.mini ? sizeDictionary.bottom.mini.height : sizeDictionary.bottom.regular.height,
                    width: props.mini ? sizeDictionary.bottom.mini.width : sizeDictionary.bottom.regular.width,
                }}
            ></div>
            <div
                onClick={
                    props.mini ?
                        () => handleAvatarClickMobile(GarmentType.Shoe)
                        : () => handleAreaChange(GarmentType.Shoe)
                }
                className="mx-auto rounded-full cursor-pointer"
                style={{
                    backgroundColor:
                        colorPickerOpen && selectedCategory === GarmentType.Shoe
                            ? selectedColor
                            : selectedShoe.color,
                    height: props.mini ? sizeDictionary.shoe.mini.height : sizeDictionary.shoe.regular.height,
                    width: props.mini ? sizeDictionary.shoe.mini.width : sizeDictionary.shoe.regular.width,
                }}
            ></div>
        </div>

    );
});

export default Avatar;