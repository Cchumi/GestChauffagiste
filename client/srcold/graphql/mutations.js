/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMateriels = /* GraphQL */ `
  mutation CreateMateriels(
    $input: CreateMaterielsInput!
    $condition: ModelMaterielsConditionInput
  ) {
    createMateriels(input: $input, condition: $condition) {
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
export const updateMateriels = /* GraphQL */ `
  mutation UpdateMateriels(
    $input: UpdateMaterielsInput!
    $condition: ModelMaterielsConditionInput
  ) {
    updateMateriels(input: $input, condition: $condition) {
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
export const deleteMateriels = /* GraphQL */ `
  mutation DeleteMateriels(
    $input: DeleteMaterielsInput!
    $condition: ModelMaterielsConditionInput
  ) {
    deleteMateriels(input: $input, condition: $condition) {
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
export const createClients = /* GraphQL */ `
  mutation CreateClients(
    $input: CreateClientsInput!
    $condition: ModelClientsConditionInput
  ) {
    createClients(input: $input, condition: $condition) {
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
export const updateClients = /* GraphQL */ `
  mutation UpdateClients(
    $input: UpdateClientsInput!
    $condition: ModelClientsConditionInput
  ) {
    updateClients(input: $input, condition: $condition) {
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
export const deleteClients = /* GraphQL */ `
  mutation DeleteClients(
    $input: DeleteClientsInput!
    $condition: ModelClientsConditionInput
  ) {
    deleteClients(input: $input, condition: $condition) {
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
