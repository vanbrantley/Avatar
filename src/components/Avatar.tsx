export interface IAvatarProps {
    hatColor: string,
    faceColor: string,
    topColor: string,
    bottomColor: string,
    shoeColor: string,
    handleAreaChange: (area: string) => void
}

export default function Avatar(props: IAvatarProps) {

    return (
        <div className="grid gap-0">
            <div
                onClick={() => props.handleAreaChange("hat")}
                className="h-10 w-16 mx-auto cursor-pointer"
                style={{ backgroundColor: props.hatColor, borderTopLeftRadius: "60% 90%", borderTopRightRadius: "60% 90%" }}
            ></div>
            <div
                onClick={() => props.handleAreaChange("face")}
                className="mx-auto cursor-pointer"
                style={{ backgroundColor: props.faceColor, height: "55px", width: "60px", borderBottomLeftRadius: "120%", borderBottomRightRadius: "120%" }}
            ></div>
            <div
                onClick={() => props.handleAreaChange("top")}
                className="h-44 w-32 mx-auto cursor-pointer"
                style={{ backgroundColor: props.topColor, borderTopLeftRadius: "30%", borderTopRightRadius: "30%" }}
            ></div>
            <div
                onClick={() => props.handleAreaChange("bottom")}
                className="h-44 w-32 mx-auto cursor-pointer"
                style={{ backgroundColor: props.bottomColor }}
            ></div>
            <div
                onClick={() => props.handleAreaChange("shoes")}
                className="h-14 w-44 mx-auto rounded-full cursor-pointer"
                style={{ backgroundColor: props.shoeColor }}
            ></div>
        </div>
    );
}