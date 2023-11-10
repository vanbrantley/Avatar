import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { GarmentType } from '@/lib/types';

interface ISwatchProps {
    color: string,
    area: GarmentType,
    selected: boolean
}

const Swatch = observer((props: ISwatchProps) => {

    const store = useContext(AppStoreContext);
    const { handleColorChangeSwatch } = store;

    // have the swatch take in the whole Garment

    return (
        <div onClick={() => handleColorChangeSwatch(props.color, props.area)}
            className="w-20 h-10 rounded-md cursor-pointer"
            style={{ backgroundColor: props.color, border: props.selected ? "4px solid white" : "" }}></div>
    );

});

export default Swatch;