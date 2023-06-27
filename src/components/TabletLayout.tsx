import Avatar from './Avatar';
import LabMenu from './LabMenu';
import ClosetMenu from './ClosetMenu';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import Header from './Header';


const TabletLayout = observer(() => {

    const store = useContext(AppStoreContext);
    const { closetMode, setClosetMode, handleModeChange } = store;

    return (
        <>

            <Header closetMode={closetMode}
                setClosetMode={setClosetMode}
                handleModeChange={handleModeChange} />

            <br></br>
            <br></br>

            <div className="grid grid-cols-12">
                <div className="col-span-6">
                    <Avatar mini={false} />
                </div>
                <div className="col-span-6">
                    {!closetMode && <LabMenu />}
                    {closetMode && <ClosetMenu />}
                </div>
            </div>

            {/* <div className="background-overlay md:block"></div> */}

        </>
    );
});

export default TabletLayout;