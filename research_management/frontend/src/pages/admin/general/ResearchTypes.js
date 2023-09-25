import React, { useState, useEffect } from "react";
import { Button, Grid, Modal, Snackbar, Alert, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AdminHeader from "../../../components/admin/AdminHeader";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import ResearchTypeForm from "../../../components/admin/general/ResearchTypeForm";
import ResearchTypesTable from "../../../components/admin/general/ResearchTypesTable";
import DeleteConfirmationDialog from "../../../components/DeleteConfirmationDialog";
import DEFAULT_BACKEND_URL from "../../../config";
import fetchData, {
  fetchDataById,
  addUpdateData,
  deleteDataById,
} from "../../../utils/apiUtils";

function ResearchTypes() {
  const backendUrl = DEFAULT_BACKEND_URL;
  const defaultResearchType = {
    name: "",
  };
  const [researchTypes, setResearchTypes] = useState([]);
  const [newResearchType, setNewResearchType] = useState(defaultResearchType);
  const [editingResearchType, setEditingResearchType] = useState(null);
  const [researchTypeToDelete, setResearchTypeToDelete] = useState(null);
  const [isResearchTypeModalOpen, setIsResearchTypeModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
  });

  // Gửi HTTP request để lấy danh sách loại hình nghiên cứu từ backend
  const fetchResearchTypes = () =>
    fetchData(
      `${backendUrl}/api/research-types/`,
      setResearchTypes,
      setNotification
    );

  // Sử dụng useEffect để tự động gọi hàm fetchResearchTypes khi component được tạo
  useEffect(() => {
    fetchResearchTypes();
  }, []);

  // Mở modal hiển thị form thêm/sửa loại hình nghiên cứu
  const handleOpenModel = () => {
    setIsResearchTypeModalOpen(true);
    setEditingResearchType(null);
    setNewResearchType(defaultResearchType);
  };

  // Đóng modal hiển thị form thêm/sửa loại hình nghiên cứu
  const handleCloseModal = () => {
    setIsResearchTypeModalOpen(false);
  };

  // Mở dialog xác nhận xóa loại hình nghiên cứu
  const openDeleteDialog = (researchType) => {
    setResearchTypeToDelete(researchType);
    setIsDeleteDialogOpen(true);
  };

  // Đóng dialog xác nhận xóa loại hình nghiên cứu
  const closeDeleteDialog = () => {
    setResearchTypeToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  // Xử lý khi người dùng muốn xóa loại hình nghiên cứu
  const handleDeleteResearchType = (researchTypeId) => {
    deleteDataById(
      `${backendUrl}/api/research-type`,
      researchTypeId,
      setNotification,
      fetchResearchTypes
    );
    closeDeleteDialog();
  };

  // Xử lý khi người dùng muốn chỉnh sửa loại hình nghiên cứu
  const handleEditResearchType = (researchTypeId) => {
    fetchDataById(
      `${backendUrl}/api/research-type`,
      researchTypeId,
      setEditingResearchType,
      setNotification
    );
    setIsResearchTypeModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${backendUrl}/api/research-type`;
    const successMessage = editingResearchType
      ? "Cập nhật loại hình nghiên cứu thành công"
      : "Thêm loại hình nghiên cứu thành công";

    addUpdateData(
      url,
      editingResearchType || newResearchType,
      successMessage,
      fetchResearchTypes,
      setNotification
    );

    setIsResearchTypeModalOpen(false);
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
            <h2>Quản lý loại hình nghiên cứu</h2>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModel}
              sx={{ marginBottom: "24px" }}
              startIcon={<AddIcon />}
            >
              Thêm loại hình nghiên cứu
            </Button>
            <Modal
              open={isResearchTypeModalOpen}
              onClose={handleCloseModal}
              aria-labelledby="add-researchType-modal-title"
              aria-describedby="add-researchType-modal-description"
            >
              <ResearchTypeForm
                newResearchType={newResearchType}
                setNewResearchType={setNewResearchType}
                editingResearchType={editingResearchType}
                setEditingResearchType={setEditingResearchType}
                handleSubmit={handleSubmit}
                onClose={handleCloseModal}
              />
            </Modal>
            <ResearchTypesTable
              data={researchTypes}
              handleEditItem={handleEditResearchType}
              openDeleteDialog={openDeleteDialog}
            />
          </Container>
        </Grid>
      </Grid>
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onDelete={handleDeleteResearchType}
        itemToDelete={researchTypeToDelete}
        dataLabel="loại hình nghiên cứu"
        itemName={researchTypeToDelete?.name}
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

export default ResearchTypes;
