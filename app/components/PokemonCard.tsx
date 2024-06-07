import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import Pokedex, { Pokemon } from "pokedex-promise-v2";
import { DefensiveRelationsChart, TypeChip } from "./DefensiveTypeChart";
import { MoveSelect } from "@/app/components/MoveSelect";
import { AbilitySelect } from "@/app/components/AbilitySelect";
import { TeraSelect } from "@/app/components/TeraSelect";
import { sortMovesAlphabetically } from "@/app/utils/utils";
import { ArrowDropDown } from "@mui/icons-material";

export function PokemonCard({
    pokedex,
    pokemonData,
    allTypes
}: {
    pokedex: Pokedex;
    pokemonData: Pokemon;
    allTypes: string[]
}) {
    const { moves, abilities, types } = pokemonData;
    
    return (
        <Paper sx={{ display: "flex", p: 1 }}>
            <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                    <Stack spacing={2}>
                        <Typography variant="h5" component="div">
                            {pokemonData?.name}
                        </Typography>
                        {pokemonData.types.map((type, index) => {
                            return (
                                <TypeChip key={index} type={type.type.name} />
                            );
                        })}
                        <TeraSelect 
                            pokedex={pokedex}
                            types={types}
                            allTypes={allTypes}
                        />
                        <Box
                            component="img"
                            sx={{ height: 192 }}
                            alt={pokemonData.name}
                            src={pokemonData.sprites.front_default}
                        />
                    </Stack>
                    <Stack spacing={2}>
                        {[0, 1, 2, 3].map((currentMove, index) => {
                            return (
                                <MoveSelect
                                    key={index}
                                    pokedex={pokedex}
                                    moves={sortMovesAlphabetically(moves)}
                                />
                            );
                        })}
                        <AbilitySelect 
                            pokedex={pokedex}
                            abilities={abilities}
                        />
                    </Stack>
                </Stack>
                <Accordion>
                    <AccordionSummary expandIcon={<ArrowDropDown />}>
                        Defensive Type Chart
                    </AccordionSummary>
                    <AccordionDetails>
                        <DefensiveRelationsChart
                            pokedex={pokedex}
                            types={pokemonData.types}
                        />
                    </AccordionDetails>
                </Accordion>
            </Stack>
        </Paper>
    );
}
