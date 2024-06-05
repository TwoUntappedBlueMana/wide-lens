import { startCase, camelCase, orderBy } from 'lodash';

export function toTitleCase(str: string) {
    return startCase(camelCase(str));
}

export function sortMovesAlphabetically(moves) {
    return orderBy(moves, [move => move.move.name]);
}