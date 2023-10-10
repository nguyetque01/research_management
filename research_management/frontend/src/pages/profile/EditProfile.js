import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Divider,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  Box,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { setUserData } from "../../actions/userActions";
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

function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storedToken = localStorage.getItem("token");

  // State
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    full_name: "",
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
          dispatch(setUserData(userDataFromServer));
          setFormData(userDataFromServer);
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

    if (formData) {
      setIsLoading(false);
    }
  }, []);

  // Kiểm tra xem người dùng đã đăng nhập hay chưa
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!formData) {
    // Nếu chưa đăng nhập, chuyển hướng họ đến trang đăng nhập
    return <Navigate to="/login" />;
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const url = `${DEFAULT_BACKEND_URL}/api/update-profile/`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${storedToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newData = { ...formData };
        setFormData(newData);
        dispatch({ type: "SET_USER_DATA", payload: newData });
        setNotification({
          type: "success",
          message: "Cập nhật thông tin thành công",
        });
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      } else {
        const errorData = await response.json();
        if (errorData && errorData.error) {
          setNotification({
            type: "error",
            message: `Có lỗi xảy ra khi cập nhật thông tin cá nhân: ${errorData.error}`,
          });
        } else {
          setNotification({
            type: "error",
            message: "Có lỗi xảy ra khi cập nhật thông tin cá nhân",
          });
        }
      }
    } catch (error) {
      console.error("Lỗi khi thực hiện request:", error);
      setNotification({
        type: "error",
        message: "Có lỗi xảy ra khi cập nhật thông tin cá nhân",
      });
    }
  };

  const handleCancelChanges = () => {
    navigate("/profile");
  };

  return (
    <div>
      <Header />
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h5" mt={2} mb={2} align="center">
            Chỉnh sửa thông tin tài khoản
          </Typography>
          <Divider sx={{ marginBottom: "20px" }} />
          <Box
            position="relative"
            sx={{
              margin: "0 auto",
              textAlign: "center",
              maxWidth: "120px",
            }}
          >
            <Avatar
              alt={formData.username}
              src={formData.avatar}
              sx={{
                width: 120,
                height: 120,
                fontSize: 40,
                marginBottom: "10px",
              }}
            />
            <label
              htmlFor="avatar-upload"
              style={{
                position: "absolute",
                bottom: "0",
                right: "0",
                cursor: "pointer",
              }}
            >
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="avatar-upload"
                type="file"
                onChange={handleAvatarChange}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Box>
          <Grid
            container
            spacing={2}
            sx={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Họ và tên"
                value={formData.full_name}
                onChange={(e) => handleChange("full_name", e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label="Ngày sinh"
                format="DD/MM/YYYY"
                value={dayjs(formData.birthday)}
                onChange={(newValue) => handleChange("birthday", newValue)}
              />
            </Grid>
            <Grid item xs={6}>
              <div className="gender-field">
                <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
                  Giới tính
                </Typography>
                <div className="radio-buttons">
                  <label
                    className={`radio-label ${
                      formData.gender === "male" ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                    />
                    Nam
                  </label>
                  <label
                    className={`radio-label ${
                      formData.gender === "female" ? "selected" : ""
                    }`}
                    style={{ marginLeft: "20px" }}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                    />
                    Nữ
                  </label>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Số điện thoại"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Địa chỉ"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
            }}
          >
            <Button variant="contained" onClick={handleSaveChanges}>
              Lưu Thay Đổi
            </Button>
            <Button variant="outlined" onClick={handleCancelChanges}>
              Hủy Bỏ
            </Button>
          </Box>
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

export default EditProfile;
