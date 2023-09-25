import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";
import {
  headerStyle,
  buttonContainerStyle,
  formInputStyle,
  formContainerStyle,
} from "../../../assets/style/style";

function LevelForm({
  newLevel,
  setNewLevel,
  editingLevel,
  setEditingLevel,
  handleSubmit,
  onClose,
}) {
  const [formData, setFormData] = useState({});
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    // Tạo một hàm để kiểm soát việc load dữ liệu từ editingLevel
    const loadFormData = async () => {
      if (editingLevel) {
        // Nếu đang chỉnh sửa cấp đề tài, cập nhật formData từ editingLevel
        setFormData({ ...editingLevel });
      } else {
        // Nếu đang thêm cấp đề tài mới, cập nhật formData từ newLevel
        setFormData({ ...newLevel });
      }

      // Đã load xong dữ liệu từ editingLevel
      setIsLoadingData(false);
    };

    // Gọi hàm loadFormData
    loadFormData();
  }, [editingLevel, newLevel]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Sử dụng prevState để cập nhật state mà không bị mất dữ liệu
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (editingLevel) {
      // Nếu đang chỉnh sửa cấp đề tài
      setEditingLevel((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      // Nếu đang thêm cấp đề tài mới
      setNewLevel((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  if (isLoadingData) {
    // Hiển thị một thông báo hoặc spinner trong quá trình đợi dữ liệu load
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <div style={formContainerStyle}>
      <div style={headerStyle}>
        <Typography variant="h6">
          {editingLevel ? "Chỉnh sửa cấp đề tài" : "Thêm cấp đề tài"}
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="name"
              label="Cấp đề tài"
              value={formData.name}
              onChange={handleChange}
              style={formInputStyle}
            />
          </Grid>
        </Grid>
        <div style={buttonContainerStyle}>
          <Button type="submit" variant="contained" color="primary">
            Lưu
          </Button>
          <Button
            onClick={onClose}
            variant="contained"
            color="secondary"
            sx={{ marginLeft: "10px" }}
          >
            Hủy
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LevelForm;
