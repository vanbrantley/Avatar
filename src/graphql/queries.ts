/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGarment = /* GraphQL */ `
  query GetGarment($id: ID!) {
    getGarment(id: $id) {
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
export const listGarments = /* GraphQL */ `
  query ListGarments(
    $filter: ModelGarmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGarments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getOutfit = /* GraphQL */ `
  query GetOutfit($id: ID!) {
    getOutfit(id: $id) {
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
export const listOutfits = /* GraphQL */ `
  query ListOutfits(
    $filter: ModelOutfitFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOutfits(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getGroup = /* GraphQL */ `
  query GetGroup($id: ID!) {
    getGroup(id: $id) {
      id
      name
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listGroups = /* GraphQL */ `
  query ListGroups(
    $filter: ModelGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getGroupAssignments = /* GraphQL */ `
  query GetGroupAssignments($id: ID!) {
    getGroupAssignments(id: $id) {
      id
      groupId
      garmentId
      area
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listGroupAssignments = /* GraphQL */ `
  query ListGroupAssignments(
    $filter: ModelGroupAssignmentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroupAssignments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        groupId
        garmentId
        area
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPalette = /* GraphQL */ `
  query GetPalette($id: ID!) {
    getPalette(id: $id) {
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
export const listPalettes = /* GraphQL */ `
  query ListPalettes(
    $filter: ModelPaletteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPalettes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getComplexion = /* GraphQL */ `
  query GetComplexion($id: ID!) {
    getComplexion(id: $id) {
      id
      complexion
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listComplexions = /* GraphQL */ `
  query ListComplexions(
    $filter: ModelComplexionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComplexions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        complexion
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
