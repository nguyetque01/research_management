import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Account from "../Account";

const AdminHeader = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "#3f51b5" }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        {/* <IconButton color="inherit" sx={{ mr: 2 }}>
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton> */}
        <Account />
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
