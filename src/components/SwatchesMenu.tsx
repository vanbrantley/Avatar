import { observer } from 'mobx-react-lite';
import { useEffect, useState, useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { IconButton } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Swatch from './Swatch';

const SwatchesMenu = observer(() => {
    const store = useContext(AppStoreContext);
    const { hatSwatches, topSwatches, bottomSwatches, shoeSwatches,
        hatLock, setHatLock, topLock, setTopLock, bottomLock, setBottomLock, shoeLock, setShoeLock } = store;

    const [noSwatches, setNoSwatches] = useState<boolean>(true);

    useEffect(() => {
        const checkSwatches = () => {
            const areAllArraysEmpty =
                hatSwatches.length === 0 &&
                topSwatches.length === 0 &&
                bottomSwatches.length === 0 &&
                shoeSwatches.length === 0;

            setNoSwatches(areAllArraysEmpty);
        };

        checkSwatches();
    }, [hatSwatches, topSwatches, bottomSwatches, shoeSwatches]);

    return (
        <>

            {noSwatches ? (
                <div>
                    <p>Click a color on the palette below to save a swatch</p>
                </div>
            ) : (
                <div>
                    <div className="flex">
                        <div className="flex flex-1 max-w-sm overflow-x-auto flex-shrink-0">
                            {hatSwatches.map((color) => (
                                <div
                                    key={color}
                                    className="w-20 h-10"
                                >
                                    <Swatch key={color} color={color} area="hat" />
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center">
                            <IconButton onClick={() => setHatLock(!hatLock)}>
                                <LockIcon
                                    fontSize="large"
                                    style={{ color: hatLock ? "white" : "grey" }}
                                />
                            </IconButton>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-1 max-w-sm overflow-x-auto flex-shrink-0">
                            {topSwatches.map((color) => (
                                <div
                                    key={color}
                                    className="w-20 h-10"
                                >
                                    <Swatch key={color} color={color} area="top" />
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center">
                            <IconButton onClick={() => setTopLock(!topLock)}>
                                <LockIcon
                                    fontSize="large"
                                    style={{ color: topLock ? "white" : "grey" }}
                                />
                            </IconButton>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-1 max-w-sm overflow-x-auto flex-shrink-0">
                            {bottomSwatches.map((color) => (
                                <div
                                    key={color}
                                    className="w-20 h-10"
                                >
                                    <Swatch key={color} color={color} area="bottom" />
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center">
                            <IconButton onClick={() => setBottomLock(!bottomLock)}>
                                <LockIcon
                                    fontSize="large"
                                    style={{ color: bottomLock ? "white" : "grey" }}
                                />
                            </IconButton>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-1 max-w-sm overflow-x-auto flex-shrink-0">
                            {shoeSwatches.map((color) => (
                                <div
                                    key={color}
                                    className="w-20 h-10"
                                >
                                    <Swatch key={color} color={color} area="shoe" />
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center">
                            <IconButton onClick={() => setShoeLock(!shoeLock)}>
                                <LockIcon
                                    fontSize="large"
                                    style={{ color: shoeLock ? "white" : "grey" }}
                                />
                            </IconButton>
                        </div>
                    </div>
                </div>
            )}

        </>
    );


});

export default SwatchesMenu;