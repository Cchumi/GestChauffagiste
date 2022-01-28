/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMateriels = /* GraphQL */ `
  subscription OnCreateMateriels {
    onCreateMateriels {
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
export const onUpdateMateriels = /* GraphQL */ `
  subscription OnUpdateMateriels {
    onUpdateMateriels {
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
export const onDeleteMateriels = /* GraphQL */ `
  subscription OnDeleteMateriels {
    onDeleteMateriels {
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
export const onCreateClients = /* GraphQL */ `
  subscription OnCreateClients {
    onCreateClients {
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
export const onUpdateClients = /* GraphQL */ `
  subscription OnUpdateClients {
    onUpdateClients {
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
export const onDeleteClients = /* GraphQL */ `
  subscription OnDeleteClients {
    onDeleteClients {
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
