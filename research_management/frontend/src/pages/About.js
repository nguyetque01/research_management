import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Typography } from "@mui/material";
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

  return (
    <div>
      <Header />
      <Container maxWidth="lg" className="dashboard-container">
        <Grid
          container
          spacing={20}
          sx={{
            minHeight: "100vh",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid item xs={12}>
            <Container>
              <Typography variant="h4"> About</Typography>
            </Container>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}

export default About;
