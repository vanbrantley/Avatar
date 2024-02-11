import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { useUser } from '../context/AuthContext';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Mode } from '@/lib/types';
import { Group } from '@/API';

const GroupMenu = observer(() => {

    const { user } = useUser();
    const store = useContext(AppStoreContext);
    const { groups, selectedGroup, setSelectedGroup, handleModeChange, createGroupAssignment } = store;

    const allOption: Group = {
        __typename: "Group",
        id: "all",
        name: "All",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        owner: null
    };

    const groupsPlusAllOption: Group[] = [allOption, ...groups];

    const handleGroupClick = (groupId: string) => {

        setSelectedGroup(groupId);
        // handleModeChange(Mode.Closet);

    };

    const handleEditGroupButtonClick = (groupId: string) => {
        setSelectedGroup(groupId);
        handleModeChange(Mode.ManageGroup);
    };

    return (
        <>

            {user ? (

                <div className="flex flex-col h-full">
                    <div className="flex flex-col flex-grow overflow-auto">

                        {(groups.length > 0) ? (
                            groupsPlusAllOption.map((group, index) => {

                                const selected = group.id === selectedGroup;

                                return (
                                    <div key={index} className="grid grid-cols-10 cursor-pointer" style={{ minHeight: "100px", backgroundColor: selected ? "#141414" : "" }}>
                                        <div className="col-span-9 flex items-center ml-4"
                                            onClick={() => handleGroupClick(group.id)}>
                                            <p style={{ fontFamily: "Verdana", fontWeight: "bold", fontSize: "18px" }}>{group.name}</p>
                                        </div>
                                        {index != 0 && (
                                            <div className="col-span-1 flex items-center">
                                                <IconButton size="large" onClick={() => handleEditGroupButtonClick(group.id)}>
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
                        <IconButton size="large" onClick={() => handleModeChange(Mode.CreateGroup)}>
                            <AddIcon fontSize="large" style={{ color: "white" }} />
                        </IconButton>
                    </div>
                </div>

            ) : (
                <div className="flex h-full items-center justify-center">
                    <p style={{ fontFamily: "Verdana", fontSize: "24px", color: "gray" }}>Sign in to save groups</p>
                </div>
            )}

        </>
    );

});

export default GroupMenu;