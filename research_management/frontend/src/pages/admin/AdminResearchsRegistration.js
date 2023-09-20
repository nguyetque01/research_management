import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import DEFAULT_BACKEND_URL from "../../config";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import ResearchRegistrationForm from "../../components/admin/ResearchRegistrationForm";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Modal,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Container,
} from "@mui/material";
import researchStatus from "../../data/researchStatus";
import dayjs from "dayjs";

function AdminResearchsRegistration() {
  const backendUrl = DEFAULT_BACKEND_URL;
  const defaultTopic = {
    user_id: 1,
    research_topic_id: 5,
    assigned_role: "researcher",
    registration_date: "2023-09-21",
    status: "pending",
    approver_id: 4,
    approval_date: "2023-09-22",
  };
  const [topics, setTopics] = useState([]);
  const [researchTopics, setResearchTopics] = useState([]);
  const [users, setUsers] = useState([]);
  const [newTopic, setNewTopic] = useState(defaultTopic);
  const [editingTopic, setEditingTopic] = useState(null);
  const [topicToDelete, setTopicToDelete] = useState(null);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
  });

  // Gửi HTTP request để lấy danh sách người dùng từ backend
  async function fetchTopics() {
    try {
      const response = await axios.get(
        `${backendUrl}/api/research-topics/registration/`
      );
      setTopics(response.data);
    } catch (error) {
      if (error.response) {
        // Nếu có phản hồi từ máy chủ, xử lý lỗi dựa trên mã trạng thái HTTP
        if (error.response.status === 404) {
          setNotification({
            type: "error",
            message: "Không tìm thấy đăng ký",
          });
        } else if (error.response.status === 401) {
          // Redirect đến trang đăng nhập
          return <Navigate to="/login" />;
        } else {
          // Xử lý các trường hợp lỗi khác
          setNotification({
            type: "error",
            message: "Lỗi không xác định",
          });
        }
      } else if (error.request) {
        // Nếu không có phản hồi từ máy chủ
        setNotification({
          type: "error",
          message: "Không thể kết nối đến máy chủ",
        });
      } else {
        // Xử lý lỗi khác không liên quan đến mạng hoặc máy chủ
        setNotification({
          type: "error",
          message: "Lỗi không xác định",
        });
      }
      console.error("Error fetching research topics:", error);
    }
  }

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

  // Sử dụng useEffect để tự động gọi hàm fetchTopics khi component được tạo
  useEffect(() => {
    fetchTopics();
    fetchResearchTopics();
    fetchUsers();
  }, []);

  // Mở modal hiển thị form thêm/sửa đề tài
  const handleOpenModel = () => {
    setIsTopicModalOpen(true);
    setEditingTopic(null);
    setNewTopic(defaultTopic);
  };

  // Đóng modal hiển thị form thêm/sửa đề tài
  const handleCloseModal = () => {
    setIsTopicModalOpen(false);
  };

  // Mở dialog xác nhận xóa đề tài
  const openDeleteDialog = (topic) => {
    setTopicToDelete(topic);
    setIsDeleteDialogOpen(true);
  };

  // Đóng dialog xác nhận xóa đề tài
  const closeDeleteDialog = () => {
    setTopicToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  // Xử lý khi người dùng muốn xóa đề tài
  const handleDeleteTopic = async (topicId) => {
    try {
      await axios.delete(`${backendUrl}/api/research-topic/${topicId}/`);
      setNotification({
        type: "success",
        message: "Xóa đề tài thành công",
      });
      fetchTopics();
    } catch (error) {
      console.error("Error deleting research topic:", error);
      setNotification({
        type: "error",
        message: "Xóa đề tài thất bại",
      });
    }
  };

  // Xử lý khi người dùng muốn chỉnh sửa đề tài
  const handleEditTopic = async (topicId) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/research-topic/${topicId}/`
      );
      setEditingTopic(response.data);
      setIsTopicModalOpen(true);
    } catch (error) {
      console.error("Error fetching research topic by ID:", error);
      setNotification({
        type: "error",
        message: "Không thể lấy thông tin đề tài",
      });
    }
  };

  // Xử lý khi người dùng submit form thêm/sửa đề tài
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTopic) {
        // Nếu đang chỉnh sửa đề tài
        console.log(editingTopic);
        await axios.put(
          `${backendUrl}/api/research-topic/${editingTopic.id}/`,
          editingTopic
        );
        setEditingTopic(null);
        setNotification({
          type: "success",
          message: "Cập nhật đề tài thành công",
        });
      } else {
        console.log(newTopic);

        // Nếu đang thêm đề tài mới
        await axios.post(`${backendUrl}/api/research-topic/`, newTopic);
        setNotification({
          type: "success",
          message: "Thêm đề tài thành công",
        });
      }
      fetchTopics();
      setIsTopicModalOpen(false);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          // Lỗi dữ liệu không hợp lệ
          setNotification({
            type: "error",
            message: "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.",
          });
        } else if (error.response.status === 401) {
          // Lỗi xác thực
          setNotification({
            type: "error",
            message: "Bạn cần đăng nhập để thực hiện thao tác này.",
          });
        } else {
          // Xử lý lỗi khác
          setNotification({
            type: "error",
            message: "Lỗi không xác định",
          });
        }
      } else {
        // Lỗi không kết nối đến máy chủ hoặc mạng
        setNotification({
          type: "error",
          message: "Không thể kết nối đến máy chủ.",
        });
      }
      console.error("Error submitting research topic:", error);
    }
  };

  function calculateExecutionTime(startDate, endDate) {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const months = end.diff(start, "month");
    return months;
  }

  // Hiển thị giao diện
  return (
    <div>
      <Grid container spacing={20}>
        <Grid item xs={2}>
          <AdminSidebar />
        </Grid>
        <Grid item xs={10}>
          <AdminHeader />
          <Container>
            <h2>Quản lý đăng ký đề tài</h2>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModel}
              sx={{ marginBottom: "24px" }}
            >
              Tạo đăng ký mới
            </Button>
            <Modal
              open={isTopicModalOpen}
              onClose={handleCloseModal}
              aria-labelledby="add-topic-modal-title"
              aria-describedby="add-topic-modal-description"
            >
              <ResearchRegistrationForm
                newTopic={newTopic}
                setNewTopic={setNewTopic}
                editingTopic={editingTopic}
                setEditingTopic={setEditingTopic}
                handleSubmit={handleSubmit}
                onClose={handleCloseModal}
              />
            </Modal>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell>Đề tài</TableCell>
                    <TableCell>Người đăng ký</TableCell>
                    <TableCell>Ngày đăng ký</TableCell>
                    <TableCell>Vai trò</TableCell>
                    <TableCell>Trạng thái</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topics.map((topic, index) => (
                    <TableRow key={topic.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {
                          researchTopics.find(
                            (research) =>
                              research.id === topic.research_topic_id
                          )?.topic_name
                        }
                      </TableCell>
                      <TableCell>
                        {
                          users.find((user) => user.id === topic.user_id)
                            ?.full_name
                        }
                      </TableCell>
                      <TableCell>{topic.assigned_role}</TableCell>
                      <TableCell>
                        {dayjs(topic.registration_date).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        {
                          researchStatus.find(
                            (status) => status.value === topic.status
                          )?.label
                        }
                      </TableCell>

                      <TableCell>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={null}
                          >
                            Chi tiết
                          </Button>
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() => handleEditTopic(topic.id)}
                            sx={{ marginLeft: "8px" }}
                          >
                            Sửa
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => openDeleteDialog(topic)}
                            sx={{ marginLeft: "8px" }}
                          >
                            Xóa
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Grid>
      </Grid>
      <Dialog
        open={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Xác nhận xóa đề tài</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Bạn có chắc chắn muốn xóa đề tài {topicToDelete?.name} không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Hủy
          </Button>
          <Button
            onClick={() => {
              handleDeleteTopic(topicToDelete?.id);
              closeDeleteDialog();
            }}
            color="primary"
            autoFocus
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={notification.message !== ""}
        autoHideDuration={3000}
        onClose={() => setNotification({ type: "", message: "" })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert variant="filled" severity={notification.type}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AdminResearchsRegistration;
