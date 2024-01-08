interface IAvatarExportProps {
    mini: boolean
}

import Avatar from './Avatar';

const AvatarExport = (props: IAvatarExportProps) => {

    return (
        <div
            className="flex flex-col items-center justify-center"
            style={{ backgroundColor: "#181818", height: "800px", width: "800px" }}>
            <Avatar mini={props.mini} />
        </div>
    );


};

export default AvatarExport;