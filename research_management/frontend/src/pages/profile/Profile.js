import React, { useEffect, useState } from "react";
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
  Snackbar,
  Alert,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import dayjs from "dayjs";
import DEFAULT_BACKEND_URL from "../../config.js";

const degrees = [
  {
    value: "1",
    label: "Cử nhân/ Kỹ sư",
  },
  {
    value: "2",
    label: "Thạc sĩ",
  },
  {
    value: "3",
    label: "Tiến sĩ",
  },
  {
    value: "4",
    label: "Phó giáo sư",
  },
  {
    value: "5",
    label: "Giáo sư",
  },
];

function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    birthday: "",
    gender: "",
    degree: "",
    email: "",
    phone: "",
    address: "",
    avatar: null,
  });
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
  });

  // Fetch user data from server
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    const fetchDataFromServer = async () => {
      try {
        const response = await fetch(
          `${DEFAULT_BACKEND_URL}/api/user-profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Token ${storedToken}`,
            },
          }
        );

        if (response.ok) {
          const userDataFromServer = await response.json();
          setUserData(userDataFromServer);
          setIsLoading(false);
        } else {
          const errorData = await response.json();
          setNotification({
            type: "error",
            message:
              errorData && errorData.error
                ? `Có lỗi xảy ra: ${errorData.error}`
                : "Có lỗi xảy ra khi lấy dữ liệu từ máy chủ",
          });
        }
      } catch (error) {
        console.error("Lỗi khi thực hiện request:", error);
        setNotification({
          type: "error",
          message: "Có lỗi xảy ra khi lấy dữ liệu từ máy chủ",
        });
      }
    };

    fetchDataFromServer();

    if (userData) {
      setIsLoading(false);
    }
  }, []);

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
              src={userData.profile_picture}
              sx={{
                width: 80,
                height: 80,
                fontSize: 40,
              }}
            />
          </Box>
          <Typography variant="h5" mt={2} mb={2} align="center">
            {userData.full_name}
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
              to="/profile/edit" // Điều hướng đến trang chỉnh sửa thông tin
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
                <strong>Ngày sinh:</strong>{" "}
                {dayjs(userData.birthday).format("DD/MM/YYYY")}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Giới tính:</strong>{" "}
                {userData.gender === "male" ? "Nam" : "Nữ"}
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
                <strong>Địa chỉ:</strong> {userData.address}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Footer />
      <Snackbar
        open={notification.message !== ""}
        autoHideDuration={3000}
        onClose={() => setNotification({ type: "", message: "" })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert variant="filled" severity={notification.type}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Profile;
