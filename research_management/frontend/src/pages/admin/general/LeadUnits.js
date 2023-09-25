import React, { useState, useEffect } from "react";
import { Button, Grid, Modal, Snackbar, Alert, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AdminHeader from "../../../components/admin/AdminHeader";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import LeadUnitForm from "../../../components/admin/general/LeadUnitForm";
import LeadUnitsTable from "../../../components/admin/general/LeadUnitsTable";
import DeleteConfirmationDialog from "../../../components/DeleteConfirmationDialog";
import DEFAULT_BACKEND_URL from "../../../config";
import fetchData, {
  fetchDataById,
  addUpdateData,
  deleteDataById,
} from "../../../utils/apiUtils";

function LeadUnits() {
  const backendUrl = DEFAULT_BACKEND_URL;
  const defaultLeadUnit = {
    name: "",
  };
  const [leadUnits, setLeadUnits] = useState([]);
  const [newLeadUnit, setNewLeadUnit] = useState(defaultLeadUnit);
  const [editingLeadUnit, setEditingLeadUnit] = useState(null);
  const [leadUnitToDelete, setLeadUnitToDelete] = useState(null);
  const [isLeadUnitModalOpen, setIsLeadUnitModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
  });

  // Gửi HTTP request để lấy danh sách đơn vị chủ trì từ backend
  const fetchLeadUnits = () =>
    fetchData(`${backendUrl}/api/lead-units/`, setLeadUnits, setNotification);

  // Sử dụng useEffect để tự động gọi hàm fetchLeadUnits khi component được tạo
  useEffect(() => {
    fetchLeadUnits();
  }, []);

  // Mở modal hiển thị form thêm/sửa đơn vị chủ trì
  const handleOpenModel = () => {
    setIsLeadUnitModalOpen(true);
    setEditingLeadUnit(null);
    setNewLeadUnit(defaultLeadUnit);
  };

  // Đóng modal hiển thị form thêm/sửa đơn vị chủ trì
  const handleCloseModal = () => {
    setIsLeadUnitModalOpen(false);
  };

  // Mở dialog xác nhận xóa đơn vị chủ trì
  const openDeleteDialog = (leadUnit) => {
    setLeadUnitToDelete(leadUnit);
    setIsDeleteDialogOpen(true);
  };

  // Đóng dialog xác nhận xóa đơn vị chủ trì
  const closeDeleteDialog = () => {
    setLeadUnitToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  // Xử lý khi người dùng muốn xóa đơn vị chủ trì
  const handleDeleteLeadUnit = (leadUnitId) => {
    deleteDataById(
      `${backendUrl}/api/lead-unit`,
      leadUnitId,
      setNotification,
      fetchLeadUnits
    );
    closeDeleteDialog();
  };

  // Xử lý khi người dùng muốn chỉnh sửa đơn vị chủ trì
  const handleEditLeadUnit = (leadUnitId) => {
    fetchDataById(
      `${backendUrl}/api/lead-unit`,
      leadUnitId,
      setEditingLeadUnit,
      setNotification
    );
    setIsLeadUnitModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${backendUrl}/api/lead-unit`;
    const successMessage = editingLeadUnit
      ? "Cập nhật đơn vị chủ trì thành công"
      : "Thêm đơn vị chủ trì thành công";

    addUpdateData(
      url,
      editingLeadUnit || newLeadUnit,
      successMessage,
      fetchLeadUnits,
      setNotification
    );

    setIsLeadUnitModalOpen(false);
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
            <h2>Quản lý đơn vị chủ trì</h2>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModel}
              sx={{ marginBottom: "24px" }}
              startIcon={<AddIcon />}
            >
              Thêm đơn vị chủ trì
            </Button>
            <Modal
              open={isLeadUnitModalOpen}
              onClose={handleCloseModal}
              aria-labelledby="add-leadUnit-modal-title"
              aria-describedby="add-leadUnit-modal-description"
            >
              <LeadUnitForm
                newLeadUnit={newLeadUnit}
                setNewLeadUnit={setNewLeadUnit}
                editingLeadUnit={editingLeadUnit}
                setEditingLeadUnit={setEditingLeadUnit}
                handleSubmit={handleSubmit}
                onClose={handleCloseModal}
              />
            </Modal>
            <LeadUnitsTable
              data={leadUnits}
              handleEditItem={handleEditLeadUnit}
              openDeleteDialog={openDeleteDialog}
            />
          </Container>
        </Grid>
      </Grid>
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onDelete={handleDeleteLeadUnit}
        itemToDelete={leadUnitToDelete}
        dataLabel="đơn vị chủ trì"
        itemName={leadUnitToDelete?.name}
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

export default LeadUnits;
