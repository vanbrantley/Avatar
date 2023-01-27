/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOutfit = /* GraphQL */ `
  query GetOutfit($id: ID!) {
    getOutfit(id: $id) {
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
export const listOutfits = /* GraphQL */ `
  query ListOutfits(
    $filter: ModelOutfitFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOutfits(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        garments {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getGarment = /* GraphQL */ `
  query GetGarment($id: ID!) {
    getGarment(id: $id) {
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
export const listGarments = /* GraphQL */ `
  query ListGarments(
    $filter: ModelGarmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGarments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getGarmentAssignments = /* GraphQL */ `
  query GetGarmentAssignments($id: ID!) {
    getGarmentAssignments(id: $id) {
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
export const listGarmentAssignments = /* GraphQL */ `
  query ListGarmentAssignments(
    $filter: ModelGarmentAssignmentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGarmentAssignments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        outfitId
        garmentId
        outfit {
          id
          name
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
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const garmentAssignmentsByOutfitId = /* GraphQL */ `
  query GarmentAssignmentsByOutfitId(
    $outfitId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelGarmentAssignmentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    garmentAssignmentsByOutfitId(
      outfitId: $outfitId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        outfitId
        garmentId
        outfit {
          id
          name
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
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const garmentAssignmentsByGarmentId = /* GraphQL */ `
  query GarmentAssignmentsByGarmentId(
    $garmentId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelGarmentAssignmentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    garmentAssignmentsByGarmentId(
      garmentId: $garmentId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        outfitId
        garmentId
        outfit {
          id
          name
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
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
