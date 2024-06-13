"use client";

import { Box, Paper, Stack, Typography } from "@mui/material";
import { Dex, Species } from "@pkmn/dex";
import { useQuery } from "@tanstack/react-query";

import { AbilitySelect2 } from "@/app/components/AbilitySelect2";
import { ItemSelect2 } from "@/app/components/ItemSelect2";
import { MoveSelect2 } from "@/app/components/MoveSelect2";
import { TypeChip } from "@/app/components/TypeChip";
import { DefensiveRelationsChart2 } from "./DefensiveTypeChart2";
import { TeraSelect } from "./TeraSelect";
import { TeraSelect2 } from "./TeraSelect2";

export function PokemonCard2({
    pokemonData,
    imageSrc,
}: {
    pokemonData: Species;
    imageSrc: {
        gen: number;
        w: number;
        h: number;
        url: string;
        pixelated: boolean;
    };
}) {
    const { isLoading, data: learnset } = useQuery({
        queryKey: [`learnset - ${pokemonData.id}`],
        queryFn: () => {
            return Dex.learnsets.get(pokemonData.id).then((data) => {
                return data;
            });
        },
    });

    return (
        <Paper sx={{ display: "flex", p: 1 }}>
            <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                    <Stack spacing={2}>
                        <Typography>{pokemonData.name}</Typography>
                        {pokemonData.types.map((type) => {
                            return (
                                <TypeChip
                                    key={type}
                                    type={type.toLowerCase()}
                                />
                            );
                        })}
                        <TeraSelect2 />
                        <Box
                            component="img"
                            sx={{ width: imageSrc.w }}
                            alt={pokemonData.name}
                            src={imageSrc.url}
                        />
                    </Stack>
                    <Stack spacing={2}>
                        {learnset &&
                            [0, 1, 2, 3].map((currentMove, index) => {
                                return (
                                    <MoveSelect2
                                        key={currentMove}
                                        moves={learnset}
                                    />
                                );
                            })}
                        <AbilitySelect2 abilities={pokemonData.abilities} />
                        <ItemSelect2 />
                    </Stack>
                </Stack>
                <DefensiveRelationsChart2 types={pokemonData.types} />
            </Stack>
        </Paper>
    );
}
