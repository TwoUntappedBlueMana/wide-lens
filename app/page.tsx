"use client";

import { Grid } from "@mui/material";
import Pokedex, { Pokemon, PokemonType } from "pokedex-promise-v2";
import { useEffect, useState } from "react";
import { PokemonCard } from "@/app/components/PokemonCard";

export default function Home() {
    const pokedex = new Pokedex();
    const [typeList, sortTypeList] = useState<string[]>([]);
    const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
    const [pokemonIds, setPokemonIds] = useState<number[]>([
        1003, 821, 25, 1002, 884,
    ]);

    const updatePokemonData = async () => {
        pokedex.getPokemonByName(pokemonIds).then((data) => {
            setPokemonData(data);
        });
    };

    const getTypes = async () => {
        pokedex.getTypesList().then((values) => {
            const typeNames = values.results.map(function(type) {
                return type['name'];
            });
            // Filtering out null and shadow typings as they're not conventionally available
            const filtered = typeNames.filter(type => type !== "unknown" && type !== "shadow");
            sortTypeList(filtered);
        });
    };

    useEffect(() => {
        updatePokemonData();
        getTypes();
    }, [pokemonIds]);

    return (
        <Grid container spacing={3} sx={{ m: 2 }}>
            {pokemonData.map((pokemon, index) => (
                <Grid key={index} item>
                    <PokemonCard pokedex={pokedex} pokemonData={pokemon} allTypes={typeList} />
                </Grid>
            ))}
        </Grid>
    );
}
