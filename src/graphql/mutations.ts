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
export const createOutfit = /* GraphQL */ `
  mutation CreateOutfit(
    $input: CreateOutfitInput!
    $condition: ModelOutfitConditionInput
  ) {
    createOutfit(input: $input, condition: $condition) {
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
export const updateOutfit = /* GraphQL */ `
  mutation UpdateOutfit(
    $input: UpdateOutfitInput!
    $condition: ModelOutfitConditionInput
  ) {
    updateOutfit(input: $input, condition: $condition) {
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
export const deleteOutfit = /* GraphQL */ `
  mutation DeleteOutfit(
    $input: DeleteOutfitInput!
    $condition: ModelOutfitConditionInput
  ) {
    deleteOutfit(input: $input, condition: $condition) {
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
export const createGroup = /* GraphQL */ `
  mutation CreateGroup(
    $input: CreateGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    createGroup(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateGroup = /* GraphQL */ `
  mutation UpdateGroup(
    $input: UpdateGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    updateGroup(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteGroup = /* GraphQL */ `
  mutation DeleteGroup(
    $input: DeleteGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    deleteGroup(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createGroupAssignment = /* GraphQL */ `
  mutation CreateGroupAssignment(
    $input: CreateGroupAssignmentInput!
    $condition: ModelGroupAssignmentConditionInput
  ) {
    createGroupAssignment(input: $input, condition: $condition) {
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
export const updateGroupAssignment = /* GraphQL */ `
  mutation UpdateGroupAssignment(
    $input: UpdateGroupAssignmentInput!
    $condition: ModelGroupAssignmentConditionInput
  ) {
    updateGroupAssignment(input: $input, condition: $condition) {
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
export const deleteGroupAssignment = /* GraphQL */ `
  mutation DeleteGroupAssignment(
    $input: DeleteGroupAssignmentInput!
    $condition: ModelGroupAssignmentConditionInput
  ) {
    deleteGroupAssignment(input: $input, condition: $condition) {
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
