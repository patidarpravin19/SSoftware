// CustomForm.tsx
import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';

const CustomForm: React.FC = () => {
    const [value, setValue] = useState('');

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
                label="Your Name"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                fullWidth
            />
        </Box>
    );
};

export default CustomForm;
