import React, { useState, useEffect } from "react";
import { Button, Grid, Modal, Snackbar, Alert, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import ResearchTopicForm from "../../components/admin/ResearchTopicForm";
import DeleteConfirmationDialog from "../../components/DeleteConfirmationDialog";
import ResearchTopicsTable from "../../components/admin/ResearchTopicsTable";
import DEFAULT_BACKEND_URL from "../../config";
import fetchData, {
  fetchDataById,
  addUpdateData,
  deleteDataById,
} from "../../utils/apiUtils";

function ResearchTopics() {
  const backendUrl = DEFAULT_BACKEND_URL;

  const defaultResearchTopic = {
    academic_year: "",
  };
  const [researchTopics, setResearchTopics] = useState([]);
  const [newResearchTopic, setNewResearchTopic] =
    useState(defaultResearchTopic);
  const [editingResearchTopic, setEditingResearchTopic] = useState(null);
  const [researchTopicToDelete, setResearchTopicToDelete] = useState(null);

  const [isResearchTopicModalOpen, setIsResearchTopicModalOpen] =
    useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
  });

  // Gửi HTTP request để lấy danh sách đề tài từ backend
  const fetchResearchTopics = () =>
    fetchData(
      `${backendUrl}/api/research-topics/`,
      setResearchTopics,
      setNotification
    );

  // Sử dụng useEffect để tự động gọi hàm fetchResearchTopics khi component được tạo
  useEffect(() => {
    fetchResearchTopics();
  }, []);

  // Mở modal hiển thị form thêm/sửa đề tài
  const handleOpenModel = () => {
    setIsResearchTopicModalOpen(true);
    setEditingResearchTopic(null);
    setNewResearchTopic(defaultResearchTopic);
  };

  // Đóng modal hiển thị form thêm/sửa đề tài
  const handleCloseModal = () => {
    setIsResearchTopicModalOpen(false);
  };

  // Mở dialog xác nhận xóa đề tài
  const openDeleteDialog = (researchTopic) => {
    setResearchTopicToDelete(researchTopic);
    setIsDeleteDialogOpen(true);
  };

  // Đóng dialog xác nhận xóa đề tài
  const closeDeleteDialog = () => {
    setResearchTopicToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  // Xử lý khi người dùng muốn xóa đề tài
  const handleDeleteResearchTopic = (researchTopicId) => {
    deleteDataById(
      `${backendUrl}/api/research-topic`,
      researchTopicId,
      setNotification,
      fetchResearchTopics
    );
    closeDeleteDialog();
  };

  // Xử lý khi người dùng muốn chỉnh sửa đề tài
  const handleEditResearchTopic = (researchTopicId) => {
    fetchDataById(
      `${backendUrl}/api/research-topic`,
      researchTopicId,
      setEditingResearchTopic,
      setNotification
    );
    setIsResearchTopicModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${backendUrl}/api/research-topic`;
    const successMessage = editingResearchTopic
      ? "Cập nhật đề tài thành công"
      : "Thêm đề tài thành công";

    addUpdateData(
      url,
      editingResearchTopic || newResearchTopic,
      successMessage,
      fetchResearchTopics,
      setNotification
    );

    setIsResearchTopicModalOpen(false);
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
            <h2>Quản lý đề tài</h2>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModel}
              sx={{ marginBottom: "24px" }}
              startIcon={<AddIcon />}
            >
              Thêm đề tài
            </Button>
            <Modal
              open={isResearchTopicModalOpen}
              onClose={handleCloseModal}
              aria-labelledby="add-researchTopic-modal-title"
              aria-describedby="add-researchTopic-modal-description"
            >
              <ResearchTopicForm
                newResearchTopic={newResearchTopic}
                setNewResearchTopic={setNewResearchTopic}
                editingResearchTopic={editingResearchTopic}
                setEditingResearchTopic={setEditingResearchTopic}
                handleSubmit={handleSubmit}
                onClose={handleCloseModal}
              />
            </Modal>
            <ResearchTopicsTable
              data={researchTopics}
              handleEditItem={handleEditResearchTopic}
              openDeleteDialog={openDeleteDialog}
            />
          </Container>
        </Grid>
      </Grid>
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onDelete={handleDeleteResearchTopic}
        itemToDelete={researchTopicToDelete}
        dataLabel="đề tài"
        itemName={researchTopicToDelete?.academic_year}
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

export default ResearchTopics;
