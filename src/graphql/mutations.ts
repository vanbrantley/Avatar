/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createOutfit = /* GraphQL */ `
  mutation CreateOutfit(
    $input: CreateOutfitInput!
    $condition: ModelOutfitConditionInput
  ) {
    createOutfit(input: $input, condition: $condition) {
      id
      garments {
        items {
          id
          outfitId
          garmentId
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
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
      garments {
        items {
          id
          outfitId
          garmentId
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
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
      garments {
        items {
          id
          outfitId
          garmentId
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createGarment = /* GraphQL */ `
  mutation CreateGarment(
    $input: CreateGarmentInput!
    $condition: ModelGarmentConditionInput
  ) {
    createGarment(input: $input, condition: $condition) {
      id
      color
      area
      outfits {
        items {
          id
          outfitId
          garmentId
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
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
      color
      area
      outfits {
        items {
          id
          outfitId
          garmentId
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
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
      color
      area
      outfits {
        items {
          id
          outfitId
          garmentId
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
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
    }
  }
`;
export const createGarmentAssignments = /* GraphQL */ `
  mutation CreateGarmentAssignments(
    $input: CreateGarmentAssignmentsInput!
    $condition: ModelGarmentAssignmentsConditionInput
  ) {
    createGarmentAssignments(input: $input, condition: $condition) {
      id
      outfitId
      garmentId
      outfit {
        id
        garments {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      garment {
        id
        color
        area
        outfits {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateGarmentAssignments = /* GraphQL */ `
  mutation UpdateGarmentAssignments(
    $input: UpdateGarmentAssignmentsInput!
    $condition: ModelGarmentAssignmentsConditionInput
  ) {
    updateGarmentAssignments(input: $input, condition: $condition) {
      id
      outfitId
      garmentId
      outfit {
        id
        garments {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      garment {
        id
        color
        area
        outfits {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteGarmentAssignments = /* GraphQL */ `
  mutation DeleteGarmentAssignments(
    $input: DeleteGarmentAssignmentsInput!
    $condition: ModelGarmentAssignmentsConditionInput
  ) {
    deleteGarmentAssignments(input: $input, condition: $condition) {
      id
      outfitId
      garmentId
      outfit {
        id
        garments {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      garment {
        id
        color
        area
        outfits {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
