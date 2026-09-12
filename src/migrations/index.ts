import * as migration_20260512_141245 from './20260512_141245';
import * as migration_20260909_084110_add_collection_templates from './20260909_084110_add_collection_templates';
import * as migration_20260912_181038_drop_inherits_from from './20260912_181038_drop_inherits_from';

export const migrations = [
  {
    up: migration_20260512_141245.up,
    down: migration_20260512_141245.down,
    name: '20260512_141245',
  },
  {
    up: migration_20260909_084110_add_collection_templates.up,
    down: migration_20260909_084110_add_collection_templates.down,
    name: '20260909_084110_add_collection_templates',
  },
  {
    up: migration_20260912_181038_drop_inherits_from.up,
    down: migration_20260912_181038_drop_inherits_from.down,
    name: '20260912_181038_drop_inherits_from'
  },
];
