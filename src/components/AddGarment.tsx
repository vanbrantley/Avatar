import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { Mode } from '../lib/types';

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

    const [brand, setBrand] = useState<string>("");
    const [name, setName] = useState<string>("");

    const store = useContext(AppStoreContext);
    const { selectedColor, handleColorChangePicker, selectedArea, handleAreaChange, addGarmentToDB, handleModeChange, setMode } = store;

    const handleAreaChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        handleAreaChange(event.target.value);
    };

    const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBrand(e.target.value);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleAddGarmentButtonClick = () => {
        addGarmentToDB(selectedArea, selectedColor, brand, name);
        handleModeChange(Mode.Preview);
    };

    return (
        <div className="flex flex-col">

            <div>
                <IconButton size="large" onClick={() => setMode(Mode.Closet)}>
                    <ArrowBackIcon fontSize="large" style={{ color: "white" }} />
                </IconButton>
            </div>

            {/* <p style={{ fontFamily: "Verdana" }}>Add a new garment</p> */}

            {/* Area Dropdown */}
            <p style={{ fontFamily: "Verdana" }}>Area: </p>
            <select value={selectedArea} onChange={handleAreaChangeSelect}>
                <option value="hat">Hat</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="shoe">Shoe</option>
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
                    value={brand}
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
                    placeholder=""
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