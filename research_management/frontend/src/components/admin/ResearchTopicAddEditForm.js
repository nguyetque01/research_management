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

const customFormContainerStyle = {
  ...formContainerStyle,
  maxWidth: "800px",
};

function ResearchTopicAddEditForm({
  newTopic,
  setNewTopic,
  editingTopic,
  setEditingTopic,
  handleSubmit,
  onClose,
}) {
  const [formData, setFormData] = useState(
    editingTopic ? { ...editingTopic } : { ...newTopic }
  );

  // Xử lý khi người dùng thay đổi giá trị trường nhập liệu
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Sử dụng prevState để cập nhật state mà không bị mất dữ liệu
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (editingTopic) {
      // Nếu đang chỉnh sửa đề tài
      setEditingTopic((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      // Nếu đang thêm đề tài mới
      setNewTopic((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <div style={customFormContainerStyle}>
      {/* Phần tiêu đề */}
      <div style={headerStyle}>
        <Typography variant="h6">
          {editingTopic ? "Chỉnh sửa" : "Thêm"} đề tài
        </Typography>
      </div>

      {/* Form nhập liệu */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="id"
                  label="Mã đề tài"
                  value={formData.id}
                  onChange={handleChange}
                  required
                  style={formInputStyle}
                />
              </Grid>
              <Grid item xs={12}>
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
                <TextField
                  fullWidth
                  name="research_activity"
                  label="Hoạt động nghiên cứu"
                  value={formData.research_activity}
                  onChange={handleChange}
                  style={formInputStyle}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="registrant"
                  label="Người đăng ký"
                  value={formData.registrant}
                  onChange={handleChange}
                  style={formInputStyle}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="approver"
                  label="Người phê duyệt"
                  value={formData.approver}
                  onChange={handleChange}
                  style={formInputStyle}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Ngày đăng ký"
                  format="DD/MM/YYYY"
                  value={dayjs(formData.registered_date)}
                  onChange={(date) =>
                    handleChange({
                      target: { name: "registered_date", value: date },
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Ngày phê duyệt"
                  format="DD/MM/YYYY"
                  value={dayjs(formData.approved_date)}
                  onChange={(date) =>
                    handleChange({
                      target: { name: "approved_date", value: date },
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sx={{ marginTop: "10px" }}>
                <FormControl fullWidth>
                  <InputLabel id="approval-status-label">
                    Trạng thái phê duyệt
                  </InputLabel>
                  <Select
                    labelId="approval-status-label"
                    id="approval-status"
                    name="approval_status"
                    value={formData.approval_status}
                    onChange={handleChange}
                    label="Trạng thái phê duyệt"
                  >
                    <MenuItem value="Chờ duyệt">Chờ duyệt</MenuItem>
                    <MenuItem value="Đã duyệt">Đã duyệt</MenuItem>
                    <MenuItem value="Từ chối">Từ chối</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ marginTop: "10px" }}>
                <FormControl fullWidth>
                  <InputLabel id="completion-status-label">
                    Trạng thái hoàn thành
                  </InputLabel>
                  <Select
                    labelId="completion-status-label"
                    id="completion-status"
                    name="completion_status"
                    value={formData.completion_status}
                    onChange={handleChange}
                    label="Trạng thái hoàn thành"
                  >
                    <MenuItem value="Đang thực hiện">Đang thực hiện</MenuItem>
                    <MenuItem value="Đã hoàn thành">Đã hoàn thành</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ marginTop: "10px" }}>
                <TextField
                  fullWidth
                  name="research_resource"
                  label="Tài nguyên nghiên cứu"
                  value={formData.research_resource}
                  onChange={handleChange}
                  style={formInputStyle}
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

export default ResearchTopicAddEditForm;
