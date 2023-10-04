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
    Assignment as AssignmentIcon,
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
    text: "Đăng ký đề tài nghiên cứu",
    link: "/researchs/registration",
    icon: <AssignmentIcon />,
    children: [],
  },
  {
    text: "Các đề tài đã đăng ký",
    link: "/researchs/registered",
    icon: <AssignmentIcon />,
    children: [],
  },
];

const UserSideBar = () => {
  const [openMenus, setOpenMenus] = useState({});

  const handleSubmenuClick = (menuKey) => {
    const newOpenMenus = { ...openMenus };
    newOpenMenus[menuKey] = !newOpenMenus[menuKey];
    setOpenMenus(newOpenMenus);
  };

  return (
    <div>
      <Paper variant="permanent" sx={sidebarStyle}>
        <Paper style={{ overflowY: "auto", flexGrow: 1, marginBottom: 56}}>
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
        </div>
      </Paper>
    </div>
  );
};

export default UserSideBar;
