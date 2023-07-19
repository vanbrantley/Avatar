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

        <div className="h-screen flex flex-col">
            <Header />
            <div className="flex-grow flex overflow-y-auto">
                <div className="grid grid-cols-12 w-full h-full">
                    <div className="md:block col-span-1 grid gap-0">
                        <br></br>
                        <br></br>
                        <Palette lock={false} />
                    </div>
                    <div className="col-start-2 col-span-6 flex items-center justify-center">
                        <Avatar mini={false} />
                    </div>
                    <div className="col-span-4 overflow-auto flex flex-col">
                        <br></br>
                        <br></br>

                        {mode === "lab" && <LabMenu />}
                        {mode === "closet" && <ClosetMenu />}
                        {mode === "mockup" && <MockupMenu />}

                    </div>
                </div>
            </div>
            <div className="background-overlay md:block"></div>
        </div>

    );
});

export default DesktopLayout;