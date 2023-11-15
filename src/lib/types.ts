import { Garment } from "@/API";

export enum Layout {
    Desktop,
    Mobile,
    Tablet
};

export enum Mode {
    Closet,
    Preview,
    Add,
    Details,
    Outfit
};

export enum GarmentType {
    Hat,
    Top,
    Bottom,
    Shoe
};

export const GarmentTypeStrings: Record<GarmentType, string> = {
    [GarmentType.Hat]: "hat",
    [GarmentType.Top]: "top",
    [GarmentType.Bottom]: "bottom",
    [GarmentType.Shoe]: "shoe",
};

export type Outfit = {
    id: string;
    hatId: string;
    topId: string;
    bottomId: string;
    shoeId: string;
};

export type EmbeddedOutfit = {
    id: string;
    hat: Garment;
    top: Garment;
    bottom: Garment;
    shoe: Garment;
};