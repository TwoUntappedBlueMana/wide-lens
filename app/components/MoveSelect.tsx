import {
    Select,
    MenuItem,
    SelectChangeEvent,
    Box,
    Typography,
} from "@mui/material";
import Pokedex, { MoveElement } from "pokedex-promise-v2";
import { useEffect, useState } from "react";
import { toTitleCase } from "@/app/utils/utils";
import { TypeChip } from "./DefensiveTypeChart";
import { useQuery } from "@tanstack/react-query";

export function MoveSelect({
    pokedex,
    moves,
}: {
    pokedex: Pokedex;
    moves: MoveElement[];
}) {
    const [currentMove, setCurrentMove] = useState<string>(moves[0].move.name);

    const { isLoading, data: moveType } = useQuery({
        queryKey: [`moveData - ${currentMove}`],
        queryFn: () => {
            return pokedex.getMoveByName(currentMove).then((data) => {
                return data.type.name;
            });
        },
    });

    function handleChange(event: SelectChangeEvent) {
        setCurrentMove(event.target.value);
    }

    return (
        <Box>
            {isLoading ? (
                <Typography>Loading...</Typography>
            ) : (
                <TypeChip type={moveType || "normal"} />
            )}
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
