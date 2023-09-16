import React from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  AccountCircle as AccountIcon,
  Category as CategoryIcon,
  FactCheck as RegistrationIcon,
} from "@mui/icons-material";

const AdminSidebar = () => {
  return (
    <div>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: "#fff",
          },
        }}
      >
        <List>
          {/* Dashboard */}
          <ListItem
            component={Link}
            to="/admin/dashboard"
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              textDecoration: "none",
              color: "inherit",
              "&:hover": {
                backgroundColor: "#f1f1f1",
              },
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          {/* Tài khoản */}
          <ListItem
            component={Link}
            to="/admin/users"
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              textDecoration: "none",
              color: "inherit",
              "&:hover": {
                backgroundColor: "#f1f1f1",
              },
            }}
          >
            <ListItemIcon>
              <AccountIcon />
            </ListItemIcon>
            <ListItemText primary="Tài khoản" />
          </ListItem>

          {/* Đăng ký đề tài */}
          <ListItem
            component={Link}
            to="/admin/topic-registration"
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              textDecoration: "none",
              color: "inherit",
              "&:hover": {
                backgroundColor: "#f1f1f1",
              },
            }}
          >
            <ListItemIcon>
              <RegistrationIcon />
            </ListItemIcon>
            <ListItemText primary="Đăng ký đề tài" />
          </ListItem>

          {/* Đề tài */}
          <ListItem
            component={Link}
            to="/admin/research-topics"
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              textDecoration: "none",
              color: "inherit",
              "&:hover": {
                backgroundColor: "#f1f1f1",
              },
            }}
          >
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Đề tài nghiên cứu" />
          </ListItem>

          {/* Danh mục */}
          <ListItem
            component={Link}
            to="/admin/categories"
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              textDecoration: "none",
              color: "inherit",
              "&:hover": {
                backgroundColor: "#f1f1f1",
              },
            }}
          >
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Danh mục" />
          </ListItem>
        </List>
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            color: "#888",
          }}
        >
          DNTU Research App
        </Typography>
      </Drawer>
    </div>
  );
};

export default AdminSidebar;
