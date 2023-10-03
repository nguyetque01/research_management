import axios from "axios";

// Hàm thêm dữ liệu đăng ký
const addDataToRegister = async (
  url,
  data,
  successMessage,
  fetchDataFunction,
  setNotification,
  setResponse
) => {
  try {
    if (data.id) {
      setNotification({
        type: "error",
        message: "Dữ liệu đã tồn tại",
      });
    } else {
      // Nếu đang thêm dữ liệu mới
      const response = await axios.post(`${url}/`, data);

      if (response.status === 201) {
        // Kiểm tra nếu yêu cầu thành công (status code 201 Created)
        const responseData = response.data; // Lấy dữ liệu từ response
        setNotification({
          type: "success",
          message: successMessage,
        });

        // Gọi hàm để tải lại dữ liệu (nếu cần)
        if (fetchDataFunction) {
          fetchDataFunction();
        }

        // Gán response data (nếu cần)
        if (setResponse) {
          setResponse(responseData);
        }

        return responseData; // Trả về response data
      } else {
        // Xử lý lỗi HTTP khác (nếu cần)
        setNotification({
          type: "error",
          message: "Lỗi không xác định",
        });
        console.error(
          "Lỗi khi gửi dữ liệu: Mã trạng thái HTTP không mong đợi",
          response.status
        );
        return null;
      }
    }
  } catch (error) {
    // Xử lý lỗi trong quá trình gửi yêu cầu
    if (error.response) {
      if (error.response.status === 400) {
        // Lỗi dữ liệu không hợp lệ
        setNotification({
          type: "error",
          message: "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.",
        });
      } else if (error.response.status === 401) {
        // Lỗi xác thực
        setNotification({
          type: "error",
          message: "Bạn cần đăng nhập để thực hiện thao tác này.",
        });
      } else {
        // Xử lý lỗi HTTP khác (nếu cần)
        setNotification({
          type: "error",
          message: "Lỗi không xác định",
        });
        console.error(
          "Lỗi khi gửi dữ liệu: Mã trạng thái HTTP không mong đợi",
          error.response.status
        );
      }
    } else {
      // Lỗi không kết nối đến máy chủ hoặc mạng
      setNotification({
        type: "error",
        message: "Không thể kết nối đến máy chủ.",
      });
      console.error("Lỗi khi gửi dữ liệu:", error.message);
    }
    return null;
  }
};

// Hàm xóa dữ liệu khi đăng ký không thành công
export const deleteDataRegister = async (apiEndpoint, objectId, fetchData) => {
  try {
    await axios.delete(`${apiEndpoint}/${objectId}/`);
    fetchData(); // Gọi lại hàm fetchData để cập nhật danh sách dữ liệu sau khi xóa
  } catch (error) {
    console.error(
      `Error deleting data from ${apiEndpoint} by ID ${objectId}:`,
      error
    );
  }
};

// Hàm kiểm tra xem người dùng đã đăng ký cho cặp hoạt động và phân loại cụ thể chưa
export const isAlreadyRegistered = async (
  researchTopicRegistrations,
  researchTopics,
  registrantId,
  activityId,
  categoryId
) => {
  for (const registration of researchTopicRegistrations) {
    if (registration.registrant === registrantId) {
      const topic = researchTopics.find(
        (topic) => topic.id === registration.topic
      );
      if (topic) {
        if (topic.activity === activityId) {
          if (
            categoryId === null ||
            (topic.category && topic.category === categoryId)
          ) {
            return true;
          }
        }
      }
    }
  }
  return false;
};

// Lấy danh sách đề tài đã đăng ký của user
export const getRegisteredTopicsByUserId = (
  userId,
  researchTopicRegistrations,
  researchTopics
) => {
  let result = [];
  for (const registration of researchTopicRegistrations) {
    if (registration.registrant === userId) {
      const topic = researchTopics.find(
        (topic) => topic.id === registration.topic
      );
      result.push(topic);
    }
  }
  return result;
};

export default addDataToRegister;
