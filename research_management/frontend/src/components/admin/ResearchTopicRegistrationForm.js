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
  getActivityByID,
  getRegistrationByTopicID,
  getResearchCategoriesByActivityId,
  getResearchHours,
  getTopicByID,
  getTypeByID,
  getUserByID,
} from "../../utils/commonUtils";
import approvalStatus from "../../data/approvalStatus";
import BookForm from "./resources/BookForm";

const customFormContainerStyle = {
  ...formContainerStyle,
  maxWidth: "500px",
};

function ResearchTopicRegistrationForm({
  isUser,
  newResearchTopic,
  editingResearchTopic,
  setEditingResearchTopic,
  newResearchTopicRegistration,
  setNewResearchTopicRegistration,
  editingResearchTopicRegistration,
  setEditingResearchTopicRegistration,
  researchTypes,
  researchActivities,
  researchCategories,
  researchActivityDetails,
  users,
  handleSubmit,
  onClose,
}) {
  const [formDataRegistration, setFormDataRegistration] = useState(
    editingResearchTopicRegistration
      ? { ...editingResearchTopicRegistration }
      : { ...newResearchTopicRegistration }
  );
  const [formData, setFormData] = useState(
    editingResearchTopic ? { ...editingResearchTopic } : { ...newResearchTopic }
  );
  const activity = getActivityByID(researchActivities, formData.activity);
  const researchType = getTypeByID(researchTypes, activity.research_type);
  const [isLoading, setIsLoading] = useState(true);

  console.log(formData);

  // Khi component được tạo hoặc cập nhật
  const getRegistration = () =>
    editingResearchTopic
      ? getRegistrationByTopicID(editingResearchTopic.id)
      : newResearchTopicRegistration;
  const registration = getRegistration();
  useEffect(() => {
    // Hàm fetch tất cả dữ liệu từ API
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        // Sử dụng Promise.all để đợi cho tất cả các cuộc gọi bất đồng bộ hoàn thành
        await Promise.all([
          getRegistration(),
          setEditingResearchTopicRegistration({ ...registration }),
        ]);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchAllData();
  }, [editingResearchTopicRegistration]);

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
    setEditingResearchTopicRegistration((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // const categories = getResearchCategoriesByActivityId(
    //   researchCategories,
    //   researchActivities,
    //   editingResearchTopicRegistration?.activity
    // );
    // setCurrentCategories(categories);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div style={customFormContainerStyle}>
      {/* Phần tiêu đề */}
      <div style={headerStyle}>
        <Typography variant="h6">
          Thông tin đăng ký đề tài nghiên cứu
        </Typography>
      </div>

      {/* Form nhập liệu */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Grid container spacing={2}>
              {/* <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="topic"
                  label="Tên đề tài"
                  value={formData?.name}
                  onChange={handleChange}
                  disabled
                />
              </Grid> */}

              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Ngày đăng ký"
                  format="DD/MM/YYYY"
                  value={dayjs(formDataRegistration.registered_date)}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="registrant"
                  label="Người đăng ký"
                  value={
                    getUserByID(users, formDataRegistration.registrant)
                      ?.full_name
                  }
                  disabled={isUser}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="expected_budget"
                  label="Kinh phí dự kiến"
                  value={formDataRegistration.expected_budget}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="expected_hours"
                  label="Số giờ dự kiến"
                  value={formDataRegistration.expected_hours}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="approval_status-label">Trạng thái</InputLabel>
                  <Select
                    labelId="approval_status-label"
                    id="approval_status"
                    name="approval_status"
                    value={formDataRegistration.approval_status}
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
              {formDataRegistration.approval_status === "approved" && (
                <>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Ngày phê duyệt đăng ký"
                      format="DD/MM/YYYY"
                      value={dayjs(
                        formDataRegistration.registration_approved_date
                      )}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="registration_approver"
                      label="Người phê duyệt đăng ký"
                      value={formDataRegistration.registration_approver}
                      disabled
                    />
                  </Grid>
                </>
              )}
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

export default ResearchTopicRegistrationForm;
