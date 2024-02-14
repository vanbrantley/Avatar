import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Mode } from '@/lib/types';

const CreateGroup = observer(() => {

    const store = useContext(AppStoreContext);
    const { createGroup, handleModeChange } = store;

    const [name, setName] = useState<string>("");

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleCreateGroupButtonClick = () => {
        createGroup(name);
        handleModeChange(Mode.ManageGroup);
    };

    return (
        <div className="flex flex-col h-full">

            <div>
                <IconButton size="large" onClick={() => handleModeChange(Mode.ListGroup)}>
                    <ArrowBackIcon fontSize="large" style={{ color: "white" }} />
                </IconButton>
            </div>

            <div className="flex flex-col flex-grow">
                <p style={{ fontFamily: "Verdana", fontSize: "24px", color: "gray" }}>
                    Create a new group
                </p>

                <br />

                {/* Group Name Input */}
                <div className="flex">
                    <p style={{ fontFamily: "Verdana", marginRight: '10px' }}>Group name: </p>

                    <input
                        type="text"
                        value={name || ''}
                        onChange={handleNameChange}
                        placeholder=""
                        style={{ color: 'black', paddingLeft: '5px' }}
                    />
                </div>
            </div>

            {/* Create button */}
            {(name === '' ? (
                <button
                    className="bg-gray-400 text-white font-bold py-4 px-4 rounded cursor-default">
                    Add Garments to Group
                </button>
            ) : (
                <button onClick={handleCreateGroupButtonClick}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-4 rounded">
                    Add Garments to Group
                </button>
            ))}

            {/* <div className="flex flex-col flex-grow overflow-auto"></div> */}

        </div>
    );

});

export default CreateGroup;