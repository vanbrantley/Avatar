import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { useUser } from '../context/AuthContext';
import { IconButton } from '@mui/material';

const ManageGroup = observer(() => {

    const { user } = useUser();
    const store = useContext(AppStoreContext);
    // const { complexions} = store;

    return (
        <div className="flex flex-col h-full">

            <div className="flex flex-col flex-grow overflow-auto">

            </div>

        </div>
    );

});

export default ManageGroup;