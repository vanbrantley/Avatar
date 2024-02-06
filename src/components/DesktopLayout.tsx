import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { useUser } from '../context/AuthContext';
import Header from './Header';
import Palette from './Palette';
import Avatar from './Avatar';
import AvatarExport from './AvatarExport';
import Preview from './Preview';
import Closet from './Closet';
import AddGarment from './AddGarment';
import GarmentDetails from './GarmentDetails';
import Outfits from './Outfits';
import ComplexionMenu from './ComplexionMenu';
import GroupMenu from './GroupMenu';
import { Mode } from '../lib/types';
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import CreateGroup from './CreateGroup';
import ManageGroup from './ManageGroup';

const DesktopLayout = observer(() => {

    const { user } = useUser();
    const store = useContext(AppStoreContext);
    const { mode, cycleOutfitsLeft, cycleOutfitsRight, selectedOutfit, embeddedOutfits, saveOutfit, removeOutfit, captureImage } = store;

    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

    const handleDeleteOutfitButtonClick = () => {
        setShowDeleteDialog(true);
    };

    const confirmDelete = () => {
        if (selectedOutfit) removeOutfit(selectedOutfit.id);
        setShowDeleteDialog(false);
    };

    return (

        <div className="h-screen flex flex-col">
            <Header isMobile={false} />
            <div className="flex-grow flex overflow-y-auto">
                <div className="grid grid-cols-12 w-full h-full">
                    <div className="md:block col-span-1 grid gap-0">
                        <br></br>
                        <br></br>
                        <Palette />
                        <br></br>
                        <br></br>

                        {/* Heart save icon */}
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

                        <div>
                            <IconButton size="large" onClick={() => captureImage(<AvatarExport mini={false} />)}>
                                <CameraswitchIcon fontSize="large" style={{ color: "white" }} />
                            </IconButton>
                        </div>
                    </div>

                    <div className="col-start-2 col-span-6 flex items-center justify-center">

                        {/* Cycle outfits left arrow */}
                        {
                            (user && embeddedOutfits.length !== 0) && (
                                (embeddedOutfits.length === 1) ? (
                                    <IconButton size="large">
                                        <ArrowBackIosIcon fontSize="large" style={{ color: "#484848" }} />
                                    </IconButton>
                                ) : (
                                    <IconButton size="large" onClick={cycleOutfitsLeft}>
                                        <ArrowBackIosIcon fontSize="large" style={{ color: "white" }} />
                                    </IconButton>
                                )
                            )
                        }

                        <div id="avatar">
                            <Avatar mini={false} />
                        </div>

                        {/* Cycle outfits right arrow */}
                        {
                            (user && embeddedOutfits.length !== 0) && (
                                (embeddedOutfits.length === 1) ? (
                                    <IconButton size="large">
                                        <ArrowForwardIosIcon fontSize="large" style={{ color: "#484848" }} />
                                    </IconButton>
                                ) : (
                                    <IconButton size="large" onClick={cycleOutfitsRight}>
                                        <ArrowForwardIosIcon fontSize="large" style={{ color: "white" }} />
                                    </IconButton>
                                )
                            )
                        }

                    </div>
                    <div className="col-span-5 overflow-auto flex flex-col px-16 py-4" style={{ backgroundColor: "#2b2b2b" }}>

                        {(mode === Mode.Preview) && <Preview />}
                        {(mode === Mode.Closet) && <Closet />}
                        {(mode === Mode.Add) && <AddGarment mobile={false} />}
                        {(mode === Mode.Details) && <GarmentDetails />}
                        {(mode === Mode.Outfit) && <Outfits />}
                        {(mode === Mode.Complexion) && <ComplexionMenu />}
                        {(mode === Mode.ListGroup) && <GroupMenu />}
                        {(mode === Mode.CreateGroup) && <CreateGroup />}
                        {(mode === Mode.ManageGroup) && <ManageGroup />}

                    </div>
                </div>
            </div>

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

    );
});

export default DesktopLayout;