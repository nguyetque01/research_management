import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Typography } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SlideShow from "../components/SlideShow";
import News from "../components/News";
import StudentPortal from "../components/StudentPortal";

function Dashboard() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (!isLoggedIn) {
      // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Header />
      <SlideShow />
      <Container maxWidth="lg" className="dashboard-container" sx={{ marginTop: "15px" }}>
        <Grid
          container
          spacing={2}
        >
          <Grid item xs={8}>
              <News />
          </Grid>
          <Grid item xs={4}>
              <StudentPortal />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}

export default Dashboard;
