// import { useUser } from '../context/AuthContext';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import Avatar from './Avatar';
import Header from './Header';
import AddGarment from './AddGarment';
import Preview from './Preview';
import MobileCloset from './MobileCloset';
import GarmentDetails from './GarmentDetails';
import { IconButton } from '@mui/material';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import ListIcon from '@mui/icons-material/List';
import { Mode } from '../lib/types';
import Outfits from './Outfits';

const MobileLayout = observer(() => {

    // const { user } = useUser();

    const store = useContext(AppStoreContext);
    const { mode, showAvatar, setShowAvatar } = store;

    // const [showAvatar, setShowAvatar] = useState<boolean>(true);

    return (
        <>

            <div className="flex flex-col h-screen">
                <Header isMobile={true} />

                <div className="flex justify-between items-center flex-grow">
                    <div className="w-full h-full mx-auto">

                        {/* Conditionally render Avatar or List button based on showAvatar state boolean variable */}

                        {showAvatar ? (
                            <div className="w-full h-full grid grid-cols-12">
                                <div className="col-span-3">
                                </div>
                                <div className="col-span-6 flex justify-center items-center">
                                    <Avatar mini={true} />
                                </div>
                                <div className="col-span-3 flex flex-col justify-center">
                                </div>
                            </div>

                        ) : (

                            <>
                                {(mode === Mode.Preview) && <Preview />}
                                {(mode === Mode.Closet) && <MobileCloset />}
                                {(mode === Mode.Add) && <AddGarment mobile={true} />}
                                {(mode === Mode.Details) && <GarmentDetails />}
                                {(mode === Mode.Outfit) && <Outfits />}
                            </>

                        )}

                        <div className="absolute bottom-20 right-5 p-4">
                            <IconButton size="large" onClick={() => setShowAvatar(!showAvatar)} style={{ backgroundColor: "#484848", borderRadius: "10%" }}>
                                {showAvatar ? (
                                    <ListIcon fontSize="large" style={{ color: "white" }} />

                                ) : (
                                    <AccessibilityIcon fontSize="large" style={{ color: "white" }} />

                                )}
                            </IconButton>
                        </div>


                    </div>

                </div>

            </div>

        </>
    );
});

export default MobileLayout;