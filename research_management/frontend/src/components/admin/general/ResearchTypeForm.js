import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";
import {
  headerStyle,
  buttonContainerStyle,
  formInputStyle,
  formContainerStyle,
} from "../../../assets/style/style";

function ResearchTypeForm({
  newResearchType,
  setNewResearchType,
  editingResearchType,
  setEditingResearchType,
  handleSubmit,
  onClose,
}) {
  const [formData, setFormData] = useState({});
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    // Tạo một hàm để kiểm soát việc load dữ liệu từ editingResearchType
    const loadFormData = async () => {
      if (editingResearchType) {
        // Nếu đang chỉnh sửa loại hình nghiên cứu, cập nhật formData từ editingResearchType
        setFormData({ ...editingResearchType });
      } else {
        // Nếu đang thêm loại hình nghiên cứu mới, cập nhật formData từ newResearchType
        setFormData({ ...newResearchType });
      }

      // Đã load xong dữ liệu từ editingResearchType
      setIsLoadingData(false);
    };

    // Gọi hàm loadFormData
    loadFormData();
  }, [editingResearchType, newResearchType]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Sử dụng prevState để cập nhật state mà không bị mất dữ liệu
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (editingResearchType) {
      // Nếu đang chỉnh sửa loại hình nghiên cứu
      setEditingResearchType((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      // Nếu đang thêm loại hình nghiên cứu mới
      setNewResearchType((prevState) => ({
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
          {editingResearchType
            ? "Chỉnh sửa loại hình nghiên cứu"
            : "Thêm loại hình nghiên cứu"}
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="name"
              label="Loại hình nghiên cứu"
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

export default ResearchTypeForm;
