import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Navigate } from "react-router-dom";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Header from "../components/Header";
import Footer from "../components/Footer";
import dayjs from "dayjs";

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
  const userData = useSelector((state) => state.user.userData);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    avatar: userData.avatar || "",
    firstName: userData.first_name,
    lastName: userData.last_name,
    birthDate: dayjs(userData.birth_date).format("DD/MM/YYYY"),
    gender: userData.gender,
    degree: userData.degree || "",
    email: userData.email || "",
    phone: userData.phone || "",
    address: userData.address || "",
  });

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

  const handleSaveChanges = () => {
    // Thực hiện lưu thay đổi thông tin cá nhân
    // Gửi dữ liệu formData lên server hoặc thực hiện các thao tác cần thiết
  };

  const handleCancelChanges = () => {
    // Thực hiện hủy bỏ các thay đổi và quay lại trang trước đó
    // Có thể chuyển hướng hoặc hiển thị thông báo xác nhận
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
              alt={userData.username}
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Họ"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tên"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label="Ngày sinh"
                format="DD/MM/YYYY"
                // value={formData.birthDate}
                // onChange={(newValue) =>
                //   setFormData({ ...formData, birthDate: newValue })
                // }
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
                      formData.gender === "M" ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value="M"
                      checked={formData.gender === "M"}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                    />
                    Nam
                  </label>
                  <label
                    className={`radio-label ${
                      formData.gender === "F" ? "selected" : ""
                    }`}
                    style={{ marginLeft: "20px" }}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value="F"
                      checked={formData.gender === "F"}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                    />
                    Nữ
                  </label>
                </div>
              </div>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="degree-label">Học vị/ Học hàm</InputLabel>
                <Select
                  labelId="degree-label"
                  id="degree"
                  value={formData.degree}
                  onChange={(e) =>
                    setFormData({ ...formData, degree: e.target.value })
                  }
                  label="Học vị/ Học hàm"
                >
                  {degrees.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Số điện thoại"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Địa chỉ"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
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
    </div>
  );
}

export default EditProfile;
