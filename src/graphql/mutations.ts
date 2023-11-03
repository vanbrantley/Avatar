/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGarment = /* GraphQL */ `
  mutation CreateGarment(
    $input: CreateGarmentInput!
    $condition: ModelGarmentConditionInput
  ) {
    createGarment(input: $input, condition: $condition) {
      id
      area
      color
      brand
      name
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateGarment = /* GraphQL */ `
  mutation UpdateGarment(
    $input: UpdateGarmentInput!
    $condition: ModelGarmentConditionInput
  ) {
    updateGarment(input: $input, condition: $condition) {
      id
      area
      color
      brand
      name
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteGarment = /* GraphQL */ `
  mutation DeleteGarment(
    $input: DeleteGarmentInput!
    $condition: ModelGarmentConditionInput
  ) {
    deleteGarment(input: $input, condition: $condition) {
      id
      area
      color
      brand
      name
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createPalette = /* GraphQL */ `
  mutation CreatePalette(
    $input: CreatePaletteInput!
    $condition: ModelPaletteConditionInput
  ) {
    createPalette(input: $input, condition: $condition) {
      id
      hatColor
      topColor
      bottomColor
      shoeColor
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updatePalette = /* GraphQL */ `
  mutation UpdatePalette(
    $input: UpdatePaletteInput!
    $condition: ModelPaletteConditionInput
  ) {
    updatePalette(input: $input, condition: $condition) {
      id
      hatColor
      topColor
      bottomColor
      shoeColor
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deletePalette = /* GraphQL */ `
  mutation DeletePalette(
    $input: DeletePaletteInput!
    $condition: ModelPaletteConditionInput
  ) {
    deletePalette(input: $input, condition: $condition) {
      id
      hatColor
      topColor
      bottomColor
      shoeColor
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createComplexion = /* GraphQL */ `
  mutation CreateComplexion(
    $input: CreateComplexionInput!
    $condition: ModelComplexionConditionInput
  ) {
    createComplexion(input: $input, condition: $condition) {
      id
      complexion
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateComplexion = /* GraphQL */ `
  mutation UpdateComplexion(
    $input: UpdateComplexionInput!
    $condition: ModelComplexionConditionInput
  ) {
    updateComplexion(input: $input, condition: $condition) {
      id
      complexion
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteComplexion = /* GraphQL */ `
  mutation DeleteComplexion(
    $input: DeleteComplexionInput!
    $condition: ModelComplexionConditionInput
  ) {
    deleteComplexion(input: $input, condition: $condition) {
      id
      complexion
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
