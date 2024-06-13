import { Box, Typography } from "@mui/material";
import { Dex } from "@pkmn/dex";
import { TypeName } from "@pkmn/types";
import { difference, intersection, union, xor } from "lodash";
import { useEffect, useState } from "react";
import { TypeChip } from "./TypeChip";
import { calculateDefensiveTypeChart } from "../utils/defensiveTypeChartUtils";

interface DefensiveType {
    quad_damage_from: string[];
    double_damage_from: string[];
    half_damage_from: string[];
    quarter_damage_from: string[];
    no_damage_from: string[];
}

export function DefensiveRelationsChart2({ types }: { types: TypeName[] }) {
    const {
        quadDamageFrom,
        doubleDamageFrom,
        halfDamageFrom,
        quarterDamageFrom,
        noDamageFrom,
    } = calculateDefensiveTypeChart(types);

    console.log(quadDamageFrom);
    return (
        <div>
            <Typography>Type Weaknesses</Typography>
            {quadDamageFrom.length > 0 && (
                <Box>
                    <Typography>4x Damage From:</Typography>
                    {quadDamageFrom.map((type) => {
                        return <TypeChip key={type} type={type} />;
                    })}
                </Box>
            )}
            {doubleDamageFrom.length > 0 && (
                <Box>
                    <Typography>2x Damage From:</Typography>
                    {doubleDamageFrom.map((type) => {
                        return <TypeChip key={type} type={type} />;
                    })}
                </Box>
            )}
            {halfDamageFrom.length > 0 && (
                <Box>
                    <Typography>0.5x Damage From:</Typography>
                    {halfDamageFrom.map((type) => {
                        return <TypeChip key={type} type={type} />;
                    })}
                </Box>
            )}
            {quarterDamageFrom.length > 0 && (
                <Box>
                    <Typography>0.25x Damage From:</Typography>
                    {quarterDamageFrom.map((type) => {
                        return <TypeChip key={type} type={type} />;
                    })}
                </Box>
            )}
            {noDamageFrom.length > 0 && (
                <Box>
                    <Typography>0x Damage From:</Typography>
                    {noDamageFrom.map((type) => {
                        return <TypeChip key={type} type={type} />;
                    })}
                </Box>
            )}
        </div>
    );
}
