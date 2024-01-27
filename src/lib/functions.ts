import { GarmentType, GarmentTypeStrings } from "./types";

export function generateDynamicName(selectedColor: string, brand: string | null | undefined, selectedCategory: GarmentType): string {
    return `${selectedColor}${brand ? ` ${brand}` : ''} ${GarmentTypeStrings[selectedCategory]}`;
};