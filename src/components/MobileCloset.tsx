import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { AppStoreContext } from '../context/AppStoreContext';
import { Garment } from '@/API';
import { GarmentType, GarmentTypeStrings } from '@/lib/types';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import GroupDropdown from './GroupDropdown';

const MobileCloset = observer(() => {

    const store = useContext(AppStoreContext);
    const { userHats, userTops, userBottoms, userShoes, handleAreaChange,
        selectedHat, selectedTop, selectedBottom, selectedShoe,
        selectedCategory, handlePlusButtonClick, handleGarmentClick, openGarmentDetails } = store;

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

    return (
        <div className="flex flex-col h-full w-full">
            <GroupDropdown />

            <div className="flex flex-wrap justify-center">
                <div
                    className="flex justify-center cursor-pointer p-2"
                    onClick={() => handleAreaChange(GarmentType.Hat)}
                >
                    <p style={{ fontFamily: "Verdana" }}
                        className={`text-lg ${selectedCategory === GarmentType.Hat ? 'text-orange-500' : 'text-white'}`}>Hats</p>
                </div>
                <div
                    className="flex justify-center cursor-pointer p-2"
                    onClick={() => handleAreaChange(GarmentType.Top)}
                >
                    <p style={{ fontFamily: "Verdana" }}
                        className={`text-lg ${selectedCategory === GarmentType.Top ? 'text-orange-500' : 'text-white'}`}>Tops</p>
                </div>
                <div
                    className="flex justify-center cursor-pointer p-2"
                    onClick={() => handleAreaChange(GarmentType.Bottom)}
                >
                    <p style={{ fontFamily: "Verdana" }}
                        className={`text-lg ${selectedCategory === GarmentType.Bottom ? 'text-orange-500' : 'text-white'}`}>Bottoms</p>
                </div>
                <div
                    className="flex justify-center cursor-pointer p-2"
                    onClick={() => handleAreaChange(GarmentType.Shoe)}
                >
                    <p style={{ fontFamily: "Verdana" }}
                        className={`text-lg ${selectedCategory === GarmentType.Shoe ? 'text-orange-500' : 'text-white'}`}>Shoes</p>
                </div>
            </div>

            <div className="flex flex-col flex-grow">
                {(selectedArray.length > 0) ? (
                    selectedArray.map((garment, index) => {

                        const selected = garment.id === selectedGarmentId;

                        return (
                            <div key={index} className="grid grid-cols-10 cursor-pointer"
                                style={{ height: "100px", backgroundColor: garment.color, border: selected ? "#d4650b solid 4px" : "" }}>
                                <div className="col-span-1"></div>
                                <div className="col-span-7 flex items-center"
                                    onClick={() => handleGarmentClick(garment)}>
                                    <p style={{ fontFamily: "Verdana", fontWeight: "bold", fontSize: "18px" }}>{garment.name}</p>
                                </div>
                                <div className="col-span-2 flex items-center">
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

            <div className="flex justify-end">
                <div className="p-4">
                    <IconButton size="large" onClick={handlePlusButtonClick}>
                        <AddIcon fontSize="large" style={{ color: 'white' }} />
                    </IconButton>
                </div>
            </div>
        </div>
    );


});

export default MobileCloset;