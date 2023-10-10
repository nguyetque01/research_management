import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Grid, Modal, Snackbar, Alert, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AdminHeader from "../../../components/admin/AdminHeader";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import TranferForm from "../../../components/admin/resources/TranferForm";
import TranfersTable from "../../../components/admin/resources/TranfersTable";
import DeleteConfirmationDialog from "../../../components/DeleteConfirmationDialog";
import DEFAULT_BACKEND_URL from "../../../config";
import fetchData, {
  fetchDataById,
  addUpdateData,
  deleteDataById,
} from "../../../utils/apiUtils";
import dayjs from "dayjs";

function Tranfers() {
  const backendUrl = DEFAULT_BACKEND_URL;
  const userData = useSelector((state) => state.user.userData);
  const defaultTranfer = {
    title: "",
    description: "",
    authors: "",
    created_date: dayjs().format("YYYY-MM-DD"),
    creator: userData?.id,
    type: "tranfer",
    attachments: null,
    image: null,
    url: "",
    transfer_company: "",
    transfer_contract_id: "",
    signed_contract_id: "",
    signed_contract_date: dayjs().format("YYYY-MM-DD"),
    contract_value: 0,
  };
  const [tranfers, setTranfers] = useState([]);
  const [newTranfer, setNewTranfer] = useState(defaultTranfer);
  const [editingTranfer, setEditingTranfer] = useState(null);
  const [tranferToDelete, setTranferToDelete] = useState(null);
  const [isTranferModalOpen, setIsTranferModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
  });

  // Gửi HTTP request để lấy danh sách đề tài chuyển giao công nghệ từ backend
  const fetchTranfers = () =>
    fetchData(
      `${backendUrl}/api/technology-transfer-projects/`,
      setTranfers,
      setNotification
    );

  // Sử dụng useEffect để tự động gọi hàm fetchTranfers khi component được tạo
  useEffect(() => {
    fetchTranfers();
  }, []);

  // Mở modal hiển thị form thêm/sửa đề tài chuyển giao công nghệ
  const handleOpenModel = () => {
    setIsTranferModalOpen(true);
    setEditingTranfer(null);
    setNewTranfer(defaultTranfer);
  };

  // Đóng modal hiển thị form thêm/sửa đề tài chuyển giao công nghệ
  const handleCloseModal = () => {
    setIsTranferModalOpen(false);
  };

  // Mở dialog xác nhận xóa đề tài chuyển giao công nghệ
  const openDeleteDialog = (tranfer) => {
    setTranferToDelete(tranfer);
    setIsDeleteDialogOpen(true);
  };

  // Đóng dialog xác nhận xóa đề tài chuyển giao công nghệ
  const closeDeleteDialog = () => {
    setTranferToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  // Xử lý khi người dùng muốn xóa đề tài chuyển giao công nghệ
  const handleDeleteTranfer = (tranferId) => {
    deleteDataById(
      `${backendUrl}/api/technology-transfer-project`,
      tranferId,
      setNotification,
      fetchTranfers
    );
    closeDeleteDialog();
  };

  // Xử lý khi người dùng muốn chỉnh sửa đề tài chuyển giao công nghệ
  const handleEditTranfer = (tranferId) => {
    fetchDataById(
      `${backendUrl}/api/technology-transfer-project`,
      tranferId,
      setEditingTranfer,
      setNotification
    );
    setIsTranferModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${backendUrl}/api/technology-transfer-project`;
    const successMessage = editingTranfer
      ? "Cập nhật đề tài chuyển giao công nghệ thành công"
      : "Thêm đề tài chuyển giao công nghệ thành công";

    addUpdateData(
      url,
      editingTranfer || newTranfer,
      successMessage,
      fetchTranfers,
      setNotification
    );

    setIsTranferModalOpen(false);
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
            <h2>Quản lý đề tài chuyển giao công nghệ</h2>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModel}
              sx={{ marginBottom: "24px" }}
              startIcon={<AddIcon />}
            >
              Thêm đề tài chuyển giao công nghệ
            </Button>
            <Modal
              open={isTranferModalOpen}
              onClose={handleCloseModal}
              aria-labelledby="add-tranfer-modal-title"
              aria-describedby="add-tranfer-modal-description"
            >
              <TranferForm
                newTranfer={newTranfer}
                setNewTranfer={setNewTranfer}
                editingTranfer={editingTranfer}
                setEditingTranfer={setEditingTranfer}
                handleSubmit={handleSubmit}
                onClose={handleCloseModal}
              />
            </Modal>
            <TranfersTable
              tranfer={tranfers}
              handleEditItem={handleEditTranfer}
              openDeleteDialog={openDeleteDialog}
            />
          </Container>
        </Grid>
      </Grid>
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onDelete={handleDeleteTranfer}
        itemToDelete={tranferToDelete}
        dataLabel="đề tài chuyển giao công nghệ"
        itemName={tranferToDelete?.title}
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

export default Tranfers;
