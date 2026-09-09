import * as migration_20260512_141245 from './20260512_141245';
import * as migration_20260909_084110_add_collection_templates from './20260909_084110_add_collection_templates';

export const migrations = [
  {
    up: migration_20260512_141245.up,
    down: migration_20260512_141245.down,
    name: '20260512_141245',
  },
  {
    up: migration_20260909_084110_add_collection_templates.up,
    down: migration_20260909_084110_add_collection_templates.down,
    name: '20260909_084110_add_collection_templates'
  },
];
