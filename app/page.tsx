"use client";

import { Grid } from "@mui/material";
import Pokedex, { Pokemon } from "pokedex-promise-v2";
import { useEffect, useState } from "react";
import { PokemonCard } from "@/app/components/PokemonCard";

export default function Home() {
    const pokedex = new Pokedex();
    const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
    const [pokemonIds, setPokemonIds] = useState<number[]>([
        1003, 821, 25, 1002, 884,
    ]);

    const updatePokemonData = async () => {
        pokedex.getPokemonByName(pokemonIds).then((data) => {
            setPokemonData(data);
        });
    };

    useEffect(() => {
        updatePokemonData();
    }, [pokemonIds]);

    return (
        <Grid container spacing={3} sx={{ m: 2 }}>
            {pokemonData.map((pokemon, index) => (
                <Grid key={index} item>
                    <PokemonCard pokedex={pokedex} pokemonData={pokemon} />
                </Grid>
            ))}
        </Grid>
    );
}
