import Palette from './Palette';
import Avatar from './Avatar';
import LabMenu from './LabMenu';
import ClosetMenu from './ClosetMenu';
import MockupMenu from './MockupMenu';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import Header from './Header';


const DesktopLayout = observer(() => {

    const store = useContext(AppStoreContext);
    const { mode } = store;

    return (

        <>

            <Header />
            <br></br>
            <br></br>

            <div className="grid grid-cols-12">
                <div className="md:block col-span-1 grid gap-0">
                    <Palette lock={false} />
                </div>
                <div className="col-start-2 col-span-6">
                    <Avatar mini={false} />
                </div>
                <div className="col-span-5">
                    {mode === "lab" && <LabMenu />}
                    {mode === "closet" && <ClosetMenu />}
                    {mode === "mockup" && <MockupMenu />}
                </div>
            </div>

            <div className="background-overlay md:block"></div>

        </>
    );
});

export default DesktopLayout;