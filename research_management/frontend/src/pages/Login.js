import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../actions/userActions";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { AccountCircle, LockOutlined, HelpOutline } from "@mui/icons-material";
import DEFAULT_BACKEND_URL from "../config.js";
import Footer from "../components/Footer";
import "../assets/css/Login.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);

  // Kiểm tra xem người dùng đã đăng nhập hay chưa
  if (isLoggedIn) {
    // Nếu đã đăng nhập, chuyển hướng đến trang chính
    return <Navigate to="/dashboard" />;
  }

  async function handleLogin() {
    setErrors({});

    if (!validateLoginForm()) {
      return;
    }

    try {
      const response = await axios.post(`${DEFAULT_BACKEND_URL}/api/login/`, {
        username: username,
        password: password,
      });

      handleLoginResponse(response);
    } catch (error) {
      handleLoginError(error);
    }
  }

  async function handleLoginResponse(response) {
    if (response.data && response.data.token) {
      localStorage.setItem("token", response.data.token);
      console.log(response.data);

      try {
        const userProfileResponse = await axios.get(
          `${DEFAULT_BACKEND_URL}/api/user-profile`,
          {
            headers: {
              Authorization: `Token ${response.data.token}`,
            },
          }
        );

        handleUserProfileResponse(userProfileResponse);
      } catch (error) {
        handleUserProfileError(error);
      }
    } else {
      setShowErrorNotification(true);
      setErrorMessage("Lỗi khi đăng nhập: Không có token sau khi đăng nhập.");
    }
  }

  function handleUserProfileResponse(userProfileResponse) {
    if (userProfileResponse) {
      setUserData(userProfileResponse.data);
      localStorage.setItem(
        "userData",
        JSON.stringify(userProfileResponse.data)
      );
    }

    dispatch(loginSuccess(userProfileResponse.data)); // Gửi action khi đăng nhập thành công

    setShowSuccessNotification(true);

    setTimeout(() => {
      setShowSuccessNotification(false);
      if (userProfileResponse?.data?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    }, 1);
  }

  function handleUserProfileError(error) {
    if (error.response) {
      // Lỗi trong response từ server
      console.error("Lỗi khi lấy thông tin người dùng:", error.response);
    } else if (error.request) {
      // Lỗi trong quá trình gửi request
      console.error("Lỗi khi gửi request:", error.request);
    } else {
      // Lỗi khác
      console.error("Lỗi:", error.message);
    }
  }

  function handleLoginError(error) {
    setShowErrorNotification(true);
    if (error.response && error.response.status === 401) {
      setErrorMessage("Tên đăng nhập hoặc mật khẩu không đúng.");
    } else {
      setErrorMessage("Đã xảy ra lỗi khi đăng nhập.");
    }
  }

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
      <div className="login-container">
        <div
          className="login-header"
          style={{
            paddingTop: 20,
            textAlign: "center",
          }}
        >
          <div>
            <Typography
              variant="h1"
              style={{
                fontSize: 24,
                textTransform: "uppercase",
                fontWeight: 600,
                color: "#3F51B5",
              }}
            >
              Hệ thống quản lý nghiên cứu khoa học
            </Typography>
          </div>
          <div>
            <Typography
              variant="subtitile1"
              style={{
                padding: 0,
                margin: 0,
                color: "#3F51B5",
                fontSize: 16,
              }}
            >
              Khoa Công nghệ thông tin - Trường Đại học Công nghệ Đồng Nai
            </Typography>
          </div>
        </div>
        <div className="login-box">
          <Typography
            variant="h4"
            style={{
              marginBottom: "20px",
              textTransform: "uppercase",
              fontSize: 20,
            }}
          >
            Đăng nhập vào hệ thống
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
          <div className="button-group" style={{ marginTop: "20px" }}>
            <Link to="/forgot-password" className="forgot-password-link">
              <HelpOutline sx={{ marginRight: "2px" }} />
              Quên mật khẩu
            </Link>
            <Button variant="contained" onClick={handleLogin}>
              Đăng nhập
            </Button>
          </div>
        </div>
        <Footer
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            minWidth: "100%",
            paddingLeft: 0,
            paddingRight: 0,
          }}
          textStyle={{ color: "rgba(255, 255, 255, 0.8)" }}
          linkStyle={{
            color: "rgba(255, 255, 255, 0.4)",
            textDecorationColor: "rgba(255, 255, 255, 0.4)",
          }}
        />
      </div>
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
        >
          {showSuccessNotification ? "Đăng nhập thành công" : errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
