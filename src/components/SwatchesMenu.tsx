import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { IconButton } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Swatch from './Swatch';

const SwatchesMenu = observer(() => {
    const store = useContext(AppStoreContext);
    const { hatSwatches, topSwatches, bottomSwatches, shoeSwatches,
        hatLock, setHatLock, topLock, setTopLock, bottomLock, setBottomLock, shoeLock, setShoeLock } = store;

    return (
        <>
            <div className="flex">
                <div className="flex max-w-3xl overflow-x-auto">
                    {hatSwatches.map((color) => (
                        <Swatch key={color} color={color} area="hat" />
                    ))}
                </div>
                <div className="flex items-center">
                    <IconButton onClick={() => setHatLock(!hatLock)}>
                        <LockIcon fontSize="large" style={{ color: hatLock ? "white" : "grey" }} />
                    </IconButton>
                </div>
            </div>
            <div className="flex">
                <div className="flex max-w-3xl overflow-x-auto">
                    {topSwatches.map((color) => (
                        <Swatch key={color} color={color} area="top" />
                    ))}
                </div>
                <div className="flex items-center">
                    <IconButton onClick={() => setTopLock(!topLock)}>
                        <LockIcon fontSize="large" style={{ color: topLock ? "white" : "grey" }} />
                    </IconButton>
                </div>
            </div>
            <div className="flex">
                <div className="flex max-w-3xl overflow-x-auto">
                    {bottomSwatches.map((color) => (
                        <Swatch key={color} color={color} area="bottom" />
                    ))}
                </div>
                <div className="flex items-center">
                    <IconButton onClick={() => setBottomLock(!bottomLock)}>
                        <LockIcon fontSize="large" style={{ color: bottomLock ? "white" : "grey" }} />
                    </IconButton>
                </div>
            </div>
            <div className="flex">
                <div className="flex max-w-3xl overflow-x-auto">
                    {shoeSwatches.map((color) => (
                        <Swatch key={color} color={color} area="shoe" />
                    ))}
                </div>
                <div className="flex items-center">
                    <IconButton onClick={() => setShoeLock(!shoeLock)}>
                        <LockIcon fontSize="large" style={{ color: shoeLock ? "white" : "grey" }} />
                    </IconButton>
                </div>
            </div>
        </>
    );

});

export default SwatchesMenu;