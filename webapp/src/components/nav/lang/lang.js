import { useState } from "react";
import {
    IconButton,
    Menu,
    MenuItem,
  } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";

const Lang = ({ userAnchor, setUserAnchor, color }) => 
{
    const [openMenuLanguage, setOpenMenuLanguage] = useState(false);

    const handleMenuLanguageOpen = (event) => {
        setUserAnchor(event.currentTarget);
        setOpenMenuLanguage(true);
    };
    
    const handleMenuLanguageClose = () => {
        setOpenMenuLanguage(false);
    };

    const spanish = () => {
        handleMenuLanguageClose();
    };
    
    const english = () => {
        handleMenuLanguageClose();
    };

    return (
        <>
        <IconButton
            size="large"
            color="inherit"
            aria-label="language"
            aria-controls="language-appbar"
            aria-haspopup="true"
            onClick={handleMenuLanguageOpen}
            data-testid="open-language-menu"
          >
            <TranslateIcon style={{ color: color }} />
          </IconButton>

          <Menu
            id="language-appbar"
            open={openMenuLanguage}
            onClose={handleMenuLanguageClose}
            anchorEl={userAnchor}
          >
            <MenuItem onClick={spanish}><span className="fi fi-es mr-1"></span>Español</MenuItem>
            <MenuItem onClick={english}><span className="fi fi-gb mr-1"></span>Inglés</MenuItem>
        </Menu>
        </>
    );
}   

export default Lang;