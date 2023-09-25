import React, { useState, useEffect } from "react";
import { Button, Grid, Modal, Snackbar, Alert, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AdminHeader from "../../../components/admin/AdminHeader";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import LevelForm from "../../../components/admin/general/LevelForm";
import LevelsTable from "../../../components/admin/general/LevelsTable";
import DeleteConfirmationDialog from "../../../components/DeleteConfirmationDialog";
import DEFAULT_BACKEND_URL from "../../../config";
import fetchData, {
  fetchDataById,
  addUpdateData,
  deleteDataById,
} from "../../../utils/apiUtils";

function Levels() {
  const backendUrl = DEFAULT_BACKEND_URL;
  const defaultLevel = {
    name: "",
  };
  const [levels, setLevels] = useState([]);
  const [newLevel, setNewLevel] = useState(defaultLevel);
  const [editingLevel, setEditingLevel] = useState(null);
  const [levelToDelete, setLevelToDelete] = useState(null);
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
  });

  // Gửi HTTP request để lấy danh sách cấp đề tài từ backend
  const fetchLevels = () =>
    fetchData(`${backendUrl}/api/levels/`, setLevels, setNotification);

  // Sử dụng useEffect để tự động gọi hàm fetchLevels khi component được tạo
  useEffect(() => {
    fetchLevels();
  }, []);

  // Mở modal hiển thị form thêm/sửa cấp đề tài
  const handleOpenModel = () => {
    setIsLevelModalOpen(true);
    setEditingLevel(null);
    setNewLevel(defaultLevel);
  };

  // Đóng modal hiển thị form thêm/sửa cấp đề tài
  const handleCloseModal = () => {
    setIsLevelModalOpen(false);
  };

  // Mở dialog xác nhận xóa cấp đề tài
  const openDeleteDialog = (level) => {
    setLevelToDelete(level);
    setIsDeleteDialogOpen(true);
  };

  // Đóng dialog xác nhận xóa cấp đề tài
  const closeDeleteDialog = () => {
    setLevelToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  // Xử lý khi người dùng muốn xóa cấp đề tài
  const handleDeleteLevel = (levelId) => {
    deleteDataById(
      `${backendUrl}/api/level`,
      levelId,
      setNotification,
      fetchLevels
    );
    closeDeleteDialog();
  };

  // Xử lý khi người dùng muốn chỉnh sửa cấp đề tài
  const handleEditLevel = (levelId) => {
    fetchDataById(
      `${backendUrl}/api/level`,
      levelId,
      setEditingLevel,
      setNotification
    );
    setIsLevelModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${backendUrl}/api/level`;
    const successMessage = editingLevel
      ? "Cập nhật cấp đề tài thành công"
      : "Thêm cấp đề tài thành công";

    addUpdateData(
      url,
      editingLevel || newLevel,
      successMessage,
      fetchLevels,
      setNotification
    );

    setIsLevelModalOpen(false);
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
            <h2>Quản lý cấp đề tài</h2>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModel}
              sx={{ marginBottom: "24px" }}
              startIcon={<AddIcon />}
            >
              Thêm cấp đề tài
            </Button>
            <Modal
              open={isLevelModalOpen}
              onClose={handleCloseModal}
              aria-labelledby="add-level-modal-title"
              aria-describedby="add-level-modal-description"
            >
              <LevelForm
                newLevel={newLevel}
                setNewLevel={setNewLevel}
                editingLevel={editingLevel}
                setEditingLevel={setEditingLevel}
                handleSubmit={handleSubmit}
                onClose={handleCloseModal}
              />
            </Modal>
            <LevelsTable
              data={levels}
              handleEditItem={handleEditLevel}
              openDeleteDialog={openDeleteDialog}
            />
          </Container>
        </Grid>
      </Grid>
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onDelete={handleDeleteLevel}
        itemToDelete={levelToDelete}
        dataLabel="cấp đề tài"
        itemName={levelToDelete?.name}
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

export default Levels;
