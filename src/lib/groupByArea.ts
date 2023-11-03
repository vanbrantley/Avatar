import { Garment } from "@/API";

export default function groupByArea(garments: Garment[]): { [key: string]: Garment[] } {

    const grouped: { [key: string]: Garment[] } = {
        "hat": [],
        "top": [],
        "bottom": [],
        "shoe": []
    };

    garments.forEach((garment) => {
        const { area } = garment;
        grouped[area].push(garment);
    });

    return grouped;

}