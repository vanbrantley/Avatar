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
                                <Swatch key={swatch.id} color={swatch.color} area={GarmentType.Hat} />
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
                                <Swatch key={swatch.id} color={swatch.color} area={GarmentType.Top} />
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
                                <Swatch key={swatch.id} color={swatch.color} area={GarmentType.Bottom} />
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
                                <Swatch key={swatch.id} color={swatch.color} area={GarmentType.Shoe} />
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