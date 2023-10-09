import React, { useState, useEffect, forwardRef } from "react";
import { 
Button, 
Grid, 
Modal, 
Snackbar, 
Alert, 
Container,
Stack,
Typography,
Select,
Pagination, 
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import DeleteConfirmationDialog from "../../components/DeleteConfirmationDialog";
import ResearchActivitiesTable from "../../components/admin/ResearchActivitiesTable";
import ResearchActivityForm from "../../components/admin/ResearchActivityForm";
import DEFAULT_BACKEND_URL from "../../config";
import fetchData, {
  fetchDataById,
  addUpdateData,
  deleteDataById,
} from "../../utils/apiUtils";

function ResearchActivities() {
  // Khai báo các biến state
  const backendUrl = DEFAULT_BACKEND_URL;
  const pageTitle = "Quản lý hoạt động nghiên cứu khoa học";
  const dataLabel = "hoạt động";
  const defaultData = {
    name: "",
    academic_year: "",
    level: "",
    lead_unit: "",
    research_type: "",
    total_hours: "",
    unit: "",
    notes: "",
  };
  const [dataList, setDataList] = useState([]);
  const [newData, setNewData] = useState(defaultData);
  const [editingData, setEditingData] = useState(null);
  const [dataToDelete, setDataToDelete] = useState(null);
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
  });
  const [academicYears, setAcademicYears] = useState([]);
  const [users, setUsers] = useState([]);
  const [units, setUnits] = useState([]);
  const [leadUnits, setLeadUnits] = useState([]);
  const [levels, setLevels] = useState([]);
  const [researchTypes, setResearchTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [researchActivityDetails, setResearchActivityDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [perPage, setPerPage] = useState(10); // Số lượng dữ liệu hiển thị trên mỗi trang

  // Gửi HTTP request để lấy danh sách data từ backend
  async function fetchDataList() {
    try {
      await fetchData(
        `${backendUrl}/api/research-activities/`,
        setDataList,
        setNotification
      );
    } catch (error) {
      console.log(error);
    }
  }

  // Khi component được tạo hoặc cập nhật
  useEffect(() => {
    // Hàm fetch tất cả dữ liệu từ API
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        // Sử dụng Promise.all để đợi cho tất cả các cuộc gọi bất đồng bộ hoàn thành
        await Promise.all([
          fetchDataList(),
          fetchData(`${backendUrl}/api/academic-years/`, setAcademicYears),
          fetchData(`${backendUrl}/api/units/`, setUnits),
          fetchData(`${backendUrl}/api/lead-units/`, setLeadUnits),
          fetchData(`${backendUrl}/api/levels/`, setLevels),
          fetchData(`${backendUrl}/api/research-types/`, setResearchTypes),
          fetchData(`${backendUrl}/api/users/`, setUsers),
          fetchData(
            `${backendUrl}/api/research-activity-categories/`,
            setCategories
          ),
          fetchData(
            `${backendUrl}/api/research-activity-details/`,
            setResearchActivityDetails
          ),
        ]);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchAllData();
  }, []);

  // Mở modal hiển thị form thêm/sửa data
  const handleOpenModel = () => {
    setIsDataModalOpen(true);
    setEditingData(null);
    setNewData(defaultData);
  };

  // Đóng modal hiển thị form thêm/sửa data
  const handleCloseModal = () => {
    setIsDataModalOpen(false);
  };

  // Mở dialog xác nhận xóa data
  const openDeleteDialog = (data) => {
    setDataToDelete(data);
    setIsDeleteDialogOpen(true);
  };

  // Đóng dialog xác nhận xóa data
  const closeDeleteDialog = () => {
    setDataToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  // Xử lý khi người dùng muốn xóa data
  const handleDeleteData = (dataId) => {
    deleteDataById(
      `${backendUrl}/api/research-activity`,
      dataId,
      setNotification,
      fetchDataList
    );
    closeDeleteDialog();
  };

  // Xử lý khi người dùng muốn chỉnh sửa data
  const handleEditData = (dataId) => {
    fetchDataById(
      `${backendUrl}/api/research-activity`,
      dataId,
      setEditingData,
      setNotification
    );
    setIsDataModalOpen(true);
  };

  // Xử lý khi người dùng gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${backendUrl}/api/research-activity`;
    const successMessage = editingData
      ? `Cập nhật ${dataLabel} thành công`
      : `Thêm ${dataLabel} thành công`;

    addUpdateData(
      url,
      editingData || defaultData,
      successMessage,
      fetchDataList,
      setNotification
    );

    setIsDataModalOpen(false);
  };

  const ForwardedResearchActivityForm = forwardRef((props, ref) => (
    <ResearchActivityForm {...props} ref={ref} />
  ));

  //////hàm để thay đổi trang hiện tại//////
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  //////hàm để tính số trang và cắt dữ liệu hiển thị trên trang hiện tại//////
  const totalPages = Math.ceil(dataList.length / perPage);
  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = dataList.slice(indexOfFirstItem, indexOfLastItem);

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
          <AdminHeader title={pageTitle} />
          <Container>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#333",
                textTransform: "uppercase",
                borderBottom: "1px solid #777",
                padding: "10px",
              }}
            >
              {pageTitle}
            </h2>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModel}
              sx={{ marginBottom: "24px" }}
              startIcon={<AddIcon />}
            >
              Thêm {dataLabel}
            </Button>
            <Modal
              open={isDataModalOpen}
              onClose={handleCloseModal}
              aria-labelledby="add-data-modal-title"
              aria-describedby="add-data-modal-description"
            >
              <ForwardedResearchActivityForm
                newData={newData}
                setNewData={setNewData}
                editingData={editingData}
                setEditingData={setEditingData}
                handleSubmit={handleSubmit}
                onClose={handleCloseModal}
                academicYears={academicYears}
                users={users}
                units={units}
                leadUnits={leadUnits}
                levels={levels}
                researchTypes={researchTypes}
                categories={categories}
                researchActivityDetails={researchActivityDetails}
              />
            </Modal>
            <ResearchActivitiesTable
              data={currentItems}
              handleEditItem={handleEditData}
              openDeleteDialog={openDeleteDialog}
              academicYears={academicYears}
              users={users}
              units={units}
              leadUnits={leadUnits}
              levels={levels}
              researchTypes={researchTypes}
              categories={categories}
              researchActivityDetails={researchActivityDetails}
              setCategories={setCategories}
            />
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <Stack direction="row" spacing={1} style={{ marginBottom: "5px", justifyContent: "flex-end" }}>
                <Typography variant="body1" style={{ marginTop: "5px", display: "inline-block" }}>
                  Rows per page:&nbsp;
                </Typography>{/* lựa chọn số item được hiển thị */}
                  <select
                    value={perPage}
                    onChange={(e) => setPerPage(parseInt(e.target.value))}
                    style={{
                    padding: "5px", 
                    border: "none", 
                    borderRadius: "4px",
                    height: "30px",
                    marginTop: "2px",
                    fontSize: "15px",
                    marginRight:"15px"
                    }}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                  {/* Chuyển trang */}
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                    showFirstButton
                    showLastButton
                  />
              </Stack>
            </div>
          </Container>
        </Grid>
      </Grid>
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onDelete={handleDeleteData}
        itemToDelete={dataToDelete}
        dataLabel={dataLabel}
        itemName={dataToDelete?.name}
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

export default ResearchActivities;
