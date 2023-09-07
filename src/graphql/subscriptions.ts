/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGarment = /* GraphQL */ `
  subscription OnCreateGarment(
    $filter: ModelSubscriptionGarmentFilterInput
    $owner: String
  ) {
    onCreateGarment(filter: $filter, owner: $owner) {
      id
      color
      area
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateGarment = /* GraphQL */ `
  subscription OnUpdateGarment(
    $filter: ModelSubscriptionGarmentFilterInput
    $owner: String
  ) {
    onUpdateGarment(filter: $filter, owner: $owner) {
      id
      color
      area
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteGarment = /* GraphQL */ `
  subscription OnDeleteGarment(
    $filter: ModelSubscriptionGarmentFilterInput
    $owner: String
  ) {
    onDeleteGarment(filter: $filter, owner: $owner) {
      id
      color
      area
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreatePalette = /* GraphQL */ `
  subscription OnCreatePalette(
    $filter: ModelSubscriptionPaletteFilterInput
    $owner: String
  ) {
    onCreatePalette(filter: $filter, owner: $owner) {
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
export const onUpdatePalette = /* GraphQL */ `
  subscription OnUpdatePalette(
    $filter: ModelSubscriptionPaletteFilterInput
    $owner: String
  ) {
    onUpdatePalette(filter: $filter, owner: $owner) {
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
export const onDeletePalette = /* GraphQL */ `
  subscription OnDeletePalette(
    $filter: ModelSubscriptionPaletteFilterInput
    $owner: String
  ) {
    onDeletePalette(filter: $filter, owner: $owner) {
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
export const onCreateComplexion = /* GraphQL */ `
  subscription OnCreateComplexion(
    $filter: ModelSubscriptionComplexionFilterInput
    $owner: String
  ) {
    onCreateComplexion(filter: $filter, owner: $owner) {
      id
      complexion
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateComplexion = /* GraphQL */ `
  subscription OnUpdateComplexion(
    $filter: ModelSubscriptionComplexionFilterInput
    $owner: String
  ) {
    onUpdateComplexion(filter: $filter, owner: $owner) {
      id
      complexion
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteComplexion = /* GraphQL */ `
  subscription OnDeleteComplexion(
    $filter: ModelSubscriptionComplexionFilterInput
    $owner: String
  ) {
    onDeleteComplexion(filter: $filter, owner: $owner) {
      id
      complexion
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
