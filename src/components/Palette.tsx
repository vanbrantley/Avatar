import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { IconButton } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

interface IPaletteProps {
    lock: boolean,
    handler?: (area: string) => void
}

const Palette = observer(function PaletteComponent(props: IPaletteProps) {
    const store = useContext(AppStoreContext);
    const { hatColor, topColor, bottomColor, shoeColor,
        hatLock, setHatLock, topLock, setTopLock, bottomLock, setBottomLock, shoeLock, setShoeLock } = store;

    return (

        <>

            {props.lock ? (
                <div>
                    <div className="flex">
                        <div onClick={() => props.handler!("hat")} className="h-[72px] w-20 rounded-none cursor-pointer" style={{ backgroundColor: hatColor }} ></div>
                        <IconButton size="large" onClick={() => setHatLock(!hatLock)}>
                            <LockIcon fontSize="large" style={{ color: hatLock ? "white" : "grey" }} />
                        </IconButton>
                    </div>
                    <div className="flex">
                        <div onClick={() => props.handler!("top")} className="h-[72px] w-20 rounded-none cursor-pointer" style={{ backgroundColor: topColor }} ></div>
                        <IconButton size="large" onClick={() => setTopLock(!topLock)}>
                            <LockIcon fontSize="large" style={{ color: topLock ? "white" : "grey" }} />
                        </IconButton>
                    </div>
                    <div className="flex">
                        <div onClick={() => props.handler!("bottom")} className="h-[72px] w-20 rounded-none cursor-pointer" style={{ backgroundColor: bottomColor }} ></div>
                        <IconButton size="large" onClick={() => setBottomLock(!bottomLock)}>
                            <LockIcon fontSize="large" style={{ color: bottomLock ? "white" : "grey" }} />
                        </IconButton>
                    </div>
                    <div className="flex">
                        <div onClick={() => props.handler!("shoe")} className="h-[72px] w-20 rounded-none cursor-pointer" style={{ backgroundColor: shoeColor }} ></div>
                        <IconButton size="large" onClick={() => setShoeLock(!shoeLock)}>
                            <LockIcon fontSize="large" style={{ color: shoeLock ? "white" : "grey" }} />
                        </IconButton>
                    </div>
                </div>
            ) : (
                <>
                    <div
                        className="h-[72px] w-20 rounded-none"
                        style={{ backgroundColor: hatColor }}
                    ></div>
                    <div
                        className="h-[72px] w-20 rounded-none"
                        style={{ backgroundColor: topColor }}
                    ></div>
                    <div
                        className="h-[72px] w-20 rounded-none"
                        style={{ backgroundColor: bottomColor }}
                    ></div>
                    <div
                        className="h-[72px] w-20 rounded-none"
                        style={{ backgroundColor: shoeColor }}
                    ></div>
                </>
            )}

        </>
    );

});

export default Palette;