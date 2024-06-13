import { Chip } from "@mui/material";

export function TypeChip({ type }: { type: string }) {
    return (
        <Chip label={type} sx={{ bgcolor: `types.${type.toLowerCase()}` }} />
    );
}
