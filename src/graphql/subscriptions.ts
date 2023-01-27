/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateOutfit = /* GraphQL */ `
  subscription OnCreateOutfit(
    $filter: ModelSubscriptionOutfitFilterInput
    $owner: String
  ) {
    onCreateOutfit(filter: $filter, owner: $owner) {
      id
      name
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
export const onUpdateOutfit = /* GraphQL */ `
  subscription OnUpdateOutfit(
    $filter: ModelSubscriptionOutfitFilterInput
    $owner: String
  ) {
    onUpdateOutfit(filter: $filter, owner: $owner) {
      id
      name
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
export const onDeleteOutfit = /* GraphQL */ `
  subscription OnDeleteOutfit(
    $filter: ModelSubscriptionOutfitFilterInput
    $owner: String
  ) {
    onDeleteOutfit(filter: $filter, owner: $owner) {
      id
      name
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
export const onCreateGarment = /* GraphQL */ `
  subscription OnCreateGarment(
    $filter: ModelSubscriptionGarmentFilterInput
    $owner: String
  ) {
    onCreateGarment(filter: $filter, owner: $owner) {
      id
      name
      brand
      color
      own
      type
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
export const onUpdateGarment = /* GraphQL */ `
  subscription OnUpdateGarment(
    $filter: ModelSubscriptionGarmentFilterInput
    $owner: String
  ) {
    onUpdateGarment(filter: $filter, owner: $owner) {
      id
      name
      brand
      color
      own
      type
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
export const onDeleteGarment = /* GraphQL */ `
  subscription OnDeleteGarment(
    $filter: ModelSubscriptionGarmentFilterInput
    $owner: String
  ) {
    onDeleteGarment(filter: $filter, owner: $owner) {
      id
      name
      brand
      color
      own
      type
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
export const onCreateGarmentAssignments = /* GraphQL */ `
  subscription OnCreateGarmentAssignments(
    $filter: ModelSubscriptionGarmentAssignmentsFilterInput
    $owner: String
  ) {
    onCreateGarmentAssignments(filter: $filter, owner: $owner) {
      id
      outfitId
      garmentId
      outfit {
        id
        name
        garments {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      garment {
        id
        name
        brand
        color
        own
        type
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
export const onUpdateGarmentAssignments = /* GraphQL */ `
  subscription OnUpdateGarmentAssignments(
    $filter: ModelSubscriptionGarmentAssignmentsFilterInput
    $owner: String
  ) {
    onUpdateGarmentAssignments(filter: $filter, owner: $owner) {
      id
      outfitId
      garmentId
      outfit {
        id
        name
        garments {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      garment {
        id
        name
        brand
        color
        own
        type
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
export const onDeleteGarmentAssignments = /* GraphQL */ `
  subscription OnDeleteGarmentAssignments(
    $filter: ModelSubscriptionGarmentAssignmentsFilterInput
    $owner: String
  ) {
    onDeleteGarmentAssignments(filter: $filter, owner: $owner) {
      id
      outfitId
      garmentId
      outfit {
        id
        name
        garments {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      garment {
        id
        name
        brand
        color
        own
        type
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
