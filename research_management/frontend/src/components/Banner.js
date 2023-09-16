import React from "react";
import { Grid, Typography } from "@mui/material";
import Logo from "../assets/img/logo-dntu.webp";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      elevation={3}
      style={{
        backgroundColor: "#fff",
        paddingTop: "8px",
        paddingBottom: "8px",
        paddingRight: "20px",
        paddingLeft: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        maxWidth: "1260px",
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
                color: "#000",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Trường Đại học Công nghệ Đồng Nai
            </Typography>
            <Typography
              variant="subtitle2"
              style={{
                color: "#000",
                fontSize: "16px",
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
              color: "#000",
              fontSize: "20px",
              textAlign: "right",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            Hệ thống quản lý đề tài nghiên cứu khoa học
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Banner;
