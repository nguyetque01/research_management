import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import "../assets/css/Header.css";
import Account from "../components/Account";

function Header() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <AppBar
      position="static"
      className="header-container"
      sx={{ backgroundColor: "#0056b3" }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          className="header-title"
        >
          DNTU Research App
        </Typography>
        <div className="header-navigation">
          <Button
            color="inherit"
            component={Link}
            to="/dashboard"
            className="header-button"
          >
            Trang chủ
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/about"
            className="header-button"
          >
            Giới thiệu
          </Button>
          <Button
            color="inherit"
            className="header-button"
            sx={{ width: "20vh" }}
          >
            Nghiên cứu
          </Button>
          <Menu
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem component={Link} to="/research-topics">
              Đề tài nghiên cứu
            </MenuItem>
            <MenuItem component={Link} to="/researchs">
              Bài nghiên cứu
            </MenuItem>
            <MenuItem component={Link} to="/articles">
              Bài viết
            </MenuItem>
            <MenuItem component={Link} to="/authors">
              Tác giả
            </MenuItem>
            <MenuItem component={Link} to="/references">
              Tài liệu tham khảo
            </MenuItem>
            <MenuItem component={Link} to="/ai-tool">
              Công cụ hỗ trợ
            </MenuItem>
          </Menu>
          <div className="login-section">
            {isLoggedIn ? (
              <Account />
            ) : (
              <Button
                color="inherit"
                component={Link}
                to="/login"
                className="header-button"
                sx={{ width: "23vh" }}
              >
                <AccountCircle className="account-icon" />
                Đăng nhập
              </Button>
            )}
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
