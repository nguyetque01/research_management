import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import DEFAULT_BACKEND_URL from "../../config";

const customFormContainerStyle = {
  ...formContainerStyle,
  maxWidth: "800px",
};

function ResearchRegistrationForm({
  newTopic,
  setNewTopic,
  editingTopic,
  setEditingTopic,
  handleSubmit,
  onClose,
}) {
  const backendUrl = DEFAULT_BACKEND_URL;

  const [formData, setFormData] = useState(
    editingTopic ? { ...editingTopic } : { ...newTopic }
  );
  const [researchTopics, setResearchTopics] = useState([]);
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    try {
      const response = await axios.get(`${backendUrl}/api/users/`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  async function fetchResearchTopics() {
    try {
      const response = await axios.get(`${backendUrl}/api/research-topics/`);
      setResearchTopics(response.data);
    } catch (error) {
      console.error("Error fetching research-topics:", error);
    }
  }

  useEffect(() => {
    fetchResearchTopics();
    fetchUsers();
  }, []);

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
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="research_topic_id-label">Đề tài</InputLabel>
              <Select
                labelId="research_topic_id-label"
                id="research_topic_id"
                name="research_topic_id"
                value={formData.research_topic_id}
                onChange={handleChange}
                label="Đề tài"
              >
                {researchTopics.map((option) => (
                  <MenuItem
                    key={option.research_topic_id}
                    value={option.research_topic_id}
                  >
                    {option.topic_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="user_id-label">Người đăng ký</InputLabel>
              <Select
                labelId="user_id-label"
                id="user_id"
                name="user_id"
                value={formData.user_id}
                onChange={handleChange}
                label="Người đăng ký"
              >
                {users.map((option) => (
                  <MenuItem key={option.user_id} value={option.user_id}>
                    {option.full_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="approver_id-label">Người phê duyệt</InputLabel>
              <Select
                labelId="approver_id-label"
                id="approver_id"
                name="approver_id"
                value={formData.approver_id}
                onChange={handleChange}
                label="Người phê duyệt"
              >
                {users.map((option) => (
                  <MenuItem key={option.user_id} value={option.user_id}>
                    {option.full_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Ngày đăng ký"
              format="DD/MM/YYYY"
              value={dayjs(formData.registration_date)}
              onChange={(date) =>
                handleChange({
                  target: { name: "registration_date", value: date },
                })
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
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

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="assigned_role"
              label="Vai trò"
              value={formData.assigned_role}
              onChange={handleChange}
              style={formInputStyle}
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
  );
}

export default ResearchRegistrationForm;
