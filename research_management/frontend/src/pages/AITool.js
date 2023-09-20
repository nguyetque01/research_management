import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  Paper,
  Grid,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Send } from "@mui/icons-material";
import "../assets/css/AITool.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AITool() {
  const navigate = useNavigate();
  const [generatedText, setGeneratedText] = useState("");
  const [inputText, setInputText] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showResultLabel, setShowResultLabel] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (!isLoggedIn) {
      // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
      navigate("/login");
      console.log(isLoggedIn);
    }
  }, []);

  const apiKey = "quickstart-QUdJIGlzIGNvbWluZy4uLi4K";

  const handleGenerateText = async () => {
    try {
      const response = await fetch(
        "https://api.deepai.org/api/text-generator",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "api-key": apiKey,
          },
          body: `text=${encodeURIComponent(inputText) + "bằng tiếng việt"}`,
        }
      );
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        setGeneratedText(data.output);
        setShowResultLabel(true); // Hiển thị chữ "Kết quả"
        setShowResult(true); // Hiển thị kết quả
      } else {
        // Xử lý lỗi ở đây nếu cần
        setShowResultLabel(false); // Ẩn chữ "Kết quả"
        setShowResult(false); // Ẩn kết quả
      }
    } catch (error) {
      // Xử lý lỗi kết nối mạng hoặc lỗi khác
      setShowResultLabel(false); // Ẩn chữ "Kết quả"
      setShowResult(false); // Ẩn kết quả
    }
  };

  useEffect(() => {
    if (!showResult) {
      setGeneratedText(""); // Xóa kết quả khi nhập mới
    }
  }, [showResult]);

  return (
    <div>
      <Header />
      <Container maxWidth="100px" className="dashboard-container">
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
              <Paper
                elevation={3}
                style={{ padding: "20px", borderRadius: "10px" }}
              >
                <Typography variant="h4" gutterBottom>
                  AI Text Generator
                </Typography>
                <TextField
                  variant="outlined"
                  label="Nhập yêu cầu"
                  multiline
                  rows={4}
                  fullWidth
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  style={{ marginBottom: "16px" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Send />}
                  onClick={handleGenerateText}
                  style={{ marginRight: "16px" }}
                >
                  Tạo văn bản
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setInputText("");
                    setShowResultLabel(false); // Ẩn chữ "Kết quả"
                    setShowResult(false); // Ẩn kết quả
                  }}
                >
                  Xóa
                </Button>
                <Box mt={3}>
                  {showResultLabel && (
                    <Typography variant="h6" gutterBottom>
                      Kết quả:
                    </Typography>
                  )}
                  <div
                    className={showResult ? "result-text show" : "result-text"}
                    style={{ maxWidth: "500px" }}
                  >
                    {generatedText}
                  </div>
                </Box>
              </Paper>
            </Container>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}

export default AITool;
