import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';

const PaletteComponent = observer(() => {
    const store = useContext(AppStoreContext);
    const { hatColor, topColor, bottomColor, shoeColor, addColorSwatch } = store;

    return (
        <>
            <div className="">
                <div
                    onClick={() => addColorSwatch("hat")}
                    className="h-14 w-16 rounded-none cursor-pointer"
                    style={{ backgroundColor: hatColor }}
                ></div>
            </div>
            <div className="">
                <div
                    onClick={() => addColorSwatch("top")}
                    className="h-14 w-16 rounded-none cursor-pointer"
                    style={{ backgroundColor: topColor }}
                ></div>
            </div>
            <div className="">
                <div
                    onClick={() => addColorSwatch("bottom")}
                    className="h-14 w-16 rounded-none cursor-pointer"
                    style={{ backgroundColor: bottomColor }}
                ></div>
            </div>
            <div className="">
                <div
                    onClick={() => addColorSwatch("shoes")}
                    className="h-14 w-16 rounded-none cursor-pointer"
                    style={{ backgroundColor: shoeColor }}
                ></div>
            </div>
        </>
    );

});

export default PaletteComponent;