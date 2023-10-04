import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Menu, MenuItem } from "@mui/material";
import "../assets/css/Header.css";
import Account from "../components/Account";
import Banner from "./Banner";

function Header() {
  const userData = useSelector((state) => state.user.userData);
  const [menuAnchors, setMenuAnchors] = useState({
    menu1Anchor: null,
    menu2Anchor: null,
    menu3Anchor: null,
    menu4Anchor: null, // Added menu4
  });

  const handleMenuOpen = (menu) => (event) => {
    setMenuAnchors({ ...menuAnchors, [menu]: event.currentTarget });
  };

  const handleMenuClose = (menu) => () => {
    setMenuAnchors({ ...menuAnchors, [menu]: null });
  };

  const renderMenuItems = (items) => {
    return items.map((item) => (
      <MenuItem
        key={item.to}
        component={Link}
        to={item.to}
        onClick={handleMenuClose(item.menu)}
      >
        {item.label}
      </MenuItem>
    ));
  };

  const menu1Items = [
    { to: "/researchs/registration", label: "Đăng ký đề tài" },
    { to: "/researchs/registered", label: "Các đề tài đã đăng ký" },
    { to: "/researchs", label: "Công trình công bố" },
    { to: "/ai-tool", label: "Công cụ hỗ trợ" },
  ];

  const menu2Items = [
    { to: "/activities/declare", label: "Kê khai hoạt động" },
    { to: "/articles", label: "Bài báo khoa học" },
    { to: "/transfers", label: "Chuyển giao công nghệ" },
    { to: "/books", label: "Sách do NXB phát hành" },
    { to: "/awards", label: "Giải thưởng NCKH" },
  ];

  const menu3Items = [
    { to: "/manual", label: "Hướng dẫn sử dụng" },
    { to: "/regulations", label: "Quy định" },
  ];

  const menu4Items = [
    { to: "/activities/declare", label: "Quản lý đề tài" },
    { to: "/articles", label: "Phê duyệt đề xuất" },
    { to: "/transfers", label: "Phê duyệt đăng ký" },
    { to: "/books", label: "Phê duyệt hoạt động" },
    { to: "/awards", label: "Báo cáo tổng hợp" },
  ];

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
              onClick={handleMenuOpen("menu3Anchor")}
            >
              Hướng dẫn
            </Button>
            <Menu
              anchorEl={menuAnchors.menu3Anchor}
              open={Boolean(menuAnchors.menu3Anchor)}
              onClose={handleMenuClose("menu3Anchor")}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {renderMenuItems(menu3Items)}
            </Menu>

            {/* Đề tài nghiên cứu */}
            <Button
              color="inherit"
              className="header-button"
              onClick={handleMenuOpen("menu1Anchor")}
            >
              Đề tài nghiên cứu
            </Button>
            <Menu
              anchorEl={menuAnchors.menu1Anchor}
              open={Boolean(menuAnchors.menu1Anchor)}
              onClose={handleMenuClose("menu1Anchor")}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {renderMenuItems(menu1Items)}
            </Menu>

            {/* Hoạt động khoa học */}
            <Button
              color="inherit"
              className="header-button"
              onClick={handleMenuOpen("menu2Anchor")}
            >
              Hoạt động khoa học
            </Button>
            <Menu
              anchorEl={menuAnchors.menu2Anchor}
              open={Boolean(menuAnchors.menu2Anchor)}
              onClose={handleMenuClose("menu2Anchor")}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {renderMenuItems(menu2Items)}
            </Menu>

            {/* Phần dành cho người kiểm duyệt */}
            {userData?.role === "approver" || userData?.role === "admin" ? (
              <>
                <Button
                  color="inherit"
                  className="header-button"
                  onClick={handleMenuOpen("menu4Anchor")}
                >
                  Người kiểm duyệt
                </Button>
                <Menu
                  anchorEl={menuAnchors.menu4Anchor}
                  open={Boolean(menuAnchors.menu4Anchor)}
                  onClose={handleMenuClose("menu4Anchor")}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  {renderMenuItems(menu4Items)}
                </Menu>
              </>
            ) : (
              <></>
            )}
          </div>
          <div style={{ flex: 1 }}></div>
          <Account isAuthor={true} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
