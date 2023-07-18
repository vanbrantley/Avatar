import { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../../context/AppStoreContext';
import { useDropzone } from 'react-dropzone';
import { Storage } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '../../context/AuthContext';
import { IconButton } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const ImageDropzone = observer(() => {

    const store = useContext(AppStoreContext);
    const { addShirt } = store;
    const { user } = useUser();

    const onDrop = useCallback(async (acceptedFiles: any[]) => {
        try {
            const file = acceptedFiles[0];
            // Generate a unique file name or key for S3 storage
            const fileName = `${uuidv4()}`;
            const filePath = `${user?.getUsername()}/${fileName}`
            // Upload the file to S3 bucket using Amplify Storage
            await Storage.put(filePath, file);
            // File upload successful
            console.log('File uploaded successfully:', fileName);
            addShirt(filePath);

        } catch (error) {
            // Error occurred during file upload
            console.error('File upload error:', error);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} className="flex justify-center float-right" style={{ cursor: 'pointer', width: "100%", backgroundColor: "#484848" }}>
            <input {...getInputProps()} />

            <IconButton size="large">
                <FileUploadIcon fontSize="large" />
            </IconButton>

        </div>
    );
});

export default ImageDropzone;
