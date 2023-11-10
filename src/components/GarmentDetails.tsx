import { observer } from 'mobx-react-lite';
import { useContext, useState, useEffect } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { Mode } from '../lib/types';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

import dynamic from 'next/dynamic';
const SketchPicker = dynamic(
    () => import('react-color').then((mod) => mod.SketchPicker),
    { ssr: false }
);

const GarmentDetails = observer(() => {

    const store = useContext(AppStoreContext);
    const { setMode, selectedGarment, selectedColor, setSelectedColor, handleColorChangePicker,
        handleModeChange, updateGarmentToDB, removeGarment, setColorPickerOpen } = store;

    const [brand, setBrand] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [hasChanges, setHasChanges] = useState<boolean>(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

    const [diffColor, setDiffColor] = useState<boolean>(false);

    useEffect(() => {

        if (selectedGarment) {
            setSelectedColor(selectedGarment.color);
            setBrand(selectedGarment.brand);
            setName(selectedGarment.name);
        }

    }, [selectedGarment]);

    const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBrand(e.target.value);

        if (selectedGarment) {
            const { color: originalColor, brand: originalBrand, name: originalName } = selectedGarment;
            setHasChanges(
                e.target.value !== originalBrand ||
                name !== originalName ||
                selectedColor !== originalColor
            );
        }

    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);

        if (selectedGarment) {
            const { color: originalColor, brand: originalBrand, name: originalName } = selectedGarment;
            setHasChanges(
                brand !== originalBrand ||
                e.target.value !== originalName ||
                selectedColor !== originalColor
            );
        }
    };

    const handleColorPickerChange = (color: string) => {
        handleColorChangePicker(color);

        if (selectedGarment) {
            const { color: originalColor, brand: originalBrand, name: originalName } = selectedGarment;
            setHasChanges(
                brand !== originalBrand ||
                name !== originalName ||
                color !== originalColor
            );

            setDiffColor(color !== originalColor);
        }

    }

    const handleUpdateGarmentButtonClick = () => {

        if (selectedGarment) {

            const { id, area } = selectedGarment;
            updateGarmentToDB(id, area, selectedColor, brand, name);
            handleModeChange(Mode.Closet);
            setColorPickerOpen(false);

        }

    };

    const handleDeleteGarmentButtonClick = () => {

        setShowDeleteDialog(true);

    };

    const handleBackButtonClick = () => {

        setMode(Mode.Closet);
        setColorPickerOpen(false);

    };

    const handleResetColor = () => {

        if (selectedGarment) {

            const { color: originalColor, brand: originalBrand, name: originalName } = selectedGarment;

            handleColorChangePicker(originalColor);

            setHasChanges(
                brand !== originalBrand ||
                name !== originalName
            );

            setDiffColor(false);

        }

    };

    const confirmDelete = () => {

        if (selectedGarment) {
            const { id, area } = selectedGarment;
            removeGarment(id, area);
            setColorPickerOpen(false);
            setShowDeleteDialog(false);
            handleModeChange(Mode.Closet);
        }

    };

    return (

        <div className="flex flex-col">

            <div>
                <IconButton size="large" onClick={handleBackButtonClick}>
                    <ArrowBackIcon fontSize="large" style={{ color: "white" }} />
                </IconButton>
            </div>

            {selectedGarment && (
                <div className="flex flex-col">

                    <p style={{ fontFamily: "Verdana" }}>Color: </p>

                    <div className="flex">

                        <SketchPicker
                            disableAlpha
                            color={selectedColor}
                            // onChangeComplete={color => handleColorChangePicker(color.hex)}
                            onChangeComplete={(color) => handleColorPickerChange(color.hex)}
                        />

                        <div>

                            {diffColor ? (
                                <div
                                    className="cursor-pointer flex items-center justify-center"
                                    onClick={handleResetColor}
                                    style={{ height: "150px", width: "150px", backgroundColor: selectedGarment.color, marginLeft: "30px" }}
                                >
                                    <p style={{ fontFamily: "Verdana", color: "white" }}>Reset</p>
                                </div>
                            ) : (
                                <div
                                    style={{ height: "150px", width: "150px", backgroundColor: selectedGarment.color, marginLeft: "30px" }}></div>
                            )}

                            {(diffColor) && <div style={{ height: "150px", width: "150px", backgroundColor: selectedColor, marginLeft: "30px" }}></div>}

                        </div>


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

                    {/* Update button */}
                    {hasChanges ? (
                        <button onClick={handleUpdateGarmentButtonClick}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-4 rounded">Update</button>
                    ) : (
                        <button
                            className="bg-gray-400 pointer-events-none text-white font-bold py-4 px-4 rounded">Update</button>
                    )}

                    <br />

                    {/* Delete button */}
                    <button onClick={handleDeleteGarmentButtonClick}
                        className="bg-red-700 hover:bg-red-800 text-white font-bold py-4 px-4 rounded">Delete</button>

                    {/* Delete confirmation dialog */}
                    <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
                        <DialogTitle>Delete Garment</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to delete this garment?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setShowDeleteDialog(false)} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={confirmDelete} color="primary">
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>

                </div>
            )}

        </div>
    );

});

export default GarmentDetails;