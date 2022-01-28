import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type MaterielsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ClientsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Materiels {
  readonly id: string;
  readonly marque?: string;
  readonly type?: string;
  readonly numero_serie?: string;
  readonly clientsID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Materiels, MaterielsMetaData>);
  static copyOf(source: Materiels, mutator: (draft: MutableModel<Materiels, MaterielsMetaData>) => MutableModel<Materiels, MaterielsMetaData> | void): Materiels;
}

export declare class Clients {
  readonly id: string;
  readonly nom?: string;
  readonly prenom?: string;
  readonly email?: string;
  readonly adresse?: string;
  readonly code_postale?: string;
  readonly ville?: string;
  readonly telephone?: string;
  readonly Materiels?: (Materiels | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Clients, ClientsMetaData>);
  static copyOf(source: Clients, mutator: (draft: MutableModel<Clients, ClientsMetaData>) => MutableModel<Clients, ClientsMetaData> | void): Clients;
}