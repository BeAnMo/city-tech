import { intersect, multipleIntersect } from './arrays';
import { createMetonymRXs as createRXs } from './regexes';
import { objectArrayToObject as createIndexes } from './term-indexes';
import { extractPaths } from './paths';
import { presentTermsWithKey, createRegExp } from './words';

/* data processing functions */

export {
    intersect,
    multipleIntersect,
    createRXs,
    createIndexes,
    extractPaths,
    presentTermsWithKey,
    createRegExp
}