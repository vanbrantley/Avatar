import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import Swatch from './Swatch';
import { IconButton } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { GarmentType } from '@/lib/types';

const Preview = observer(() => {

    const store = useContext(AppStoreContext);
    const { userHats, userTops, userBottoms, userShoes } = store;

    const selectedHat = "0f8a13e1-3771-4fcf-95d4-434502512c70";
    const selectedTop = "caf6842b-6fec-4b11-9778-f84496712170";
    const selectedBottom = "6db99140-7f9f-4001-8880-b50233f3e1ec";
    const selectedShoe = "027f95ae-44ec-4598-991f-8988c2234d74";

    return (
        <div className="h-full space-y-8">
            <div className="flex flex-col space-y-4">
                <div>
                    <p style={{ fontFamily: "Verdana", fontWeight: "bold", fontSize: "24px" }}>Hats</p>
                </div>
                <div className="flex items-center">
                    <div className="flex flex-1 max-w-sm overflow-x-auto flex-shrink-0">
                        {userHats.map((swatch) => (
                            <div
                                key={swatch.id}
                                className="w-20 h-w0"
                            >
                                {/* Have the swatch take in the whole Garment as its prop */}
                                <Swatch key={swatch.id} color={swatch.color} area={GarmentType.Hat} selected={swatch.id === selectedHat} />
                            </div>
                        ))}
                    </div>
                    <div className="flex">
                        <IconButton size="large">
                            <LockIcon fontSize="large" style={{ color: "#484848" }} />
                        </IconButton>
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <div>
                    <p style={{ fontFamily: "Verdana", fontWeight: "bold", fontSize: "24px" }}>Tops</p>
                </div>
                <div className="flex items-center">
                    <div className="flex flex-1 max-w-sm overflow-x-auto flex-shrink-0">
                        {userTops.map((swatch) => (
                            <div
                                key={swatch.id}
                                className="w-20 h-10"
                            >
                                <Swatch key={swatch.id} color={swatch.color} area={GarmentType.Top} selected={swatch.id === selectedTop} />
                            </div>
                        ))}
                    </div>
                    <div className="flex">
                        <IconButton size="large">
                            <LockIcon fontSize="large" style={{ color: "#484848" }} />
                        </IconButton>
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <div>
                    <p style={{ fontFamily: "Verdana", fontWeight: "bold", fontSize: "24px" }}>Bottoms</p>
                </div>
                <div className="flex items-center">
                    <div className="flex flex-1 max-w-sm overflow-x-auto flex-shrink-0">
                        {userBottoms.map((swatch) => (
                            <div
                                key={swatch.id}
                                className="w-20 h-10"
                            >
                                <Swatch key={swatch.id} color={swatch.color} area={GarmentType.Bottom} selected={swatch.id === selectedBottom} />
                            </div>
                        ))}
                    </div>
                    <div className="flex">
                        <IconButton size="large">
                            <LockIcon fontSize="large" style={{ color: "#484848" }} />
                        </IconButton>
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <div>
                    <p style={{ fontFamily: "Verdana", fontWeight: "bold", fontSize: "24px" }}>Shoes</p>
                </div>
                <div className="flex items-center">
                    <div className="flex flex-1 max-w-sm overflow-x-auto flex-shrink-0">
                        {userShoes.map((swatch) => (
                            <div
                                key={swatch.id}
                                className="w-20 h-10"
                            >
                                <Swatch key={swatch.id} color={swatch.color} area={GarmentType.Shoe} selected={swatch.id === selectedShoe} />
                            </div>
                        ))}
                    </div>
                    <div className="flex">
                        <IconButton size="large">
                            <LockIcon fontSize="large" style={{ color: "#484848" }} />
                        </IconButton>
                    </div>
                </div>
            </div>

            <div className="flex">
                <div>
                    <IconButton size="large">
                        <ShuffleIcon fontSize="large" style={{ color: "white" }} />
                    </IconButton>
                </div>
            </div>

        </div>
    );


});

export default Preview;