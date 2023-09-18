import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Menu, MenuItem } from "@mui/material";
import "../assets/css/Header.css";
import Account from "../components/Account";
import Banner from "./Banner";

function Header() {
  const [menu1Anchor, setMenu1Anchor] = useState(null);
  const [menu2Anchor, setMenu2Anchor] = useState(null);
  const [menu3Anchor, setMenu3Anchor] = useState(null);

  const handleMenu1Open = (event) => {
    setMenu1Anchor(event.currentTarget);
  };

  const handleMenu1Close = () => {
    setMenu1Anchor(null);
  };

  const handleMenu2Open = (event) => {
    setMenu2Anchor(event.currentTarget);
  };

  const handleMenu2Close = () => {
    setMenu2Anchor(null);
  };

  const handleMenu3Open = (event) => {
    setMenu3Anchor(event.currentTarget);
  };

  const handleMenu3Close = () => {
    setMenu3Anchor(null);
  };

  return (
    <div>
      <Banner />
      <AppBar
        position="static"
        className="header-container"
        sx={{
          backgroundColor: "#3f51b5",
        }}
      >
        <Toolbar>
          <div className="header-navigation">
            {/* Trang chủ */}
            <Button
              color="inherit"
              component={Link}
              to="/dashboard"
              className="header-button"
            >
              Trang chủ
            </Button>

            {/* Giới thiệu */}
            <Button
              color="inherit"
              component={Link}
              to="/about"
              className="header-button"
            >
              Giới thiệu
            </Button>

            {/* Văn bản và quy định */}
            <Button
              color="inherit"
              className="header-button"
              onClick={handleMenu3Open}
            >
              Hướng dẫn
            </Button>
            <Menu
              anchorEl={menu3Anchor}
              open={Boolean(menu3Anchor)}
              onClose={handleMenu3Close}
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
                onClick={handleMenu3Close}
              >
                Hướng dẫn sử dụng
              </MenuItem>
              <MenuItem
                component={Link}
                to="/researchs"
                onClick={handleMenu3Close}
              >
                Quy định
              </MenuItem>
            </Menu>

            {/* Đề tài nghiên cứu */}
            <Button
              color="inherit"
              className="header-button"
              onClick={handleMenu1Open}
            >
              Đề tài nghiên cứu
            </Button>
            <Menu
              anchorEl={menu1Anchor}
              open={Boolean(menu1Anchor)}
              onClose={handleMenu1Close}
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
                onClick={handleMenu1Close}
              >
                Đăng ký đề tài
              </MenuItem>
              <MenuItem
                component={Link}
                to="/researchs"
                onClick={handleMenu1Close}
              >
                Đề xuất đề tài
              </MenuItem>
              <MenuItem
                component={Link}
                to="/researchs"
                onClick={handleMenu1Close}
              >
                Công trình công bố
              </MenuItem>
              <MenuItem
                component={Link}
                to="/ai-tool"
                onClick={handleMenu1Close}
              >
                Công cụ hỗ trợ
              </MenuItem>
            </Menu>

            {/* Hoạt động khoa học */}
            <Button
              color="inherit"
              className="header-button"
              onClick={handleMenu2Open}
            >
              Hoạt động khoa học
            </Button>
            <Menu
              anchorEl={menu2Anchor}
              open={Boolean(menu2Anchor)}
              onClose={handleMenu2Close}
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
                onClick={handleMenu2Close}
              >
                Kê khai hoạt động
              </MenuItem>
              <MenuItem
                component={Link}
                to="/researchs"
                onClick={handleMenu2Close}
              >
                Bài báo khoa học
              </MenuItem>
              <MenuItem
                component={Link}
                to="/researchs"
                onClick={handleMenu2Close}
              >
                Chuyển giao công nghệ
              </MenuItem>
              <MenuItem
                component={Link}
                to="/researchs"
                onClick={handleMenu2Close}
              >
                Sách do NXB phát hành
              </MenuItem>
              <MenuItem
                component={Link}
                to="/researchs"
                onClick={handleMenu2Close}
              >
                Giải thưởng NCKH
              </MenuItem>
            </Menu>
          </div>
          <div style={{ flex: 1 }}></div>
          <Account isAuthor={true} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
