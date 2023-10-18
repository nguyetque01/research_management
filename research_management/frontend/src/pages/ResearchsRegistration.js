import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Snackbar,
  Alert,
  Container,
  Typography,
  Stack,
  Pagination,
  Divider,
  Paper,
  TextField,
} from "@mui/material";
import ResearchsRegistrationTable from "../components/ResearchsRegistrationTable";
import DEFAULT_BACKEND_URL from "../config";
import fetchData from "../utils/apiUtils";
import addDataToRegister, {
  deleteDataRegister,
  isAlreadyRegistered,
  getRegisteredTopicsByUserId,
} from "../utils/registerUtils";
import Header from "../components/Header";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import RegisterConfirmationDialog from "../components/RegisterConfirmationDialog";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

function ResearchsRegistration() {
  const navigate = useNavigate();

  const backendUrl = DEFAULT_BACKEND_URL;
  const pageTitle = "Đăng ký hoạt động nghiên cứu khoa học";
  const dataLabel = "hoạt động";
  const userData = useSelector((state) => state.user.userData);
  const [dataList, setDataList] = useState([]);
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
  const [researchTopics, setResearchTopics] = useState([]);
  const [researchTopicRegistrations, setResearchTopicRegistrations] = useState(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  // Danh sách item đã chọn
  const [selectedList, setSelectedList] = useState([]);
  // Danh sách đã đăng ký theo user
  const [registeredListByUser, setRegisteredListByUser] = useState([]);

  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  // const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [perPage, setPerPage] = useState(5); // Số lượng dữ liệu hiển thị trên mỗi trang
  const [searchQuery, setSearchQuery] = useState("");

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

  async function fetchResearchTopics() {
    try {
      await fetchData(
        `${backendUrl}/api/research-topics/`,
        setResearchTopics,
        setNotification
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchResearchTopicRegistrations() {
    try {
      await fetchData(
        `${backendUrl}/api/research-topic-registrations/`,
        setResearchTopicRegistrations,
        setNotification
      );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
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
          fetchDataList(),
          fetchResearchTopics(),
          fetchResearchTopicRegistrations(),
        ]);
      } catch (error) {
        console.log(error);
      }
      const registered = getRegisteredTopicsByUserId(
        userData?.id,
        researchTopicRegistrations,
        researchTopics
      );
      setRegisteredListByUser(registered);
      console.log(userData);
      console.log(registeredListByUser);
      setIsLoading(false);
    };
    fetchAllData();
  }, []);

  /////////////////// Các chức năng trên giao diện /////////////////////////

  //////hàm để tính số trang và cắt dữ liệu hiển thị trên trang hiện tại//////
  const totalPages = Math.ceil(dataList.length / perPage);
  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = dataList.slice(indexOfFirstItem, indexOfLastItem);

  //////hàm để thay đổi trang hiện tại//////
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const totalTopics = dataList.length; //biến để lưu trữ tổng số đề tài
  const topicsPerPage = currentItems.length; //biến để lưu trữ số đề tài đang hiển thị trên trang

  ////// Xử lý chọn hoạt động và phân loại //////
  const handleCheckboxChange = (activityId, categoryId = 0) => {
    const selectedItem = { activityId, categoryId }; // Sử dụng property shorthand để tạo đối tượng
    // Kiểm tra xem item đã được chọn hay chưa
    if (
      selectedList.some(
        (item) =>
          item.activityId === activityId && item.categoryId === categoryId
      )
    ) {
      // Nếu đã chọn, loại bỏ nó khỏi danh sách
      setSelectedList(
        selectedList.filter(
          (item) =>
            item.activityId !== activityId || item.categoryId !== categoryId
        )
      );
    } else {
      // Nếu chưa chọn, thêm vào danh sách
      setSelectedList([...selectedList, selectedItem]);
    }
  };

  ////// Tính tổng số giờ nghiên cứu //////
  function calculateTotalHours() {
    let totalHours = 0;

    selectedList.forEach((selectedItem) => {
      const { activityId, categoryId } = selectedItem;

      // Tìm hoạt động đã chọn trong danh sách data
      const selectedActivity = dataList.find(
        (activity) => activity.id === activityId
      );

      if (selectedActivity) {
        // Kiểm tra hoạt động có phân loại hay không
        if (categoryId === 0) {
          // Hoạt động không có phân loại, cộng trực tiếp số giờ của nó
          totalHours += selectedActivity.total_hours;
        } else {
          // Hoạt động có phân loại, tìm chi tiết tương ứng
          const detail = researchActivityDetails.find(
            (detail) =>
              detail.category === categoryId && detail.activity === activityId
          );

          if (detail) {
            // Cộng thêm số giờ từ chi tiết
            totalHours += detail.total_hours;
          }
        }
      }
    });

    return totalHours;
  }

  //////Xử lý tìm kiếm //////
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    const searchTerms = searchQuery.split(/[ ,]+/);

    const filteredProjects = dataList.filter((project) => {
      const nameMatch = searchTerms.some((term) =>
        project.name.toLowerCase().includes(term.toLowerCase())
      );

      return nameMatch;
    });

    setCurrentPage(1);
    setDataList(filteredProjects);
  };

  /////////////////// Dialog Đăng Ký /////////////////////////

  // Mở dialog xác nhận đăng ký
  const openRegisterDialog = () => {
    // setDataToRegister(data);
    setIsRegisterDialogOpen(true);
  };

  // Đóng dialog xác nhận đăng ký
  const closeRegisterDialog = () => {
    // setDataToRegister(null);
    setIsRegisterDialogOpen(false);
  };

  /////////////////// Xử lý đăng ký /////////////////////////

  const handleRegister = async () => {
    const urlTopic = `${backendUrl}/api/research-topic`;
    const urlRegistration = `${backendUrl}/api/research-topic-registration`;
    const successMessage = "Đăng ký thành công";
    let allSuccessful = true;

    try {
      if (selectedList.length === 0) {
        return;
      }

      for (const selectedItem of selectedList) {
        if (!selectedItem) {
          continue;
        }

        try {
          await fetchResearchTopics();
          await fetchResearchTopicRegistrations();

          const alreadyRegistered = await isAlreadyRegistered(
            researchTopicRegistrations,
            researchTopics,
            userData.id,
            selectedItem.activityId,
            selectedItem.categoryId || null
          );

          console.log(alreadyRegistered);

          if (alreadyRegistered) {
            setNotification({
              type: "error",
              message:
                "Bạn đã đăng ký cho hoạt động và phân loại này trước đó.",
            });
            continue;
          }

          const newResearchTopic = {
            name: "Chưa nhập",
            activity: selectedItem.activityId,
            category: selectedItem.categoryId || null,
            authors: [userData.id],
            approved_budget: 0,
            approved_hours: 0,
            completion_status: "in_progress",
            research_resources: [],
          };

          const topicResponse = await addDataToRegister(
            urlTopic,
            newResearchTopic,
            successMessage,
            fetchResearchTopics,
            setNotification
          );

          if (topicResponse && topicResponse.id) {
            const newTopicId = topicResponse.id;

            const newResearchTopicRegistration = {
              topic: newTopicId,
              registrant: userData.id,
              registered_date: dayjs().format("YYYY-MM-DD"),
              assigned_role: null,
              author_position: "Vị trí 1",
              expected_budget: 0,
              expected_hours: 0,
              registration_approver: null,
              registration_approved_date: null,
              approval_status: "pending",
            };

            console.log(newResearchTopicRegistration);

            const topicRegistrationResponse = await addDataToRegister(
              urlRegistration,
              newResearchTopicRegistration,
              successMessage,
              fetchResearchTopicRegistrations,
              setNotification
            );

            if (!topicRegistrationResponse) {
              setNotification({
                type: "error",
                message: "Lỗi thêm mới phiếu đăng ký đề tài nghiên cứu",
              });

              deleteDataRegister(
                `${backendUrl}/api/research-topic`,
                newTopicId,
                fetchResearchTopics
              );
              allSuccessful = false;
            }
          } else {
            setNotification({
              type: "error",
              message: "Lỗi thêm mới đề tài nghiên cứu",
            });
            allSuccessful = false;
          }
        } catch (error) {
          console.error(
            `Lỗi khi thêm mới đề tài nghiên cứu hoặc phiếu đăng ký: ${error.message}`
          );
          allSuccessful = false;
        }
      }
    } catch (error) {
      console.error(`Lỗi khi đăng ký đề tài nghiên cứu: ${error.message}`);
      allSuccessful = false;
    } finally {
      closeRegisterDialog();
    }

    // if (allSuccessful) {
    //   navigate("/research-activities/registrated");
    // }
  };

  ///////////////////////////////////////////////////////////////////////////

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Hiển thị giao diện
  return (
    <div>
      <Header />
      <Container sx={{ paddingBottom: "40px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#333",
            textTransform: "uppercase",
            borderBottom: "1px solid #777",
            padding: "10px",
            textAlign: "center",
          }}
        >
          {pageTitle}
        </h2>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            marginTop: "20px",
          }}
        >
          <TextField
            label="Tìm kiếm các hoạt động nghiên cứu"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ flex: 1, height: "30px", marginBottom: "10px" }}
          />
          {/* dấu cách gạch đứng*/}
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            style={{ width: "150px", height: "38px", textAlign: "center" }}
          >
            Tìm kiếm
          </Button>
        </Paper>

        {/* Chọn số lượng hoạt động đã chọn và tổng số giờ nghiên cứu */}
        <Typography
          variant="body1"
          style={{ float: "right", marginRight: "10px", marginTop: "20px" }}
        >
          Số hoạt động đã chọn: {selectedList ? selectedList.length : 0} - Tổng
          số giờ nghiên cứu:
          {calculateTotalHours()}
        </Typography>

        {/* Bảng danh sách các hoạt động khoa học */}
        <ResearchsRegistrationTable
          data={currentItems}
          academicYears={academicYears}
          users={users}
          units={units}
          leadUnits={leadUnits}
          levels={levels}
          researchTypes={researchTypes}
          categories={categories}
          researchActivityDetails={researchActivityDetails}
          handleCheckboxChange={handleCheckboxChange}
          registeredListByUser={registeredListByUser}
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
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "24px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={openRegisterDialog}
            startIcon={<AppRegistrationIcon />}
          >
            Đăng ký
          </Button>
        </div>
      </Container>

      <RegisterConfirmationDialog
        isOpen={isRegisterDialogOpen}
        onClose={closeRegisterDialog}
        onRegister={handleRegister}
        // itemToRegister={dataToRegister}
        dataLabel={dataLabel}
        // itemName={dataToRegister?.name}
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

export default ResearchsRegistration;
