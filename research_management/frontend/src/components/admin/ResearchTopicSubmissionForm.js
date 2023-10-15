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
import approvalStatus from "../../data/approvalStatus";

const customFormContainerStyle = {
  ...formContainerStyle,
  maxWidth: "500px",
};

function ResearchTopicSubmissionForm({
  newResearchTopicSubmission,
  setNewResearchTopicSubmission,
  editingResearchTopicSubmission,
  setEditingResearchTopicSubmission,
  researchActivities,
  researchCategories,
  researchActivityDetails,
  users,
  handleSubmit,
  onClose,
}) {
  const [formData, setFormData] = useState(
    editingResearchTopicSubmission
      ? { ...editingResearchTopicSubmission }
      : { ...newResearchTopicSubmission }
  );
  // const defaultCategories = getResearchCategoriesByActivityId(
  //   researchCategories,
  //   researchActivities,
  //   formData?.activity
  // );

  // const [currentCategories, setCurrentCategories] = useState(defaultCategories);
  // console.log(currentCategories);

  // Xử lý khi người dùng thay đổi giá trị trường nhập liệu
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Sử dụng prevState để cập nhật state mà không bị mất dữ liệu
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Nếu đang chỉnh sửa đề tài
    setEditingResearchTopicSubmission((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // const categories = getResearchCategoriesByActivityId(
    //   researchCategories,
    //   researchActivities,
    //   editingResearchTopicSubmission?.activity
    // );
    // setCurrentCategories(categories);
  };

  return (
    <div style={customFormContainerStyle}>
      {/* Phần tiêu đề */}
      <div style={headerStyle}>
        <Typography variant="h6">
          Thông tin nộp đề tài đề tài nghiên cứu
        </Typography>
      </div>

      {/* Form nhập liệu */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="topic"
              label="Tên đề tài"
              value={formData.topic}
              onChange={handleChange}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Ngày nộp đề tài"
              format="DD/MM/YYYY"
              value={dayjs(formData.submission_date)}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="submission"
              label="Người nộp đề tài"
              value={formData.submission}
              disabled
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="approval_status-label">Trạng thái</InputLabel>
              <Select
                labelId="approval_status-label"
                id="approval_status"
                name="approval_status"
                value={formData.approval_status}
                onChange={handleChange}
                label="Trạng thái"
              >
                {approvalStatus.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {formData.approval_status === "approved" && (
            <>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Ngày phê duyệt"
                  format="DD/MM/YYYY"
                  value={dayjs(formData.submission_approved_date)}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="submission_approver"
                  label="Người phê duyệt"
                  value={formData.submission_approver}
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="expected_budget"
                  label="Kinh phí được phê duyệt"
                  value={formData.approved_budget}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="expected_hours"
                  label="Số giờ được tính"
                  value={formData.approved_hours}
                  onChange={handleChange}
                />
              </Grid>
            </>
          )}
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

export default ResearchTopicSubmissionForm;
