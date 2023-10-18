import React, { useState, useEffect } from "react";
import { Button, Grid, Modal, Snackbar, Alert, Container, Stack, Typography, Pagination, } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ResearchTopicForm from "../components/admin/ResearchTopicForm";
import ResearchTopicRegistrationForm from "../components/admin/ResearchTopicRegistrationForm";
import ResearchTopicSubmissionForm from "../components/admin/ResearchTopicSubmissionForm";
import DeleteConfirmationDialog from "../components/DeleteConfirmationDialog";
import ResearchRegistedTable from "../components/ResearchRegistedTable";
import DEFAULT_BACKEND_URL from "../config";
import fetchData, {
  fetchDataById,
  addUpdateData,
  deleteDataById,
} from "../utils/apiUtils";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Header from "../components/Header";
import { getRegisteredTopicsByUserId } from "../utils/registerUtils";

function ResearchsRegistrated() {
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
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [perPage, setPerPage] = useState(5);
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
  });

  const registeredTopicsByUserId = userData?.id
    ? getRegisteredTopicsByUserId(
        userData.id,
        researchTopicRegistrations,
        researchTopics
      )
    : [];
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

  //////hàm để tính số trang và cắt dữ liệu hiển thị trên trang hiện tại//////
  const totalPages = Math.ceil(registeredTopicsByUserId.length / perPage);
  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = registeredTopicsByUserId.slice(indexOfFirstItem, indexOfLastItem);

  //////hàm để thay đổi trang hiện tại//////
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const totalTopics = registeredTopicsByUserId.length; //biến để lưu trữ tổng số đề tài
  const topicsPerPage = currentItems.length; //biến để lưu trữ số đề tài đang hiển thị trên trang

  // Hiển thị giao diện
  return (
    <>
      <Header />
      <Container sx={{ paddingBottom: "40px" }}>
        <h2>Danh sách đề tài đã đăng ký</h2>

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
            isUser={true}
            newResearchTopic={newResearchTopic}
            setNewResearchTopic={setNewResearchTopic}
            editingResearchTopic={editingResearchTopic}
            setEditingResearchTopic={setEditingResearchTopic}
            newResearchTopicRegistration={newResearchTopicRegistration}
            setNewResearchTopicRegistration={setNewResearchTopicRegistration}
            editingResearchTopicRegistration={editingResearchTopicRegistration}
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
            isUser={true}
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

        <ResearchRegistedTable
          data={currentItems}
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
        />
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Stack
            direction="row"
            spacing={1}
            style={{ marginBottom: "5px", justifyContent: "flex-end" }}
          >
            <Typography
              variant="body1"
              style={{ marginTop: "5px", display: "inline-block" }}
            >
              Rows per page:&nbsp;
            </Typography>
            {/* lựa chọn số item được hiển thị */}
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
                marginRight: "15px",
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            {/* biểu thị tổng số đề tài và số đề tài đang hiển thị trên trang hiện tại */}
            <Typography
              variant="body1"
              style={{
                marginTop: "6px",
                fontSize: "15px",
                marginRight: "15px",
              }}
            >
              {`${indexOfFirstItem + 1} - ${
                indexOfFirstItem + topicsPerPage
              } of ${totalTopics}`}
            </Typography>
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
    </>
  );
}

export default ResearchsRegistrated;