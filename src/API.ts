/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateOutfitInput = {
  id?: string | null,
};

export type ModelOutfitConditionInput = {
  and?: Array< ModelOutfitConditionInput | null > | null,
  or?: Array< ModelOutfitConditionInput | null > | null,
  not?: ModelOutfitConditionInput | null,
};

export type Outfit = {
  __typename: "Outfit",
  id: string,
  garments?: ModelGarmentAssignmentsConnection | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type ModelGarmentAssignmentsConnection = {
  __typename: "ModelGarmentAssignmentsConnection",
  items:  Array<GarmentAssignments | null >,
  nextToken?: string | null,
};

export type GarmentAssignments = {
  __typename: "GarmentAssignments",
  id: string,
  outfitId: string,
  garmentId: string,
  outfit: Outfit,
  garment: Garment,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type Garment = {
  __typename: "Garment",
  id: string,
  color: string,
  area: string,
  outfits?: ModelGarmentAssignmentsConnection | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateOutfitInput = {
  id: string,
};

export type DeleteOutfitInput = {
  id: string,
};

export type CreateGarmentInput = {
  id?: string | null,
  color: string,
  area: string,
};

export type ModelGarmentConditionInput = {
  color?: ModelStringInput | null,
  area?: ModelStringInput | null,
  and?: Array< ModelGarmentConditionInput | null > | null,
  or?: Array< ModelGarmentConditionInput | null > | null,
  not?: ModelGarmentConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateGarmentInput = {
  id: string,
  color?: string | null,
  area?: string | null,
};

export type DeleteGarmentInput = {
  id: string,
};

export type CreatePaletteInput = {
  id?: string | null,
  hatColor: string,
  topColor: string,
  bottomColor: string,
  shoeColor: string,
};

export type ModelPaletteConditionInput = {
  hatColor?: ModelStringInput | null,
  topColor?: ModelStringInput | null,
  bottomColor?: ModelStringInput | null,
  shoeColor?: ModelStringInput | null,
  and?: Array< ModelPaletteConditionInput | null > | null,
  or?: Array< ModelPaletteConditionInput | null > | null,
  not?: ModelPaletteConditionInput | null,
};

export type Palette = {
  __typename: "Palette",
  id: string,
  hatColor: string,
  topColor: string,
  bottomColor: string,
  shoeColor: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdatePaletteInput = {
  id: string,
  hatColor?: string | null,
  topColor?: string | null,
  bottomColor?: string | null,
  shoeColor?: string | null,
};

export type DeletePaletteInput = {
  id: string,
};

export type CreateGarmentAssignmentsInput = {
  id?: string | null,
  outfitId: string,
  garmentId: string,
};

export type ModelGarmentAssignmentsConditionInput = {
  outfitId?: ModelIDInput | null,
  garmentId?: ModelIDInput | null,
  and?: Array< ModelGarmentAssignmentsConditionInput | null > | null,
  or?: Array< ModelGarmentAssignmentsConditionInput | null > | null,
  not?: ModelGarmentAssignmentsConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateGarmentAssignmentsInput = {
  id: string,
  outfitId?: string | null,
  garmentId?: string | null,
};

export type DeleteGarmentAssignmentsInput = {
  id: string,
};

export type ModelOutfitFilterInput = {
  id?: ModelIDInput | null,
  and?: Array< ModelOutfitFilterInput | null > | null,
  or?: Array< ModelOutfitFilterInput | null > | null,
  not?: ModelOutfitFilterInput | null,
};

export type ModelOutfitConnection = {
  __typename: "ModelOutfitConnection",
  items:  Array<Outfit | null >,
  nextToken?: string | null,
};

export type ModelGarmentFilterInput = {
  id?: ModelIDInput | null,
  color?: ModelStringInput | null,
  area?: ModelStringInput | null,
  and?: Array< ModelGarmentFilterInput | null > | null,
  or?: Array< ModelGarmentFilterInput | null > | null,
  not?: ModelGarmentFilterInput | null,
};

export type ModelGarmentConnection = {
  __typename: "ModelGarmentConnection",
  items:  Array<Garment | null >,
  nextToken?: string | null,
};

export type ModelPaletteFilterInput = {
  id?: ModelIDInput | null,
  hatColor?: ModelStringInput | null,
  topColor?: ModelStringInput | null,
  bottomColor?: ModelStringInput | null,
  shoeColor?: ModelStringInput | null,
  and?: Array< ModelPaletteFilterInput | null > | null,
  or?: Array< ModelPaletteFilterInput | null > | null,
  not?: ModelPaletteFilterInput | null,
};

export type ModelPaletteConnection = {
  __typename: "ModelPaletteConnection",
  items:  Array<Palette | null >,
  nextToken?: string | null,
};

export type ModelGarmentAssignmentsFilterInput = {
  id?: ModelIDInput | null,
  outfitId?: ModelIDInput | null,
  garmentId?: ModelIDInput | null,
  and?: Array< ModelGarmentAssignmentsFilterInput | null > | null,
  or?: Array< ModelGarmentAssignmentsFilterInput | null > | null,
  not?: ModelGarmentAssignmentsFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelSubscriptionOutfitFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionOutfitFilterInput | null > | null,
  or?: Array< ModelSubscriptionOutfitFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionGarmentFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  color?: ModelSubscriptionStringInput | null,
  area?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionGarmentFilterInput | null > | null,
  or?: Array< ModelSubscriptionGarmentFilterInput | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionPaletteFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  hatColor?: ModelSubscriptionStringInput | null,
  topColor?: ModelSubscriptionStringInput | null,
  bottomColor?: ModelSubscriptionStringInput | null,
  shoeColor?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPaletteFilterInput | null > | null,
  or?: Array< ModelSubscriptionPaletteFilterInput | null > | null,
};

export type ModelSubscriptionGarmentAssignmentsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  outfitId?: ModelSubscriptionIDInput | null,
  garmentId?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionGarmentAssignmentsFilterInput | null > | null,
  or?: Array< ModelSubscriptionGarmentAssignmentsFilterInput | null > | null,
};

export type CreateOutfitMutationVariables = {
  input: CreateOutfitInput,
  condition?: ModelOutfitConditionInput | null,
};

export type CreateOutfitMutation = {
  createOutfit?:  {
    __typename: "Outfit",
    id: string,
    garments?:  {
      __typename: "ModelGarmentAssignmentsConnection",
      items:  Array< {
        __typename: "GarmentAssignments",
        id: string,
        outfitId: string,
        garmentId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateOutfitMutationVariables = {
  input: UpdateOutfitInput,
  condition?: ModelOutfitConditionInput | null,
};

export type UpdateOutfitMutation = {
  updateOutfit?:  {
    __typename: "Outfit",
    id: string,
    garments?:  {
      __typename: "ModelGarmentAssignmentsConnection",
      items:  Array< {
        __typename: "GarmentAssignments",
        id: string,
        outfitId: string,
        garmentId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteOutfitMutationVariables = {
  input: DeleteOutfitInput,
  condition?: ModelOutfitConditionInput | null,
};

export type DeleteOutfitMutation = {
  deleteOutfit?:  {
    __typename: "Outfit",
    id: string,
    garments?:  {
      __typename: "ModelGarmentAssignmentsConnection",
      items:  Array< {
        __typename: "GarmentAssignments",
        id: string,
        outfitId: string,
        garmentId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateGarmentMutationVariables = {
  input: CreateGarmentInput,
  condition?: ModelGarmentConditionInput | null,
};

export type CreateGarmentMutation = {
  createGarment?:  {
    __typename: "Garment",
    id: string,
    color: string,
    area: string,
    outfits?:  {
      __typename: "ModelGarmentAssignmentsConnection",
      items:  Array< {
        __typename: "GarmentAssignments",
        id: string,
        outfitId: string,
        garmentId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateGarmentMutationVariables = {
  input: UpdateGarmentInput,
  condition?: ModelGarmentConditionInput | null,
};

export type UpdateGarmentMutation = {
  updateGarment?:  {
    __typename: "Garment",
    id: string,
    color: string,
    area: string,
    outfits?:  {
      __typename: "ModelGarmentAssignmentsConnection",
      items:  Array< {
        __typename: "GarmentAssignments",
        id: string,
        outfitId: string,
        garmentId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteGarmentMutationVariables = {
  input: DeleteGarmentInput,
  condition?: ModelGarmentConditionInput | null,
};

export type DeleteGarmentMutation = {
  deleteGarment?:  {
    __typename: "Garment",
    id: string,
    color: string,
    area: string,
    outfits?:  {
      __typename: "ModelGarmentAssignmentsConnection",
      items:  Array< {
        __typename: "GarmentAssignments",
        id: string,
        outfitId: string,
        garmentId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreatePaletteMutationVariables = {
  input: CreatePaletteInput,
  condition?: ModelPaletteConditionInput | null,
};

export type CreatePaletteMutation = {
  createPalette?:  {
    __typename: "Palette",
    id: string,
    hatColor: string,
    topColor: string,
    bottomColor: string,
    shoeColor: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdatePaletteMutationVariables = {
  input: UpdatePaletteInput,
  condition?: ModelPaletteConditionInput | null,
};

export type UpdatePaletteMutation = {
  updatePalette?:  {
    __typename: "Palette",
    id: string,
    hatColor: string,
    topColor: string,
    bottomColor: string,
    shoeColor: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeletePaletteMutationVariables = {
  input: DeletePaletteInput,
  condition?: ModelPaletteConditionInput | null,
};

export type DeletePaletteMutation = {
  deletePalette?:  {
    __typename: "Palette",
    id: string,
    hatColor: string,
    topColor: string,
    bottomColor: string,
    shoeColor: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateGarmentAssignmentsMutationVariables = {
  input: CreateGarmentAssignmentsInput,
  condition?: ModelGarmentAssignmentsConditionInput | null,
};

export type CreateGarmentAssignmentsMutation = {
  createGarmentAssignments?:  {
    __typename: "GarmentAssignments",
    id: string,
    outfitId: string,
    garmentId: string,
    outfit:  {
      __typename: "Outfit",
      id: string,
      garments?:  {
        __typename: "ModelGarmentAssignmentsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    garment:  {
      __typename: "Garment",
      id: string,
      color: string,
      area: string,
      outfits?:  {
        __typename: "ModelGarmentAssignmentsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateGarmentAssignmentsMutationVariables = {
  input: UpdateGarmentAssignmentsInput,
  condition?: ModelGarmentAssignmentsConditionInput | null,
};

export type UpdateGarmentAssignmentsMutation = {
  updateGarmentAssignments?:  {
    __typename: "GarmentAssignments",
    id: string,
    outfitId: string,
    garmentId: string,
    outfit:  {
      __typename: "Outfit",
      id: string,
      garments?:  {
        __typename: "ModelGarmentAssignmentsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    garment:  {
      __typename: "Garment",
      id: string,
      color: string,
      area: string,
      outfits?:  {
        __typename: "ModelGarmentAssignmentsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteGarmentAssignmentsMutationVariables = {
  input: DeleteGarmentAssignmentsInput,
  condition?: ModelGarmentAssignmentsConditionInput | null,
};

export type DeleteGarmentAssignmentsMutation = {
  deleteGarmentAssignments?:  {
    __typename: "GarmentAssignments",
    id: string,
    outfitId: string,
    garmentId: string,
    outfit:  {
      __typename: "Outfit",
      id: string,
      garments?:  {
        __typename: "ModelGarmentAssignmentsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    garment:  {
      __typename: "Garment",
      id: string,
      color: string,
      area: string,
      outfits?:  {
        __typename: "ModelGarmentAssignmentsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetOutfitQueryVariables = {
  id: string,
};

export type GetOutfitQuery = {
  getOutfit?:  {
    __typename: "Outfit",
    id: string,
    garments?:  {
      __typename: "ModelGarmentAssignmentsConnection",
      items:  Array< {
        __typename: "GarmentAssignments",
        id: string,
        outfitId: string,
        garmentId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListOutfitsQueryVariables = {
  filter?: ModelOutfitFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOutfitsQuery = {
  listOutfits?:  {
    __typename: "ModelOutfitConnection",
    items:  Array< {
      __typename: "Outfit",
      id: string,
      garments?:  {
        __typename: "ModelGarmentAssignmentsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetGarmentQueryVariables = {
  id: string,
};

export type GetGarmentQuery = {
  getGarment?:  {
    __typename: "Garment",
    id: string,
    color: string,
    area: string,
    outfits?:  {
      __typename: "ModelGarmentAssignmentsConnection",
      items:  Array< {
        __typename: "GarmentAssignments",
        id: string,
        outfitId: string,
        garmentId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListGarmentsQueryVariables = {
  filter?: ModelGarmentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGarmentsQuery = {
  listGarments?:  {
    __typename: "ModelGarmentConnection",
    items:  Array< {
      __typename: "Garment",
      id: string,
      color: string,
      area: string,
      outfits?:  {
        __typename: "ModelGarmentAssignmentsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPaletteQueryVariables = {
  id: string,
};

export type GetPaletteQuery = {
  getPalette?:  {
    __typename: "Palette",
    id: string,
    hatColor: string,
    topColor: string,
    bottomColor: string,
    shoeColor: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListPalettesQueryVariables = {
  filter?: ModelPaletteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPalettesQuery = {
  listPalettes?:  {
    __typename: "ModelPaletteConnection",
    items:  Array< {
      __typename: "Palette",
      id: string,
      hatColor: string,
      topColor: string,
      bottomColor: string,
      shoeColor: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetGarmentAssignmentsQueryVariables = {
  id: string,
};

export type GetGarmentAssignmentsQuery = {
  getGarmentAssignments?:  {
    __typename: "GarmentAssignments",
    id: string,
    outfitId: string,
    garmentId: string,
    outfit:  {
      __typename: "Outfit",
      id: string,
      garments?:  {
        __typename: "ModelGarmentAssignmentsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    garment:  {
      __typename: "Garment",
      id: string,
      color: string,
      area: string,
      outfits?:  {
        __typename: "ModelGarmentAssignmentsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListGarmentAssignmentsQueryVariables = {
  filter?: ModelGarmentAssignmentsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGarmentAssignmentsQuery = {
  listGarmentAssignments?:  {
    __typename: "ModelGarmentAssignmentsConnection",
    items:  Array< {
      __typename: "GarmentAssignments",
      id: string,
      outfitId: string,
      garmentId: string,
      outfit:  {
        __typename: "Outfit",
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      garment:  {
        __typename: "Garment",
        id: string,
        color: string,
        area: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GarmentAssignmentsByOutfitIdQueryVariables = {
  outfitId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelGarmentAssignmentsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GarmentAssignmentsByOutfitIdQuery = {
  garmentAssignmentsByOutfitId?:  {
    __typename: "ModelGarmentAssignmentsConnection",
    items:  Array< {
      __typename: "GarmentAssignments",
      id: string,
      outfitId: string,
      garmentId: string,
      outfit:  {
        __typename: "Outfit",
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      garment:  {
        __typename: "Garment",
        id: string,
        color: string,
        area: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GarmentAssignmentsByGarmentIdQueryVariables = {
  garmentId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelGarmentAssignmentsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GarmentAssignmentsByGarmentIdQuery = {
  garmentAssignmentsByGarmentId?:  {
    __typename: "ModelGarmentAssignmentsConnection",
    items:  Array< {
      __typename: "GarmentAssignments",
      id: string,
      outfitId: string,
      garmentId: string,
      outfit:  {
        __typename: "Outfit",
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      garment:  {
        __typename: "Garment",
        id: string,
        color: string,
        area: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateOutfitSubscriptionVariables = {
  filter?: ModelSubscriptionOutfitFilterInput | null,
  owner?: string | null,
};

export type OnCreateOutfitSubscription = {
  onCreateOutfit?:  {
    __typename: "Outfit",
    id: string,
    garments?:  {
      __typename: "ModelGarmentAssignmentsConnection",
      items:  Array< {
        __typename: "GarmentAssignments",
        id: string,
        outfitId: string,
        garmentId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateOutfitSubscriptionVariables = {
  filter?: ModelSubscriptionOutfitFilterInput | null,
  owner?: string | null,
};

export type OnUpdateOutfitSubscription = {
  onUpdateOutfit?:  {
    __typename: "Outfit",
    id: string,
    garments?:  {
      __typename: "ModelGarmentAssignmentsConnection",
      items:  Array< {
        __typename: "GarmentAssignments",
        id: string,
        outfitId: string,
        garmentId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteOutfitSubscriptionVariables = {
  filter?: ModelSubscriptionOutfitFilterInput | null,
  owner?: string | null,
};

export type OnDeleteOutfitSubscription = {
  onDeleteOutfit?:  {
    __typename: "Outfit",
    id: string,
    garments?:  {
      __typename: "ModelGarmentAssignmentsConnection",
      items:  Array< {
        __typename: "GarmentAssignments",
        id: string,
        outfitId: string,
        garmentId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateGarmentSubscriptionVariables = {
  filter?: ModelSubscriptionGarmentFilterInput | null,
  owner?: string | null,
};

export type OnCreateGarmentSubscription = {
  onCreateGarment?:  {
    __typename: "Garment",
    id: string,
    color: string,
    area: string,
    outfits?:  {
      __typename: "ModelGarmentAssignmentsConnection",
      items:  Array< {
        __typename: "GarmentAssignments",
        id: string,
        outfitId: string,
        garmentId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateGarmentSubscriptionVariables = {
  filter?: ModelSubscriptionGarmentFilterInput | null,
  owner?: string | null,
};

export type OnUpdateGarmentSubscription = {
  onUpdateGarment?:  {
    __typename: "Garment",
    id: string,
    color: string,
    area: string,
    outfits?:  {
      __typename: "ModelGarmentAssignmentsConnection",
      items:  Array< {
        __typename: "GarmentAssignments",
        id: string,
        outfitId: string,
        garmentId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteGarmentSubscriptionVariables = {
  filter?: ModelSubscriptionGarmentFilterInput | null,
  owner?: string | null,
};

export type OnDeleteGarmentSubscription = {
  onDeleteGarment?:  {
    __typename: "Garment",
    id: string,
    color: string,
    area: string,
    outfits?:  {
      __typename: "ModelGarmentAssignmentsConnection",
      items:  Array< {
        __typename: "GarmentAssignments",
        id: string,
        outfitId: string,
        garmentId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreatePaletteSubscriptionVariables = {
  filter?: ModelSubscriptionPaletteFilterInput | null,
  owner?: string | null,
};

export type OnCreatePaletteSubscription = {
  onCreatePalette?:  {
    __typename: "Palette",
    id: string,
    hatColor: string,
    topColor: string,
    bottomColor: string,
    shoeColor: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdatePaletteSubscriptionVariables = {
  filter?: ModelSubscriptionPaletteFilterInput | null,
  owner?: string | null,
};

export type OnUpdatePaletteSubscription = {
  onUpdatePalette?:  {
    __typename: "Palette",
    id: string,
    hatColor: string,
    topColor: string,
    bottomColor: string,
    shoeColor: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeletePaletteSubscriptionVariables = {
  filter?: ModelSubscriptionPaletteFilterInput | null,
  owner?: string | null,
};

export type OnDeletePaletteSubscription = {
  onDeletePalette?:  {
    __typename: "Palette",
    id: string,
    hatColor: string,
    topColor: string,
    bottomColor: string,
    shoeColor: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateGarmentAssignmentsSubscriptionVariables = {
  filter?: ModelSubscriptionGarmentAssignmentsFilterInput | null,
  owner?: string | null,
};

export type OnCreateGarmentAssignmentsSubscription = {
  onCreateGarmentAssignments?:  {
    __typename: "GarmentAssignments",
    id: string,
    outfitId: string,
    garmentId: string,
    outfit:  {
      __typename: "Outfit",
      id: string,
      garments?:  {
        __typename: "ModelGarmentAssignmentsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    garment:  {
      __typename: "Garment",
      id: string,
      color: string,
      area: string,
      outfits?:  {
        __typename: "ModelGarmentAssignmentsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateGarmentAssignmentsSubscriptionVariables = {
  filter?: ModelSubscriptionGarmentAssignmentsFilterInput | null,
  owner?: string | null,
};

export type OnUpdateGarmentAssignmentsSubscription = {
  onUpdateGarmentAssignments?:  {
    __typename: "GarmentAssignments",
    id: string,
    outfitId: string,
    garmentId: string,
    outfit:  {
      __typename: "Outfit",
      id: string,
      garments?:  {
        __typename: "ModelGarmentAssignmentsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    garment:  {
      __typename: "Garment",
      id: string,
      color: string,
      area: string,
      outfits?:  {
        __typename: "ModelGarmentAssignmentsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteGarmentAssignmentsSubscriptionVariables = {
  filter?: ModelSubscriptionGarmentAssignmentsFilterInput | null,
  owner?: string | null,
};

export type OnDeleteGarmentAssignmentsSubscription = {
  onDeleteGarmentAssignments?:  {
    __typename: "GarmentAssignments",
    id: string,
    outfitId: string,
    garmentId: string,
    outfit:  {
      __typename: "Outfit",
      id: string,
      garments?:  {
        __typename: "ModelGarmentAssignmentsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    garment:  {
      __typename: "Garment",
      id: string,
      color: string,
      area: string,
      outfits?:  {
        __typename: "ModelGarmentAssignmentsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
