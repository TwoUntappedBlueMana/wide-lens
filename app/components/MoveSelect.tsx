import { Select, MenuItem, SelectChangeEvent, Box } from "@mui/material";
import Pokedex, { MoveElement } from "pokedex-promise-v2";
import { useEffect, useState } from "react";
import { toTitleCase } from "@/app/utils/utils";
import { TypeChip } from "./DefensiveTypeChart";

export function MoveSelect({
    pokedex,
    moves,
}: {
    pokedex: Pokedex;
    moves: MoveElement[];
}) {
    const [currentMove, setCurrentMove] = useState<string>(moves[0].move.name);
    const [moveType, setMoveType] = useState<string>();

    function handleChange(event: SelectChangeEvent) {
        setCurrentMove(event.target.value);
    }

    useEffect(() => {
        pokedex.getMoveByName(currentMove).then((moveData) => {
            setMoveType(moveData.type.name);
        });
    }, [currentMove]);

    return (
        <Box>
            <TypeChip type={moveType} />
            <Select value={currentMove} onChange={handleChange}>
                {moves?.map((move) => {
                    return (
                        <MenuItem
                            key={move.move.name}
                            value={move.move.name}
                            sx={{ bgcolor: `type.${moveType}` }}
                        >
                            {toTitleCase(move.move.name)}
                        </MenuItem>
                    );
                })}
            </Select>
        </Box>
    );
}
