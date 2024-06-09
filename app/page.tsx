"use client";

import { Grid } from "@mui/material";
import Pokedex, { Pokemon } from "pokedex-promise-v2";
import { useEffect, useState } from "react";
import { PokemonCard } from "@/app/components/PokemonCard";
import { values } from "lodash";

export default function Home() {
    const pokedex = new Pokedex();
    const [typeList, sortTypeList] = useState<string[]>([]);
    const [itemList, sortItems] = useState<string[]>([]);
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

    // fetches item names and urls by cat
    const getItems = async () => {
        const endpoints = [
            '3',
            '4',
            '5',
            '6',
            '7',
            '12',
            '13',
            '15',
            '17',
            '18',
            '19',
            '42'
        ];
        let itemNames = [];
        endpoints.forEach(endpoint => {
            pokedex.getItemCategoryByName(endpoint).then((values) => {
                values.items.forEach(item => {
                    itemNames.push(item["name"]);
                });
            });
        });
        
        sortItems(itemNames);
    };

    

    useEffect(() => {
        updatePokemonData();
        getTypes();
        getItems();
    }, []);

    return (
        <Grid container spacing={3} sx={{ m: 2 }}>
            {pokemonData.map((pokemon, index) => (
                <Grid key={index} item>
                    <PokemonCard pokedex={pokedex} pokemonData={pokemon} allTypes={typeList} allItems={itemList} />
                </Grid>
            ))}
        </Grid>
    );
}
