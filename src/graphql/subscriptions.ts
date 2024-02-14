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
export const onUpdateGarment = /* GraphQL */ `
  subscription OnUpdateGarment(
    $filter: ModelSubscriptionGarmentFilterInput
    $owner: String
  ) {
    onUpdateGarment(filter: $filter, owner: $owner) {
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
export const onDeleteGarment = /* GraphQL */ `
  subscription OnDeleteGarment(
    $filter: ModelSubscriptionGarmentFilterInput
    $owner: String
  ) {
    onDeleteGarment(filter: $filter, owner: $owner) {
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
export const onCreateOutfit = /* GraphQL */ `
  subscription OnCreateOutfit(
    $filter: ModelSubscriptionOutfitFilterInput
    $owner: String
  ) {
    onCreateOutfit(filter: $filter, owner: $owner) {
      id
      hatId
      topId
      bottomId
      shoeId
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateOutfit = /* GraphQL */ `
  subscription OnUpdateOutfit(
    $filter: ModelSubscriptionOutfitFilterInput
    $owner: String
  ) {
    onUpdateOutfit(filter: $filter, owner: $owner) {
      id
      hatId
      topId
      bottomId
      shoeId
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteOutfit = /* GraphQL */ `
  subscription OnDeleteOutfit(
    $filter: ModelSubscriptionOutfitFilterInput
    $owner: String
  ) {
    onDeleteOutfit(filter: $filter, owner: $owner) {
      id
      hatId
      topId
      bottomId
      shoeId
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateGroup = /* GraphQL */ `
  subscription OnCreateGroup(
    $filter: ModelSubscriptionGroupFilterInput
    $owner: String
  ) {
    onCreateGroup(filter: $filter, owner: $owner) {
      id
      name
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateGroup = /* GraphQL */ `
  subscription OnUpdateGroup(
    $filter: ModelSubscriptionGroupFilterInput
    $owner: String
  ) {
    onUpdateGroup(filter: $filter, owner: $owner) {
      id
      name
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteGroup = /* GraphQL */ `
  subscription OnDeleteGroup(
    $filter: ModelSubscriptionGroupFilterInput
    $owner: String
  ) {
    onDeleteGroup(filter: $filter, owner: $owner) {
      id
      name
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateGroupAssignment = /* GraphQL */ `
  subscription OnCreateGroupAssignment(
    $filter: ModelSubscriptionGroupAssignmentFilterInput
    $owner: String
  ) {
    onCreateGroupAssignment(filter: $filter, owner: $owner) {
      id
      groupId
      garmentId
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateGroupAssignment = /* GraphQL */ `
  subscription OnUpdateGroupAssignment(
    $filter: ModelSubscriptionGroupAssignmentFilterInput
    $owner: String
  ) {
    onUpdateGroupAssignment(filter: $filter, owner: $owner) {
      id
      groupId
      garmentId
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteGroupAssignment = /* GraphQL */ `
  subscription OnDeleteGroupAssignment(
    $filter: ModelSubscriptionGroupAssignmentFilterInput
    $owner: String
  ) {
    onDeleteGroupAssignment(filter: $filter, owner: $owner) {
      id
      groupId
      garmentId
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
