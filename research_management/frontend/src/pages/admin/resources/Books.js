import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Grid, Modal, Snackbar, Alert, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AdminHeader from "../../../components/admin/AdminHeader";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import BookForm from "../../../components/admin/resources/BookForm";
import BooksTable from "../../../components/admin/resources/BooksTable";
import DeleteConfirmationDialog from "../../../components/DeleteConfirmationDialog";
import DEFAULT_BACKEND_URL from "../../../config";
import fetchData, {
  fetchDataById,
  addUpdateData,
  deleteDataById,
} from "../../../utils/apiUtils";
import dayjs from "dayjs";

function Books() {
  const backendUrl = DEFAULT_BACKEND_URL;
  const userData = useSelector((state) => state.user.userData);
  const defaultBook = {
    title: "",
    description: "",
    authors: "",
    created_date: dayjs().format("YYYY-MM-DD"),
    creator: userData?.id,
    type: "book",
    attachments: null,
    image: null,
    url: "",
    publisher: "",
    published_date: "",
    isbn: "",
    field_of_study: "",
  };
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState(defaultBook);
  const [editingBook, setEditingBook] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
  });

  // Gửi HTTP request để lấy danh sách sách do NXB phát hành từ backend
  const fetchBooks = () =>
    fetchData(`${backendUrl}/api/published-books/`, setBooks, setNotification);

  // Sử dụng useEffect để tự động gọi hàm fetchBooks khi component được tạo
  useEffect(() => {
    fetchBooks();
  }, []);

  // Mở modal hiển thị form thêm/sửa sách do NXB phát hành
  const handleOpenModel = () => {
    setIsBookModalOpen(true);
    setEditingBook(null);
    setNewBook(defaultBook);
  };

  // Đóng modal hiển thị form thêm/sửa sách do NXB phát hành
  const handleCloseModal = () => {
    setIsBookModalOpen(false);
  };

  // Mở dialog xác nhận xóa sách do NXB phát hành
  const openDeleteDialog = (book) => {
    setBookToDelete(book);
    setIsDeleteDialogOpen(true);
  };

  // Đóng dialog xác nhận xóa sách do NXB phát hành
  const closeDeleteDialog = () => {
    setBookToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  // Xử lý khi người dùng muốn xóa sách do NXB phát hành
  const handleDeleteBook = (bookId) => {
    deleteDataById(
      `${backendUrl}/api/published-book`,
      bookId,
      setNotification,
      fetchBooks
    );
    closeDeleteDialog();
  };

  // Xử lý khi người dùng muốn chỉnh sửa sách do NXB phát hành
  const handleEditBook = (bookId) => {
    fetchDataById(
      `${backendUrl}/api/published-book`,
      bookId,
      setEditingBook,
      setNotification
    );
    setIsBookModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${backendUrl}/api/published-book`;
    const successMessage = editingBook
      ? "Cập nhật sách do NXB phát hành thành công"
      : "Thêm sách do NXB phát hành thành công";

    addUpdateData(
      url,
      editingBook || newBook,
      successMessage,
      fetchBooks,
      setNotification
    );

    setIsBookModalOpen(false);
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
            <h2>Quản lý sách do NXB phát hành</h2>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModel}
              sx={{ marginBottom: "24px" }}
              startIcon={<AddIcon />}
            >
              Thêm sách do NXB phát hành
            </Button>
            <Modal
              open={isBookModalOpen}
              onClose={handleCloseModal}
              aria-labelledby="add-book-modal-title"
              aria-describedby="add-book-modal-description"
            >
              <BookForm
                newBook={newBook}
                setNewBook={setNewBook}
                editingBook={editingBook}
                setEditingBook={setEditingBook}
                handleSubmit={handleSubmit}
                onClose={handleCloseModal}
              />
            </Modal>
            <BooksTable
              book={books}
              handleEditItem={handleEditBook}
              openDeleteDialog={openDeleteDialog}
            />
          </Container>
        </Grid>
      </Grid>
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onDelete={handleDeleteBook}
        itemToDelete={bookToDelete}
        dataLabel="sách do NXB phát hành"
        itemName={bookToDelete?.title}
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
    </div>
  );
}

export default Books;
