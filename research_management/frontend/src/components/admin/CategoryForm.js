import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  FormControl,
  Grid,
  FormLabel,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import {
  VisuallyHiddenInput,
  headerStyle,
  buttonContainerStyle,
  formInputStyle,
  imageContainerStyle,
  closeButtonStyle,
  formContainerStyle,
} from "../../assets/style/style";

function CategoryForm({
  newCategory,
  setNewCategory,
  editingCategory,
  setEditingCategory,
  handleSubmit,
  onClose,
}) {
  const [formData, setFormData] = useState(
    editingCategory ? { ...editingCategory } : { ...newCategory }
  );
  const [selectedImage, setSelectedImage] = useState(null);

  // Xử lý khi người dùng chọn hình ảnh
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  // Xử lý khi người dùng xóa hình ảnh đã chọn
  const handleImageClear = () => {
    setSelectedImage(null);
  };

  // Xử lý khi người dùng thay đổi giá trị trường nhập liệu
  const handleChange = (e) => {
    // Xử lý formData
    const { name, value, files } = e.target;
    const updatedData = {
      ...formData,
      [name]: name === "image" ? files[0] : value,
    };
    setFormData(updatedData);

    if (editingCategory) {
      // Nếu đang chỉnh sửa danh mục
      setEditingCategory(updatedData);
    } else {
      // Nếu đang thêm danh mục mới
      setNewCategory(updatedData);
    }
  };

  return (
    <div style={formContainerStyle}>
      {/* Phần tiêu đề */}
      <div style={headerStyle}>
        <Typography variant="h6">
          {editingCategory?.id ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
        </Typography>
      </div>

      {/* Form nhập liệu */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* Trường nhập tên danh mục */}
            <TextField
              fullWidth
              name="name"
              label="Tên danh mục"
              value={formData.name}
              onChange={handleChange}
              required
              style={formInputStyle}
            />
          </Grid>
          <Grid item xs={12}>
            {/* Trường chọn hình ảnh */}
            <FormControl fullWidth style={formInputStyle}>
              <FormLabel htmlFor="image-input" style={{ marginBottom: "4px" }}>
                Hình ảnh
              </FormLabel>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Tải hình ảnh lên
                <VisuallyHiddenInput
                  type="file"
                  id="image-input"
                  onChange={handleFileChange}
                />
              </Button>
            </FormControl>
            {/* Hiển thị hình ảnh đã chọn */}
            {selectedImage && (
              <div style={imageContainerStyle}>
                <div style={{ position: "relative" }}>
                  <img
                    src={selectedImage}
                    alt="Uploaded"
                    style={{ maxHeight: "100px", marginBottom: "10px" }}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    style={closeButtonStyle}
                    onClick={handleImageClear}
                  >
                    <CloseIcon fontSize="small" />
                  </Button>
                </div>
              </div>
            )}
          </Grid>
        </Grid>

        {/* Nút lưu và nút hủy */}
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

export default CategoryForm;
