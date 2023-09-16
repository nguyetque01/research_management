import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Menu, MenuItem } from "@mui/material";
import "../assets/css/Header.css";
import Account from "../components/Account";
import Banner from "./Banner";

function Header() {
  const [researchMenuAnchor, setResearchMenuAnchor] = useState(null);
  const handleResearchMenuOpen = (event) => {
    setResearchMenuAnchor(event.currentTarget);
  };

  const handleResearchMenuClose = () => {
    setResearchMenuAnchor(null);
  };

  return (
    <div>
      <Banner />
      <AppBar
        position="static"
        className="header-container"
        sx={{
          backgroundColor: "#0056b3",
        }}
      >
        <Toolbar>
          <div className="header-navigation">
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
              onClick={handleResearchMenuOpen}
              sx={{ width: "20vh" }}
            >
              Nghiên cứu
            </Button>
            <Menu
              anchorEl={researchMenuAnchor}
              open={Boolean(researchMenuAnchor)}
              onClose={handleResearchMenuClose}
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
                onClick={handleResearchMenuClose}
              >
                Đăng ký đề tài
              </MenuItem>
              <MenuItem
                component={Link}
                to="/researchs"
                onClick={handleResearchMenuClose}
              >
                Công trình công bố
              </MenuItem>
              {/* <MenuItem
              component={Link}
              to="/articles"
              onClick={handleResearchMenuClose}
            >
              Bài viết
            </MenuItem>
            <MenuItem
              component={Link}
              to="/authors"
              onClick={handleResearchMenuClose}
            >
              Tác giả
            </MenuItem> */}
              <MenuItem
                component={Link}
                to="/references"
                onClick={handleResearchMenuClose}
              >
                Tài liệu tham khảo
              </MenuItem>
              <MenuItem
                component={Link}
                to="/ai-tool"
                onClick={handleResearchMenuClose}
              >
                Công cụ hỗ trợ
              </MenuItem>
            </Menu>

            {/* Account */}
            <Account />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
