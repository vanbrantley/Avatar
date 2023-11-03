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
    Lab
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