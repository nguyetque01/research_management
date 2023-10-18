import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Grid,
  MenuItem,
  IconButton,
  FormLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import AttachmentIcon from "@mui/icons-material/Attachment";
import {
  VisuallyHiddenInput,
  formContainerStyle,
  headerStyle,
  buttonContainerStyle,
  formInputStyle,
} from "../../assets/style/style";
import getCategoriesByActivityId, {
  getActivityByID,
  getResearchCategoriesByActivityId,
  getResearchHours,
  getSubmissionByTopicID,
  getTypeByID,
} from "../../utils/commonUtils";
import approvalStatus from "../../data/approvalStatus";
import BookForm from "./resources/BookForm";

const customFormContainerStyle = {
  ...formContainerStyle,
  maxWidth: "800px",
};

function ResearchTopicSubmissionForm({
  isUser,
  newResearchTopic,
  editingResearchTopic,
  setEditingResearchTopic,
  newResearchTopicSubmission,
  setNewResearchTopicSubmission,
  editingResearchTopicSubmission,
  setEditingResearchTopicSubmission,
  researchTypes,
  researchActivities,
  researchCategories,
  researchActivityDetails,
  users,
  handleSubmit,
  onClose,
}) {
  const [formDataSubmission, setFormDataSubmission] = useState(
    editingResearchTopicSubmission
      ? { ...editingResearchTopicSubmission }
      : { ...newResearchTopicSubmission }
  );
  const [formData, setFormData] = useState(
    editingResearchTopic ? { ...editingResearchTopic } : { ...newResearchTopic }
  );
  const activity = getActivityByID(researchActivities, formData.activity);
  const researchType = getTypeByID(researchTypes, activity.research_type);
  console.log(researchType);
  const [isLoading, setIsLoading] = useState(true);

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

  // Khi component được tạo hoặc cập nhật
  const getSubmission = () =>
    editingResearchTopic
      ? getSubmissionByTopicID(editingResearchTopic.id)
      : newResearchTopicSubmission;
  const submission = getSubmission();
  useEffect(() => {
    // Hàm fetch tất cả dữ liệu từ API
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        // Sử dụng Promise.all để đợi cho tất cả các cuộc gọi bất đồng bộ hoàn thành
        await Promise.all([
          getSubmission(),
          setEditingResearchTopicSubmission({ ...submission }),
        ]);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchAllData();
  }, [editingResearchTopicSubmission]);

  const [selectedFile, setSelectedFile] = useState(null);

  // Xử lý khi người dùng chọn file
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Tạo một URL tạm thời cho tệp đã chọn để hiển thị trước
    setSelectedFile(URL.createObjectURL(file));

    // Lưu tệp PDF đã chọn vào trong state formData
    setFormData((prevState) => ({
      ...prevState,
      attachments: file,
    }));
  };

  // Xử lý khi người dùng xóa file đã chọn
  const handleFileClear = () => {
    // Xóa tệp PDF khỏi state formData
    setFormData((prevState) => ({
      ...prevState,
      attachments: null,
    }));

    // Xóa URL tạm thời và hủy kết nối tới tệp đã chọn
    setSelectedFile(null);
  };

  function formatFileSize(size) {
    if (size === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = parseInt(Math.floor(Math.log(size) / Math.log(k)));

    return Math.round((size / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  }

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
          <Grid item xs={12} sm={6}>
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
                  disabled={isUser}
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
                    disabled={isUser}
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="research_type"
                  label="Phân loại nghiên cứu"
                  value={researchType?.name}
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {researchType?.id === 1 && <BookForm small />}
                {researchType?.id === 2 && <BookForm small />}
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

export default ResearchTopicSubmissionForm;
