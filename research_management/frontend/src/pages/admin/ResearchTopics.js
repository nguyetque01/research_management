import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import { Button, Grid, Modal, Snackbar, Alert, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import IosShareIcon from "@mui/icons-material/IosShare";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import ResearchTopicAddEditForm from "../../components/admin/ResearchTopicAddEditForm";
import ResearchTopicForm from "../../components/admin/ResearchTopicForm";
import ResearchTopicRegistrationForm from "../../components/admin/ResearchTopicRegistrationForm";
import ResearchTopicSubmissionForm from "../../components/admin/ResearchTopicSubmissionForm";
import DeleteConfirmationDialog from "../../components/DeleteConfirmationDialog";
import ResearchTopicsTable from "../../components/admin/ResearchTopicsTable";
import DEFAULT_BACKEND_URL from "../../config";
import fetchData, {
  fetchDataById,
  addUpdateData,
  deleteDataById,
} from "../../utils/apiUtils";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

function ResearchTopics() {
  const backendUrl = DEFAULT_BACKEND_URL;
  const userData = useSelector((state) => state.user.userData);

  const defaultResearchTopic = {
    name: "Chưa nhập",
    activity: 1,
    category: 1,
    authors: [userData?.id],
    description: "",
    abstract: "",
    approved_budget: 0,
    approved_hours: 0,
    completion_status: "in_progress",
    research_resources: [],
  };
  const defaultResearchTopicRegistration = {
    topic: 1,
    registrant: userData?.id,
    registered_date: dayjs().format("YYYY-MM-DD"),
    expected_budget: 0,
    expected_hours: 0,
    approval_status: "pending",
    registration_approver: userData?.id,
    registration_approved_date: dayjs().format("YYYY-MM-DD"),
  };
  const defaultResearchTopicSubmission = {
    topic: 0,
    submission_date: dayjs().format("YYYY-MM-DD"),
    submission_approver: 1,
    submission_approved_date: dayjs().format("YYYY-MM-DD"),
    approval_status: "pending",
  };
  const [researchTopics, setResearchTopics] = useState([]);
  const [users, setUsers] = useState([]);
  const [academicProfiles, setAcademicProfiles] = useState([]);
  const [researchTypes, setResearchTypes] = useState([]);
  const [researchActivities, setResearchActivities] = useState([]);
  const [researchActivityDetails, setResearchActivityDetails] = useState([]);
  const [researchCategories, setResearchCategories] = useState([]);
  const [researchTopicRegistrations, setResearchTopicRegistrations] = useState(
    []
  );
  const [researchTopicSubmissions, setResearchTopicSubmissions] = useState([]);

  const [newResearchTopic, setNewResearchTopic] =
    useState(defaultResearchTopic);
  const [editingResearchTopic, setEditingResearchTopic] = useState(null);
  const [researchTopicToDelete, setResearchTopicToDelete] = useState(null);

  const [newResearchTopicRegistration, setNewResearchTopicRegistration] =
    useState(null);
  const [
    editingResearchTopicRegistration,
    setEditingResearchTopicRegistration,
  ] = useState(defaultResearchTopicRegistration);

  const [newResearchTopicSubmission, setNewResearchTopicSubmission] =
    useState(null);
  const [editingResearchTopicSubmission, setEditingResearchTopicSubmission] =
    useState(defaultResearchTopicSubmission);

  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
  });
  const [dataToExport, setDataToExport] = useState([]);

  // Gửi HTTP request để lấy danh sách đề tài từ backend
  const fetchResearchTopics = () =>
    fetchData(
      `${backendUrl}/api/research-topics/`,
      setResearchTopics,
      setNotification
    );

  const fetchResearchTopicRegistrations = () =>
    fetchData(
      `${backendUrl}/api/research-topic-registrations/`,
      setResearchTopicRegistrations,
      setNotification
    );

  const fetchResearchTopicSubmissions = () =>
    fetchData(
      `${backendUrl}/api/research-topic-submissions/`,
      setResearchTopicSubmissions,
      setNotification
    );

  // Sử dụng useEffect để tự động gọi hàm fetchResearchTopics khi component được tạo
  useEffect(() => {
    fetchResearchTopics();
    fetchResearchTopicRegistrations();
    fetchResearchTopicSubmissions();
    fetchData(
      `${backendUrl}/api/research-types/`,
      setResearchTypes,
      setNotification
    );
    fetchData(
      `${backendUrl}/api/research-activities/`,
      setResearchActivities,
      setNotification
    );
    fetchData(
      `${backendUrl}/api/research-activity-categories/`,
      setResearchCategories,
      setNotification
    );
    fetchData(
      `${backendUrl}/api/research-activity-details/`,
      setResearchActivityDetails,
      setNotification
    );
    fetchData(`${backendUrl}/api/users/`, setUsers, setNotification);
    fetchData(
      `${backendUrl}/api/academic-profiles/`,
      setAcademicProfiles,
      setNotification
    );
  }, []);

  // Mở modal hiển thị form thêm/sửa đề tài
  const handleOpenAddEditModel = () => {
    setIsAddEditModalOpen(true);
    setEditingResearchTopic(null);
    setNewResearchTopic(defaultResearchTopic);
  };

  // Đóng modal hiển thị form thêm/sửa đề tài
  const handleCloseAddEditModal = () => {
    setIsAddEditModalOpen(false);
  };

  // Mở modal hiển thị form đề tài
  const handleOpenTopicModel = () => {
    setIsTopicModalOpen(true);
    setEditingResearchTopic(null);
    setNewResearchTopic(defaultResearchTopic);
  };

  // Đóng modal hiển thị form đề tài
  const handleCloseTopicModal = () => {
    setIsTopicModalOpen(false);
  };

  // Mở modal hiển thị form đăng ký đề tài
  const handleOpenRegistrationModel = () => {
    setIsRegistrationModalOpen(true);
    setEditingResearchTopicRegistration(null);
    setNewResearchTopicRegistration(defaultResearchTopicRegistration);
  };

  // Đóng modal hiển thị form đăng ký đề tài
  const handleCloseRegistrationModal = () => {
    setIsRegistrationModalOpen(false);
  };

  // Mở modal hiển thị form nộp đề tài
  const handleOpenSubmissionModel = () => {
    setIsSubmissionModalOpen(true);
    setEditingResearchTopicSubmission(null);
    setNewResearchTopicSubmission(defaultResearchTopicSubmission);
  };

  // Đóng modal hiển thị form nộp đề tài
  const handleCloseSubmissionModal = () => {
    setIsSubmissionModalOpen(false);
  };

  // Mở dialog xác nhận xóa đề tài
  const openDeleteDialog = (researchTopic) => {
    setResearchTopicToDelete(researchTopic);
    setIsDeleteDialogOpen(true);
  };

  // Đóng dialog xác nhận xóa đề tài
  const closeDeleteDialog = () => {
    setResearchTopicToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  // Xử lý khi người dùng muốn xóa đề tài
  const handleDeleteResearchTopic = (researchTopicId) => {
    deleteDataById(
      `${backendUrl}/api/research-topic`,
      researchTopicId,
      setNotification,
      fetchResearchTopics
    );
    closeDeleteDialog();
  };

  // Xử lý khi người dùng muốn chỉnh sửa đề tài
  const handleEditItem = (researchTopicId) => {
    fetchDataById(
      `${backendUrl}/api/research-topic`,
      researchTopicId,
      setEditingResearchTopic,
      setNotification
    );
    setIsAddEditModalOpen(true);
  };

  const handleEditResearchTopic = (researchTopicId) => {
    fetchDataById(
      `${backendUrl}/api/research-topic`,
      researchTopicId,
      setEditingResearchTopic,
      setNotification
    );
    setIsTopicModalOpen(true);
  };

  const handleEditRegistration = (researchTopicId) => {
    fetchDataById(
      `${backendUrl}/api/research-topic`,
      researchTopicId,
      setEditingResearchTopic,
      setNotification
    );
    setIsRegistrationModalOpen(true);
  };

  const handleEditSubmission = (researchTopicId) => {
    fetchDataById(
      `${backendUrl}/api/research-topic`,
      researchTopicId,
      setEditingResearchTopic,
      setNotification
    );
    setIsSubmissionModalOpen(true);
  };

  const handleSubmitTopic = async (e) => {
    e.preventDefault();
    const url = `${backendUrl}/api/research-topic`;
    const successMessage = editingResearchTopic
      ? "Cập nhật đề tài thành công"
      : "Thêm đề tài thành công";

    addUpdateData(
      url,
      editingResearchTopic || newResearchTopic,
      successMessage,
      fetchResearchTopics,
      setNotification
    );

    setIsAddEditModalOpen(false);
    setIsRegistrationModalOpen(false);
    setIsTopicModalOpen(false);
    setIsSubmissionModalOpen(false);
  };

  const handleSubmitRegistration = async (e) => {
    e.preventDefault();
    const url = `${backendUrl}/api/research-topic-registration`;
    const successMessage = editingResearchTopicRegistration
      ? "Cập nhật thông tin đăng ký thành công"
      : "Thêm thông tin đăng ký thành công";

    addUpdateData(
      url,
      editingResearchTopicRegistration || newResearchTopicRegistration,
      successMessage,
      fetchResearchTopicRegistrations,
      setNotification
    );

    setIsRegistrationModalOpen(false);
  };

  const handleSubmitSubmission = async (e) => {
    e.preventDefault();
    const url = `${backendUrl}/api/research-topic-submission`;
    const successMessage = editingResearchTopicSubmission
      ? "Cập nhật thông tin đăng ký thành công"
      : "Thêm thông tin đăng ký thành công";

    addUpdateData(
      url,
      editingResearchTopicSubmission || newResearchTopicSubmission,
      successMessage,
      fetchResearchTopicSubmissions,
      setNotification
    );

    setIsSubmissionModalOpen(false);
  };

  const handleExportToExcel = () => {
    // Tạo một bảng mới với dữ liệu
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("ResearchTopics");

    // Thêm dữ liệu từ mảng dataToExport
    dataToExport.forEach((rowData, index) => {
      const rowNumber = index + 1;

      worksheet.addRow(rowData);

      // Cài đặt kiểu dữ liệu và định dạng cho các ô dữ liệu (nếu cần)
      // Ví dụ:
      worksheet.getCell(`C${rowNumber}`).alignment = {
        vertical: "middle",
        horizontal: "center",
      };
      // worksheet.getCell(`F${rowNumber}`).numFmt = "0.00%";
    });

    // Đặt kiểu dữ liệu và định dạng cho tiêu đề
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFADD8E6" },
    };
    worksheet.getRow(2).font = { bold: true };
    worksheet.getRow(2).alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.getRow(2).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFADD8E6" },
    };
    worksheet.getColumn(1).alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    // Merge cells from D1 to F1
    worksheet.mergeCells("D1:F1");
    worksheet.mergeCells("G1:K1");
    worksheet.mergeCells("A1:A2");
    worksheet.mergeCells("B1:B2");
    worksheet.mergeCells("C1:C2");

    // Thiết lập các kiểu dữ liệu cho các cột
    worksheet.getColumn(1).width = 5; // STT
    worksheet.getColumn(2).width = 20; // Họ và tên
    worksheet.getColumn(3).width = 15; // Chức vụ
    worksheet.getColumn(4).width = 25; // Hoạt động nghiên cứu KH & CN - Hoạt động
    worksheet.getColumn(5).width = 20; // Hoạt động nghiên cứu KH & CN - Phân loại
    worksheet.getColumn(6).width = 10; // Hoạt động nghiên cứu KH & CN - Số giờ
    worksheet.getColumn(7).width = 20; // Chi tiết thông tin đăng ký - Tên tác giả
    worksheet.getColumn(8).width = 15; // Chi tiết thông tin đăng ký - Vị trí tác giả
    worksheet.getColumn(9).width = 20; // Chi tiết thông tin đăng ký - Tên đề tài
    worksheet.getColumn(10).width = 15; // Chi tiết thông tin đăng ký - Số giờ dự kiến
    worksheet.getColumn(11).width = 15; // Chi tiết thông tin đăng ký - Kinh phí dự kiến

    // Lưu tệp Excel
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "research_topics_export.xlsx");
    });
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
            <h2>Danh sách đăng ký</h2>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenAddEditModel}
                sx={{ marginBottom: "24px" }}
                startIcon={<AddIcon />}
              >
                Thêm mới
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleExportToExcel}
                sx={{ marginBottom: "24px" }}
                startIcon={<IosShareIcon />}
              >
                Xuất Excel
              </Button>
            </div>
            <Modal
              open={isAddEditModalOpen}
              onClose={handleCloseAddEditModal}
              aria-labelledby="add-researchTopic-modal-title"
              aria-describedby="add-researchTopic-modal-description"
            >
              <ResearchTopicAddEditForm
                newResearchTopic={newResearchTopic}
                setNewResearchTopic={setNewResearchTopic}
                editingResearchTopic={editingResearchTopic}
                setEditingResearchTopic={setEditingResearchTopic}
                handleSubmit={handleSubmitTopic}
                onClose={handleCloseAddEditModal}
              />
            </Modal>

            <Modal
              open={isTopicModalOpen}
              onClose={handleCloseTopicModal}
              aria-labelledby="add-researchTopic-modal-title"
              aria-describedby="add-researchTopic-modal-description"
            >
              <ResearchTopicForm
                isUser={true}
                newResearchTopic={newResearchTopic}
                setNewResearchTopic={setNewResearchTopic}
                editingResearchTopic={editingResearchTopic}
                setEditingResearchTopic={setEditingResearchTopic}
                researchTypes={researchTypes}
                researchActivities={researchActivities}
                researchCategories={researchCategories}
                researchActivityDetails={researchActivityDetails}
                users={users}
                handleSubmit={handleSubmitTopic}
                onClose={handleCloseTopicModal}
              />
            </Modal>

            <Modal
              open={isRegistrationModalOpen}
              onClose={handleCloseRegistrationModal}
              aria-labelledby="add-researchTopic-modal-title"
              aria-describedby="add-researchTopic-modal-description"
            >
              <ResearchTopicRegistrationForm
                isUser={false}
                newResearchTopic={newResearchTopic}
                setNewResearchTopic={setNewResearchTopic}
                editingResearchTopic={editingResearchTopic}
                setEditingResearchTopic={setEditingResearchTopic}
                newResearchTopicRegistration={newResearchTopicRegistration}
                setNewResearchTopicRegistration={
                  setNewResearchTopicRegistration
                }
                editingResearchTopicRegistration={
                  editingResearchTopicRegistration
                }
                setEditingResearchTopicRegistration={
                  setEditingResearchTopicRegistration
                }
                researchTypes={researchTypes}
                researchActivities={researchActivities}
                researchCategories={researchCategories}
                researchActivityDetails={researchActivityDetails}
                users={users}
                handleSubmit={handleSubmitRegistration}
                onClose={handleCloseRegistrationModal}
              />
            </Modal>

            <Modal
              open={isSubmissionModalOpen}
              onClose={handleCloseSubmissionModal}
              aria-labelledby="add-researchTopic-modal-title"
              aria-describedby="add-researchTopic-modal-description"
            >
              <ResearchTopicSubmissionForm
                isUser={false}
                newResearchTopic={newResearchTopic}
                setNewResearchTopic={setNewResearchTopic}
                editingResearchTopic={editingResearchTopic}
                setEditingResearchTopic={setEditingResearchTopic}
                newResearchTopicSubmission={newResearchTopicSubmission}
                setNewResearchTopicSubmission={setNewResearchTopicSubmission}
                editingResearchTopicSubmission={editingResearchTopicSubmission}
                setEditingResearchTopicSubmission={
                  setEditingResearchTopicSubmission
                }
                researchTypes={researchTypes}
                researchActivities={researchActivities}
                researchCategories={researchCategories}
                researchActivityDetails={researchActivityDetails}
                users={users}
                handleSubmit={handleSubmitSubmission}
                onClose={handleCloseSubmissionModal}
              />
            </Modal>

            <ResearchTopicsTable
              data={researchTopics}
              users={users}
              academicProfiles={academicProfiles}
              researchActivities={researchActivities}
              researchActivityDetails={researchActivityDetails}
              researchCategories={researchCategories}
              researchTopicRegistrations={researchTopicRegistrations}
              researchTopicSubmissions={researchTopicSubmissions}
              handleEditItem={handleEditItem}
              handleEditResearchTopic={handleEditResearchTopic}
              handleEditRegistration={handleEditRegistration}
              handleEditSubmission={handleEditSubmission}
              openDeleteDialog={openDeleteDialog}
              setDataToExport={setDataToExport}
              dataToExport={dataToExport}
            />
          </Container>
        </Grid>
      </Grid>
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onDelete={handleDeleteResearchTopic}
        itemToDelete={researchTopicToDelete}
        dataLabel="đề tài"
        itemName={researchTopicToDelete?.name}
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

export default ResearchTopics;
