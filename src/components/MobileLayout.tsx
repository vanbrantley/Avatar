// import { useUser } from '../context/AuthContext';
import { observer } from 'mobx-react-lite';
// import { useContext } from 'react';
// import { AppStoreContext } from '../context/AppStoreContext';
import Avatar from './Avatar';
import Header from './Header';
import AddGarment from './AddGarment';
import Closet from './Preview';


const MobileLayout = observer(() => {

    // const { user } = useUser();

    // const store = useContext(AppStoreContext);
    // const {  } = store;

    return (
        <>

            <div className="flex flex-col h-screen">
                <Header />

                <div className="flex justify-between items-center flex-grow">
                    <div className="w-full h-full mx-auto">
                        <div className="grid grid-cols-12" style={{ height: "60%" }}>
                            <div className="col-span-3">
                            </div>
                            <div className="col-span-6 flex justify-center items-center">
                                <Avatar mini={true} />
                            </div>
                            <div className="col-span-3 flex flex-col justify-center">
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center bg-yellow-800" style={{ height: "30%" }}></div>
                        <div style={{ height: "10%" }}></div>
                    </div>

                </div>

            </div>

            <div className="flex flex-col h-screen">
                <div style={{ height: "5%" }}></div>

                <Closet />

            </div>


            <div className="flex flex-col h-screen">
                <div style={{ height: "5%" }}></div>

                <AddGarment mobile={true} />

            </div>

        </>
    );
});

export default MobileLayout;