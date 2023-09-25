import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  FormLabel,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Checkbox,
  FormControlLabel,
  MenuItem,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import roles from "../../data/roles";
import {
  VisuallyHiddenInput,
  formContainerStyle,
  headerStyle,
  buttonContainerStyle,
  formInputStyle,
  imageContainerStyle,
  closeButtonStyle,
} from "../../assets/style/style";

const customFormContainerStyle = {
  ...formContainerStyle,
  maxWidth: "800px",
};

function UserForm({
  newUser,
  editingUser,
  setNewUser,
  setEditingUser,
  handleSubmit,
  onClose,
}) {
  const [formData, setFormData] = useState(
    editingUser ? { ...editingUser } : { ...newUser }
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

    const isCheckbox = e.target.type === "checkbox";
    const updatedIsChecked = isCheckbox ? e.target.checked : formData.is_active;
    const formattedData = {
      ...updatedData,
      birthday: dayjs(formData.birthday).format("YYYY-MM-DD"),
      is_active: updatedIsChecked,
    };
    setFormData(formattedData);
    if (editingUser) {
      // Nếu đang chỉnh sửa tài khoản
      setEditingUser(formattedData);
    } else {
      // Nếu đang thêm tài khoản mới
      setNewUser(formattedData);
    }
  };

  return (
    <div style={customFormContainerStyle}>
      {/* Phần tiêu đề */}
      <div style={headerStyle}>
        <Typography variant="h6">
          {editingUser?.id ? "Chỉnh sửa tài khoản" : "Thêm tài khoản mới"}
        </Typography>
      </div>

      {/* Form nhập liệu */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="username"
                  label="Tên đăng nhập"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  style={formInputStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="password"
                  name="password"
                  label="Mật khẩu"
                  value={formData.password || ""}
                  onChange={handleChange}
                  required
                  style={formInputStyle}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  name="full_name"
                  label="Họ và tên"
                  value={formData.full_name}
                  onChange={handleChange}
                  style={formInputStyle}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Ngày sinh"
                  format="DD/MM/YYYY"
                  value={dayjs(formData.birthday)}
                  onChange={(date) =>
                    handleChange({
                      target: { name: "birthday", value: date },
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="gender-field">
                  <Typography
                    variant="subtitle1"
                    style={{ marginBottom: "8px" }}
                  >
                    Giới tính
                  </Typography>
                  <div className="radio-buttons">
                    <label
                      className={`radio-label ${
                        formData.gender === "male" ? "selected" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === "male"}
                        onChange={handleChange}
                      />
                      Nam
                    </label>
                    <label
                      className={`radio-label ${
                        formData.gender === "female" ? "selected" : ""
                      }`}
                      style={{ marginLeft: "20px" }}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={handleChange}
                      />
                      Nữ
                    </label>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={formInputStyle}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="phone"
                  label="Số điện thoại"
                  value={formData.phone}
                  onChange={handleChange}
                  style={formInputStyle}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="address"
                  label="Địa chỉ"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="role-label">Vai trò</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    label="Vai trò"
                  >
                    {roles.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.is_active}
                      onChange={handleChange}
                      name="is_active"
                    />
                  }
                  label="Kích hoạt tài khoản"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth style={formInputStyle}>
                  <FormLabel
                    htmlFor="image-input"
                    style={{ marginBottom: "4px" }}
                  >
                    Ảnh đại diện
                  </FormLabel>
                  {!selectedImage && (
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
                  )}
                </FormControl>
                {selectedImage && (
                  <div style={imageContainerStyle}>
                    <div style={{ position: "relative" }}>
                      <img
                        src={selectedImage}
                        alt="Uploaded"
                        style={{ height: "100px" }}
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

export default UserForm;
