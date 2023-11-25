import { useUser } from '../context/AuthContext';
import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import Avatar from './Avatar';
import Header from './Header';
import AddGarment from './AddGarment';
import Preview from './Preview';
import MobileCloset from './MobileCloset';
import GarmentDetails from './GarmentDetails';
import { Mode } from '../lib/types';
import Outfits from './Outfits';
import Complexion from './Complexion';
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
    ; import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import ListIcon from '@mui/icons-material/List';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const MobileLayout = observer(() => {

    const { user } = useUser();

    const store = useContext(AppStoreContext);
    const { mode, showAvatar, setShowAvatar, embeddedOutfits, cycleOutfitsLeft, cycleOutfitsRight,
        selectedOutfit, saveOutfit, removeOutfit, navbarOpen, setNavbarOpen } = store;

    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

    const handleDeleteOutfitButtonClick = () => {
        setShowDeleteDialog(true);
    };

    const confirmDelete = () => {
        if (selectedOutfit) removeOutfit(selectedOutfit.id);
        setShowDeleteDialog(false);
    };

    const handleClickOutside = () => {
        if (navbarOpen) setNavbarOpen(false);
    }

    return (
        <>

            <div className="flex flex-col h-screen">
                <Header isMobile={true} />

                <div className="flex justify-center items-center flex-grow" onClick={handleClickOutside}>
                    <div className="w-full h-full mx-auto">

                        {showAvatar ? (
                            <div className="w-full h-full grid grid-cols-12">
                                <div className="col-span-3 flex flex-col justify-center">
                                    <div className="h-1/6"></div>
                                    <div className="h-2/3 flex justify-center">
                                        {(user && embeddedOutfits.length !== 0) && (
                                            (embeddedOutfits.length === 1) ? (
                                                <IconButton size="large">
                                                    <ArrowBackIosIcon fontSize="large" style={{ color: "#484848" }} />
                                                </IconButton>
                                            ) : (
                                                <IconButton size="large" onClick={cycleOutfitsLeft}>
                                                    <ArrowBackIosIcon fontSize="large" style={{ color: "white" }} />
                                                </IconButton>
                                            )
                                        )}
                                    </div>
                                    <div className="h-1/6">
                                        {user && (
                                            selectedOutfit ? (
                                                <IconButton size="large" onClick={handleDeleteOutfitButtonClick}>
                                                    <FavoriteIcon fontSize="large" style={{ color: "white" }} />
                                                </IconButton>
                                            ) : (
                                                <IconButton size="large" onClick={saveOutfit}>
                                                    <FavoriteBorderIcon fontSize="large" style={{ color: "white" }} />
                                                </IconButton>
                                            )
                                        )}
                                    </div>

                                </div>
                                <div className="col-span-6 flex justify-center items-center">
                                    <Avatar mini={true} />
                                </div>
                                <div className="col-span-3 flex flex-col justify-center">
                                    <div className="h-1/6"></div>
                                    <div className="h-2/3 flex justify-center">
                                        {(user && embeddedOutfits.length !== 0) && (
                                            (embeddedOutfits.length === 1) ? (
                                                <IconButton size="large">
                                                    <ArrowForwardIosIcon fontSize="large" style={{ color: "#484848" }} />
                                                </IconButton>
                                            ) : (
                                                <IconButton size="large" onClick={cycleOutfitsRight}>
                                                    <ArrowForwardIosIcon fontSize="large" style={{ color: "white" }} />
                                                </IconButton>
                                            )
                                        )}
                                    </div>
                                    <div className="h-1/6"></div>

                                </div>
                            </div>

                        ) : (

                            <>
                                {(mode === Mode.Preview) && <Preview />}
                                {(mode === Mode.Closet) && <MobileCloset />}
                                {(mode === Mode.Add) && <AddGarment mobile={true} />}
                                {(mode === Mode.Details) && <GarmentDetails />}
                                {(mode === Mode.Outfit) && <Outfits />}
                                {(mode === Mode.Complexion) && <Complexion />}
                            </>

                        )}

                        {(mode !== Mode.Add) && (mode !== Mode.Details) && (

                            <div className="absolute bottom-20 right-2 p-4">
                                <IconButton size="large" onClick={() => setShowAvatar(!showAvatar)} style={{ backgroundColor: "#484848", borderRadius: "10%" }}>
                                    {showAvatar ? (
                                        <ListIcon fontSize="large" style={{ color: "white" }} />

                                    ) : (
                                        <AccessibilityIcon fontSize="large" style={{ color: "white" }} />

                                    )}
                                </IconButton>
                            </div>

                        )}

                    </div>
                </div>
                <div style={{ height: "10%" }}></div>

                {/* Delete confirmation dialog */}
                <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
                    <DialogTitle>Delete Outfit</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this outfit?
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

        </>
    );
});

export default MobileLayout;