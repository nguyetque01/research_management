import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Typography, Divider, Paper, } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";

function About() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (!isLoggedIn) {
      // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
      navigate("/login");
      console.log(isLoggedIn);
    }
  }, []);

  const containerStyle = {
    border: "1px solid #ccc", // Đặt border
    borderRadius: "10px", // Đặt border radius
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Đặt đổ bóng
    padding: "20px", // Đặt khoảng cách bên trong border
    backgroundColor: "#53A6D8",
    width: "80%",
    marginLeft: "50px",
    marginRight: "20px"
  };

  const contentStyle = {
    color: "red",
    marginBottom: "10px",
    fontSize: "24px",
    paddingLeft: "10px",
    marginTop: "10px",
  };

  const content = {
    paddingLeft: "10px",
  };

  const acontent = {
    margin: "5px 0",
  };

  return (
    <div>
      <Header />
      <Container maxWidth="lg" className="dashboard-container">
        <Grid
          container
          spacing={4}
          style={{
            minHeight: "100vh",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid item xs={12}>
            <Container>
              <Typography variant="h6" style={{color: "#AC3537"}}>HỆ THỐNG QUẢN LÝ NGHIÊN CỨU KHOA HỌC Tại DNTU</Typography>
            </Container>
          </Grid>
          <Grid item xs={12}>
            <Container>
              <Typography variant="h8" style={{color: "blue"}}>Giới thiệu về HỆ THỐNG QUẢN LÝ NGHIÊN CỨU KHOA HỌC</Typography>
              <p style={{fontWeight: "bolder"}}>Tên chính thức: HỆ THỐNG QUẢN LÝ NGHIÊN CỨU KHOA HỌC </p>
              <p>Hệ thống này được phát triển để hỗ trợ quản lý các hoạt động nghiên cứu khoa học, bao gồm việc quản lý dự án, công trình nghiên cứu, tài liệu
                tham khảo, và nhiều hơn nữa. 
              </p>
            </Container>
          </Grid>
          <Grid item xs={12}>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                marginTop: "20px",
              }}
            >
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.7203849452258!2d106.86619157389225!3d10.98446545532424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174ddb237f9dd59%3A0x3ff1538c511f05d7!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBDw7RuZyBOZ2jhu4cgxJDhu5NuZyBOYWk!5e0!3m2!1svi!2s!4v1697636251591!5m2!1svi!2s"
                width="600"
                height="450"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div style={containerStyle}>
                <div
                  style={{
                    border: "1px solid #5BA8A0",
                    backgroundColor: "white",
                  }}
                >
                  <h2 style={{ textAlign: "center", color: "#3f51b5" }}>
                    Liên Hệ Đoàn Khoa Công Nghệ Thông Tin 
                  </h2>
                  <p style={contentStyle}>Địa chỉ: Số 206, Nguyễn Khuyến, Khu phố 5, Phường Trảng Dài, TP. Biên Hòa, tỉnh Đồng Nai.</p>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}

export default About;