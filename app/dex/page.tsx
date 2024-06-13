"use client";

import { Grid, Typography } from "@mui/material";
import { Dex } from "@pkmn/dex";
import { Sprites } from "@pkmn/img";
import { PokemonCard2 } from "../components/PokemonCard2";

export default function Home() {
    const pokemonIds = [
        "tinglu",
        "chienpao",
        "pikachu",
        "duraludon",
        "rookidee",
    ];

    return (
        <>
            <Grid container spacing={3} sx={{ m: 2 }}>
                {pokemonIds.map((id) => {
                    return (
                        <Grid key={id} item>
                            <PokemonCard2
                                pokemonData={Dex.species.get(id)}
                                imageSrc={Sprites.getPokemon(id)}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
}
