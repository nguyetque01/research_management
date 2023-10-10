import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Grid, Modal, Snackbar, Alert, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AdminHeader from "../../../components/admin/AdminHeader";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import ArticleForm from "../../../components/admin/resources/ArticleForm";
import ArticlesTable from "../../../components/admin/resources/ArticlesTable";
import DeleteConfirmationDialog from "../../../components/DeleteConfirmationDialog";
import DEFAULT_BACKEND_URL from "../../../config";
import fetchData, {
  fetchDataById,
  addUpdateData,
  deleteDataById,
} from "../../../utils/apiUtils";
import dayjs from "dayjs";

function Articles() {
  const backendUrl = DEFAULT_BACKEND_URL;
  const userData = useSelector((state) => state.user.userData);
  const defaultArticle = {
    title: "",
    description: "",
    authors: "",
    created_date: dayjs().format("YYYY-MM-DD"),
    creator: userData?.id,
    type: "article",
    attachments: null,
    image: null,
    url: "",
    journal_name: "",
    issn_isbn: "",
    classification: "",
    published_date: dayjs().format("YYYY-MM-DD"),
    published_type: "",
  };
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState(defaultArticle);
  const [editingArticle, setEditingArticle] = useState(null);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
  });

  // Gửi HTTP request để lấy danh sách bài báo từ backend
  const fetchArticles = () =>
    fetchData(`${backendUrl}/api/articles/`, setArticles, setNotification);

  // Sử dụng useEffect để tự động gọi hàm fetchArticles khi component được tạo
  useEffect(() => {
    fetchArticles();
  }, []);

  // Mở modal hiển thị form thêm/sửa bài báo
  const handleOpenModel = () => {
    setIsArticleModalOpen(true);
    setEditingArticle(null);
    setNewArticle(defaultArticle);
  };

  // Đóng modal hiển thị form thêm/sửa bài báo
  const handleCloseModal = () => {
    setIsArticleModalOpen(false);
  };

  // Mở dialog xác nhận xóa bài báo
  const openDeleteDialog = (article) => {
    setArticleToDelete(article);
    setIsDeleteDialogOpen(true);
  };

  // Đóng dialog xác nhận xóa bài báo
  const closeDeleteDialog = () => {
    setArticleToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  // Xử lý khi người dùng muốn xóa bài báo
  const handleDeleteArticle = (articleId) => {
    deleteDataById(
      `${backendUrl}/api/article`,
      articleId,
      setNotification,
      fetchArticles
    );
    closeDeleteDialog();
  };

  // Xử lý khi người dùng muốn chỉnh sửa bài báo
  const handleEditArticle = (articleId) => {
    fetchDataById(
      `${backendUrl}/api/article`,
      articleId,
      setEditingArticle,
      setNotification
    );
    setIsArticleModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${backendUrl}/api/article`;
    const successMessage = editingArticle
      ? "Cập nhật bài báo thành công"
      : "Thêm bài báo thành công";

    addUpdateData(
      url,
      editingArticle || newArticle,
      successMessage,
      fetchArticles,
      setNotification
    );

    setIsArticleModalOpen(false);
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
            <h2>Quản lý bài báo</h2>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModel}
              sx={{ marginBottom: "24px" }}
              startIcon={<AddIcon />}
            >
              Thêm bài báo
            </Button>
            <Modal
              open={isArticleModalOpen}
              onClose={handleCloseModal}
              aria-labelledby="add-article-modal-title"
              aria-describedby="add-article-modal-description"
            >
              <ArticleForm
                newArticle={newArticle}
                setNewArticle={setNewArticle}
                editingArticle={editingArticle}
                setEditingArticle={setEditingArticle}
                handleSubmit={handleSubmit}
                onClose={handleCloseModal}
              />
            </Modal>
            <ArticlesTable
              article={articles}
              handleEditItem={handleEditArticle}
              openDeleteDialog={openDeleteDialog}
            />
          </Container>
        </Grid>
      </Grid>
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onDelete={handleDeleteArticle}
        itemToDelete={articleToDelete}
        dataLabel="bài báo"
        itemName={articleToDelete?.title}
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

export default Articles;
