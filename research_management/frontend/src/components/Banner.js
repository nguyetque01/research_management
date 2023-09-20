import React from "react";
import { Grid, Typography } from "@mui/material";
import Logo from "../assets/img/logo-dntu.webp";
import Background from "../assets/img/header-banner.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      elevation={3}
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#fff",
      }}
    >
      <div
        elevation={3}
        style={{
          maxWidth: "1260px",
          paddingTop: "8px",
          paddingBottom: "8px",
          paddingRight: "20px",
          paddingLeft: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "10px" }}>
              <Link to="/dashboard">
                <img
                  src={Logo}
                  alt="Logo"
                  className="header-logo"
                  style={{ height: "80px" }}
                />
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="subtitle1"
                style={{
                  color: "#333",
                  fontSize: "16px",
                  fontWeight: "bold",
                  lineHeight: "24px",
                }}
              >
                Trường Đại học Công nghệ Đồng Nai
              </Typography>
              <Typography
                variant="subtitle2"
                style={{
                  color: "#333",
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                Khoa Công nghệ thông tin
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="h4"
              style={{
                color: "#3F51B5",
                fontSize: "22px",
                textAlign: "right",
                textTransform: "uppercase",
                fontWeight: "bold",
                letterSpacing: "1px",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              Hệ thống Quản lý Nghiên cứu khoa học
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Banner;
