import { Chip } from '@mui/material';
import { useMemo } from 'react';

const hashStringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    
    // Decrease the maximum value of each RGB component for darker colors
    const minComponentValue = 0; // Decreased for darker colors

    // Skew the color distribution towards darker hues
    const darknessSkew = 100;

    // Adjust the RGB components to skew towards darker colors
    const r = Math.max(parseInt(c.substring(0, 2), 16) - darknessSkew, minComponentValue);
    const g = Math.max(parseInt(c.substring(2, 4), 16) - darknessSkew, minComponentValue);
    const b = Math.max(parseInt(c.substring(4, 6), 16) - darknessSkew, minComponentValue);

    return '#' + ('00' + r.toString(16)).slice(-2) +
                 ('00' + g.toString(16)).slice(-2) +
                 ('00' + b.toString(16)).slice(-2);
};



const StringColorChip = ({ label }) => {
    const color = useMemo(() => hashStringToColor(label), [label]);

    return (
        <Chip
            label={label}
            style={{color: '#fff', borderColor: '#fff', backgroundColor: color}}
            variant="outlined"
        />
    );
};

export default StringColorChip;
