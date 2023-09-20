import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
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
import DEFAULT_BACKEND_URL from "../../config";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import UserTable from "../../components/admin/UserTable";
import UserForm from "../../components/admin/UserForm";
import dayjs from "dayjs";

function AdminAccounts() {
  const backendUrl = DEFAULT_BACKEND_URL;

  const defaultUser = {
    id: 0,
    password: "",
    last_login: null,
    is_superuser: false,
    username: "",
    full_name: "",
    email: "",
    date_of_birth: dayjs().format("YYYY-MM-DD"),
    gender: "male",
    phone_number: "",
    address: "",
    profile_picture: null,
    role: "member",
    is_active: false,
    groups: [],
    user_permissions: [],
  };

  const [users, setUsers] = useState([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState(defaultUser);
  const [editingUser, setEditingUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
  });

  // Gửi HTTP request để lấy danh sách tài khoản từ backend
  async function fetchUsers() {
    try {
      const response = await axios.get(`${backendUrl}/api/users/`);
      setUsers(response.data);
    } catch (error) {
      if (error.response) {
        // Nếu có phản hồi từ máy chủ, xử lý lỗi dựa trên mã trạng thái HTTP
        if (error.response.status === 404) {
          setNotification({
            type: "error",
            message: "Không tìm thấy tài khoản",
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
      console.error("Error fetching users:", error);
    }
  }

  // Sử dụng useEffect để tự động gọi hàm fetchUsers khi component được tạo
  useEffect(() => {
    fetchUsers();
  }, []);

  // Mở modal hiển thị form thêm/sửa tài khoản
  const handleOpenModel = () => {
    setIsUserModalOpen(true);
    setEditingUser(null);
    setNewUser(defaultUser);
  };

  // Đóng modal hiển thị form thêm/sửa tài khoản
  const handleCloseModal = () => {
    setIsUserModalOpen(false);
    setEditingUser(null);
  };

  // Mở dialog xác nhận xóa tài khoản
  const openDeleteDialog = (user) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  // Đóng dialog xác nhận xóa tài khoản
  const closeDeleteDialog = () => {
    setUserToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  // Xử lý khi muốn xóa tài khoản
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${backendUrl}/api/user/${userId}/`);
      setNotification({
        type: "success",
        message: "Xóa tài khoản thành công",
      });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      setNotification({
        type: "error",
        message: "Xóa tài khoản thất bại",
      });
    }
  };

  // Xử lý khi muốn chỉnh sửa tài khoản
  const handleEditUser = async (user) => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/${user.id}/`);
      setEditingUser(response.data);
      setIsUserModalOpen(true);
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      setNotification({
        type: "error",
        message: "Không thể lấy thông tin tài khoản",
      });
    }
  };

  // Xử lý khi submit form thêm/sửa tài khoản
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // Nếu đang chỉnh sửa tài khoản
        console.log(editingUser);
        await axios.put(
          `${backendUrl}/api/user/${editingUser.id}/`,
          editingUser
        );
        setEditingUser(null);
        setNotification({
          type: "success",
          message: "Cập nhật tài khoản thành công",
        });
      } else {
        // Nếu đang thêm mới tài khoản
        console.log(newUser);
        await axios.post(`${backendUrl}/api/user/`, newUser);
        setNotification({
          type: "success",
          message: "Thêm tài khoản thành công",
        });
      }
      fetchUsers();
      setIsUserModalOpen(false);
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
      console.error("Error submitting user:", error);
    }
  };

  // Xử lý khi thay đổi trạng thái tài khoản
  const handleToggleActive = async (user) => {
    try {
      await axios.patch(`${backendUrl}/api/users/${user.id}/toggle-active/`);
      setNotification({
        type: "success",
        message: "Cập nhật trạng thái hoạt động thành công",
      });
      fetchUsers();
    } catch (error) {
      console.error("Error toggling active status:", error);
      setNotification({
        type: "error",
        message: "Cập nhật trạng thái hoạt động thất bại",
      });
    }
  };

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
            <h2>Quản lý tài khoản</h2>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModel}
              sx={{ marginBottom: "24px" }}
            >
              Thêm tài khoản
            </Button>
            <Modal
              open={isUserModalOpen}
              onClose={handleCloseModal}
              aria-labelledby="add-user-modal-title"
              aria-describedby="add-user-modal-description"
            >
              <UserForm
                newUser={newUser}
                setNewUser={setNewUser}
                editingUser={editingUser}
                setEditingUser={setEditingUser}
                handleSubmit={handleSubmit}
                onClose={handleCloseModal}
              />
            </Modal>
            <UserTable
              users={users}
              handleEditUser={handleEditUser}
              openDeleteDialog={openDeleteDialog}
              handleToggleActive={handleToggleActive}
            />
          </Container>
          <Dialog
            open={isDeleteDialogOpen}
            onClose={closeDeleteDialog}
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
          >
            <DialogTitle id="delete-dialog-title">
              Xác nhận xóa tài khoản
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="delete-dialog-description">
                Bạn có chắc chắn muốn xóa tài khoản {userToDelete?.username}{" "}
                không?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDeleteDialog} color="primary">
                Hủy
              </Button>
              <Button
                onClick={() => {
                  handleDeleteUser(userToDelete?.id);
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
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminAccounts;
