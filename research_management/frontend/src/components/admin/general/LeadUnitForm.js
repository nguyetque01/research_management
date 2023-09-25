import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";
import {
  headerStyle,
  buttonContainerStyle,
  formInputStyle,
  formContainerStyle,
} from "../../../assets/style/style";

function LeadUnitForm({
  newLeadUnit,
  setNewLeadUnit,
  editingLeadUnit,
  setEditingLeadUnit,
  handleSubmit,
  onClose,
}) {
  const [formData, setFormData] = useState({});
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    // Tạo một hàm để kiểm soát việc load dữ liệu từ editingLeadUnit
    const loadFormData = async () => {
      if (editingLeadUnit) {
        // Nếu đang chỉnh sửa đơn vị chủ trì, cập nhật formData từ editingLeadUnit
        setFormData({ ...editingLeadUnit });
      } else {
        // Nếu đang thêm đơn vị chủ trì mới, cập nhật formData từ newLeadUnit
        setFormData({ ...newLeadUnit });
      }

      // Đã load xong dữ liệu từ editingLeadUnit
      setIsLoadingData(false);
    };

    // Gọi hàm loadFormData
    loadFormData();
  }, [editingLeadUnit, newLeadUnit]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Sử dụng prevState để cập nhật state mà không bị mất dữ liệu
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (editingLeadUnit) {
      // Nếu đang chỉnh sửa đơn vị chủ trì
      setEditingLeadUnit((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      // Nếu đang thêm đơn vị chủ trì mới
      setNewLeadUnit((prevState) => ({
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
          {editingLeadUnit ? "Chỉnh sửa đơn vị chủ trì" : "Thêm đơn vị chủ trì"}
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="name"
              label="Đơn vị chủ trì"
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

export default LeadUnitForm;
