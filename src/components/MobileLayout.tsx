import { observer } from 'mobx-react-lite';
import Avatar from './Avatar';
// import { useContext } from 'react';
// import { AppStoreContext } from '../context/AppStoreContext';


const MobileLayout = observer(() => {

    // const store = useContext(AppStoreContext);
    // const {  } = store;

    return (
        <>
            <Avatar />
        </>
    );
});

export default MobileLayout;