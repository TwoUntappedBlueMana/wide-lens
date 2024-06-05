import { Select, MenuItem, SelectChangeEvent, Box, Menu } from "@mui/material";
import Pokedex, { PokemonAbility } from "pokedex-promise-v2";
import { useEffect, useState } from "react";
import { toTitleCase } from "@/app/utils/utils";

export function AbilitySelect({
    pokedex,
    abilities,
}: {
    pokedex: Pokedex;
    abilities: PokemonAbility[];
}) {
    // map names of abilities
    const abilityNames = abilities.map( i => i.ability.name );
    // prune dupllicates
    const filteredAbilities = Array.from( new Set(abilityNames) );
    const [currentAbilityName, setCurrentAbility] = useState<string>(abilities[0].ability.name);

    function handleChange(event: SelectChangeEvent) {
        setCurrentAbility(event.target.value);
    }

    useEffect(() => {
        pokedex.getAbilityByName(currentAbilityName);
    }, [currentAbilityName]);
    
    return (
        <Box>
            <Select value={currentAbilityName} onChange={handleChange}>
                {filteredAbilities?.map((ability) => {
                    return (
                        <MenuItem
                            key={ability}
                            value={ability}
                        >
                            {toTitleCase(ability)}
                        </MenuItem>
                    );
                })}
            </Select>
        </Box>
    );
}