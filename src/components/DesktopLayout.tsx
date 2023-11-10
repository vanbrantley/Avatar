import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';

import Header from './Header';
import Palette from './Palette';
import Avatar from './Avatar';
import Preview from './Preview';
import Closet from './Closet';
import AddGarment from './AddGarment';
import GarmentDetails from './GarmentDetails';
import { Mode } from '../lib/types';

import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const DesktopLayout = observer(() => {

    const store = useContext(AppStoreContext);
    const { mode } = store;

    return (

        <div className="h-screen flex flex-col">
            <Header isMobile={false} />
            <div className="flex-grow flex overflow-y-auto">
                <div className="grid grid-cols-12 w-full h-full">
                    <div className="md:block col-span-1 grid gap-0">
                        <br></br>
                        <br></br>
                        <Palette />
                    </div>
                    {/* <div className="col-start-2 col-span-6 flex items-center justify-center">
                        <Avatar mini={false} />
                    </div> */}
                    <div className="col-start-2 col-span-6 flex items-center justify-center">

                        <IconButton size="large">
                            <ArrowBackIosIcon fontSize="large" style={{ color: "white" }} />
                        </IconButton>

                        <Avatar mini={false} />

                        <IconButton size="large">
                            <ArrowForwardIosIcon fontSize="large" style={{ color: "white" }} />
                        </IconButton>
                    </div>
                    <div className="col-span-5 overflow-auto flex flex-col px-16 py-4" style={{ backgroundColor: "#2b2b2b" }}>

                        {(mode === Mode.Preview) && <Preview />}
                        {(mode === Mode.Closet) && <Closet />}
                        {(mode === Mode.Add) && <AddGarment mobile={false} />}
                        {(mode === Mode.Details) && <GarmentDetails />}

                    </div>
                </div>
            </div>
        </div>

    );
});

export default DesktopLayout;