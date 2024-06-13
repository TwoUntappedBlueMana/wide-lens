import { Select, MenuItem, SelectChangeEvent, Box } from "@mui/material";
import { useState } from "react";
import { Dex, Learnset } from "@pkmn/dex";

import { TypeChip } from "@/app/components/TypeChip";

export function MoveSelect2({ moves }: { moves: Learnset }) {
    const { learnset } = moves;
    const defaultMove = Object.keys(learnset)[0];

    const [currentMove, setCurrentMove] = useState<string>(defaultMove);

    function handleChange(event: SelectChangeEvent) {
        setCurrentMove(event.target.value);
    }

    return (
        <Box>
            <TypeChip type={Dex.moves.get(currentMove).type.toLowerCase()} />
            <Select value={currentMove} onChange={handleChange}>
                {Object.keys(learnset).map((move) => {
                    return (
                        <MenuItem key={move} value={move}>
                            {move}
                        </MenuItem>
                    );
                })}
            </Select>
        </Box>
    );
}
