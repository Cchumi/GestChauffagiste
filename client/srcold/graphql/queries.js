/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMateriels = /* GraphQL */ `
  query GetMateriels($id: ID!) {
    getMateriels(id: $id) {
      id
      marque
      type
      numero_serie
      clientsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listMateriels = /* GraphQL */ `
  query ListMateriels(
    $filter: ModelMaterielsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMateriels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        marque
        type
        numero_serie
        clientsID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncMateriels = /* GraphQL */ `
  query SyncMateriels(
    $filter: ModelMaterielsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMateriels(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        marque
        type
        numero_serie
        clientsID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getClients = /* GraphQL */ `
  query GetClients($id: ID!) {
    getClients(id: $id) {
      id
      nom
      prenom
      email
      adresse
      code_postale
      ville
      telephone
      Materiels {
        items {
          id
          marque
          type
          numero_serie
          clientsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listClients = /* GraphQL */ `
  query ListClients(
    $filter: ModelClientsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nom
        prenom
        email
        adresse
        code_postale
        ville
        telephone
        Materiels {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncClients = /* GraphQL */ `
  query SyncClients(
    $filter: ModelClientsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncClients(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        nom
        prenom
        email
        adresse
        code_postale
        ville
        telephone
        Materiels {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
