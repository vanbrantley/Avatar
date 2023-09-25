/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateGarmentInput = {
  id?: string | null,
  color: string,
  area: string,
  own: boolean,
};

export type ModelGarmentConditionInput = {
  color?: ModelStringInput | null,
  area?: ModelStringInput | null,
  own?: ModelBooleanInput | null,
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

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Garment = {
  __typename: "Garment",
  id: string,
  color: string,
  area: string,
  own: boolean,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateGarmentInput = {
  id: string,
  color?: string | null,
  area?: string | null,
  own?: boolean | null,
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

export type CreateComplexionInput = {
  id?: string | null,
  complexion: string,
};

export type ModelComplexionConditionInput = {
  complexion?: ModelStringInput | null,
  and?: Array< ModelComplexionConditionInput | null > | null,
  or?: Array< ModelComplexionConditionInput | null > | null,
  not?: ModelComplexionConditionInput | null,
};

export type Complexion = {
  __typename: "Complexion",
  id: string,
  complexion: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateComplexionInput = {
  id: string,
  complexion?: string | null,
};

export type DeleteComplexionInput = {
  id: string,
};

export type ModelGarmentFilterInput = {
  id?: ModelIDInput | null,
  color?: ModelStringInput | null,
  area?: ModelStringInput | null,
  own?: ModelBooleanInput | null,
  and?: Array< ModelGarmentFilterInput | null > | null,
  or?: Array< ModelGarmentFilterInput | null > | null,
  not?: ModelGarmentFilterInput | null,
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

export type ModelComplexionFilterInput = {
  id?: ModelIDInput | null,
  complexion?: ModelStringInput | null,
  and?: Array< ModelComplexionFilterInput | null > | null,
  or?: Array< ModelComplexionFilterInput | null > | null,
  not?: ModelComplexionFilterInput | null,
};

export type ModelComplexionConnection = {
  __typename: "ModelComplexionConnection",
  items:  Array<Complexion | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionGarmentFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  color?: ModelSubscriptionStringInput | null,
  area?: ModelSubscriptionStringInput | null,
  own?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionGarmentFilterInput | null > | null,
  or?: Array< ModelSubscriptionGarmentFilterInput | null > | null,
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

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
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

export type ModelSubscriptionComplexionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  complexion?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionComplexionFilterInput | null > | null,
  or?: Array< ModelSubscriptionComplexionFilterInput | null > | null,
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
    own: boolean,
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
    own: boolean,
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
    own: boolean,
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

export type CreateComplexionMutationVariables = {
  input: CreateComplexionInput,
  condition?: ModelComplexionConditionInput | null,
};

export type CreateComplexionMutation = {
  createComplexion?:  {
    __typename: "Complexion",
    id: string,
    complexion: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateComplexionMutationVariables = {
  input: UpdateComplexionInput,
  condition?: ModelComplexionConditionInput | null,
};

export type UpdateComplexionMutation = {
  updateComplexion?:  {
    __typename: "Complexion",
    id: string,
    complexion: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteComplexionMutationVariables = {
  input: DeleteComplexionInput,
  condition?: ModelComplexionConditionInput | null,
};

export type DeleteComplexionMutation = {
  deleteComplexion?:  {
    __typename: "Complexion",
    id: string,
    complexion: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    own: boolean,
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
      own: boolean,
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

export type GetComplexionQueryVariables = {
  id: string,
};

export type GetComplexionQuery = {
  getComplexion?:  {
    __typename: "Complexion",
    id: string,
    complexion: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListComplexionsQueryVariables = {
  filter?: ModelComplexionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListComplexionsQuery = {
  listComplexions?:  {
    __typename: "ModelComplexionConnection",
    items:  Array< {
      __typename: "Complexion",
      id: string,
      complexion: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
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
    own: boolean,
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
    own: boolean,
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
    own: boolean,
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

export type OnCreateComplexionSubscriptionVariables = {
  filter?: ModelSubscriptionComplexionFilterInput | null,
  owner?: string | null,
};

export type OnCreateComplexionSubscription = {
  onCreateComplexion?:  {
    __typename: "Complexion",
    id: string,
    complexion: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateComplexionSubscriptionVariables = {
  filter?: ModelSubscriptionComplexionFilterInput | null,
  owner?: string | null,
};

export type OnUpdateComplexionSubscription = {
  onUpdateComplexion?:  {
    __typename: "Complexion",
    id: string,
    complexion: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteComplexionSubscriptionVariables = {
  filter?: ModelSubscriptionComplexionFilterInput | null,
  owner?: string | null,
};

export type OnDeleteComplexionSubscription = {
  onDeleteComplexion?:  {
    __typename: "Complexion",
    id: string,
    complexion: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
