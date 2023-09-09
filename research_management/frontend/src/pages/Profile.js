import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Box,
  Grid,
  Divider,
  Button,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Profile() {
  const userData = useSelector((state) => state.user.userData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra xem dữ liệu đã tải xong chưa
    if (userData) {
      setIsLoading(false);
    }
  }, [userData]);

  // Kiểm tra xem người dùng đã đăng nhập hay chưa
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    // Nếu chưa đăng nhập, chuyển hướng họ đến trang đăng nhập
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header />
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: "20px", marginTop: "20px" }}>
          <Box
            position="relative"
            sx={{
              margin: "0 auto",
              textAlign: "center",
              maxWidth: "80px",
            }}
          >
            <Avatar
              alt={userData.username}
              src={userData.avatar}
              sx={{
                width: 80,
                height: 80,
                fontSize: 40,
              }}
            />
          </Box>
          <Typography variant="h5" mt={2} mb={2} align="center">
            {userData.last_name} {userData.first_name}
          </Typography>
          <Divider sx={{ marginBottom: "20px" }} />
          <Box
            mt={2}
            display="flex"
            justifyContent="center"
            sx={{ marginBottom: "20px" }}
          >
            <Button
              variant="outlined"
              component={Link}
              to="/edit-profile" // Điều hướng đến trang chỉnh sửa thông tin
            >
              <Edit sx={{ marginRight: "8px" }} /> Chỉnh sửa thông tin
            </Button>
          </Box>
          <Grid
            container
            spacing={2}
            sx={{ marginLeft: "60px", marginTop: "20px", marginBottom: "20px" }}
          >
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Ngày sinh:</strong> {userData.birth_date}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Giới tính:</strong> {userData.gender}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Địa chỉ:</strong> {userData.address}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Số điện thoại:</strong> {userData.phone}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Email:</strong> {userData.email}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Học hàm/ Học vị:</strong> {userData.degree}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <strong>Tổng số giờ nghiên cứu:</strong>{" "}
                {userData.total_study_hours}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
}

export default Profile;
