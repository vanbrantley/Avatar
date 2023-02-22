import { Garment } from "@/API";

export default function groupByArea(garments: Garment[]): { [key: string]: string[] } {

    const grouped: { [key: string]: string[] } = {
        "hat": [],
        "top": [],
        "bottom": [],
        "shoe": []
    };

    garments.forEach((garment) => {
        const { area, color } = garment;
        grouped[area].push(color);
    });

    return grouped;

}