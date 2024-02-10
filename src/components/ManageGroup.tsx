import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { GarmentType, GarmentTypeStrings, Mode } from '@/lib/types';
import { Garment } from '@/API';

const ManageGroup = observer(() => {

    const store = useContext(AppStoreContext);
    const { userHats, userTops, userBottoms, userShoes, handleAreaChange, handleModeChange,
        selectedCategory, groupGarmentIds, deleteGroup, editGroupGarments } = store;

    const [addedGarmentIds, setAddedGarmentIds] = useState<string[]>(groupGarmentIds);
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

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

    const addGarmentId = (id: string) => {
        setAddedGarmentIds([id, ...addedGarmentIds]);
    };

    const removeGarmentId = (id: string) => {
        setAddedGarmentIds(addedGarmentIds.filter(garmentId => garmentId !== id));
    };

    const handleUpdateGroupButtonClick = () => {
        editGroupGarments(addedGarmentIds);
        handleModeChange(Mode.Closet);
    };

    const handleDeleteGroupButtonClick = () => {
        setShowDeleteDialog(true);
    };

    const handleConfirmDeleteGroupButtonClick = () => {
        deleteGroup();
        setShowDeleteDialog(false);
        handleModeChange(Mode.ListGroup);
    };

    return (
        <div className="flex flex-col h-full">

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

                        const added = addedGarmentIds.includes(garment.id);

                        return (
                            <div key={index} className="grid grid-cols-10 cursor-pointer"
                                style={{ backgroundColor: added ? "#141414" : "" }}>
                                <div className="col-span-3"
                                    style={{ height: "100px", width: "100px", backgroundColor: garment.color }}
                                    onClick={added ? () => removeGarmentId(garment.id) : () => addGarmentId(garment.id)}></div>
                                <div className="col-span-6 flex items-center"
                                    onClick={added ? () => removeGarmentId(garment.id) : () => addGarmentId(garment.id)}>
                                    <p style={{ fontFamily: "Verdana", fontWeight: "bold", fontSize: "18px" }}>{garment.name}</p>
                                </div>
                                <div className="col-span-1 flex items-center"></div>
                            </div>
                        );

                    })
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p style={{ fontFamily: "Verdana", fontSize: "24px", color: "gray" }}>
                            There are no {GarmentTypeStrings[selectedCategory]}s in your closet.
                        </p>
                    </div>
                )}

            </div>

            {/* Add little trash can next to done button which pulls up Delete Confirmation modal */}

            <button onClick={handleUpdateGroupButtonClick}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-4 rounded">
                Done
            </button>

            <br />

            {/* Delete button */}
            <button onClick={handleDeleteGroupButtonClick}
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-4 px-4 rounded">
                Delete
            </button>

            {/* Delete confirmation dialog */}
            <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
                <DialogTitle>Delete Garment</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this group?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowDeleteDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDeleteGroupButtonClick} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );

});

export default ManageGroup;