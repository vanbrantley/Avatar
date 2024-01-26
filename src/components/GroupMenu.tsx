import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { useUser } from '../context/AuthContext';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const GroupMenu = observer(() => {

    const { user } = useUser();
    const store = useContext(AppStoreContext);
    // const { complexions} = store;

    const dummyGroups = [

        {
            "id": 0,
            "name": "All"
        },
        {
            "id": 1,
            "name": "Lounge"
        },
        {
            "id": 2,
            "name": "Normal"
        },
        {
            "id": 3,
            "name": "Gym"
        },
        {
            "id": 4,
            "name": "Professional"
        },

    ];

    return (
        <div className="flex flex-col h-full">

            <div className="flex flex-col flex-grow overflow-auto">

                {(dummyGroups.length > 0) ? (
                    dummyGroups.map((group, index) => {

                        return (
                            <div key={index} className="grid grid-cols-10 cursor-pointer hover:bg-slate-950" style={{ minHeight: "100px" }}>
                                <div className="col-span-9 flex items-center ml-4"
                                    onClick={() => console.log('click')}>
                                    <p style={{ fontFamily: "Verdana", fontWeight: "bold", fontSize: "18px" }}>{group.name}</p>
                                </div>
                                {index != 0 && (
                                    <div className="col-span-1 flex items-center">
                                        <IconButton size="large" onClick={() => console.log('edit')}>
                                            <EditIcon fontSize="large" style={{ color: "#484848" }} />
                                        </IconButton>
                                    </div>
                                )}
                            </div>
                        );

                    })
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p style={{ fontFamily: "Verdana", fontSize: "24px", color: "gray" }}>
                            Click the plus button below to create a group.
                        </p>
                    </div>
                )}

            </div>

            <div className="flex">
                <div>
                    <IconButton size="large" onClick={() => console.log('create group')}>
                        <AddIcon fontSize="large" style={{ color: "white" }} />
                    </IconButton>
                </div>
            </div>

        </div>
    );

});

export default GroupMenu;