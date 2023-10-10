import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  FormLabel,
  FormControl,
  Grid,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {
  VisuallyHiddenInput,
  formContainerStyle,
  headerStyle,
  buttonContainerStyle,
  formInputStyle,
  imageContainerStyle,
  closeButtonStyle,
} from "../../../assets/style/style";

const customFormContainerStyle = {
  ...formContainerStyle,
  maxWidth: "800px",
};

function TranferForm({
  newTranfer,
  setNewTranfer,
  editingTranfer,
  setEditingTranfer,
  handleSubmit,
  onClose,
}) {
  const [formData, setFormData] = useState({});
  const [isLoadingData, setIsLoadingData] = useState(true);
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

  useEffect(() => {
    // Tạo một hàm để kiểm soát việc load dữ liệu từ editingTranfer
    const loadFormData = async () => {
      if (editingTranfer) {
        // Nếu đang chỉnh sửa bài báo, cập nhật formData từ editingTranfer
        setFormData({ ...editingTranfer });
      } else {
        // Nếu đang thêm bài báo mới, cập nhật formData từ newTranfer
        setFormData({ ...newTranfer });
      }

      // Đã load xong dữ liệu từ editingTranfer
      setIsLoadingData(false);
    };

    // Gọi hàm loadFormData
    loadFormData();
  }, [editingTranfer, newTranfer]);

  function formatFileSize(size) {
    if (size === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = parseInt(Math.floor(Math.log(size) / Math.log(k)));

    return Math.round((size / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Sử dụng prevState để cập nhật state mà không bị mất dữ liệu
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (editingTranfer) {
      // Nếu đang chỉnh sửa bài báo
      setEditingTranfer((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      // Nếu đang thêm bài báo mới
      setNewTranfer((prevState) => ({
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
    <div style={customFormContainerStyle}>
      <div style={headerStyle}>
        <Typography variant="h6">
          {editingTranfer ? "Chỉnh sửa bài báo" : "Thêm bài báo"}
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="title"
                  label="Tiêu đề"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  style={formInputStyle}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  name="description"
                  label="Mô tả"
                  value={formData.description}
                  onChange={handleChange}
                  style={formInputStyle}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  name="authors"
                  label="Danh sách tác giả"
                  value={formData.authors}
                  onChange={handleChange}
                  style={formInputStyle}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  name="url"
                  label="Đường dẫn"
                  value={formData.url}
                  onChange={handleChange}
                  style={formInputStyle}
                  required
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  name="transfer_company"
                  label="Công ty chuyển giao"
                  value={formData.transfer_company}
                  onChange={handleChange}
                  style={formInputStyle}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="transfer_contract_id"
                  label="Mã hợp đồng chuyển giao"
                  value={formData.transfer_contract_id}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="signed_contract_id"
                  label="Mã hợp đồng thành ký"
                  value={formData.signed_contract_id}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
                <DatePicker
                  label="Ngày ký hợp đồng"
                  format="DD/MM/YYYY"
                  value={dayjs(formData.signed_contract_date)}
                  onChange={(date) =>
                    handleChange({
                      target: { name: "signed_contract_date", value: date },
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
                <TextField
                  fullWidth
                  name="contract_value"
                  label="Giá trị hợp đồng"
                  value={formData.contract_value}
                  onChange={handleChange}
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth style={formInputStyle}>
                  <FormLabel
                    htmlFor="pdf-input"
                    style={{ marginBottom: "4px" }}
                  >
                    File PDF đính kèm
                  </FormLabel>
                  {!formData?.attachments?.name && (
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                    >
                      Tải file PDF đính kèm lên
                      <VisuallyHiddenInput
                        type="file"
                        id="pdf-input"
                        onChange={handleFileChange}
                        accept=".pdf" // Chỉ cho phép tải file PDF
                      />
                    </Button>
                  )}
                </FormControl>

                {formData?.attachments?.name && (
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <AttachmentIcon />
                    </Grid>
                    <Grid item xs>
                      <Typography variant="body1">
                        {formData.attachments.name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        fontSize={12}
                        color={"#333"}
                      >
                        {formatFileSize(formData.attachments.size)}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={handleFileClear}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                  </Grid>
                )}
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

export default TranferForm;
