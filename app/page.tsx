"use client";

import { Grid, Typography } from "@mui/material";
import Pokedex from "pokedex-promise-v2";
import { useEffect, useState } from "react";
import { PokemonCard } from "@/app/components/PokemonCard";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
    const pokedex = new Pokedex();
    const [pokemonIds, setPokemonIds] = useState<number[]>([
        1003, 821, 25, 1002, 884,
    ]);

    const { isLoading, data: pokemonData } = useQuery({
        queryKey: ["pokemonData"],
        queryFn: () => {
            return pokedex.getPokemonByName(pokemonIds).then((data) => {
                return data;
            });
        },
    });

    return (
        <>
            {isLoading ? (
                <Typography>Loading...</Typography>
            ) : (
                <Grid container spacing={3} sx={{ m: 2 }}>
                    {pokemonData?.map((pokemon, index) => (
                        <Grid key={index} item>
                            <PokemonCard
                                pokedex={pokedex}
                                pokemonData={pokemon}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
}
