import { useState, MouseEvent, ChangeEvent } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from 'next/navigation';
import { ListItemIcon, Switch } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import DehazeIcon from '@mui/icons-material/Dehaze';
import EmailIcon from '@mui/icons-material/Email';
import styles from "./navbar.module.css";

export default function Navbar() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [checked, setChecked] = useState(false);

    const { theme, toggleTheme } = useTheme();
    const router = useRouter();
    
    const handleClickMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }
    
    const handleChangeStatusTheme = (event: ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);

        if(event.currentTarget.checked){
            toggleTheme();
        }else{
            toggleTheme();
        }
    };
    return (
        <div className={`${styles.navbar} ${styles[theme]}`}>
            <IconButton
                size="medium"
                aria-label="more"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClickMenu}
                color="inherit"
                sx={{color: theme === 'light' ? '#000' : '#fff'}}
            >
                <DehazeIcon sx={{ fontSize: '32px' }} />
            </IconButton>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={() => router.push("/contact")}>
                    <ListItemIcon>
                        <EmailIcon fontSize="small" />
                    </ListItemIcon>
                    Liên hệ
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Brightness6Icon fontSize="small" />
                    </ListItemIcon>
                    <Switch
                        checked={checked}
                        onChange={handleChangeStatusTheme}
                        slotProps={{ input: { 'aria-label': 'controlled' } }}
                    />
                </MenuItem>
            </Menu>
        </div>
    );
}
