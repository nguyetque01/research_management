import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import "../assets/css/Header.css";

function Header() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userData = useSelector((state) => state.user.userData);

  const [anchorEl, setAnchorEl] = useState(null);
  const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);

  const dispatch = useDispatch();

  const handleLogout = () => {
    // Gọi action logout khi đăng xuất
    dispatch(logout());
    // Xóa thông tin đăng nhập khỏi localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAccountMenuOpen = (event) => {
    setAccountMenuAnchor(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuAnchor(null);
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
          >
            <MenuItem
              component={Link}
              to="/research-topics"
              onClick={handleClose}
            >
              Đề tài nghiên cứu
            </MenuItem>
            <MenuItem component={Link} to="/researchs" onClick={handleClose}>
              Bài nghiên cứu
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
            <MenuItem component={Link} to="/ai-tool" onClick={handleClose}>
              Công cụ hỗ trợ
            </MenuItem>
          </Menu>
          <div className="login-section">
            {isLoggedIn && userData ? ( // Kiểm tra xem người dùng đã đăng nhập chưa
              <div>
                <Button
                  color="inherit"
                  component={Link}
                  className="header-button"
                  sx={{ display: "flex", alignItems: "center" }}
                  onClick={handleAccountMenuOpen}
                >
                  <Avatar
                    alt={userData.username}
                    src={userData.avatarUrl}
                    sx={{ width: 36, height: 36, marginRight: "8px" }}
                  />
                  {`${userData.last_name} ${userData.first_name}`}
                </Button>

                <Menu
                  anchorEl={accountMenuAnchor}
                  open={Boolean(accountMenuAnchor)}
                  onClose={handleAccountMenuClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem
                    component={Link}
                    to="/profile"
                    onClick={handleAccountMenuClose}
                  >
                    Thông tin cá nhân
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/settings"
                    onClick={handleAccountMenuClose}
                  >
                    Cài đặt
                  </MenuItem>
                  <MenuItem component={Link} onClick={handleLogout}>
                    Đăng xuất
                  </MenuItem>
                </Menu>
              </div>
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
