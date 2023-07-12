import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';

interface IMockupResultProps {
    path: string,
}

const MockupResult = observer((props: IMockupResultProps) => {

    const store = useContext(AppStoreContext);
    const { displayMockupOnAvatar, selectedShirt } = store;

    const URL_PREFIX = "https://avatarb886f49d0baa41e28fcf4484f402480e164949-dev.s3.amazonaws.com/public";


    return (
        <div onClick={() => displayMockupOnAvatar(props.path)} className="cursor-pointer" style={{
            backgroundColor: selectedShirt === props.path ? '#181818' : 'initial',
        }}>
            <img src={`${URL_PREFIX}/${props.path}`} className="max-w-full h-auto" />
        </div>
    );

});

export default MockupResult;