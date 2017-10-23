import { createMetonymRXs as createRXs } from './regex-creation';
import { intersect } from './array-processing.js';
import { objectArrayToObject as createIndexes } from './index-creation';
import { extractPaths } from './object-path-extraction';

/**** Data processing ****/

export {
    createRXs,
    intersect,
    createIndexes,
    extractPaths
}