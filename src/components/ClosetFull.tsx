import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import Swatch from './Swatch';

const ClosetFull = observer(() => {

    const store = useContext(AppStoreContext);
    const { hatSwatches, topSwatches, bottomSwatches, shoeSwatches } = store;

    return (
        <div className="space-y-12">
            <div className="flex flex-col space-y-4">
                <div>
                    <p style={{ fontFamily: "Verdana", fontWeight: "bold", fontSize: "24px" }}>Hats</p>
                </div>
                <div className="flex">
                    <div className="flex flex-1 max-w-sm overflow-x-auto flex-shrink-0">
                        {hatSwatches.map((swatch) => (
                            <div
                                key={swatch.id}
                                className="w-20 h-10"
                            >
                                <Swatch key={swatch.id} color={swatch.color} area="hat" />
                            </div>
                        ))}
                    </div>
                    {/* Can put a button here */}
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <div>
                    <p style={{ fontFamily: "Verdana", fontWeight: "bold", fontSize: "24px" }}>Tops</p>
                </div>
                <div className="flex">
                    <div className="flex flex-1 max-w-sm overflow-x-auto flex-shrink-0">
                        {topSwatches.map((swatch) => (
                            <div
                                key={swatch.id}
                                className="w-20 h-10"
                            >
                                <Swatch key={swatch.id} color={swatch.color} area="top" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <div>
                    <p style={{ fontFamily: "Verdana", fontWeight: "bold", fontSize: "24px" }}>Bottoms</p>
                </div>
                <div className="flex">
                    <div className="flex flex-1 max-w-sm overflow-x-auto flex-shrink-0">
                        {bottomSwatches.map((swatch) => (
                            <div
                                key={swatch.id}
                                className="w-20 h-10"
                            >
                                <Swatch key={swatch.id} color={swatch.color} area="bottom" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <div>
                    <p style={{ fontFamily: "Verdana", fontWeight: "bold", fontSize: "24px" }}>Shoes</p>
                </div>
                <div className="flex">
                    <div className="flex flex-1 max-w-sm overflow-x-auto flex-shrink-0">
                        {shoeSwatches.map((swatch) => (
                            <div
                                key={swatch.id}
                                className="w-20 h-10"
                            >
                                <Swatch key={swatch.id} color={swatch.color} area="shoe" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );


});

export default ClosetFull;