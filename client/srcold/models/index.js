// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Materiels, Clients } = initSchema(schema);

export {
  Materiels,
  Clients
};