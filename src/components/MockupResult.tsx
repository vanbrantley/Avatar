import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';

interface IMockupResultProps {
    path: string,
}

const MockupResult = (props: IMockupResultProps) => {

    const store = useContext(AppStoreContext);
    const { setShirt } = store;

    return (
        <div onClick={() => setShirt(props.path)} className="cursor-pointer">
            <img src={`/${props.path}`} className="max-w-full h-auto" />
        </div>
    );
}

export default MockupResult;