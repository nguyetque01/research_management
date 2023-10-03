import React, { useState, useEffect } from "react";
import { Button, Grid, Modal, Snackbar, Alert, Container } from "@mui/material";
import AdminHeader from "../../../components/admin/AdminHeader";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import ResearchActivityCategoryForm from "../../../components/admin/general/ResearchActivityCategoryForm";
import ResearchActivityCategoriesTable from "../../../components/admin/general/ResearchActivityCategoriesTable";
import DeleteConfirmationDialog from "../../../components/DeleteConfirmationDialog";
import DEFAULT_BACKEND_URL from "../../../config";
import fetchData, {
  fetchDataById,
  addUpdateData,
  deleteDataById,
} from "../../../utils/apiUtils";

function ResearchActivityCategories() {
  const backendUrl = DEFAULT_BACKEND_URL;
  const defaultCategory = {
    research_type: "",
    name: "",
  };
  const pageTitle = "Quản lý phân loại hoạt động nghiên cứu khoa học";
  const dataLabel = "phân loại";
  const [researchTypes, setResearchTypes] = useState([]);
  const [researchActivityCategories, setResearchActivityCategories] = useState(
    []
  );
  const [newCategory, setnewCategory] = useState(defaultCategory);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingCategoryResearchType, setEditingCategoryResearchType] =
    useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
  });

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        // Sử dụng Promise.all để đợi cho tất cả các cuộc gọi bất đồng bộ hoàn thành
        await Promise.all([
          fetchData(
            `${backendUrl}/api/research-types/`,
            setResearchTypes,
            setNotification
          ),
          fetchData(
            `${backendUrl}/api/research-activity-categories/`,
            setResearchActivityCategories,
            setNotification
          ),
        ]);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchAllData();
  }, []);

  // Mở modal hiển thị form thêm/sửa phân loại
  const handleOpenModel = () => {
    setIsModalOpen(true);
    // setEditingCategory(null);
    // setnewCategory(defaultCategory);
  };

  // Đóng modal hiển thị form thêm/sửa phân loại
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddCategory = (researchType) => {
    setEditingCategoryResearchType(researchType);
    setIsModalOpen(true);
  };

  // // Mở dialog xác nhận xóa phân loại
  // const openDeleteDialog = (category) => {
  //   setCategoryToDelete(category);
  //   setIsDeleteDialogOpen(true);
  // };

  // // Đóng dialog xác nhận xóa phân loại
  // const closeDeleteDialog = () => {
  //   setCategoryToDelete(null);
  //   setIsDeleteDialogOpen(false);
  // };

  // Xử lý khi người dùng muốn xóa phân loại
  // const handleDeleteResearchType = (researchTypeId) => {
  //   deleteDataById(
  //     `${backendUrl}/api/research-type`,
  //     researchTypeId,
  //     setNotification,
  //     fetchResearchActivityCategories
  //   );
  //   closeDeleteDialog();
  // };

  // Xử lý khi người dùng muốn chỉnh sửa phân loại
  // const handleEditResearchType = (researchTypeId) => {
  //   fetchDataById(
  //     `${backendUrl}/api/research-type`,
  //     researchTypeId,
  //     setEditingCategory,
  //     setNotification
  //   );
  //   setIsModalOpen(true);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const url = `${backendUrl}/api/research-type`;
  //   const successMessage = editingCategory
  //     ? "Cập nhật phân loại thành công"
  //     : "Thêm phân loại thành công";

  //   addUpdateData(
  //     url,
  //     editingCategory || newCategory,
  //     successMessage,
  //     fetchResearchActivityCategories,
  //     setNotification
  //   );

  //   setIsModalOpen(false);
  // };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
            <h2>Quản lý phân loại hoạt động nghiên cứu</h2>
            <Modal
              open={isModalOpen}
              onClose={handleCloseModal}
              aria-labelledby="add-researchType-modal-title"
              aria-describedby="add-researchType-modal-description"
            >
              <ResearchActivityCategoryForm
                // newCategory={newCategory}
                // setnewCategory={setnewCategory}
                // editingCategory={editingCategory}
                // setEditingCategory={setEditingCategory}
                // handleSubmit={handleSubmit}
                editingCategoryResearchType={editingCategoryResearchType}
                onClose={handleCloseModal}
              />
            </Modal>
            <ResearchActivityCategoriesTable
              researchTypes={researchTypes}
              researchActivityCategories={researchActivityCategories}
              handleAddCategory={handleAddCategory}
              editingCategoryResearchType={editingCategoryResearchType}
              setEditingCategoryResearchType={editingCategoryResearchType}
              // handleEditItem={handleEditResearchType}
              // openDeleteDialog={openDeleteDialog}
            />
          </Container>
        </Grid>
      </Grid>
      {/* <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onDelete={handleDeleteResearchType}
        itemToDelete={categoryToDelete}
        dataLabel="phân loại"
        itemName={categoryToDelete?.name}
      /> */}
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

export default ResearchActivityCategories;
