import { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { AppStoreContext } from '../context/AppStoreContext';
import { Garment } from '@/API';
import { Mode } from '@/lib/types';

import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

enum GarmentType {
    Hat,
    Top,
    Bottom,
    Shoe
}

const Closet = observer(() => {

    const store = useContext(AppStoreContext);
    const { userHats, userTops, userBottoms, userShoes, setMode, setSelectedGarment,
        setHatColor, setTopColor, setBottomColor, setShoeColor } = store;

    const [selectedCategory, setSelectedCategory] = useState<GarmentType>(GarmentType.Top)

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
        default:
            selectedArray = [];
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

    };

    return (
        <div className="flex flex-col h-full">

            <br />
            <div className="grid grid-cols-4 gap-2">
                <div
                    className="col-span-1 flex justify-center cursor-pointer"
                    onClick={() => setSelectedCategory(GarmentType.Hat)}
                >
                    <p style={{ fontFamily: "Verdana", fontWeight: "bold", fontSize: "24px", color: selectedCategory == GarmentType.Hat ? '#d4650b' : 'white' }}>Hats</p>
                </div>
                <div
                    className="col-span-1 flex justify-center cursor-pointer"
                    onClick={() => setSelectedCategory(GarmentType.Top)}
                >
                    <p style={{ fontFamily: "Verdana", fontWeight: "bold", fontSize: "24px", color: selectedCategory == GarmentType.Top ? '#d4650b' : 'white' }}>Tops</p>

                </div>
                <div
                    className="col-span-1 flex justify-center cursor-pointer"
                    onClick={() => setSelectedCategory(GarmentType.Bottom)}
                >
                    <p style={{ fontFamily: "Verdana", fontWeight: "bold", fontSize: "24px", color: selectedCategory == GarmentType.Bottom ? '#d4650b' : 'white' }}>Bottoms</p>

                </div>
                <div
                    className="col-span-1 flex justify-center cursor-pointer"
                    onClick={() => setSelectedCategory(GarmentType.Shoe)}
                >
                    <p style={{ fontFamily: "Verdana", fontWeight: "bold", fontSize: "24px", color: selectedCategory == GarmentType.Shoe ? '#d4650b' : 'white' }}>Shoes</p>

                </div>
            </div>

            <br />
            <br />

            <div className="flex flex-col flex-grow">
                {selectedArray.map((garment, index) => (
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
                ))}
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