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
        setHatColor, setTopColor, setBottomColor, setShoeColor, selectedCategory, setSelectedColor } = store;

    let selectedArray: Garment[] = [];

    switch (selectedCategory) {
        case GarmentType.Hat:
            selectedArray = userHats;
            break;
        case GarmentType.Top:
            selectedArray = userTops;
            break;
        case GarmentType.Bottom:
            selectedArray = userBottoms;
            break;
        case GarmentType.Shoe:
            selectedArray = userShoes;
            break;
    };

    const openGarmentDetails = (garment: Garment) => {

        // set selectedGarment
        setSelectedGarment(garment);

        // change mode to Details
        setMode(Mode.Details);

    };

    const handleGarmentClick = (garment: Garment) => {

        const { area, color } = garment;

        // switch based on garment's area
        // set that area's color to the garment's color

        // setSelectedColor

        switch (area) {

            case "hat":
                setHatColor(color);
                break;
            case "top":
                setTopColor(color);
                break;
            case "bottom":
                setBottomColor(color);
                break;
            case "shoe":
                setShoeColor(color);
                break;
            default:
                break;
        }

        setSelectedColor(color);

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
                    selectedArray.map((garment, index) => (
                        <div key={index} className="grid grid-cols-10 cursor-pointer">
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
                    ))
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
                    <IconButton size="large" onClick={() => setMode(Mode.Add)}>
                        <AddIcon fontSize="large" style={{ color: "white" }} />
                    </IconButton>
                </div>
            </div>

        </div>

    );

});

export default Closet;