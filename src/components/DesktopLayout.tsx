import Palette from './Palette';
import Avatar from './Avatar';
import LabMenu from './LabMenu';
import ClosetMenu from './ClosetMenu';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';


const DesktopLayout = observer(() => {

    const store = useContext(AppStoreContext);
    const { closetMode } = store;

    return (

        <>

            <div className="grid grid-cols-12">
                <div className="md:block col-span-1 grid gap-0">
                    <Palette lock={false} />
                </div>
                <div className="col-start-2 col-span-6">
                    <Avatar />
                </div>
                <div className="col-span-5">
                    {!closetMode && <LabMenu />}
                    {closetMode && <ClosetMenu />}
                </div>
            </div>

            <div className="background-overlay md:block"></div>

        </>
    );
});

export default DesktopLayout;