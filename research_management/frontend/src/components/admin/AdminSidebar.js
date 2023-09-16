import React from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider, // Thêm Divider từ Material-UI
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  AccountCircle as AccountIcon,
  Category as CategoryIcon,
  FactCheck as RegistrationIcon,
} from "@mui/icons-material";
import Logo from "../../assets/img/logo-dntu.webp";

const sidebarStyle = {
  width: 240,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 240,
    boxSizing: "border-box",
    backgroundColor: "#fff",
  },
};

const linkStyle = {
  display: "flex",
  alignItems: "center",
  p: 2,
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    backgroundColor: "#f1f1f1",
  },
};

const iconStyle = {
  minWidth: "40px",
};

const captionStyle = {
  fontSize: 12,
  color: "#777",
  padding: 0,
  margin: 0,
  textAlign: "center",
};

const AdminSidebar = () => {
  return (
    <div>
      <Drawer variant="permanent" sx={sidebarStyle}>
        <div style={{ padding: "10px" }}>
          <div
            style={{
              color: "#888",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link to="/dashboard">
              <img
                src={Logo}
                alt="Logo"
                className="header-logo"
                style={{ height: "60px", marginRight: "8px" }}
              />
            </Link>
            <Typography
              variant="h6"
              sx={{
                fontSize: 16,
                color: "#333",
                textTransform: "uppercase",
                fontWeight: "600",
                lineHeight: "20px",
              }}
            >
              Hệ thống Quản lý Đề tài Nghiên cứu
            </Typography>
          </div>
        </div>
        <Divider sx={{ ml: 2, mr: 2 }} />
        <List>
          {/* Dashboard */}
          <ListItem component={Link} to="/admin/dashboard" sx={linkStyle}>
            <ListItemIcon sx={iconStyle}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          {/* Tài khoản */}
          <ListItem component={Link} to="/admin/users" sx={linkStyle}>
            <ListItemIcon sx={iconStyle}>
              <AccountIcon />
            </ListItemIcon>
            <ListItemText primary="Tài khoản" />
          </ListItem>

          {/* Đăng ký đề tài */}
          <ListItem
            component={Link}
            to="/admin/topic-registration"
            sx={linkStyle}
          >
            <ListItemIcon sx={iconStyle}>
              <RegistrationIcon />
            </ListItemIcon>
            <ListItemText primary="Đăng ký đề tài" />
          </ListItem>

          {/* Đề tài */}
          <ListItem component={Link} to="/admin/research-topics" sx={linkStyle}>
            <ListItemIcon sx={iconStyle}>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Đề tài nghiên cứu" />
          </ListItem>

          {/* Danh mục */}
          <ListItem component={Link} to="/admin/categories" sx={linkStyle}>
            <ListItemIcon sx={iconStyle}>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Danh mục" />
          </ListItem>
        </List>
        <div style={{ position: "absolute", bottom: 16, left: 16 }}>
          <Divider sx={{ mb: 1 }} />
          <p style={captionStyle}>Khoa Công nghệ thông tin</p>
          <p style={captionStyle}>Trường Đại học Công nghệ Đồng Nai</p>
        </div>
      </Drawer>
    </div>
  );
};

export default AdminSidebar;
