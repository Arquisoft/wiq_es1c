import { useState } from "react";
import {
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";

export const Settings = ({ userAnchor, setUserAnchor, color }) =>
{
    const navigate = useNavigate();
    const [openMenuSettings, setOpenMenuSettings] = useState(false);

    const handleMenuSettingsOpen = (event) => {
        setUserAnchor(event.currentTarget);
        setOpenMenuSettings(true);
    };
    
    const handleMenuSettingsClose = () => {
        setOpenMenuSettings(false);
    };

    const settings = () => {
        handleMenuSettingsClose();
        navigate("/settings");
    };

    return (
        <>
        <IconButton
            size="large"
            color="inherit"
            aria-label="settings"
            aria-controls="settings-appbar"
            aria-haspopup="true"
            onClick={handleMenuSettingsOpen}
            data-testid="open-settings-menu"
        >
            <SettingsIcon style={{ color: color }} />
        </IconButton>

        <Menu
            id="settings-appbar"
            open={openMenuSettings}
            onClose={handleMenuSettingsClose}
            anchorEl={userAnchor}
        >
            <MenuItem onClick={settings}>Settings</MenuItem>
        </Menu>
        </>
    );
}