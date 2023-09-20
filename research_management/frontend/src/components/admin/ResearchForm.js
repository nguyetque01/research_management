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
import researchStatus from "../../data/researchStatus";
import fundingLevels from "../../data/fundingLevels";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const customFormContainerStyle = {
  ...formContainerStyle,
  maxWidth: "800px",
};

function ResearchForm({
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

    const formattedData = {
      ...formData,
      start_date: dayjs(formData.start_date).format("YYYY-MM-DD"),
      end_date: dayjs(formData.end_date).format("YYYY-MM-DD"),
      approval_date: dayjs(formData.approval_date).format("YYYY-MM-DD"),
    };

    if (editingTopic) {
      // Nếu đang chỉnh sửa đề tài
      setEditingTopic(formattedData);
    } else {
      // Nếu đang thêm đề tài mới
      setNewTopic(formattedData);
    }
  };

  return (
    <div style={customFormContainerStyle}>
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
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="topic_name"
                  label="Tên đề tài"
                  value={formData.topic_name}
                  onChange={handleChange}
                  style={formInputStyle}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="funding_level-label">Cấp đề tài</InputLabel>
                  <Select
                    labelId="funding_level-label"
                    id="funding_level"
                    name="funding_level"
                    value={formData.funding_level}
                    onChange={handleChange}
                    label="Cấp đề tài"
                  >
                    {fundingLevels.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="research_type"
                  label="Loại hình nghiên cứu "
                  value={formData.research_type}
                  onChange={handleChange}
                  style={formInputStyle}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="lead_unit"
                  label="Đơn vị chủ trì"
                  value={formData.lead_unit}
                  onChange={handleChange}
                  style={formInputStyle}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  name="description"
                  label="Mô tả chi tiết"
                  value={formData.description}
                  onChange={handleChange}
                  style={formInputStyle}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="team_members"
                  label="Thành viên đề tài"
                  value={formData.team_members}
                  onChange={handleChange}
                  style={formInputStyle}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="academic_year"
                  label="Năm học"
                  value={formData.academic_year}
                  onChange={handleChange}
                  style={formInputStyle}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Ngày bắt đầu"
                  format="DD/MM/YYYY"
                  value={dayjs(formData.start_date)}
                  onChange={(date) =>
                    handleChange({
                      target: { name: "start_date", value: date },
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Ngày kết thúc"
                  format="DD/MM/YYYY"
                  value={dayjs(formData.end_date)}
                  onChange={(date) =>
                    handleChange({
                      target: { name: "end_date", value: date },
                    })
                  }
                />
              </Grid>
              {/* <Grid item xs={12} ></Grid> */}
              <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
                <DatePicker
                  label="Ngày phê duyệt"
                  format="DD/MM/YYYY"
                  value={dayjs(formData.approval_date)}
                  onChange={(date) =>
                    handleChange({
                      target: { name: "approval_date", value: date },
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
                <TextField
                  fullWidth
                  name="approved_budget"
                  label="Kinh phí phê duyệt"
                  type="number"
                  value={formData.approved_budget}
                  onChange={handleChange}
                  style={formInputStyle}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="research_hours"
                  label="Số giờ được tính"
                  type="number"
                  value={formData.research_hours}
                  onChange={handleChange}
                  style={formInputStyle}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="status-label">Trạng thái</InputLabel>
                  <Select
                    labelId="status-label"
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    label="Trạng thái"
                  >
                    {researchStatus.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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

export default ResearchForm;
