import { Box, SxProps, Theme, useTheme } from "@mui/material";

export const LineProgress = ({ progress, direction, sx }: { progress: number | undefined, direction?: 'vertical' | 'horizontal', sx?: SxProps<Theme> }) => {
    const theme =useTheme();
    return (
        <Box sx={{ borderRadius:10, height: direction === 'vertical' ? '95%' : '0.5%', width: direction === 'horizontal' ? '100%' : '5%', backgroundColor: theme.palette.progress.background , ...sx }}>
            <Box sx={{borderRadius:10, backgroundColor: theme.palette.progress.primary, position: 'relative', height: direction === 'vertical' ? `${progress ?? 0}%` : '100%', width: direction === 'horizontal' ? `${progress ?? 0}%` : '100%' }} />
        </Box>
    );
}