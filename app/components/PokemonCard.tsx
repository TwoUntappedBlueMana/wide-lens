"use client";

import { Box, Paper, Stack, Typography } from "@mui/material";
import { Dex, Species } from "@pkmn/dex";
import { useQuery } from "@tanstack/react-query";

import { AbilitySelect } from "@/app/components/AbilitySelect";
import { DefensiveRelationsChart } from "@/app/components/DefensiveTypeChart";
import { ItemSelect } from "@/app/components/ItemSelect";
import { MoveSelect } from "@/app/components/MoveSelect";
import { TeraSelect } from "@/app/components/TeraSelect";
import { TypeChip } from "@/app/components/TypeChip";

export function PokemonCard({
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
                        <TeraSelect />
                        <Box
                            component="img"
                            sx={{ width: imageSrc.w }}
                            alt={pokemonData.name}
                            src={imageSrc.url}
                        />
                    </Stack>
                    <Stack spacing={2}>
                        {learnset &&
                            [0, 1, 2, 3].map((currentMove) => {
                                return (
                                    <MoveSelect
                                        key={currentMove}
                                        moves={learnset}
                                    />
                                );
                            })}
                        <AbilitySelect abilities={pokemonData.abilities} />
                        <ItemSelect />
                    </Stack>
                </Stack>
                <DefensiveRelationsChart types={pokemonData.types} />
            </Stack>
        </Paper>
    );
}
