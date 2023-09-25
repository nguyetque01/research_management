import React, { useState, useEffect } from "react";
import { Button, Grid, Modal, Snackbar, Alert, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AdminHeader from "../../../components/admin/AdminHeader";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import AcademicYearForm from "../../../components/admin/general/AcademicYearForm";
import AcademicYearsTable from "../../../components/admin/general/AcademicYearsTable";
import DeleteConfirmationDialog from "../../../components/DeleteConfirmationDialog";
import DEFAULT_BACKEND_URL from "../../../config";
import fetchData, {
  fetchDataById,
  addUpdateData,
  deleteDataById,
} from "../../../utils/apiUtils";

function AcademicYears() {
  const backendUrl = DEFAULT_BACKEND_URL;
  const defaultAcademicYear = {
    name: "",
  };
  const [academicYears, setAcademicYears] = useState([]);
  const [newAcademicYear, setNewAcademicYear] = useState(defaultAcademicYear);
  const [editingAcademicYear, setEditingAcademicYear] = useState(null);
  const [academicYearToDelete, setAcademicYearToDelete] = useState(null);
  const [isAcademicYearModalOpen, setIsAcademicYearModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
  });

  // Gửi HTTP request để lấy danh sách năm học từ backend
  const fetchAcademicYears = () =>
    fetchData(
      `${backendUrl}/api/academic-years/`,
      setAcademicYears,
      setNotification
    );

  // Sử dụng useEffect để tự động gọi hàm fetchAcademicYears khi component được tạo
  useEffect(() => {
    fetchAcademicYears();
  }, []);

  // Mở modal hiển thị form thêm/sửa năm học
  const handleOpenModel = () => {
    setIsAcademicYearModalOpen(true);
    setEditingAcademicYear(null);
    setNewAcademicYear(defaultAcademicYear);
  };

  // Đóng modal hiển thị form thêm/sửa năm học
  const handleCloseModal = () => {
    setIsAcademicYearModalOpen(false);
  };

  // Mở dialog xác nhận xóa năm học
  const openDeleteDialog = (academicYear) => {
    setAcademicYearToDelete(academicYear);
    setIsDeleteDialogOpen(true);
  };

  // Đóng dialog xác nhận xóa năm học
  const closeDeleteDialog = () => {
    setAcademicYearToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  // Xử lý khi người dùng muốn xóa năm học
  const handleDeleteAcademicYear = (academicYearId) => {
    deleteDataById(
      `${backendUrl}/api/academic-year`,
      academicYearId,
      setNotification,
      fetchAcademicYears
    );
    closeDeleteDialog();
  };

  // Xử lý khi người dùng muốn chỉnh sửa năm học
  const handleEditAcademicYear = (academicYearId) => {
    fetchDataById(
      `${backendUrl}/api/academic-year`,
      academicYearId,
      setEditingAcademicYear,
      setNotification
    );
    setIsAcademicYearModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${backendUrl}/api/academic-year`;
    const successMessage = editingAcademicYear
      ? "Cập nhật năm học thành công"
      : "Thêm năm học thành công";

    addUpdateData(
      url,
      editingAcademicYear || newAcademicYear,
      successMessage,
      fetchAcademicYears,
      setNotification
    );

    setIsAcademicYearModalOpen(false);
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
            <h2>Quản lý năm học</h2>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModel}
              sx={{ marginBottom: "24px" }}
              startIcon={<AddIcon />}
            >
              Thêm năm học
            </Button>
            <Modal
              open={isAcademicYearModalOpen}
              onClose={handleCloseModal}
              aria-labelledby="add-academicYear-modal-title"
              aria-describedby="add-academicYear-modal-description"
            >
              <AcademicYearForm
                newAcademicYear={newAcademicYear}
                setNewAcademicYear={setNewAcademicYear}
                editingAcademicYear={editingAcademicYear}
                setEditingAcademicYear={setEditingAcademicYear}
                handleSubmit={handleSubmit}
                onClose={handleCloseModal}
              />
            </Modal>
            <AcademicYearsTable
              data={academicYears}
              handleEditItem={handleEditAcademicYear}
              openDeleteDialog={openDeleteDialog}
            />
          </Container>
        </Grid>
      </Grid>
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onDelete={handleDeleteAcademicYear}
        itemToDelete={academicYearToDelete}
        dataLabel="năm học"
        itemName={academicYearToDelete?.name}
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

export default AcademicYears;
