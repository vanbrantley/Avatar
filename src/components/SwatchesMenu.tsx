import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { IconButton } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

const SwatchesMenu = observer(() => {
    const store = useContext(AppStoreContext);
    const { hatSwatches, topSwatches, bottomSwatches, shoeSwatches, handleColorChangeSwatch,
        hatLock, setHatLock, topLock, setTopLock, bottomLock, setBottomLock, shoeLock, setShoeLock } = store;

    return (
        <>
            <div className="flex">
                <div className="flex max-w-3xl overflow-x-auto">
                    {hatSwatches.map((color) => (
                        <div key={color} onClick={() => handleColorChangeSwatch(color, "hat")} className="w-16 h-8 rounded-md cursor-pointer" style={{ backgroundColor: color }}></div>
                    ))}
                </div>
                <div className="flex items-center">
                    <IconButton onClick={() => setHatLock(!hatLock)}>
                        <LockIcon style={{ color: hatLock ? "white" : "grey" }} />
                    </IconButton>
                </div>
            </div>
            <div className="flex">
                <div className="flex max-w-3xl overflow-x-auto">
                    {topSwatches.map((color) => (
                        <div key={color} onClick={() => handleColorChangeSwatch(color, "top")} className="w-16 h-8 rounded-md cursor-pointer" style={{ backgroundColor: color }}></div>
                    ))}
                </div>
                <div className="flex items-center">
                    <IconButton onClick={() => setTopLock(!topLock)}>
                        <LockIcon style={{ color: topLock ? "white" : "grey" }} />
                    </IconButton>
                </div>
            </div>
            <div className="flex">
                <div className="flex max-w-3xl overflow-x-auto">
                    {bottomSwatches.map((color) => (
                        <div key={color} onClick={() => handleColorChangeSwatch(color, "bottom")} className="w-16 h-8 rounded-md cursor-pointer" style={{ backgroundColor: color }}></div>
                    ))}
                </div>
                <div className="flex items-center">
                    <IconButton onClick={() => setBottomLock(!bottomLock)}>
                        <LockIcon style={{ color: bottomLock ? "white" : "grey" }} />
                    </IconButton>
                </div>
            </div>
            <div className="flex">
                <div className="flex max-w-3xl overflow-x-auto">
                    {shoeSwatches.map((color) => (
                        <div key={color} onClick={() => handleColorChangeSwatch(color, "shoes")} className="w-16 h-8 rounded-md cursor-pointer" style={{ backgroundColor: color }}></div>
                    ))}
                </div>
                <div className="flex items-center">
                    <IconButton onClick={() => setShoeLock(!shoeLock)}>
                        <LockIcon style={{ color: shoeLock ? "white" : "grey" }} />
                    </IconButton>
                </div>
            </div>
        </>
    );

});

export default SwatchesMenu;