import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import MockupResult from './MockupResult';
import ImageDropzone from './ImageDropzone';
import { IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const MockupMenu = observer(() => {

    const store = useContext(AppStoreContext);
    const { shirts, selectedShirt, removeShirt } = store;

    // const m_paths = ["testuser1/21a80e9e-86a4-45a0-9afc-bdb62e8f1e98", "testuser1/6f3207e8-73e7-4e8e-8f1d-341fd3b01ff3",
    //     "testuser1/21a80e9e-86a4-45a0-9afc-bdb62e8f1e98", "testuser1/6f3207e8-73e7-4e8e-8f1d-341fd3b01ff3",
    //     "testuser1/21a80e9e-86a4-45a0-9afc-bdb62e8f1e98", "testuser1/6f3207e8-73e7-4e8e-8f1d-341fd3b01ff3",
    //     "testuser1/21a80e9e-86a4-45a0-9afc-bdb62e8f1e98", "testuser1/6f3207e8-73e7-4e8e-8f1d-341fd3b01ff3",
    //     "testuser1/21a80e9e-86a4-45a0-9afc-bdb62e8f1e98", "testuser1/6f3207e8-73e7-4e8e-8f1d-341fd3b01ff3",
    //     "testuser1/21a80e9e-86a4-45a0-9afc-bdb62e8f1e98", "testuser1/6f3207e8-73e7-4e8e-8f1d-341fd3b01ff3",
    //     "testuser1/21a80e9e-86a4-45a0-9afc-bdb62e8f1e98", "testuser1/6f3207e8-73e7-4e8e-8f1d-341fd3b01ff3",
    //     "testuser1/21a80e9e-86a4-45a0-9afc-bdb62e8f1e98", "testuser1/6f3207e8-73e7-4e8e-8f1d-341fd3b01ff3",
    //     "testuser1/21a80e9e-86a4-45a0-9afc-bdb62e8f1e98", "testuser1/6f3207e8-73e7-4e8e-8f1d-341fd3b01ff3",
    //     "testuser1/21a80e9e-86a4-45a0-9afc-bdb62e8f1e98", "testuser1/6f3207e8-73e7-4e8e-8f1d-341fd3b01ff3",
    //     "testuser1/21a80e9e-86a4-45a0-9afc-bdb62e8f1e98", "testuser1/6f3207e8-73e7-4e8e-8f1d-341fd3b01ff3",
    //     "testuser1/21a80e9e-86a4-45a0-9afc-bdb62e8f1e98", "testuser1/6f3207e8-73e7-4e8e-8f1d-341fd3b01ff3",
    //     "testuser1/21a80e9e-86a4-45a0-9afc-bdb62e8f1e98", "testuser1/6f3207e8-73e7-4e8e-8f1d-341fd3b01ff3"
    // ];

    return (

        <>

            <div className="flex flex-col h-full">

                <div className="h-5/6 overflow-auto overscroll-y-contain">

                    {(shirts.length === 0) ? (
                        <div>
                            {/* <p>Click button below to upload an image of a shirt to be displayed on the Avatar</p> */}
                            <p>Upload an image of a shirt to display on the Avatar using the button below</p>

                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-4">

                            {shirts.map((path, index) => (
                                <div key={index} className="flex justify-center">
                                    <MockupResult path={path} />
                                </div>
                            ))}
                        </div>

                    )}


                </div>

                <div className="h-1/6 flex">
                    <div className="w-5/6">
                        <ImageDropzone />

                    </div>
                    <div className="w-1/6 flex justify-center items-start">
                        {(selectedShirt !== '') && (
                            <IconButton onClick={() => removeShirt(selectedShirt)}>
                                <DeleteOutlineIcon
                                    fontSize="large"
                                />
                            </IconButton>
                        )}
                    </div>
                </div>

            </div>

        </>

    );


});

export default MockupMenu;