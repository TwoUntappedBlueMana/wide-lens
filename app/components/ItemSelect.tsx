import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Dex } from "@pkmn/dex";
import { useState } from "react";

export function ItemSelect({}: {}) {
    const [currentItem, setCurrentItem] = useState<string>("oranberry");
    const items = Dex.items.all();

    function handleChange(event: SelectChangeEvent) {
        setCurrentItem(event.target.value);
    }

    return (
        <Box>
            <Select value={currentItem} onChange={handleChange}>
                {items?.map((item) => {
                    return (
                        <MenuItem key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    );
                })}
            </Select>
        </Box>
    );
}
