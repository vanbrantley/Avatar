import Avatar from './Avatar';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import Header from './Header';


const TabletLayout = observer(() => {

    const store = useContext(AppStoreContext);
    const { mode } = store;

    return (

        <div className="h-screen flex flex-col">
            <Header />
            <div className="flex-grow flex overflow-y-auto">
                <div className="grid grid-cols-12 w-full h-full">
                    <div className="col-span-6">
                        <br></br>
                        <br></br>
                        <Avatar mini={false} />
                    </div>
                    <div className="col-span-6">
                        <br></br>
                        <br></br>
                        <p>Menu</p>
                    </div>
                </div>
            </div>
        </div>

    );
});

export default TabletLayout;