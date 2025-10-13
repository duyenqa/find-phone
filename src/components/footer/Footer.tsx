import { Box } from "@mui/material";

export default function Footer() {
    return (
        <Box component="section" sx={{ p: 2, background: '#000', textAlign: 'center' }}>
            <p style={{ color: '#fff' }}>
                Bản quyền &copy; của Ngô Thị Kim Duyên 2025 - {new Date().getFullYear()}
            </p>
        </Box>
    );
}
