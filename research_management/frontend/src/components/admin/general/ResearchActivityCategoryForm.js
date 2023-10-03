import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";
import {
  headerStyle,
  buttonContainerStyle,
  formInputStyle,
  formContainerStyle,
} from "../../../assets/style/style";

function ResearchActivityCategoryForm({
  newResearchActivityCategory,
  setNewResearchActivityCategory,
  editingResearchActivityCategory,
  setEditingResearchActivityCategory,
  handleSubmit,
  onClose,
  editingCategoryResearchType,
}) {
  const [formData, setFormData] = useState({});
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    // Tạo một hàm để kiểm soát việc load dữ liệu từ editingResearchActivityCategory
    const loadFormData = async () => {
      if (editingResearchActivityCategory) {
        // Nếu đang chỉnh sửa phân loại hoạt động nghiên cứu, cập nhật formData từ editingResearchActivityCategory
        setFormData({ ...editingResearchActivityCategory });
      } else {
        // Nếu đang thêm phân loại hoạt động nghiên cứu mới, cập nhật formData từ newResearchActivityCategory
        setFormData({ ...newResearchActivityCategory });
      }

      // Đã load xong dữ liệu từ editingResearchActivityCategory
      setIsLoadingData(false);
    };

    // Gọi hàm loadFormData
    loadFormData();
  }, [editingResearchActivityCategory, newResearchActivityCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Sử dụng prevState để cập nhật state mà không bị mất dữ liệu
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (editingResearchActivityCategory) {
      // Nếu đang chỉnh sửa phân loại hoạt động nghiên cứu
      setEditingResearchActivityCategory((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      // Nếu đang thêm phân loại hoạt động nghiên cứu mới
      setNewResearchActivityCategory((prevState) => ({
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
          {editingResearchActivityCategory
            ? "Chỉnh sửa phân loại hoạt động nghiên cứu"
            : "Thêm phân loại hoạt động nghiên cứu"}
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="name"
              label="Loại hình nghiên cứu"
              value={editingCategoryResearchType.name}
              style={formInputStyle}
              disabled
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="name"
              label="Tên phân loại"
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

export default ResearchActivityCategoryForm;
