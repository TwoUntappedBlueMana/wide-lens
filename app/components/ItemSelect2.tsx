import { Select, MenuItem, SelectChangeEvent, Box } from "@mui/material";
import { useState } from "react";
import { Dex } from "@pkmn/dex";

export function ItemSelect2({}: {}) {
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
