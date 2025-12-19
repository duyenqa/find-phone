import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { Chip } from "@mui/material";
import Brightness2OutlinedIcon from "@mui/icons-material/Brightness2Outlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import styles from "./navbar.module.css";

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    
    return (
        <div className={`${styles.navbar} ${styles[theme]}`}>
            <Link href="/contact">Liên hệ</Link>
            <Chip
                label={theme === 'light' ? 'Sáng' : 'Tối'}
                icon={theme === 'light' ? <WbSunnyOutlinedIcon /> : <Brightness2OutlinedIcon />}
                color="primary"
                onClick={toggleTheme}
                variant="outlined"
                size="medium"
            />
        </div>
    );
}
