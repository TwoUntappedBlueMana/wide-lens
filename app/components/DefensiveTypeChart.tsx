import { Typography, Box, Badge, Chip } from "@mui/material";
import { intersection, difference, xor, union } from "lodash";
import Pokedex, { PokemonType } from "pokedex-promise-v2";
import { useState, useEffect } from "react";

interface DefensiveType {
    quad_damage_from: string[];
    double_damage_from: string[];
    half_damage_from: string[];
    quarter_damage_from: string[];
    no_damage_from: string[];
}

export function TypeChip({ type }) {
    return <Chip label={type} sx={{ bgcolor: `types.${type}` }} />;
}

export function DefensiveRelationsChart({
    pokedex,
    types,
}: {
    pokedex: Pokedex;
    types: PokemonType[];
}) {
    const [quadDamageFrom, setQuadDamageFrom] = useState<string[]>([]);
    const [doubleDamageFrom, setDoubleDamageFrom] = useState<string[]>([]);
    const [halfDamageFrom, setHalfDamageFrom] = useState<string[]>([]);
    const [quarterDamageFrom, setQuarterDamageFrom] = useState<string[]>([]);
    const [noDamageFrom, setNoDamageFrom] = useState<string[]>([]);

    const calculateQuadDamageFrom = (damageRelations: DefensiveType[]) => {
        if (damageRelations.length == 1) return [];
        const quadDamageFromArray = intersection(
            damageRelations[0].double_damage_from,
            damageRelations[1].double_damage_from
        );
        return quadDamageFromArray;
    };

    const calculateDoubleDamageFrom = (damageRelations: DefensiveType[]) => {
        if (damageRelations.length == 1)
            return damageRelations[0].double_damage_from;
        const doubleDamageFromArray = difference(
            xor(
                damageRelations[0].double_damage_from,
                damageRelations[1].double_damage_from
            ),
            damageRelations[0].half_damage_from,
            damageRelations[1].half_damage_from,
            damageRelations[0].no_damage_from,
            damageRelations[1].no_damage_from
        );
        return doubleDamageFromArray;
    };

    const calculateHalfDamageFrom = (damageRelations: DefensiveType[]) => {
        if (damageRelations.length == 1)
            return damageRelations[0].half_damage_from;
        const halfDamageFromArray = difference(
            xor(
                damageRelations[0].half_damage_from,
                damageRelations[1].half_damage_from
            ),
            damageRelations[0].double_damage_from,
            damageRelations[1].double_damage_from,
            damageRelations[0].no_damage_from,
            damageRelations[1].no_damage_from
        );
        return halfDamageFromArray;
    };

    const calculateQuarterDamageFrom = (damageRelations: DefensiveType[]) => {
        if (damageRelations.length == 1) return [];
        const quarterDamageFromArray = intersection(
            damageRelations[0].half_damage_from,
            damageRelations[1].half_damage_from
        );
        return quarterDamageFromArray;
    };

    const calculateNoDamageFrom = (damageRelations: DefensiveType[]) => {
        if (damageRelations.length == 1)
            return damageRelations[0].no_damage_from;
        const noDamageFromArray = union(
            damageRelations[0].no_damage_from,
            damageRelations[1].no_damage_from
        );
        return noDamageFromArray;
    };

    const calculateTypeChart = async () => {
        await pokedex
            .getTypeByName(
                // get all data on types
                types.map((type) => {
                    return type.type.name;
                })
            )
            .then((data) => {
                // data is array of Type objects
                // turn into array of damage relations
                return data.map((type) => {
                    return type.damage_relations;
                });
            })
            .then((data) => {
                return data.map((typeRelations) => {
                    let defensiveTypeMap: DefensiveType = {
                        quad_damage_from: [],
                        double_damage_from: [],
                        half_damage_from: [],
                        quarter_damage_from: [],
                        no_damage_from: [],
                    };
                    defensiveTypeMap.double_damage_from =
                        typeRelations.double_damage_from.map((type) => {
                            return type.name;
                        });
                    defensiveTypeMap.half_damage_from =
                        typeRelations.half_damage_from.map((type) => {
                            return type.name;
                        });
                    defensiveTypeMap.no_damage_from =
                        typeRelations.no_damage_from.map((type) => {
                            return type.name;
                        });
                    return defensiveTypeMap;
                });
            })
            .then((data) => {
                setQuadDamageFrom(calculateQuadDamageFrom(data));
                setDoubleDamageFrom(calculateDoubleDamageFrom(data));
                setHalfDamageFrom(calculateHalfDamageFrom(data));
                setQuarterDamageFrom(calculateQuarterDamageFrom(data));
                setNoDamageFrom(calculateNoDamageFrom(data));
            });
    };

    useEffect(() => {
        calculateTypeChart();
    }, []);

    return (
        <div>
            <Typography>Type Weaknesses</Typography>
            {quadDamageFrom.length > 0 && (
                <Box>
                    <Typography>4x Damage From:</Typography>
                    {quadDamageFrom.map((type, index) => {
                        return <TypeChip key={index} type={type} />;
                    })}
                </Box>
            )}
            {doubleDamageFrom.length > 0 && (
                <Box>
                    <Typography>2x Damage From:</Typography>
                    {doubleDamageFrom.map((type, index) => {
                        return <TypeChip key={index} type={type} />;
                    })}
                </Box>
            )}
            {halfDamageFrom.length > 0 && (
                <Box>
                    <Typography>0.5x Damage From:</Typography>
                    {halfDamageFrom.map((type, index) => {
                        return <TypeChip key={index} type={type} />;
                    })}
                </Box>
            )}
            {quarterDamageFrom.length > 0 && (
                <Box>
                    <Typography>0.25x Damage From:</Typography>
                    {quarterDamageFrom.map((type, index) => {
                        return <TypeChip key={index} type={type} />;
                    })}
                </Box>
            )}
            {noDamageFrom.length > 0 && (
                <Box>
                    <Typography>0x Damage From:</Typography>
                    {noDamageFrom.map((type, index) => {
                        return <TypeChip key={index} type={type} />;
                    })}
                </Box>
            )}
        </div>
    );
}
