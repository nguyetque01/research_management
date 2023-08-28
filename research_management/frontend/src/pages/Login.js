import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  AccountCircle,
  LockOutlined,
  HelpOutline,
  ArrowForward,
} from "@mui/icons-material";
import "../assets/css/Login.css";
import DEFAULT_BACKEND_URL from "../config.js";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    setErrors({});

    if (!validateLoginForm()) {
      return;
    }

    try {
      const response = await axios.post(`${DEFAULT_BACKEND_URL}/api/login/`, {
        username: username,
        password: password,
      });

      localStorage.setItem("token", response.data.token);

      setIsLoggedIn(true);
      setShowSuccessNotification(true);
      window.location.href = "/dashboard";
    } catch (error) {
      setShowErrorNotification(true);
      setErrorMessage("Tên đăng nhập hoặc mật khẩu không đúng.");
    }
  };

  const validateLoginForm = () => {
    const newErrors = {
      username: username ? "" : "Vui lòng nhập tên đăng nhập",
      password: password ? "" : "Vui lòng nhập mật khẩu",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <div className="login-container">
        <div className="login-box">
          <Typography
            variant="h4"
            style={{ marginBottom: "20px", marginTop: "20px" }}
          >
            Đăng nhập
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                label="Tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={!!errors.username}
                helperText={errors.username}
                InputProps={{
                  startAdornment: <AccountCircle />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  startAdornment: <LockOutlined />,
                }}
              />
            </Grid>
          </Grid>
          <div
            className="button-group"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <Button variant="contained" onClick={handleLogin}>
              Đăng nhập
            </Button>
            <Link to="/register">
              <Button variant="outlined">Đăng ký</Button>
            </Link>
          </div>
          <div className="login-options" style={{ marginTop: "20px" }}>
            <Link to="/forgot-password" className="forgot-password-link">
              <HelpOutline />
              Quên mật khẩu
            </Link>
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
            ? "Đăng nhập thành công"
            : "Tên đăng nhập hoặc mật khẩu không đúng."}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
