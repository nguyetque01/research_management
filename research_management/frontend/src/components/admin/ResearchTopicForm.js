import React, { useState, useEffect } from "react";
import axios from "axios";
import DEFAULT_BACKEND_URL from "../../config";
import {
  TextField,
  Button,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
} from "@mui/material";
import {
  headerStyle,
  buttonContainerStyle,
  formInputStyle,
  formContainerStyle,
} from "../../assets/style/style";
import studyStatus from "../../data/studyStatus";
import approvalStatus from "../../data/approvalStatus";

function ResearchTopicForm({
  newTopic,
  setNewTopic,
  editingTopic,
  setEditingTopic,
  handleSubmit,
  onClose,
}) {
  const backendUrl = DEFAULT_BACKEND_URL;
  const [formData, setFormData] = useState(
    editingTopic ? { ...editingTopic } : { ...newTopic }
  );
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  async function fetchCategories() {
    try {
      const response = await axios.get(`${backendUrl}/api/categories/`);
      setCategories(response.data);
      setLoadingCategories(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  // Xử lý khi người dùng thay đổi giá trị trường nhập liệu
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Đảm bảo tính hợp lệ của số giờ nghiên cứu (study_hours)
    if (name === "study_hours") {
      if (!Number.isNaN(Number(value)) && Number(value) >= 0) {
        const updatedData = {
          ...formData,
          [name]: value,
        };
        setFormData(updatedData);
      }
    } else {
      const updatedData = {
        ...formData,
        [name]: value,
      };
      setFormData(updatedData);
    }

    if (editingTopic) {
      // Nếu đang chỉnh sửa đề tài
      setEditingTopic(formData);
    } else {
      // Nếu đang thêm đề tài mới
      setNewTopic(formData);
    }
  };

  return (
    <div style={formContainerStyle}>
      {/* Phần tiêu đề */}
      <div style={headerStyle}>
        <Typography variant="h6">
          {editingTopic
            ? "Chỉnh sửa đề tài nghiên cứu"
            : "Thêm đề tài nghiên cứu"}
        </Typography>
      </div>

      {/* Form nhập liệu */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* Trường nhập tên đề tài */}
            <TextField
              fullWidth
              name="name"
              label="Tên đề tài"
              value={formData.name}
              onChange={handleChange}
              required
              style={formInputStyle}
            />
          </Grid>

          <Grid item xs={12}>
            {/* Trường nhập danh mục */}
            <FormControl fullWidth style={formInputStyle}>
              <InputLabel>Danh mục</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                {loadingCategories ? (
                  <MenuItem disabled>Đang tải danh mục...</MenuItem>
                ) : (
                  categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* Trường nhập số giờ nghiên cứu */}
            <TextField
              fullWidth
              name="study_hours"
              label="Số giờ nghiên cứu"
              type="number"
              value={formData.study_hours}
              onChange={handleChange}
              required
              style={formInputStyle}
            />
          </Grid>

          <Grid item xs={12}>
            {/* Trường nhập mô tả */}
            <TextField
              fullWidth
              name="description"
              label="Mô tả"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              style={formInputStyle}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* Trường nhập trạng thái phê duyệt */}
            <FormControl fullWidth style={formInputStyle}>
              <InputLabel>Trạng thái phê duyệt</InputLabel>
              <Select
                name="approval_status"
                value={formData.approval_status}
                onChange={handleChange}
                required
              >
                {approvalStatus.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* Trường nhập trạng thái nghiên cứu */}
            <FormControl fullWidth style={formInputStyle}>
              <InputLabel>Trạng thái nghiên cứu</InputLabel>
              <Select
                name="study_status"
                value={formData.study_status}
                onChange={handleChange}
                required
              >
                {studyStatus.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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

export default ResearchTopicForm;
