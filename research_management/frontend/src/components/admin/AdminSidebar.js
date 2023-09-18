import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  ButtonBase,
  Paper,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  AccountCircle as AccountIcon,
  Category as CategoryIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  LocalActivity as LocalActivityIcon,
  ExpandLess,
  ExpandMore,
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
  width: "100%",
  textAlign: "left",
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

const menuData = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    link: "/admin/dashboard",
    children: [],
  },
  {
    text: "Quản lý tài khoản",
    icon: <AccountIcon />,
    link: "/admin/users",
    children: [],
  },
  {
    text: "Đề tài các cấp",
    icon: <AssignmentIcon />,
    link: "/admin/research-topics",
    children: [
      {
        text: "Quản lý đề tài",
        link: "/admin/research-topics",
      },
      {
        text: "Danh sách đăng ký",
        link: "/admin/topic-registration",
      },
    ],
  },
  {
    text: "Hoạt động khoa học khác",
    icon: <LocalActivityIcon />,
    link: "/admin/categories",
    children: [
      {
        text: "Quản lý hoạt động",
        link: "/admin/research-topics/subitem1",
      },
      {
        text: "Danh sách kê khai",
        link: "/admin/research-topics/subitem1",
      },
    ],
  },
  {
    text: "Tài nguyên KH",
    icon: <CategoryIcon />,
    link: "/admin/categories",
    children: [
      {
        text: "Công trình nghiên cứu",
        link: "/admin/research-topics/subitem2",
      },
      {
        text: "Bài báo khoa học",
        link: "/admin/research-topics/subitem1",
      },
      {
        text: "Sách do NXB phát hành",
        link: "/admin/research-topics/subitem2",
      },
      {
        text: "Đề tài chuyển giao công nghệ",
        link: "/admin/research-topics/subitem2",
      },
      {
        text: "Giải thưởng NCKH",
        link: "/admin/research-topics/subitem2",
      },
    ],
  },
  {
    text: "Báo cáo",
    icon: <AssessmentIcon />,
    link: "/admin/research-topics",
    children: [
      {
        text: "Số giờ nghiên cứu cá nhân",
        link: "/admin/research-topics/subitem2",
      },
      {
        text: "Số giờ nghiên cứu đơn vị",
        link: "/admin/research-topics/subitem1",
      },
      {
        text: "Báo cáo tổng hợp",
        link: "/admin/research-topics/subitem2",
      },
    ],
  },

  {
    text: "Cài đặt",
    icon: <SettingsIcon />,
    link: "/admin/research-topics",
    children: [],
  },
];

const AdminSidebar = () => {
  const [openMenus, setOpenMenus] = useState({});

  const handleSubmenuClick = (menuKey) => {
    const newOpenMenus = { ...openMenus };
    newOpenMenus[menuKey] = !newOpenMenus[menuKey];
    setOpenMenus(newOpenMenus);
  };

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
                fontSize: 14,
                color: "#333",
                textTransform: "uppercase",
                fontWeight: "600",
                lineHeight: "20px",
              }}
            >
              Hệ thống Quản lý Nghiên cứu Khoa học
            </Typography>
          </div>
        </div>
        <Divider />
        <Paper style={{ overflowY: "auto", flexGrow: 1, marginBottom: 56 }}>
          <List>
            {menuData.map((menuItem, index) => (
              <div key={menuItem.text}>
                {menuItem.children.length > 0 ? (
                  <>
                    <ButtonBase
                      button
                      onClick={() => handleSubmenuClick(index)}
                      sx={linkStyle}
                    >
                      <ListItemIcon sx={iconStyle}>
                        {menuItem.icon}
                      </ListItemIcon>
                      <ListItemText primary={menuItem.text} />
                      {openMenus[index] ? <ExpandLess /> : <ExpandMore />}
                    </ButtonBase>
                    {menuItem.children.map((childItem, childIndex) => (
                      <ButtonBase
                        key={childItem.link}
                        component={Link}
                        to={childItem.link}
                        sx={{
                          ...linkStyle,
                          display: openMenus[index] ? "flex" : "none", // Ẩn/mở các mục con tùy thuộc vào trạng thái của menu cha
                        }}
                      >
                        <ListItemIcon sx={iconStyle}>
                          {childItem.icon}
                        </ListItemIcon>
                        <ListItemText primary={childItem.text} />
                      </ButtonBase>
                    ))}
                  </>
                ) : (
                  <ListItem
                    button
                    component={Link}
                    to={menuItem.link}
                    sx={linkStyle}
                  >
                    <ListItemIcon sx={iconStyle}>{menuItem.icon}</ListItemIcon>
                    <ListItemText primary={menuItem.text} />
                  </ListItem>
                )}
              </div>
            ))}
          </List>
        </Paper>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            backgroundColor: "#fff",
          }}
        >
          <Divider />
          <div style={{ padding: 12 }}>
            <p style={captionStyle}>Khoa Công nghệ thông tin</p>
            <p style={captionStyle}>Trường Đại học Công nghệ Đồng Nai</p>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default AdminSidebar;
