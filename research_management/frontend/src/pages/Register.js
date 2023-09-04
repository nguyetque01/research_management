import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Grid,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AccountCircle, LockOutlined, ArrowForward } from "@mui/icons-material";
import "../assets/css/Register.css";
import DEFAULT_BACKEND_URL from "../config.js";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    birth_date: null,
    gender: "",
    degree: "",
    email: "",
    phone: "",
    address: "",
  });

  const [policyAgreement, setPolicyAgreement] = useState(false);
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    degree: "",
    phone: "",
    email: "",
    address: "",
    policyAgreement: "",
  });

  const validateForm = () => {
    const newErrors = {
      username: formData.username ? "" : "Vui lòng nhập tên đăng nhập",
      password: formData.password ? "" : "Vui lòng nhập mật khẩu",
      first_name: formData.first_name ? "" : "Vui lòng nhập tên",
      last_name: formData.last_name ? "" : "Vui lòng nhập họ",
      birth_date: formData.birth_date ? "" : "Vui lòng chọn ngày sinh",
      gender: formData.gender ? "" : "Vui lòng chọn giới tính",
      degree: formData.degree ? "" : "Vui lòng chọn học vị/học hàm",
      phone: validatePhone(formData.phone) ? "" : "Số điện thoại không hợp lệ",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ? ""
        : "Vui lòng nhập địa chỉ email hợp lệ",
      address: formData.address ? "" : "Vui lòng nhập địa chỉ",
      policyAgreement: policyAgreement
        ? ""
        : "Vui lòng đồng ý với chính sách và điều khoản",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const validatePhone = (phone) => {
    const phonePattern = /^0[0-9]{9}$/;
    return phonePattern.test(phone);
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const formattedData = {
        ...formData,
        birth_date: formData.birth_date?.toISOString().split("T")[0], // Convert birth_date to ISO string
      };
      console.log(formattedData);

      await axios.post(`${DEFAULT_BACKEND_URL}/api/register/`, formattedData);
      setNotification({
        type: "success",
        message: "Đăng ký thành công",
      });
    } catch (error) {
      setNotification({
        type: "error",
        message: "Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.",
      });
    }
  };

  return (
    <div>
      <Header />
      <div className="register-container">
        <div className="register-box">
          <Typography
            variant="h4"
            style={{ marginBottom: "20px", marginTop: "20px" }}
          >
            Đăng ký tài khoản
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="text"
                label="Tên đăng nhập"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                InputProps={{
                  startAdornment: <AccountCircle />,
                }}
                error={errors.username !== ""}
                helperText={errors.username}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="password"
                label="Mật khẩu"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                InputProps={{
                  startAdornment: <LockOutlined />,
                }}
                error={errors.password !== ""}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="text"
                label="Họ"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
                error={errors.lastName !== ""}
                helperText={errors.lastName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="text"
                label="Tên"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
                error={errors.firstName !== ""}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label="Ngày sinh"
                value={formData.birth_date}
                onChange={(newValue) =>
                  setFormData({ ...formData, birth_date: newValue })
                }
                error={errors.birthDate !== null}
                helperText={errors.birthDate}
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
                {errors.gender && (
                  <Typography variant="caption" color="error">
                    {errors.gender}
                  </Typography>
                )}
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
                {errors.degree && (
                  <Typography variant="caption" color="error">
                    {errors.degree}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                label="Số điện thoại"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                error={errors.phone !== ""}
                helperText={errors.phone}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                type="email"
                label="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                error={errors.email !== ""}
                helperText={errors.email}
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
          <Grid item xs={12}>
            <div className="policy-checkbox">
              <input
                type="checkbox"
                id="policyAgreement"
                checked={policyAgreement}
                onChange={() => setPolicyAgreement(!policyAgreement)}
              />
              <label htmlFor="policyAgreement">
                Tôi đồng ý với
                <Link to="/policy" className="policy-link">
                  Chính sách và điều khoản
                </Link>
              </label>
              {errors.policyAgreement && (
                <Typography variant="caption" color="error">
                  Vui lòng đồng ý với chính sách và điều khoản
                </Typography>
              )}
            </div>
          </Grid>
          <div
            className="button-group"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <Button variant="contained" onClick={handleRegister}>
              Đăng ký
            </Button>
            <Link to="/login">
              <Button variant="outlined">Đăng nhập</Button>
            </Link>
          </div>
          <div className="options" style={{ marginTop: "20px" }}>
            <Link to="/" className="back-link">
              <ArrowForward />
              Quay về
            </Link>
          </div>
        </div>
      </div>
      <Footer />
      <Snackbar
        open={notification.message !== ""}
        autoHideDuration={3000}
        onClose={() => setNotification({ type: "success", message: "" })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert variant="filled" severity={notification.type}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Register;
