import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Snackbar, Alert, Container, Typography } from "@mui/material";
import ResearchsRegistrationTable from "../../components/ResearchsRegistrationTable";
import DEFAULT_BACKEND_URL from "../../config";
import fetchData from "../../utils/apiUtils";
import addDataToRegister, {
  deleteDataRegister,
  isAlreadyRegistered,
  getRegisteredTopicsByUserId,
} from "../../utils/registerUtils";
import Header from "../../components/Header";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import RegisterConfirmationDialog from "../../components/RegisterConfirmationDialog";
import dayjs from "dayjs";

function ResearchActivities() {
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

    if (selectedList.length !== 0) {
      try {
        for (const selectedItem of selectedList) {
          if (selectedItem) {
            try {
              await fetchResearchTopics();
              await fetchResearchTopicRegistrations();

              // Kiểm tra xem người dùng đã đăng ký cho hoạt động và phân loại này chưa
              const alreadyRegistered = await isAlreadyRegistered(
                researchTopicRegistrations,
                researchTopics,
                userData.id,
                selectedItem.activityId,
                selectedItem.categoryId || null
              );
              console.log(alreadyRegistered);

              if (alreadyRegistered) {
                // Hiển thị thông báo lỗi và không thực hiện đăng ký mới
                setNotification({
                  type: "error",
                  message:
                    "Bạn đã đăng ký cho hoạt động và phân loại này trước đó.",
                });
                continue;
              }
              // Tạo đề tài nghiên cứu mới
              const newResearchTopic = {
                name: "Tên đề tài mới", // Thay đổi tên đề tài
                activity: selectedItem.activityId,
                category: selectedItem.categoryId || null,
                authors: [userData.id],
                approved_budget: 0,
                approved_hours: 0,
                completion_status: "in_progress",
                research_resources: [],
              };

              // Thêm mới đề tài nghiên cứu và lấy response
              const topicResponse = await addDataToRegister(
                urlTopic,
                newResearchTopic,
                successMessage,
                fetchResearchTopics,
                setNotification
              );

              if (topicResponse && topicResponse.id) {
                // Lấy ID của đề tài nghiên cứu mới được thêm vào
                const newTopicId = topicResponse.id;

                // Tạo đăng ký đề tài nghiên cứu mới
                const newResearchTopicRegistration = {
                  topic: newTopicId,
                  registrant: userData.id,
                  registered_date: dayjs().format("YYYY-MM-DD"),
                  assigned_role: null,
                  expected_budget: 0,
                  expected_hours: 0,
                  registration_approver: null,
                  registration_approved_date: null,
                  approval_status: "pending",
                };
                console.log(newResearchTopicRegistration);

                // Thêm mới phiếu đăng ký đề tài nghiên cứu và lấy response
                const topicRegistrationResponse = await addDataToRegister(
                  urlRegistration,
                  newResearchTopicRegistration,
                  successMessage,
                  fetchResearchTopicRegistrations,
                  setNotification
                );

                if (!topicRegistrationResponse) {
                  // Xử lý lỗi khi thêm mới phiếu đăng ký đề tài nghiên cứu
                  setNotification({
                    type: "error",
                    message: "Lỗi thêm mới phiếu đăng ký đề tài nghiên cứu",
                  });
                  // Xóa đề tài nghiên cứu nếu thất bại
                  deleteDataRegister(
                    `${backendUrl}/api/research-topic`,
                    newTopicId,
                    fetchResearchTopics
                  );
                }
              } else {
                // Xử lý lỗi khi thêm mới đề tài nghiên cứu
                setNotification({
                  type: "error",
                  message: "Lỗi thêm mới đề tài nghiên cứu",
                });
              }
            } catch (error) {
              // Xử lý lỗi trong quá trình thêm mới đề tài nghiên cứu hoặc phiếu đăng ký
              console.error(
                `Lỗi khi thêm mới đề tài nghiên cứu hoặc phiếu đăng ký: ${error.message}`
              );
            }
          }
        }
      } catch (error) {
        // Xử lý lỗi chung khi đăng ký đề tài nghiên cứu
        console.error(`Lỗi khi đăng ký đề tài nghiên cứu: ${error.message}`);
      } finally {
        closeRegisterDialog();
      }
    }
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

        {/* Chọn số lượng hoạt động đã chọn và tổng số giờ nghiên cứu */}
        <Typography
          variant="body1"
          style={{ float: "right", marginRight: "10px" }}
        >
          Số hoạt động đã chọn: {selectedList ? selectedList.length : 0} - Tổng
          số giờ nghiên cứu:
          {calculateTotalHours()}
        </Typography>

        {/* Bảng danh sách các hoạt động khoa học */}
        <ResearchsRegistrationTable
          data={dataList}
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

export default ResearchActivities;
