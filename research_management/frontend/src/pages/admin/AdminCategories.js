import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import DEFAULT_BACKEND_URL from "../../config";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import CategoryForm from "../../components/admin/CategoryForm";
import {
  Container,
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
} from "@mui/material";

function AdminCategories() {
  const backendUrl = DEFAULT_BACKEND_URL;
  const defaultCategory = {
    name: "",
    image: null,
  };
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState(defaultCategory);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
  });

  // Gửi HTTP request để lấy danh sách danh mục từ backend
  async function fetchCategories() {
    try {
      const response = await axios.get(`${backendUrl}/api/categories/`);
      setCategories(response.data);
    } catch (error) {
      if (error.response) {
        // Nếu có phản hồi từ máy chủ, xử lý lỗi dựa trên mã trạng thái HTTP
        if (error.response.status === 404) {
          setNotification({
            type: "error",
            message: "Không tìm thấy danh mục",
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
      console.error("Error fetching categories:", error);
    }
  }

  // Sử dụng useEffect để tự động gọi hàm fetchCategories khi component được tạo
  useEffect(() => {
    fetchCategories();
  }, []);

  // Mở modal hiển thị form thêm/sửa danh mục
  const handleOpenModel = () => {
    setIsCategoryModalOpen(true);
    setEditingCategory(null);
    setNewCategory(defaultCategory);
  };

  // Đóng modal hiển thị form thêm/sửa danh mục
  const handleCloseModal = () => {
    setIsCategoryModalOpen(false);
  };

  // Mở dialog xác nhận xóa danh mục
  const openDeleteDialog = (category) => {
    setCategoryToDelete(category);
    setIsDeleteDialogOpen(true);
  };

  // Đóng dialog xác nhận xóa danh mục
  const closeDeleteDialog = () => {
    setCategoryToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  // Xử lý khi muốn xóa danh mục
  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`${backendUrl}/api/category/${categoryId}/`);
      setNotification({
        type: "success",
        message: "Xóa danh mục thành công",
      });
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      setNotification({
        type: "error",
        message: "Xóa danh mục thất bại",
      });
    }
  };

  // Xử lý khi muốn chỉnh sửa danh mục
  const handleEditCategory = async (categoryId) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/category/${categoryId}/`
      );
      setEditingCategory(response.data);
      setIsCategoryModalOpen(true);
    } catch (error) {
      console.error("Error fetching category by ID:", error);
      setNotification({
        type: "error",
        message: "Không thể lấy thông tin danh mục",
      });
    }
  };

  // Xử lý khi submit form thêm/sửa danh mục
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        // Nếu đang chỉnh sửa danh mục
        await axios.put(
          `${backendUrl}/api/category/${editingCategory.id}/`,
          editingCategory
        );
        setEditingCategory(null);
        setNotification({
          type: "success",
          message: "Cập nhật danh mục thành công",
        });
      } else {
        // Nếu đang thêm danh mục mới
        await axios.post(`${backendUrl}/api/category/`, newCategory);
        setNotification({
          type: "success",
          message: "Thêm danh mục thành công",
        });
      }
      fetchCategories();
      setIsCategoryModalOpen(false);
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
      console.error("Error submitting category:", error);
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
            <h2>Quản lý danh mục</h2>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModel}
              sx={{ marginBottom: "24px" }}
            >
              Thêm danh mục
            </Button>
            <Modal
              open={isCategoryModalOpen}
              onClose={handleCloseModal}
              aria-labelledby="add-category-modal-title"
              aria-describedby="add-category-modal-description"
            >
              <CategoryForm
                newCategory={newCategory}
                setNewCategory={setNewCategory}
                editingCategory={editingCategory}
                setEditingCategory={setEditingCategory}
                handleSubmit={handleSubmit}
                onClose={handleCloseModal}
              />
            </Modal>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell>Tên danh mục</TableCell>
                    <TableCell>Hình ảnh</TableCell>
                    <TableCell>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category, index) => (
                    <TableRow key={category.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>
                        {category.image && (
                          <img
                            src={`${backendUrl}${category.image}`}
                            alt={category.name}
                            width="100"
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => handleEditCategory(category.id)}
                        >
                          Sửa
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => openDeleteDialog(category)}
                          sx={{ marginLeft: "8px" }}
                        >
                          Xóa
                        </Button>
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
        <DialogTitle id="delete-dialog-title">
          Xác nhận xóa danh mục
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Bạn có chắc chắn muốn xóa danh mục {categoryToDelete?.name} không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Hủy
          </Button>
          <Button
            onClick={() => {
              handleDeleteCategory(categoryToDelete?.id);
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

export default AdminCategories;
