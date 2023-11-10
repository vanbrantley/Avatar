import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import { Garment } from '@/API';

interface ISwatchProps {
    garment: Garment,
    selected: boolean
}

const Swatch = observer((props: ISwatchProps) => {

    const { garment, selected } = props;

    const store = useContext(AppStoreContext);
    const { handleSwatchClick } = store;

    return (
        <div onClick={() => handleSwatchClick(garment)}
            className="w-20 h-10 rounded-md cursor-pointer"
            style={{ backgroundColor: garment.color, border: selected ? "4px solid white" : "" }}></div>
    );

});

export default Swatch;