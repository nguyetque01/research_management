import React, { useState, useEffect } from "react";
import { Button, Grid, Modal, Snackbar, Alert, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AdminHeader from "../../../components/admin/AdminHeader";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import ResearchForm from "../../../components/admin/resources/ResearchForm";
import ResearchsTable from "../../../components/admin/resources/ResearchsTable";
import DeleteConfirmationDialog from "../../../components/DeleteConfirmationDialog";
import DEFAULT_BACKEND_URL from "../../../config";
import fetchData, {
  fetchDataById,
  addUpdateData,
  deleteDataById,
} from "../../../utils/apiUtils";

function Researchs() {
  const backendUrl = DEFAULT_BACKEND_URL;
  const defaultResearch = {
    name: "",
  };
  const [researchs, setResearchs] = useState([]);
  const [newResearch, setNewResearch] = useState(defaultResearch);
  const [editingResearch, setEditingResearch] = useState(null);
  const [researchToDelete, setResearchToDelete] = useState(null);
  const [isResearchModalOpen, setIsResearchModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
  });
  // Gửi HTTP request để lấy danh sách nghiên cứu từ backend
  const fetchResearchs = () =>
    fetchData(`${backendUrl}/api/researchs/`, setResearchs, setNotification);
  // Sử dụng useEffect để tự động gọi hàm fetchResearchs khi component được tạo
  useEffect(() => {
    fetchResearchs();
  }, []);
  // Mở modal hiển thị form thêm/sửa nghiên cứu
  const handleOpenModel = () => {
    setIsResearchModalOpen(true);
    setEditingResearch(null);
    setNewResearch(defaultResearch);
  };
  // Đóng modal hiển thị form thêm/sửa nghiên cứu
  const handleCloseModal = () => {
    setIsResearchModalOpen(false);
  };
  // Mở dialog xác nhận xóa nghiên cứu
  const openDeleteDialog = (research) => {
    setResearchToDelete(research);
    setIsDeleteDialogOpen(true);
  };
  // Đóng dialog xác nhận xóa nghiên cứu
  const closeDeleteDialog = () => {
    setResearchToDelete(null);
    setIsDeleteDialogOpen(false);
  };
  // Xử lý khi người dùng muốn xóa nghiên cứu
  const handleDeleteResearch = (researchId) => {
    deleteDataById(
      `${backendUrl}/api/research`,
      researchId,
      setNotification,
      fetchResearchs
    );
    closeDeleteDialog();
  };
  // Xử lý khi người dùng muốn chỉnh sửa nghiên cứu
  const handleEditResearch = (researchId) => {
    fetchDataById(
      `${backendUrl}/api/research`,
      researchId,
      setEditingResearch,
      setNotification
    );
    setIsResearchModalOpen(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${backendUrl}/api/research`;
    const successMessage = editingResearch
      ? "Cập nhật nghiên cứu thành công"
      : "Thêm nghiên cứu thành công";
    addUpdateData(
      url,
      editingResearch || newResearch,
      successMessage,
      fetchResearchs,
      setNotification
    );
    setIsResearchModalOpen(false);
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
            <h2>Quản lý nghiên cứu</h2>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModel}
              sx={{ marginBottom: "24px" }}
              startIcon={<AddIcon />}
            >
              Thêm nghiên cứu
            </Button>
            <Modal
              open={isResearchModalOpen}
              onClose={handleCloseModal}
              aria-labelledby="add-research-modal-title"
              aria-describedby="add-research-modal-description"
            >
              <ResearchForm
                newResearch={newResearch}
                setNewResearch={setNewResearch}
                editingResearch={editingResearch}
                setEditingResearch={setEditingResearch}
                handleSubmit={handleSubmit}
                onClose={handleCloseModal}
              />
            </Modal>
            <ResearchsTable
              data={researchs}
              handleEditItem={handleEditResearch}
              openDeleteDialog={openDeleteDialog}
            />
          </Container>
        </Grid>
      </Grid>
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onDelete={handleDeleteResearch}
        itemToDelete={researchToDelete}
        dataLabel="nghiên cứu"
        itemName={researchToDelete?.name}
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

export default Researchs;
