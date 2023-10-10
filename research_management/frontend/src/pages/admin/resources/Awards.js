import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Grid, Modal, Snackbar, Alert, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AdminHeader from "../../../components/admin/AdminHeader";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import AwardForm from "../../../components/admin/resources/AwardForm";
import AwardsTable from "../../../components/admin/resources/AwardsTable";
import DeleteConfirmationDialog from "../../../components/DeleteConfirmationDialog";
import DEFAULT_BACKEND_URL from "../../../config";
import fetchData, {
  fetchDataById,
  addUpdateData,
  deleteDataById,
} from "../../../utils/apiUtils";
import dayjs from "dayjs";

function Awards() {
  const backendUrl = DEFAULT_BACKEND_URL;
  const userData = useSelector((state) => state.user.userData);
  const defaultAward = {
    title: "",
    description: "",
    authors: "",
    created_date: dayjs().format("YYYY-MM-DD"),
    creator: userData?.id,
    type: "award",
    attachments: null,
    image: null,
    url: "",
    award_level: "school",
    award_category: "participation",
    award_rank: "first",
    award_received_date: "2023-09-30",
  };
  const [awards, setAwards] = useState([]);
  const [newAward, setNewAward] = useState(defaultAward);
  const [editingAward, setEditingAward] = useState(null);
  const [awardToDelete, setAwardToDelete] = useState(null);
  const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
  });

  // Gửi HTTP request để lấy danh sách giải thưởng NCKH từ backend
  const fetchAwards = () =>
    fetchData(`${backendUrl}/api/research-awards/`, setAwards, setNotification);

  // Sử dụng useEffect để tự động gọi hàm fetchAwards khi component được tạo
  useEffect(() => {
    fetchAwards();
  }, []);

  // Mở modal hiển thị form thêm/sửa giải thưởng NCKH
  const handleOpenModel = () => {
    setIsAwardModalOpen(true);
    setEditingAward(null);
    setNewAward(defaultAward);
  };

  // Đóng modal hiển thị form thêm/sửa giải thưởng NCKH
  const handleCloseModal = () => {
    setIsAwardModalOpen(false);
  };

  // Mở dialog xác nhận xóa giải thưởng NCKH
  const openDeleteDialog = (award) => {
    setAwardToDelete(award);
    setIsDeleteDialogOpen(true);
  };

  // Đóng dialog xác nhận xóa giải thưởng NCKH
  const closeDeleteDialog = () => {
    setAwardToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  // Xử lý khi người dùng muốn xóa giải thưởng NCKH
  const handleDeleteAward = (awardId) => {
    deleteDataById(
      `${backendUrl}/api/research-award`,
      awardId,
      setNotification,
      fetchAwards
    );
    closeDeleteDialog();
  };

  // Xử lý khi người dùng muốn chỉnh sửa giải thưởng NCKH
  const handleEditAward = (awardId) => {
    fetchDataById(
      `${backendUrl}/api/research-award`,
      awardId,
      setEditingAward,
      setNotification
    );
    setIsAwardModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${backendUrl}/api/research-award`;
    const successMessage = editingAward
      ? "Cập nhật giải thưởng NCKH thành công"
      : "Thêm giải thưởng NCKH thành công";

    addUpdateData(
      url,
      editingAward || newAward,
      successMessage,
      fetchAwards,
      setNotification
    );

    setIsAwardModalOpen(false);
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
            <h2>Quản lý giải thưởng NCKH</h2>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModel}
              sx={{ marginBottom: "24px" }}
              startIcon={<AddIcon />}
            >
              Thêm giải thưởng NCKH
            </Button>
            <Modal
              open={isAwardModalOpen}
              onClose={handleCloseModal}
              aria-labelledby="add-award-modal-title"
              aria-describedby="add-award-modal-description"
            >
              <AwardForm
                newAward={newAward}
                setNewAward={setNewAward}
                editingAward={editingAward}
                setEditingAward={setEditingAward}
                handleSubmit={handleSubmit}
                onClose={handleCloseModal}
              />
            </Modal>
            <AwardsTable
              award={awards}
              handleEditItem={handleEditAward}
              openDeleteDialog={openDeleteDialog}
            />
          </Container>
        </Grid>
      </Grid>
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onDelete={handleDeleteAward}
        itemToDelete={awardToDelete}
        dataLabel="giải thưởng NCKH"
        itemName={awardToDelete?.title}
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

export default Awards;
