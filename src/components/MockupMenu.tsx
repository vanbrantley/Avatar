import { useUser } from '../context/AuthContext';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';


const MockupMenu = observer(() => {

    // const store = useContext(AppStoreContext);
    // const { } = store;

    // const { user } = useUser();

    return (
        <>

            <p>Mockup Menu</p>

        </>
    );


});

export default MockupMenu;