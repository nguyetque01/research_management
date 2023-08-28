// Header.js
import { useState } from "react";
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

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          Research App
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
            onClick={handleClick}
          >
            Nghiên cứu
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            getContentAnchorEl={null}
          >
            <MenuItem
              component={Link}
              to="/research-register"
              onClick={handleClose}
            >
              Đăng ký đề tài
            </MenuItem>
            <MenuItem
              component={Link}
              to="/research-topics"
              onClick={handleClose}
            >
              Danh sách đề tài
            </MenuItem>
            <MenuItem component={Link} to="/articles" onClick={handleClose}>
              Bài viết
            </MenuItem>
            <MenuItem component={Link} to="/authors" onClick={handleClose}>
              Tác giả
            </MenuItem>
            <MenuItem component={Link} to="/references" onClick={handleClose}>
              Tài liệu tham khảo
            </MenuItem>
          </Menu>
          <div className="login-section">
            <Button
              color="inherit"
              component={Link}
              to={isLoggedIn ? "/account" : "/login"} // Điều hướng tùy thuộc vào trạng thái đăng nhập
              className="header-button"
              sx={{ width: "23vh" }}
            >
              <AccountCircle className="account-icon" />
              {isLoggedIn ? "Tài khoản" : "Đăng nhập"}{" "}
            </Button>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
