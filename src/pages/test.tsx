import { useState } from "react";

const Test = () => {

    const [color, setColor] = useState<string>("blue");

    return (
        <div className="flex items-center justify-center mt-20">
            <div className="tshirt" style={{ backgroundColor: color }}>
                <div className="middle" style={{ backgroundColor: color }}></div>
                <div className="sleeve-left" style={{ backgroundColor: color }}></div>
                <div className="sleeve-right" style={{ backgroundColor: color }}></div>
            </div>
        </div>
    );

};

export default Test;