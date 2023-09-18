import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem, Avatar, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

const Account = (isAuthor) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userData = useSelector((state) => state.user.userData);
  const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);

  const dispatch = useDispatch();

  const handleLogout = () => {
    // Gọi action logout khi đăng xuất
    dispatch(logout());
    // Xóa thông tin đăng nhập khỏi localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setTimeout(() => {
      navigate("/login");
    }, 1);
  };

  const handleAccountMenuOpen = (event) => {
    setAccountMenuAnchor(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuAnchor(null);
  };

  return (
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
            <Typography fontSize={14}>
              {`${userData.last_name} ${userData.first_name}`}
            </Typography>
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
            sx={{ minWidth: "300px" }}
          >
            <MenuItem
              component={Link}
              to="/profile"
              onClick={handleAccountMenuClose}
              sx={{ minWidth: "200px" }}
            >
              Thông tin cá nhân
            </MenuItem>
            {isAuthor ? (
              <>
                <MenuItem
                  component={Link}
                  to="/profile/background"
                  onClick={handleAccountMenuClose}
                  sx={{ minWidth: "200px" }}
                >
                  Lý lịch khoa học
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/profile/activities"
                  onClick={handleAccountMenuClose}
                  sx={{ minWidth: "200px" }}
                >
                  Hoạt động khoa học
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/profile/hour"
                  onClick={handleAccountMenuClose}
                  sx={{ minWidth: "200px" }}
                >
                  Thống kê số giờ NCKH
                </MenuItem>
              </>
            ) : (
              <></>
            )}

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
  );
};

export default Account;
