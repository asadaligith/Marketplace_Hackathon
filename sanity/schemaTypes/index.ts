import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import orders from './orders'
import contact from './contact'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product , orders ,contact],
}
