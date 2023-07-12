import { Garment } from "@/API";
import { SwatchObject } from '@/lib/types';

export default function groupByArea(garments: Garment[]): { [key: string]: SwatchObject[] } {

    const grouped: { [key: string]: SwatchObject[] } = {
        "hat": [],
        "top": [],
        "bottom": [],
        "shoe": []
    };

    garments.forEach((garment) => {
        const { area, color, id } = garment;
        const swatchObject: SwatchObject = { color: color, id: id };
        grouped[area].push(swatchObject);
    });

    return grouped;

}