import { Dex, Type } from "@pkmn/dex";
import { TypeName } from "@pkmn/types";
import { difference, intersection, union, xor } from "lodash";

const getTypesByRelation = (object: Type["damageTaken"], value: number): string[] => {
    return Object.keys(object).filter((key) => object[key] === value);
};

const calculateQuadDamageFrom = (type1Weaknesses: Type["damageTaken"], type2Weaknesses: Type["damageTaken"]) => {
    return intersection(
        getTypesByRelation(type1Weaknesses, 1),
        getTypesByRelation(type2Weaknesses, 1)
    );
};

const calculateDoubleDamageFrom = (type1Weaknesses: Type["damageTaken"], type2Weaknesses: Type["damageTaken"]) => {
    return difference(
        xor(
            getTypesByRelation(type1Weaknesses, 2),
            getTypesByRelation(type2Weaknesses, 2)
        ),
        getTypesByRelation(type1Weaknesses, 2),
        getTypesByRelation(type2Weaknesses, 2),
        getTypesByRelation(type1Weaknesses, 3),
        getTypesByRelation(type2Weaknesses, 3),
    );
};

const calculateHalfDamageFrom = (type1Weaknesses: Type["damageTaken"], type2Weaknesses: Type["damageTaken"]) => {
    return difference(
        xor(
            getTypesByRelation(type1Weaknesses, 2),
            getTypesByRelation(type2Weaknesses, 2)
        ),
        getTypesByRelation(type1Weaknesses, 1),
        getTypesByRelation(type2Weaknesses, 1),
        getTypesByRelation(type1Weaknesses, 3),
        getTypesByRelation(type2Weaknesses, 3),
    );
};

const calculateQuarterDamageFrom = (type1Weaknesses: Type["damageTaken"], type2Weaknesses: Type["damageTaken"]) => {
    return intersection(
        getTypesByRelation(type1Weaknesses, 2),
        getTypesByRelation(type2Weaknesses, 2)
    );
};

const calculateNoDamageFrom = (type1Weaknesses: Type["damageTaken"], type2Weaknesses: Type["damageTaken"]) => {
    const noDamageFromArray = union(
        getTypesByRelation(type1Weaknesses, 3),
        getTypesByRelation(type2Weaknesses, 3)
    );
    return noDamageFromArray;
};

export const calculateDefensiveTypeChart = (types: TypeName[]) => {
    const type1Weaknesses = Dex.types.get(types[0]).damageTaken;
    if (types.length > 1) {
        const type2Weaknesses = Dex.types.get(types[1]).damageTaken;
        return {
            quadDamageFrom: calculateQuadDamageFrom(type1Weaknesses, type2Weaknesses),
            doubleDamageFrom: calculateDoubleDamageFrom(type1Weaknesses, type2Weaknesses),
            halfDamageFrom: calculateHalfDamageFrom(type1Weaknesses, type2Weaknesses),
            quarterDamageFrom: calculateQuarterDamageFrom(type1Weaknesses, type2Weaknesses),
            noDamageFrom: calculateNoDamageFrom(type1Weaknesses, type2Weaknesses)
        }
    }
    return {
        quadDamageFrom: [],
        doubleDamageFrom: getTypesByRelation(type1Weaknesses, 1),
        halfDamageFrom: getTypesByRelation(type1Weaknesses, 2),
        quarterDamageFrom: [],
        noDamageFrom: getTypesByRelation(type1Weaknesses, 3)
    }
}