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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {
  formContainerStyle,
  headerStyle,
  buttonContainerStyle,
  formInputStyle,
} from "../../assets/style/style";
import getCategoriesByActivityId, {
  getResearchCategoriesByActivityId,
  getResearchHours,
} from "../../utils/commonUtils";

const customFormContainerStyle = {
  ...formContainerStyle,
  maxWidth: "800px",
};

function ResearchTopicForm({
  isUser,
  newResearchTopic,
  editingResearchTopic,
  setEditingResearchTopic,
  researchActivities,
  researchCategories,
  researchActivityDetails,
  users,
  handleSubmit,
  onClose,
}) {
  const [formData, setFormData] = useState(
    editingResearchTopic ? { ...editingResearchTopic } : { ...newResearchTopic }
  );
  const defaultCategories = getResearchCategoriesByActivityId(
    researchCategories,
    researchActivities,
    formData?.activity
  );

  const [currentCategories, setCurrentCategories] = useState(defaultCategories);
  console.log(currentCategories);

  // Xử lý khi người dùng thay đổi giá trị trường nhập liệu
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Sử dụng prevState để cập nhật state mà không bị mất dữ liệu
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Nếu đang chỉnh sửa đề tài
    setEditingResearchTopic((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    const categories = getResearchCategoriesByActivityId(
      researchCategories,
      researchActivities,
      editingResearchTopic?.activity
    );
    setCurrentCategories(categories);
  };

  return (
    <div style={customFormContainerStyle}>
      {/* Phần tiêu đề */}
      <div style={headerStyle}>
        <Typography variant="h6">Thông tin đề tài nghiên cứu</Typography>
      </div>

      {/* Form nhập liệu */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="name"
                  label="Tên đề tài"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={!isUser}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="activity-label">Hoạt động</InputLabel>
                  <Select
                    labelId="activity-label"
                    id="activity"
                    name="activity"
                    value={formData?.activity}
                    onChange={handleChange}
                    label="Hoạt động"
                    maxHeight={200}
                    disabled={!isUser}
                  >
                    {researchActivities.map((option) => (
                      <MenuItem
                        key={option.id}
                        value={option.id}
                        style={{ maxWidth: 400, maxHeight: 200 }}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {currentCategories.length !== 0 && (
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="category-label">
                      Phân loại hoạt động
                    </InputLabel>
                    <Select
                      labelId="category-label"
                      id="category"
                      name="category"
                      value={formData?.category}
                      onChange={handleChange}
                      label="Phân loại hoạt động"
                      maxHeight={200}
                      disabled={!isUser}
                    >
                      {currentCategories.map((option) => (
                        <MenuItem
                          key={option.id}
                          value={option.id}
                          style={{ maxWidth: 400, maxHeight: 200 }}
                        >
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="research_hours"
                  label="Số giờ"
                  value={getResearchHours(
                    editingResearchTopic?.activity,
                    editingResearchTopic?.category,
                    researchActivities,
                    researchActivityDetails
                  )}
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="author-label">Tác giả</InputLabel>
                  <Select
                    labelId="author-label"
                    id="author"
                    name="author"
                    value={formData?.authors[0]}
                    onChange={handleChange}
                    label="Tác giả"
                    maxHeight={200}
                    disabled={!isUser}
                  >
                    {users.map((option) => (
                      <MenuItem
                        key={option.id}
                        value={option.id}
                        style={{ maxWidth: 400, maxHeight: 200 }}
                      >
                        {option.full_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="description"
                  label="Mô tả"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={2}
                  disabled={!isUser}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="abstract"
                  label="Tóm tắt"
                  value={formData.abstract}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  disabled={!isUser}
                />
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

export default ResearchTopicForm;
