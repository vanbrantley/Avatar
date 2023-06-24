import { useUser } from '../context/AuthContext';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { IconButton } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Avatar from './Avatar';
import PaletteList from './PaletteList';



const MobileLayout = observer(() => {

    const { user } = useUser();

    const store = useContext(AppStoreContext);
    const { heartFilled, randomizePalette, removePalette, savePalette,
        hatLock, setHatLock, topLock, setTopLock, bottomLock, setBottomLock, shoeLock, setShoeLock } = store;

    return (
        <>
            <div className="grid grid-rows-[65vh,35vh]">
                <div className="flex justify-between items-center">
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <IconButton size="large">
                            <ShuffleIcon fontSize="large" onClick={() => randomizePalette()} style={{ color: "white" }} />
                        </IconButton>
                        {user && heartFilled && (
                            <IconButton size="large" onClick={() => removePalette()}>
                                <FavoriteIcon fontSize="large" style={{ color: "white" }} />
                            </IconButton>
                        )}
                        {user && !heartFilled && (
                            <IconButton size="large" onClick={() => savePalette()}>
                                <FavoriteBorderIcon fontSize="large" style={{ color: "white" }} />
                            </IconButton>
                        )}
                    </div>
                    <div className="flex-none">
                        <Avatar mini={true} />
                    </div>
                    <div className="flex-1 flex flex-col justify-between h-full">
                        <div className="my-auto text-center">
                            <IconButton size="large" onClick={() => setHatLock(!hatLock)}>
                                <LockIcon fontSize="large" style={{ color: hatLock ? "white" : "grey" }} />
                            </IconButton>
                        </div>
                        <div className="my-auto text-center">
                            <IconButton size="large" onClick={() => setTopLock(!topLock)}>
                                <LockIcon fontSize="large" style={{ color: topLock ? "white" : "grey" }} />
                            </IconButton>
                        </div>
                        <div className="my-auto text-center">
                            <IconButton size="large" onClick={() => setBottomLock(!bottomLock)}>
                                <LockIcon fontSize="large" style={{ color: bottomLock ? "white" : "grey" }} />
                            </IconButton>
                        </div>
                        <div className="my-auto text-center">
                            <IconButton size="large" onClick={() => setShoeLock(!shoeLock)}>
                                <LockIcon fontSize="large" style={{ color: shoeLock ? "white" : "grey" }} />
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div className="bg-orange-600 flex-1">
                    <PaletteList />
                </div>
            </div>
        </>
    );
});

export default MobileLayout;