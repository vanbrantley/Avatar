import { Garment } from "@/API";
import { GarmentType, GarmentTypeStrings } from "./types";

export function groupByArea(garments: Garment[]): { [key: string]: Garment[] } {

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

};

export function generateDynamicName(selectedColor: string, brand: string | null | undefined, selectedCategory: GarmentType): string {
    return `${selectedColor}${brand ? ` ${brand}` : ''} ${GarmentTypeStrings[selectedCategory]}`;
};