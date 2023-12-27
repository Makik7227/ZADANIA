import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function CompareButton() {
    return (
        <Stack direction="row" spacing={2}>
            <Button sx={{backgroundColor: 'white'}}>COMPARE</Button>

        </Stack>
    );
}