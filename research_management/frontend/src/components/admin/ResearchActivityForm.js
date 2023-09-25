import React, { useState, useEffect } from "react";
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
import { formContainerStyle, headerStyle } from "../../assets/style/style";
import getCategoriesByActivityId from "../../utils/commonUtils";
import ResearchActivityCategoryForm from "../../components/admin/ResearchActivityCategoryForm";

function ResearchActivityForm({
  newData,
  setNewData,
  editingData,
  setEditingData,
  handleSubmit,
  onClose,
  academicYears,
  units,
  leadUnits,
  levels,
  researchTypes,
  classifications,
  setCategoriesToUpdate,
}) {
  const [formData, setFormData] = useState(
    editingData ? { ...editingData } : { ...newData }
  );
  const [currentCategories, setCurrentCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // setCategoriesToUpdate([]);

    const fetchDataAndSetFormData = async () => {
      setIsLoading(true);
      if (editingData) {
        await setFormData({ ...editingData });
      }
      setIsLoading(false);
    };

    fetchDataAndSetFormData();

    const fetchActivityCategories = async () => {
      try {
        const currentCategoriesList = await getCategoriesByActivityId(
          classifications,
          editingData.id
        );
        setCurrentCategories(currentCategoriesList);
      } catch (error) {
        console.error("Lỗi khi tải danh sách phân loại hoạt động:", error);
      }
    };

    fetchActivityCategories();
  }, [editingData, classifications]);

  // Xử lý khi người dùng bấm vào nút thêm phân loại mới
  const handleAddCategory = () => {
    // // Tạo một phân loại mới và thêm vào danh sách phân loại mới
    const newCategory = {
      research_activity: editingData.id,
      name: "",
      total_hours: "",
      unit: "",
    };

    setCurrentCategories((prevCurrentCategories) => [
      ...prevCurrentCategories,
      newCategory,
    ]);
  };

  // Xử lý khi người dùng thay đổi giá trị trường nhập liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Sử dụng prevState để cập nhật state mà không bị mất dữ liệu
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (editingData) {
      // Nếu đang chỉnh sửa hoạt động
      setEditingData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      // Nếu đang thêm hoạt động mới
      setNewData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={formContainerStyle}>
      {/* Phần tiêu đề */}
      <div style={headerStyle}>
        <Typography variant="h6">
          {editingData ? "Chỉnh sửa" : "Thêm"} hoạt động nghiên cứu khoa học
        </Typography>
      </div>

      {/* Form nhập liệu */}
      <div style={{ overflow: "auto", maxHeight: "400px", paddingTop: "12px" }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                name="name"
                label="Tên hoạt động"
                value={formData.name}
                onChange={handleChange}
                requi
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="academic-year-label">Năm học</InputLabel>
                <Select
                  labelId="academic-year-label"
                  id="academic-year"
                  name="academic_year"
                  value={formData.academic_year}
                  onChange={handleChange}
                  label="Năm học"
                >
                  {academicYears.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="level-label">Cấp đề tài</InputLabel>
                <Select
                  labelId="level-label"
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  label="Cấp đề tài"
                >
                  {levels.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="level_unit-label">Đơn vị chủ trì</InputLabel>
                <Select
                  labelId="lead_unit-label"
                  id="lead_unit"
                  name="lead_unit"
                  value={formData.lead_unit}
                  onChange={handleChange}
                  label="Cấp đề tài"
                >
                  {leadUnits.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="research-type-label">
                  Loại hình nghiên cứu
                </InputLabel>
                <Select
                  labelId="research-type-label"
                  id="research-type"
                  name="research_type"
                  value={formData.research_type}
                  onChange={handleChange}
                  label="Loại hình nghiên cứu"
                >
                  {researchTypes.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {currentCategories?.length === 0 ? (
              <>
                <Grid item xs={12} sm={5}>
                  <TextField
                    fullWidth
                    name="total_hours"
                    label="Tổng số giờ"
                    value={formData.total_hours}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={2}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p>
                    giờ <span style={{ fontSize: 20 }}>/</span>
                  </p>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <FormControl fullWidth>
                    <InputLabel id="unit-label">Đơn vị tính</InputLabel>
                    <Select
                      labelId="unit-label"
                      id="unit"
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                      label="Đơn vị tính"
                    >
                      {units.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </>
            ) : (
              <Grid item xs={12}>
                {currentCategories.map((classification, index) => (
                  <ResearchActivityCategoryForm
                    index={index}
                    classification={classification}
                    currentCategories={currentCategories}
                    setCurrentCategories={setCurrentCategories}
                    units={units}
                  />
                ))}
              </Grid>
            )}
          </Grid>

          <div
            style={{
              marginTop: "20px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div>
              <div>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleAddCategory}
                >
                  Thêm phân loại mới
                </Button>
              </div>
              <div>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ marginTop: "10px" }}
                  onClick={null}
                >
                  Xóa tất cả phân loại
                </Button>
              </div>
            </div>

            {/* Nút lưu và nút hủy */}
            <div>
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResearchActivityForm;
