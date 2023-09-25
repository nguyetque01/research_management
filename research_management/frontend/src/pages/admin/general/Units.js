import React, { useState, useEffect } from "react";
import { Button, Grid, Modal, Snackbar, Alert, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AdminHeader from "../../../components/admin/AdminHeader";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import UnitForm from "../../../components/admin/general/UnitForm";
import UnitsTable from "../../../components/admin/general/UnitsTable";
import DeleteConfirmationDialog from "../../../components/DeleteConfirmationDialog";
import DEFAULT_BACKEND_URL from "../../../config";
import fetchData, {
  fetchDataById,
  addUpdateData,
  deleteDataById,
} from "../../../utils/apiUtils";

function Units() {
  const backendUrl = DEFAULT_BACKEND_URL;
  const defaultUnit = {
    name: "",
  };
  const [units, setUnits] = useState([]);
  const [newUnit, setNewUnit] = useState(defaultUnit);
  const [editingUnit, setEditingUnit] = useState(null);
  const [unitToDelete, setUnitToDelete] = useState(null);
  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
  });

  // Gửi HTTP request để lấy danh sách đơn vị tính từ backend
  const fetchUnits = () =>
    fetchData(`${backendUrl}/api/units/`, setUnits, setNotification);

  // Sử dụng useEffect để tự động gọi hàm fetchUnits khi component được tạo
  useEffect(() => {
    fetchUnits();
  }, []);

  // Mở modal hiển thị form thêm/sửa đơn vị tính
  const handleOpenModel = () => {
    setIsUnitModalOpen(true);
    setEditingUnit(null);
    setNewUnit(defaultUnit);
  };

  // Đóng modal hiển thị form thêm/sửa đơn vị tính
  const handleCloseModal = () => {
    setIsUnitModalOpen(false);
  };

  // Mở dialog xác nhận xóa đơn vị tính
  const openDeleteDialog = (unit) => {
    setUnitToDelete(unit);
    setIsDeleteDialogOpen(true);
  };

  // Đóng dialog xác nhận xóa đơn vị tính
  const closeDeleteDialog = () => {
    setUnitToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  // Xử lý khi người dùng muốn xóa đơn vị tính
  const handleDeleteUnit = (unitId) => {
    deleteDataById(
      `${backendUrl}/api/unit`,
      unitId,
      setNotification,
      fetchUnits
    );
    closeDeleteDialog();
  };

  // Xử lý khi người dùng muốn chỉnh sửa đơn vị tính
  const handleEditUnit = (unitId) => {
    fetchDataById(
      `${backendUrl}/api/unit`,
      unitId,
      setEditingUnit,
      setNotification
    );
    setIsUnitModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${backendUrl}/api/unit`;
    const successMessage = editingUnit
      ? "Cập nhật đơn vị tính thành công"
      : "Thêm đơn vị tính thành công";

    addUpdateData(
      url,
      editingUnit || newUnit,
      successMessage,
      fetchUnits,
      setNotification
    );

    setIsUnitModalOpen(false);
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
            <h2>Quản lý đơn vị tính</h2>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModel}
              sx={{ marginBottom: "24px" }}
              startIcon={<AddIcon />}
            >
              Thêm đơn vị tính
            </Button>
            <Modal
              open={isUnitModalOpen}
              onClose={handleCloseModal}
              aria-labelledby="add-unit-modal-title"
              aria-describedby="add-unit-modal-description"
            >
              <UnitForm
                newUnit={newUnit}
                setNewUnit={setNewUnit}
                editingUnit={editingUnit}
                setEditingUnit={setEditingUnit}
                handleSubmit={handleSubmit}
                onClose={handleCloseModal}
              />
            </Modal>
            <UnitsTable
              data={units}
              handleEditItem={handleEditUnit}
              openDeleteDialog={openDeleteDialog}
            />
          </Container>
        </Grid>
      </Grid>
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onDelete={handleDeleteUnit}
        itemToDelete={unitToDelete}
        dataLabel="đơn vị tính"
        itemName={unitToDelete?.name}
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

export default Units;
