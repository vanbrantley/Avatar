import { observer } from 'mobx-react-lite';
// import { useContext } from 'react';
// import { AppStoreContext } from '../context/AppStoreContext';


const MobileLayout = observer(() => {

    // const store = useContext(AppStoreContext);
    // const {  } = store;

    return (
        <>
            <div className="grid grid-rows-[75vh,25vh]">
                <div className="bg-gray-200">Top Row</div>
                <div className="bg-orange-600">Bottom Row</div>
            </div>
        </>
    );
});

export default MobileLayout;