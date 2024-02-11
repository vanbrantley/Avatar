import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import Swatch from './Swatch';
import { IconButton } from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';

const Preview = observer(() => {

    const store = useContext(AppStoreContext);
    const { userHats, userTops, userBottoms, userShoes, selectedGroup,
        selectedHat, selectedTop, selectedBottom, selectedShoe, randomizeGarments } = store;

    return (
        <div className="h-full space-y-12 flex flex-col justify-center">
            <div className="flex flex-col space-y-4">
                <div>
                    <p style={{ fontFamily: "Verdana", fontWeight: "bold", fontSize: "24px" }}>Hats</p>
                </div>
                <div className="flex items-center">
                    <div className="flex flex-1 max-w-sm overflow-x-auto flex-shrink-0">

                        {userHats.length === 0 ? (
                            (selectedGroup == 'all') ? (
                                <p style={{ fontFamily: "Verdana" }}>No hats added</p>
                            ) : (
                                <p style={{ fontFamily: "Verdana" }}>No hats in group</p>
                            )
                        ) : (
                            userHats.map((garment) => (
                                <div
                                    key={garment.id}
                                    className="w-20 h-w0"
                                >
                                    <Swatch key={garment.id} garment={garment} selected={garment.id === selectedHat.id} />
                                </div>
                            ))
                        )}

                    </div>
                    {/* <div className="flex">
                        <IconButton size="large">
                            <LockIcon fontSize="large" style={{ color: "#484848" }} />
                        </IconButton>
                    </div> */}
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <div>
                    <p style={{ fontFamily: "Verdana", fontWeight: "bold", fontSize: "24px" }}>Tops</p>
                </div>
                <div className="flex items-center">
                    <div className="flex flex-1 max-w-sm overflow-x-auto flex-shrink-0">
                        {userTops.length === 0 ? (
                            (selectedGroup == 'all') ? (
                                <p style={{ fontFamily: "Verdana" }}>No tops added</p>
                            ) : (
                                <p style={{ fontFamily: "Verdana" }}>No tops in group</p>
                            )
                        ) : (
                            userTops.map((garment) => (
                                <div
                                    key={garment.id}
                                    className="w-20 h-w0"
                                >
                                    <Swatch key={garment.id} garment={garment} selected={garment.id === selectedTop.id} />
                                </div>
                            ))
                        )}
                    </div>
                    {/* <div className="flex">
                        <IconButton size="large">
                            <LockIcon fontSize="large" style={{ color: "#484848" }} />
                        </IconButton>
                    </div> */}
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <div>
                    <p style={{ fontFamily: "Verdana", fontWeight: "bold", fontSize: "24px" }}>Bottoms</p>
                </div>
                <div className="flex items-center">
                    <div className="flex flex-1 max-w-sm overflow-x-auto flex-shrink-0">
                        {userBottoms.length === 0 ? (
                            (selectedGroup == 'all') ? (
                                <p style={{ fontFamily: "Verdana" }}>No bottoms added</p>
                            ) : (
                                <p style={{ fontFamily: "Verdana" }}>No bottoms in group</p>
                            )
                        ) : (
                            userBottoms.map((garment) => (
                                <div
                                    key={garment.id}
                                    className="w-20 h-w0"
                                >
                                    <Swatch key={garment.id} garment={garment} selected={garment.id === selectedBottom.id} />
                                </div>
                            ))
                        )}
                    </div>
                    {/* <div className="flex">
                        <IconButton size="large">
                            <LockIcon fontSize="large" style={{ color: "#484848" }} />
                        </IconButton>
                    </div> */}
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <div>
                    <p style={{ fontFamily: "Verdana", fontWeight: "bold", fontSize: "24px" }}>Shoes</p>
                </div>
                <div className="flex items-center">
                    <div className="flex flex-1 max-w-sm overflow-x-auto flex-shrink-0">
                        {userShoes.length === 0 ? (
                            (selectedGroup == 'all') ? (
                                <p style={{ fontFamily: "Verdana" }}>No shoes added</p>
                            ) : (
                                <p style={{ fontFamily: "Verdana" }}>No shoes in group</p>
                            )
                        ) : (
                            userShoes.map((garment) => (
                                <div
                                    key={garment.id}
                                    className="w-20 h-w0"
                                >
                                    <Swatch key={garment.id} garment={garment} selected={garment.id === selectedShoe.id} />
                                </div>
                            ))
                        )}
                    </div>
                    {/* <div className="flex">
                        <IconButton size="large">
                            <LockIcon fontSize="large" style={{ color: "#484848" }} />
                        </IconButton>
                    </div> */}
                </div>
            </div>

            <div className="flex">
                <div>
                    <IconButton size="large" onClick={randomizeGarments}>
                        <ShuffleIcon fontSize="large" style={{ color: "white" }} />
                    </IconButton>
                </div>
            </div>

        </div>
    );


});

export default Preview;