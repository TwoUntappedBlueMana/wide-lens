import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Dex } from "@pkmn/dex";
import { useState } from "react";

import { TypeChip } from "@/app/components/TypeChip";

export function TeraSelect({}: {}) {
    const allTypes = Dex.types.all();
    const [currentTera, setCurrentTera] = useState<string>(allTypes[0].id);

    function handleChange(event: SelectChangeEvent) {
        setCurrentTera(event.target.value);
    }

    return (
        <Box>
            <TypeChip type={currentTera} />
            <Select value={currentTera} onChange={handleChange}>
                {allTypes?.map((type) => {
                    return (
                        <MenuItem key={type.name} value={type.id}>
                            {type.name}
                        </MenuItem>
                    );
                })}
            </Select>
        </Box>
    );
}
