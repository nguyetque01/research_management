import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";
import {
  headerStyle,
  buttonContainerStyle,
  formInputStyle,
  formContainerStyle,
} from "../../../assets/style/style";

function AcademicYearForm({
  newAcademicYear,
  setNewAcademicYear,
  editingAcademicYear,
  setEditingAcademicYear,
  handleSubmit,
  onClose,
}) {
  const [formData, setFormData] = useState({});
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    // Tạo một hàm để kiểm soát việc load dữ liệu từ editingAcademicYear
    const loadFormData = async () => {
      if (editingAcademicYear) {
        // Nếu đang chỉnh sửa năm học, cập nhật formData từ editingAcademicYear
        setFormData({ ...editingAcademicYear });
      } else {
        // Nếu đang thêm năm học mới, cập nhật formData từ newAcademicYear
        setFormData({ ...newAcademicYear });
      }

      // Đã load xong dữ liệu từ editingAcademicYear
      setIsLoadingData(false);
    };

    // Gọi hàm loadFormData
    loadFormData();
  }, [editingAcademicYear, newAcademicYear]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Sử dụng prevState để cập nhật state mà không bị mất dữ liệu
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (editingAcademicYear) {
      // Nếu đang chỉnh sửa năm học
      setEditingAcademicYear((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      // Nếu đang thêm năm học mới
      setNewAcademicYear((prevState) => ({
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
          {editingAcademicYear ? "Chỉnh sửa năm học" : "Thêm năm học"}
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="name"
              label="Năm học"
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

export default AcademicYearForm;
