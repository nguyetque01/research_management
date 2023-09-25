import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Grid,
  MenuItem,
} from "@mui/material";
import dayjs from "dayjs";
import degrees from "../../data/degrees";
import positions from "../../data/positions";
import {
  formContainerStyle,
  headerStyle,
  buttonContainerStyle,
  formInputStyle,
} from "../../assets/style/style";

function AcademicProfileForm({
  editingAcademicProfile,
  setEditingAcademicProfile,
  editingUser,
  handleSubmit,
  onClose,
}) {
  const [formData, setFormData] = useState({ ...editingAcademicProfile });

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
    setEditingAcademicProfile(formattedData);
  };

  return (
    <div style={formContainerStyle}>
      {/* Phần tiêu đề */}
      <div style={headerStyle}>
        <Typography variant="h6">Chỉnh sửa lý lịch khoa học</Typography>
      </div>

      {/* Form nhập liệu */}
      <div style={{ overflow: "auto", maxHeight: "400px", paddingTop: 10 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                style={formInputStyle}
                fullWidth
                name="userID"
                label="Mã người dùng"
                value={editingUser.id}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                style={formInputStyle}
                fullWidth
                name="full_name"
                label="Họ và tên"
                value={editingUser.full_name}
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="academic_degree-label">
                  Học hàm/Học vị
                </InputLabel>
                <Select
                  labelId="academic_degree-label"
                  id="academic_degree"
                  name="academic_degree"
                  value={formData.academic_degree}
                  onChange={handleChange}
                  label="Học hàm/Học vị"
                >
                  {degrees.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="position-label">Chức vụ</InputLabel>
                <Select
                  labelId="position-label"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  label="Chức vụ"
                >
                  {positions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                style={formInputStyle}
                fullWidth
                multiline
                rows={3}
                name="education_history"
                label="Quá trình đào tạo"
                value={formData.education_history}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                style={formInputStyle}
                fullWidth
                multiline
                rows={3}
                name="work_history"
                label="Quá trình công tác"
                value={formData.work_history}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                style={formInputStyle}
                fullWidth
                multiline
                rows={3}
                name="research_activities"
                label="Hoạt động nghiên cứu"
                value={formData.research_activities}
                onChange={handleChange}
              />
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
    </div>
  );
}

export default AcademicProfileForm;
