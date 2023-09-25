import React, { useState, useEffect } from "react";
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
import fetchData, {
  fetchDataById,
  addUpdateData,
  deleteDataById,
} from "../../utils/apiUtils";
import DeleteConfirmationDialog from "../../components/DeleteConfirmationDialog";

function Users() {
  const backendUrl = DEFAULT_BACKEND_URL;

  const defaultUser = {
    id: 0,
    address: "",
    birthday: dayjs().format("YYYY-MM-DD"),
    email: "",
    full_name: "",
    gender: "male",
    is_active: true,
    password: "",
    phone: "",
    profile_image: null,
    role: "user",
    username: "",
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
      await fetchData(`${backendUrl}/api/users/`, setUsers, setNotification);
    } catch (error) {
      console.log(error);
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
      await deleteDataById(
        `${backendUrl}/api/user`,
        userId,
        setNotification,
        fetchUsers
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Xử lý khi muốn chỉnh sửa tài khoản
  const handleEditUser = async (user) => {
    try {
      await fetchDataById(
        `${backendUrl}/api/user`,
        user.id,
        setEditingUser,
        setNotification
      );
      setIsUserModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  // Xử lý khi submit form thêm/sửa tài khoản
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // Nếu đang chỉnh sửa tài khoản
        await addUpdateData(
          `${backendUrl}/api/user`,
          editingUser,
          "Cập nhật tài khoản thành công",
          fetchUsers,
          setNotification
        );
        setEditingUser(null);
      } else {
        // Nếu đang thêm mới tài khoản
        await addUpdateData(
          `${backendUrl}/api/user`,
          newUser,
          "Thêm tài khoản thành công",
          fetchUsers,
          setNotification
        );
      }
      setIsUserModalOpen(false);
    } catch (error) {
      console.log(error);
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
          <DeleteConfirmationDialog
            isOpen={isDeleteDialogOpen}
            onClose={closeDeleteDialog}
            onDelete={handleDeleteUser}
            itemToDelete={userToDelete}
            itemName="người dùng"
            itemToDeleteName={userToDelete?.username}
          />
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

export default Users;
