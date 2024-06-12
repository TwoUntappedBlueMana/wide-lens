import { Select, MenuItem, SelectChangeEvent, Box, Menu } from "@mui/material";
import Pokedex, { Item } from "pokedex-promise-v2";
import { useEffect, useState } from "react";
import { toTitleCase } from "@/app/utils/utils";

export function ItemSelect({
    pokedex,
    items,
}: {
    pokedex: Pokedex;
    items: string[];
}) {
    const [currentItem, setCurrentItem] = useState<Item>();
    // have to delay it so the response can get the item
    const [loading, setLoading] = useState(true);

    function handleChange(event: SelectChangeEvent) {
        fetchItem(event.target.value);
    }

    async function fetchItem(target) {
        pokedex.getItemByName(target).then((item) => {
            setCurrentItem(item);
            setLoading(false);
        });
    }

    function filterItems(items) {
        // checks for dupes
        const itemNames = items.map(i => i);
        return Array.from(new Set(itemNames));
    }

    useEffect(() => {
        //calls initial item fetch on load
        fetchItem(items[0]);
    }, []);

    //Item data is not initially there as component loads, loading check is required or causes error
    if (!loading) {
        return (
            <Box>
                <Select value={currentItem.name} onChange={handleChange}>
                    {filterItems(items)?.map((item) => {
                        return (
                            <MenuItem
                                key={item}
                                value={item}
                            >
                                {toTitleCase(item)}
                            </MenuItem>
                        );
                    })}
                </Select>
                <Box 
                    component="img"
                    sx={{ height: 30 }}
                    alt={currentItem.name}
                    src={currentItem?.sprites.default}
                />
            </Box>  
        )
    }
};