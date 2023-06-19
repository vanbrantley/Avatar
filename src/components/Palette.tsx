export interface IPaletteProps {
    hatColor: string,
    topColor: string,
    bottomColor: string,
    shoeColor: string,
    addColorSwatch: (color: string) => void
}

export default function PaletteComponent(props: IPaletteProps) {


    return (
        <>
            <div className="">
                <div
                    onClick={() => props.addColorSwatch("hat")}
                    className="h-14 w-16 rounded-none cursor-pointer"
                    style={{ backgroundColor: props.hatColor }}
                ></div>
            </div>
            <div className="">
                <div
                    onClick={() => props.addColorSwatch("top")}
                    className="h-14 w-16 rounded-none cursor-pointer"
                    style={{ backgroundColor: props.topColor }}
                ></div>
            </div>
            <div className="">
                <div
                    onClick={() => props.addColorSwatch("bottom")}
                    className="h-14 w-16 rounded-none cursor-pointer"
                    style={{ backgroundColor: props.bottomColor }}
                ></div>
            </div>
            <div className="">
                <div
                    onClick={() => props.addColorSwatch("shoes")}
                    className="h-14 w-16 rounded-none cursor-pointer"
                    style={{ backgroundColor: props.shoeColor }}
                ></div>
            </div>
        </>
    );

}