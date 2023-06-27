import { useUser } from '../context/AuthContext';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { IconButton } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Avatar from './Avatar';
import LabMenu from './LabMenu';
import Header from './Header';
import dynamic from 'next/dynamic';
import PaletteList from './PaletteList';
const SketchPicker = dynamic(
    () => import('react-color').then((mod) => mod.SketchPicker),
    { ssr: false }
);

const MobileLayout = observer(() => {

    const { user } = useUser();

    const store = useContext(AppStoreContext);
    const { heartFilled, randomizePalette, removePalette, savePalette,
        hatLock, setHatLock, topLock, setTopLock, bottomLock, setBottomLock, shoeLock, setShoeLock,
        closetMode, setClosetMode, handleModeChange, selectedColor, handleColorChangePicker,
        hatColor, topColor, bottomColor, shoeColor
    } = store;

    return (
        <>

            <div className="flex flex-col h-screen">
                <Header closetMode={closetMode}
                    setClosetMode={setClosetMode}
                    handleModeChange={handleModeChange} />

                <div className="flex justify-between items-center flex-grow">
                    <div className="w-full h-full mx-auto">
                        <div className="grid grid-cols-12" style={{ height: "65%" }}>
                            <div className="col-span-3">
                            </div>
                            <div className="col-span-6 flex justify-center items-center">
                                <Avatar mini={true} />
                            </div>
                            <div className="col-span-3 flex flex-col justify-center">
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
                        <div className="flex flex-col items-center justify-center" style={{ height: "25%" }}>
                            <div className="flex flex-row justify-center">
                                <div className="flex-1">
                                    <IconButton onClick={() => randomizePalette()} >
                                        <ShuffleIcon fontSize="large" style={{ color: "white", fontSize: "4rem" }} />
                                    </IconButton>
                                </div>

                                <div className="flex-1">
                                    {user && (
                                        heartFilled ? (
                                            <IconButton size="large" onClick={() => removePalette()}>
                                                <FavoriteIcon fontSize="large" style={{ color: "white", fontSize: "4rem" }} />
                                            </IconButton>
                                        ) : (
                                            <IconButton size="large" onClick={() => savePalette()}>
                                                <FavoriteBorderIcon fontSize="large" style={{ color: "white", fontSize: "4rem" }} />
                                            </IconButton>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                        <div style={{ height: "10%" }}></div>
                    </div>

                </div>

            </div>

            <div className="flex flex-col h-screen">
                {/* <div className="overflow-x-auto">
                    <LabMenu />
                </div> */}
                <div style={{ height: "5%" }}></div>
                <div className="grid grid-cols-12" style={{ height: "55%" }}>
                    <div className="col-span-8 flex justify-center items-center">
                        <SketchPicker
                            disableAlpha
                            color={selectedColor}
                            onChangeComplete={(color) => handleColorChangePicker(color.hex)}
                        />
                    </div>
                    {/* <div className="col-span-2 flex justify-center items-center bg-purple-600">
                        <div>
                            <div className="">
                                <div
                                    className="h-[52px] w-[62.5px] rounded-none"
                                    style={{ backgroundColor: hatColor }}
                                ></div>
                            </div>
                            <div className="">
                                <div
                                    className="h-[52px] w-[62.5px] rounded-none"
                                    style={{ backgroundColor: topColor }}
                                ></div>
                            </div>
                            <div className="">
                                <div
                                    className="h-[52px] w-[62.5px] rounded-none"
                                    style={{ backgroundColor: bottomColor }}
                                ></div>
                            </div>
                            <div className="">
                                <div
                                    className="h-[52px] w-[62.5px] rounded-none"
                                    style={{ backgroundColor: shoeColor }}
                                ></div>
                            </div>
                        </div>

                    </div> */}
                    <div className="col-span-4 flex flex-col items-center justify-center">
                        <div className="flex">
                            <div style={{ height: "59px", width: "65px", backgroundColor: hatColor }} ></div>
                            <IconButton size="medium" onClick={() => setHatLock(!hatLock)}>
                                <LockIcon fontSize="medium" style={{ color: hatLock ? "white" : "grey" }} />
                            </IconButton>
                        </div>
                        <div className="flex">
                            <div style={{ height: "59px", width: "65px", backgroundColor: topColor }} ></div>
                            <IconButton size="medium" onClick={() => setTopLock(!topLock)}>
                                <LockIcon fontSize="medium" style={{ color: topLock ? "white" : "grey" }} />
                            </IconButton>
                        </div>
                        <div className="flex">
                            <div style={{ height: "59px", width: "65px", backgroundColor: bottomColor }} ></div>
                            <IconButton size="medium" onClick={() => setBottomLock(!bottomLock)}>
                                <LockIcon fontSize="medium" style={{ color: bottomLock ? "white" : "grey" }} />
                            </IconButton>
                        </div>
                        <div className="flex">
                            <div style={{ height: "59px", width: "65px", backgroundColor: shoeColor }} ></div>
                            <IconButton size="medium" onClick={() => setShoeLock(!shoeLock)}>
                                <LockIcon fontSize="medium" style={{ color: shoeLock ? "white" : "grey" }} />
                            </IconButton>
                        </div>

                        {/* <div className="my-auto text-center">
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
                        </div> */}
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center" style={{ height: "19%" }}>
                    <div className="flex flex-row justify-center">
                        <div className="flex-1">
                            <IconButton onClick={() => randomizePalette()} >
                                <ShuffleIcon fontSize="large" style={{ color: "white", fontSize: "4rem" }} />
                            </IconButton>
                        </div>

                        <div className="flex-1">
                            {user && (
                                heartFilled ? (
                                    <IconButton size="large" onClick={() => removePalette()}>
                                        <FavoriteIcon fontSize="large" style={{ color: "white", fontSize: "4rem" }} />
                                    </IconButton>
                                ) : (
                                    <IconButton size="large" onClick={() => savePalette()}>
                                        <FavoriteBorderIcon fontSize="large" style={{ color: "white", fontSize: "4rem" }} />
                                    </IconButton>
                                )
                            )}
                        </div>
                    </div>
                </div>
                <div style={{ height: "26%", overflowX: "auto" }}>
                    <PaletteList />
                </div>
            </div>

        </>
    );
});

export default MobileLayout;