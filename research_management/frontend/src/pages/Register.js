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
    value: "4",
    label: "Giáo sư",
  },
];

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [gender, setGender] = useState("");
  const [degree, setDegree] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [policyAgreement, setPolicyAgreement] = useState(false);

  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);

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
      username: username ? "" : "Vui lòng nhập tên đăng nhập",
      password: password ? "" : "Vui lòng nhập mật khẩu",
      firstName: firstName ? "" : "Vui lòng nhập tên",
      lastName: lastName ? "" : "Vui lòng nhập họ",
      birthDate: birthDate ? "" : "Vui lòng chọn ngày sinh",
      gender: gender ? "" : "Vui lòng chọn giới tính",
      degree: degree ? "" : "Vui lòng chọn học vị/học hàm",
      phone: validatePhone(phone) ? "" : "Số điện thoại không hợp lệ",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? ""
        : "Vui lòng nhập địa chỉ email hợp lệ",
      address: address ? "" : "Vui lòng nhập địa chỉ",
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
      await axios.post(`${DEFAULT_BACKEND_URL}/api/register/`, {
        username: username,
        password: password,
        first_name: firstName,
        last_name: lastName,
        birth_date: birthDate,
        gender: gender,
        degree: degree,
        phone: phone,
        email: email,
        address: address,
      });
      setShowSuccessNotification(true);
    } catch (error) {
      setShowErrorNotification(true);
      setErrorMessage("Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.");
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={errors.lastName !== ""}
                helperText={errors.lastName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="text"
                label="Tên"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={errors.firstName !== ""}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label="Ngày sinh"
                value={birthDate}
                onChange={(newValue) => setBirthDate(newValue)}
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
                      gender === "M" ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value="M"
                      checked={gender === "M"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    Nam
                  </label>
                  <label
                    className={`radio-label ${
                      gender === "F" ? "selected" : ""
                    }`}
                    style={{ marginLeft: "20px" }}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value="F"
                      checked={gender === "F"}
                      onChange={(e) => setGender(e.target.value)}
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
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={errors.phone !== ""}
                helperText={errors.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
          {errorMessage && (
            <Typography variant="body2" className="error-message">
              {errorMessage}
            </Typography>
          )}
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
        open={showSuccessNotification || showErrorNotification}
        autoHideDuration={3000}
        onClose={() => {
          setShowSuccessNotification(false);
          setShowErrorNotification(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          variant="filled"
          severity={showSuccessNotification ? "success" : "error"}
          // sx={{
          //   backgroundColor: showSuccessNotification ? "#4CAF50" : "#FF5722",
          // }}
        >
          {showSuccessNotification
            ? "Đăng ký thành công"
            : "Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau."}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Register;
