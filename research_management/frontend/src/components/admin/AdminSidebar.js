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
    link: "/admin/accounts",
    children: [],
  },
  {
    text: "Quản lý đề tài",
    icon: <AssignmentIcon />,
    link: "/admin/researchs",
    children: [
      {
        text: "Danh sách đề tài",
        link: "/admin/researchs",
      },
      {
        text: "Danh sách đăng ký",
        link: "/admin/researchs/registration",
      },
      {
        text: "Danh sách đề xuất",
        link: "/admin/researchs/registration",
      },
    ],
  },
  {
    text: "Quản lý hoạt động khoa học",
    icon: <LocalActivityIcon />,
    link: "/admin/activities",
    children: [
      {
        text: "Quản lý hoạt động",
        link: "/admin/activities",
      },
      {
        text: "Danh sách kê khai",
        link: "/admin/activities/declare",
      },
    ],
  },
  {
    text: "Tài nguyên KH",
    icon: <CategoryIcon />,
    link: "/admin/resourses",
    children: [
      {
        text: "Công trình nghiên cứu",
        link: "/admin/resourses/researchs",
      },
      {
        text: "Bài báo khoa học",
        link: "/admin/resourses/articles",
      },
      {
        text: "Sách do NXB phát hành",
        link: "/admin/resourses/books",
      },
      {
        text: "Đề tài chuyển giao công nghệ",
        link: "/admin/resourses/tranfers",
      },
      {
        text: "Giải thưởng NCKH",
        link: "/admin/resourses/awards",
      },
    ],
  },
  {
    text: "Báo cáo",
    icon: <AssessmentIcon />,
    link: "/admin/reports",
    children: [
      {
        text: "HĐKH cá nhân",
        link: "/admin/reports/personal",
      },
      {
        text: "HĐKH đơn vị",
        link: "/admin/reports/department",
      },
      {
        text: "Báo cáo tổng hợp",
        link: "/admin/reports/general",
      },
    ],
  },

  {
    text: "Cài đặt",
    icon: <SettingsIcon />,
    link: "/admin/settings",
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
