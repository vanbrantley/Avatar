import { observer } from 'mobx-react-lite';
import { useEffect, useContext, useState } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { useUser } from '../context/AuthContext';

import { Mode, GarmentType, GarmentTypeStrings } from '../lib/types';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import dynamic from 'next/dynamic';
const SketchPicker = dynamic(
    () => import('react-color').then((mod) => mod.SketchPicker),
    { ssr: false }
);
const ChromePicker = dynamic(
    () => import('react-color').then((mod) => mod.ChromePicker),
    { ssr: false }
);

interface IAddGarmentProps {
    mobile: boolean
}

const AddGarment = observer((props: IAddGarmentProps) => {

    const { mobile } = props;

    const { user } = useUser();
    const store = useContext(AppStoreContext);
    const { selectedColor, handleColorChangePicker, selectedCategory, handleAreaChange,
        addGarmentToDB, addGarmentLocal, handleModeChange, handleBackButtonClick, setColorPickerOpen } = store;

    const [brand, setBrand] = useState<string | undefined>(undefined);
    const [name, setName] = useState<string>(`${selectedColor}${brand ? ` ${brand}` : ''} ${GarmentTypeStrings[selectedCategory]}`);
    const [dynamicName, setDynamicName] = useState<boolean>(true);

    useEffect(() => {
        if (dynamicName) setName(`${selectedColor}${brand ? ` ${brand}` : ''} ${GarmentTypeStrings[selectedCategory]}`);
    }, [selectedColor, brand, selectedCategory, dynamicName]);

    const handleAreaChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {

        const area = event.target.value;
        let category: GarmentType;

        switch (area) {
            case GarmentTypeStrings[GarmentType.Hat]:
                category = GarmentType.Hat;
                handleAreaChange(category);
                break;
            case GarmentTypeStrings[GarmentType.Top]:
                category = GarmentType.Top;
                handleAreaChange(category);
                break;
            case GarmentTypeStrings[GarmentType.Bottom]:
                category = GarmentType.Bottom;
                handleAreaChange(category);
                break;
            case GarmentTypeStrings[GarmentType.Shoe]:
                category = GarmentType.Shoe;
                handleAreaChange(category);
                break;
            default:
                throw new Error(`Unexpected area value: ${area}`);
        }

    };

    const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBrand(e.target.value);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setName(newName);
        setDynamicName(newName === '' || newName === `${selectedColor}${brand ? ` ${brand}` : ''} ${GarmentTypeStrings[selectedCategory]}`);
    };

    const handleAddGarmentButtonClick = () => {

        if (user) addGarmentToDB(selectedCategory, selectedColor, brand, name);
        else addGarmentLocal(selectedCategory, selectedColor, brand, name);
        handleModeChange(Mode.Closet);
        setColorPickerOpen(false);
    };

    return (
        <div className="flex flex-col">

            <div>
                <IconButton size="large" onClick={handleBackButtonClick}>
                    <ArrowBackIcon fontSize="large" style={{ color: "white" }} />
                </IconButton>
            </div>

            {/* Area Dropdown */}
            <p style={{ fontFamily: "Verdana" }}>Area: </p>
            <select value={GarmentTypeStrings[selectedCategory]} onChange={handleAreaChangeSelect}>
                <option value={GarmentTypeStrings[GarmentType.Hat]}>Hat</option>
                <option value={GarmentTypeStrings[GarmentType.Top]}>Top</option>
                <option value={GarmentTypeStrings[GarmentType.Bottom]}>Bottom</option>
                <option value={GarmentTypeStrings[GarmentType.Shoe]}>Shoe</option>
            </select>
            <br></br>

            {/* Sketch picker */}

            <p style={{ fontFamily: "Verdana" }}>Color: </p>

            <div className="flex">

                {mobile ? (
                    <ChromePicker
                        disableAlpha
                        color={selectedColor}
                        onChangeComplete={color => handleColorChangePicker(color.hex)}
                    />
                ) : (
                    <SketchPicker
                        disableAlpha
                        color={selectedColor}
                        onChangeComplete={color => handleColorChangePicker(color.hex)}
                    />
                )}

                <div style={{ height: mobile ? "100px" : "150px", width: mobile ? "100px" : "150px", backgroundColor: selectedColor, marginLeft: "30px" }}></div>

            </div>

            <br />

            {/* Brand Input */}
            <div className="flex">
                <p style={{ fontFamily: "Verdana", marginRight: '10px' }}>Brand: </p>

                <input
                    type="text"
                    value={brand || ''}
                    onChange={handleBrandChange}
                    placeholder=""
                    style={{ color: 'black', paddingLeft: '5px' }}
                />
            </div>

            <br />
            {/* Name Input */}
            <div className="flex">
                <p style={{ fontFamily: "Verdana", marginRight: '10px' }}>Name: </p>

                <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    style={{ color: 'black', paddingLeft: '5px' }}
                />
            </div>

            <br />

            {/* Add button */}
            <button onClick={handleAddGarmentButtonClick} className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-4 rounded">Add</button>

        </div>
    );

});

export default AddGarment;