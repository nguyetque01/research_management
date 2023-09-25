import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Account from "../Account";

const AdminHeader = ({ title }) => {
  return (
    <AppBar position="static" sx={{ bgcolor: "#3f51b5" }}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <Account isAuthor={false} />
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
