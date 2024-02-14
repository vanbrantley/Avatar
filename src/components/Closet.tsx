import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { AppStoreContext } from '../context/AppStoreContext';
import { Garment } from '@/API';
import { GarmentType, GarmentTypeStrings } from '@/lib/types';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import GroupDropdown from './GroupDropdown';

const Closet = observer(() => {

    const store = useContext(AppStoreContext);
    const { userHats, userTops, userBottoms, userShoes, handleAreaChange,
        selectedHat, selectedTop, selectedBottom, selectedShoe, selectedGroup,
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
        <div className="flex flex-col h-full">

            <GroupDropdown />
            <br />

            <div className="grid grid-cols-4 gap-2">
                <div
                    className="col-span-1 flex justify-center cursor-pointer"
                    onClick={() => handleAreaChange(GarmentType.Hat)}
                >
                    <p style={{
                        fontFamily: "Verdana", fontWeight: "bold", fontSize: "24px",
                        color: selectedCategory == GarmentType.Hat ? '#d4650b' : 'white'
                    }}>
                        Hats
                    </p>
                </div>
                <div
                    className="col-span-1 flex justify-center cursor-pointer"
                    onClick={() => handleAreaChange(GarmentType.Top)}
                >
                    <p style={{
                        fontFamily: "Verdana", fontWeight: "bold", fontSize: "24px",
                        color: selectedCategory == GarmentType.Top ? '#d4650b' : 'white'
                    }}>
                        Tops
                    </p>

                </div>
                <div
                    className="col-span-1 flex justify-center cursor-pointer"
                    onClick={() => handleAreaChange(GarmentType.Bottom)}
                >
                    <p style={{
                        fontFamily: "Verdana", fontWeight: "bold", fontSize: "24px",
                        color: selectedCategory == GarmentType.Bottom ? '#d4650b' : 'white'
                    }}>
                        Bottoms
                    </p>

                </div>
                <div
                    className="col-span-1 flex justify-center cursor-pointer"
                    onClick={() => handleAreaChange(GarmentType.Shoe)}
                >
                    <p style={{
                        fontFamily: "Verdana", fontWeight: "bold", fontSize: "24px",
                        color: selectedCategory == GarmentType.Shoe ? '#d4650b' : 'white'
                    }}>
                        Shoes
                    </p>

                </div>
            </div>

            <br />
            <br />

            <div className="flex flex-col flex-grow overflow-auto">

                {(selectedArray.length > 0) ? (
                    selectedArray.map((garment, index) => {

                        const selected = garment.id === selectedGarmentId;

                        return (
                            <div key={index} className="grid grid-cols-10 cursor-pointer"
                                style={{ backgroundColor: selected ? "#141414" : "" }}>
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
                        {(selectedGroup == 'all') ? (
                            <p style={{ fontFamily: "Verdana", fontSize: "24px", color: "gray" }}>
                                Click the plus button below to add a {GarmentTypeStrings[selectedCategory]} to your closet
                            </p>
                        ) : (
                            <p style={{ fontFamily: "Verdana", fontSize: "24px", color: "gray" }}>
                                There are no {GarmentTypeStrings[selectedCategory]}s in this group
                            </p>
                        )}
                    </div>
                )}

            </div>

            <div className="flex">
                <div>
                    <IconButton size="large" onClick={handlePlusButtonClick}>
                        <AddIcon fontSize="large" style={{ color: "white" }} />
                    </IconButton>
                </div>
            </div>

        </div>

    );

});

export default Closet;