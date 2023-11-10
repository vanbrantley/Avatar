import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { AppStoreContext } from '../context/AppStoreContext';
import { Garment } from '@/API';
import { Mode } from '@/lib/types';
import { GarmentType, GarmentTypeStrings } from '@/lib/types';

import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const Closet = observer(() => {

    const store = useContext(AppStoreContext);
    const { userHats, userTops, userBottoms, userShoes, setMode, setSelectedGarment, handleAreaChange,
        selectedHat, selectedTop, selectedBottom, selectedShoe, setSelectedHat, setSelectedTop, setSelectedBottom, setSelectedShoe,
        setHatColor, setTopColor, setBottomColor, setShoeColor, selectedCategory, setSelectedColor, setColorPickerOpen } = store;

    // const selectedHat = "0f8a13e1-3771-4fcf-95d4-434502512c70";
    // const selectedTop = "caf6842b-6fec-4b11-9778-f84496712170";
    // const selectedBottom = "6db99140-7f9f-4001-8880-b50233f3e1ec";
    // const selectedShoe = "027f95ae-44ec-4598-991f-8988c2234d74";

    let selectedArray: Garment[] = [];
    let selectedGarmentId = "";

    switch (selectedCategory) {
        case GarmentType.Hat:
            selectedArray = userHats;
            selectedGarmentId = selectedHat.id;
            break;
        case GarmentType.Top:
            selectedArray = userTops;
            selectedGarmentId = selectedTop.id;
            break;
        case GarmentType.Bottom:
            selectedArray = userBottoms;
            selectedGarmentId = selectedBottom.id;
            break;
        case GarmentType.Shoe:
            selectedArray = userShoes;
            selectedGarmentId = selectedShoe.id;
            break;
    };

    const openGarmentDetails = (garment: Garment) => {

        // set garment to its area's selected garment
        switch (garment.area) {

            case "hat":
                setSelectedHat(garment);
                break;
            case "top":
                setSelectedTop(garment);
                break;
            case "bottom":
                setSelectedBottom(garment);
                break;
            case "shoe":
                setSelectedShoe(garment);
                break;
            default:
                break;
        }

        // set selectedGarment
        setSelectedGarment(garment);

        // change mode to Details
        setMode(Mode.Details);
        setColorPickerOpen(true);

    };

    const handleGarmentClick = (garment: Garment) => {

        const { area, color } = garment;

        // switch based on garment's area

        switch (area) {

            case "hat":
                // setHatColor(color);
                setSelectedHat(garment);
                break;
            case "top":
                // setTopColor(color);
                setSelectedTop(garment);
                break;
            case "bottom":
                // setBottomColor(color);
                setSelectedBottom(garment);
                break;
            case "shoe":
                // setShoeColor(color);
                setSelectedShoe(garment);
                break;
            default:
                break;
        }

        setSelectedColor(color);

    };

    const handlePlusClick = () => {
        setMode(Mode.Add);
        setColorPickerOpen(true);
    };

    return (
        <div className="flex flex-col h-full">

            <br />
            <div className="grid grid-cols-4 gap-2">
                <div
                    className="col-span-1 flex justify-center cursor-pointer"
                    onClick={() => handleAreaChange(GarmentType.Hat)}
                >
                    <p style={{ fontFamily: "Verdana", fontWeight: "bold", fontSize: "24px", color: selectedCategory == GarmentType.Hat ? '#d4650b' : 'white' }}>Hats</p>
                </div>
                <div
                    className="col-span-1 flex justify-center cursor-pointer"
                    onClick={() => handleAreaChange(GarmentType.Top)}
                >
                    <p style={{ fontFamily: "Verdana", fontWeight: "bold", fontSize: "24px", color: selectedCategory == GarmentType.Top ? '#d4650b' : 'white' }}>Tops</p>

                </div>
                <div
                    className="col-span-1 flex justify-center cursor-pointer"
                    onClick={() => handleAreaChange(GarmentType.Bottom)}
                >
                    <p style={{ fontFamily: "Verdana", fontWeight: "bold", fontSize: "24px", color: selectedCategory == GarmentType.Bottom ? '#d4650b' : 'white' }}>Bottoms</p>

                </div>
                <div
                    className="col-span-1 flex justify-center cursor-pointer"
                    onClick={() => handleAreaChange(GarmentType.Shoe)}
                >
                    <p style={{ fontFamily: "Verdana", fontWeight: "bold", fontSize: "24px", color: selectedCategory == GarmentType.Shoe ? '#d4650b' : 'white' }}>Shoes</p>

                </div>
            </div>

            <br />
            <br />

            <div className="flex flex-col flex-grow">

                {(selectedArray.length > 0) ? (
                    selectedArray.map((garment, index) => {

                        const selected = garment.id === selectedGarmentId;

                        return (
                            <div key={index} className="grid grid-cols-10 cursor-pointer" style={{ backgroundColor: selected ? "#141414" : "" }}>
                                <div className="col-span-3"
                                    style={{ height: "100px", width: "100px", backgroundColor: garment.color }}
                                    onClick={() => handleGarmentClick(garment)}></div>
                                <div className="col-span-6 flex items-center"
                                    onClick={() => handleGarmentClick(garment)}>
                                    <p style={{ fontFamily: "Verdana", fontWeight: "bold", fontSize: "18px" }}>{garment.name}</p>
                                </div>
                                <div className="col-span-1 flex items-center">
                                    <IconButton size="large" onClick={() => openGarmentDetails(garment)}>
                                        <EditIcon fontSize="large" style={{ color: "#484848" }} />
                                    </IconButton>
                                </div>
                            </div>
                        );

                    })
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p style={{ fontFamily: "Verdana", fontSize: "24px", color: "gray" }}>
                            Click the plus button below to add a {GarmentTypeStrings[selectedCategory]} to your closet.
                        </p>
                    </div>
                )}

            </div>

            <div className="flex">
                <div>
                    <IconButton size="large" onClick={handlePlusClick}>
                        <AddIcon fontSize="large" style={{ color: "white" }} />
                    </IconButton>
                </div>
            </div>

        </div>

    );

});

export default Closet;