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
  categories,
  researchActivityDetails,
}) {
  const [formData, setFormData] = useState(editingData || newData);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [currentDetails, setCurrentDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCategoriesByResearchTypeId = (researchTypeId) => {
    const researchType = researchTypes.find(
      (type) => type.id === researchTypeId
    );
    if (researchType) {
      const categoriesByType = categories.filter(
        (category) => category?.research_type === researchType?.id
      );
      return categoriesByType;
    }
    return [];
  };

  const getDetailsByActivity = (activity) => {
    const activityDetail = researchActivityDetails?.filter(
      (detail) => detail?.activity === activity?.id
    );
    return activityDetail || [];
  };

  useEffect(() => {
    const fetchDataAndSetFormData = async () => {
      setIsLoading(true);
      if (editingData) {
        setFormData({ ...editingData });
      }

      const currentCategoriesList = getCategoriesByResearchTypeId(
        editingData?.research_type
      );
      setCurrentCategories(currentCategoriesList);

      const details = getDetailsByActivity(editingData);
      setCurrentDetails(details);

      setIsLoading(false);
    };

    fetchDataAndSetFormData();
  }, [editingData, categories, researchActivityDetails]);

  // Xử lý khi người dùng thay đổi giá trị trường nhập liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };

    setFormData(updatedData);

    if (editingData) {
      // Nếu đang chỉnh sửa hoạt động
      setEditingData(updatedData);
    } else {
      // Nếu đang thêm hoạt động mới
      setNewData(updatedData);
    }

    if (name === "research_type") {
      const categories = getCategoriesByResearchTypeId(value);
      setCurrentCategories(categories);
    }

    const details = getDetailsByActivity(editingData);
    setCurrentDetails(details);
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
                required
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
                  {academicYears?.map((option) => (
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
                  {levels?.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="lead-unit-label">Đơn vị chủ trì</InputLabel>
                <Select
                  labelId="lead-unit-label"
                  id="lead-unit"
                  name="lead_unit"
                  value={formData.lead_unit}
                  onChange={handleChange}
                  label="Đơn vị chủ trì"
                >
                  {leadUnits?.map((option) => (
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
                  {researchTypes?.map((option) => (
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
                      {units?.map((option) => (
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
                {currentCategories?.map((category, index) => (
                  <ResearchActivityCategoryForm
                    key={category.id}
                    index={index}
                    category={category}
                    units={units}
                    editingData={editingData}
                    researchActivityDetails={researchActivityDetails}
                    handleChange={handleChange}
                  />
                ))}
              </Grid>
            )}
          </Grid>

          {/* Nút lưu và nút hủy */}
          <div
            style={{
              marginTop: "20px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
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

export default ResearchActivityForm;
