import { useState } from "react";
import { Avatar, Button, createTheme, IconButton, Typography } from "@mui/material";
import { NAVIGATION_HOVER_GREY } from "../../styles/colours";
import DropdownMenu from "../common/DropdownMenu";
import ProfileMenu from "./ProfileMenu";

const NavigationDropdown = () => {
  const theme = createTheme();

  const [anchorElMenu, setAnchorElMenu] = useState<HTMLElement | null>(null);
  const handleOpenMenu = (event: any) => setAnchorElMenu(event.currentTarget);
  const handleCloseMenu = () => setAnchorElMenu(null);

  const [selectedNameMenu, setSelectedMenuName] = useState<string>("default");
  const handleSwitchMenu = (newMenuName: string) => setSelectedMenuName(newMenuName);
  const handleMenuBack = () => handleSwitchMenu("default");
  const handleMenuBackAndQuit = () => {
    handleMenuBack();
    handleCloseMenu();
  };

  const ScaledAvatar = (
    <Avatar
      sx={{
        width: 32,
        height: 32,
      }}
      alt="Chandler Lei"
    />
  );

  return (
    <nav>
      <Button
        sx={{
          borderRadius: theme.spacing(3),
          textTransform: "none",
          textDecoration: "none",
          color: theme.palette.common.white,
          display: "none",
            "&:hover": {
            backgroundColor: NAVIGATION_HOVER_GREY,
          },
          [theme.breakpoints.up("md")]: {
            display: "flex"
          }
        }}
        startIcon={ScaledAvatar}
        onClick={handleOpenMenu}
        aria-haspopup="true"
      >
        <Typography sx={{
          whiteSpace: "nowrap",
          textOverflow: "ellipsis"
        }}>
          Chandler Lei
        </Typography>
      </Button>
      <IconButton
        sx={{
          color: theme.palette.common.white,
          display: "none",
          "&:hover": {
            backgroundColor: NAVIGATION_HOVER_GREY,
          }
        }}
        onClick={handleOpenMenu}
        aria-haspopup="true"
      >
        {ScaledAvatar}
      </IconButton>
      <DropdownMenu
        id="primary-nav-menu"
        sx={{ minWidth: 256 }}
        open={Boolean(anchorElMenu)}
        anchorEl={anchorElMenu}
        onClose={handleCloseMenu}
      >
       <ProfileMenu
          onSwitchMenu={handleSwitchMenu}
          onMenuBack={handleMenuBack}
        />
      </DropdownMenu>
    </nav>
  );
};

export default NavigationDropdown;