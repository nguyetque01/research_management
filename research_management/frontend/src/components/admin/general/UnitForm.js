import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";
import {
  headerStyle,
  buttonContainerStyle,
  formInputStyle,
  formContainerStyle,
} from "../../../assets/style/style";

function UnitForm({
  newUnit,
  setNewUnit,
  editingUnit,
  setEditingUnit,
  handleSubmit,
  onClose,
}) {
  const [formData, setFormData] = useState({});
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    // Tạo một hàm để kiểm soát việc load dữ liệu từ editingUnit
    const loadFormData = async () => {
      if (editingUnit) {
        // Nếu đang chỉnh sửa đơn vị tính, cập nhật formData từ editingUnit
        setFormData({ ...editingUnit });
      } else {
        // Nếu đang thêm đơn vị tính mới, cập nhật formData từ newUnit
        setFormData({ ...newUnit });
      }

      // Đã load xong dữ liệu từ editingUnit
      setIsLoadingData(false);
    };

    // Gọi hàm loadFormData
    loadFormData();
  }, [editingUnit, newUnit]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Sử dụng prevState để cập nhật state mà không bị mất dữ liệu
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (editingUnit) {
      // Nếu đang chỉnh sửa đơn vị tính
      setEditingUnit((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      // Nếu đang thêm đơn vị tính mới
      setNewUnit((prevState) => ({
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
          {editingUnit ? "Chỉnh sửa đơn vị tính" : "Thêm đơn vị tính"}
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="name"
              label="Đơn vị tính"
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

export default UnitForm;
