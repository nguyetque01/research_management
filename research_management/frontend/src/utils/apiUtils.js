import axios from "axios";
import { Navigate } from "react-router-dom";

/////////////////////////////////////////////////////////////////
// Lấy danh sách các đối tượng
const fetchData = async (url, setDataCallback, setNotificationCallback) => {
  try {
    const response = await axios.get(url);
    setDataCallback(response.data);
  } catch (error) {
    if (error.response) {
      // Nếu có phản hồi từ máy chủ, xử lý lỗi dựa trên mã trạng thái HTTP
      if (error.response.status === 404) {
        setNotificationCallback({
          type: "error",
          message: "Không tìm thấy đối tượng",
        });
      } else if (error.response.status === 401) {
        // Redirect đến trang đăng nhập
        return <Navigate to="/login" />;
      } else {
        // Xử lý các trường hợp lỗi khác
        setNotificationCallback({
          type: "error",
          message: "Lỗi không xác định",
        });
      }
    } else if (error.request) {
      // Nếu không có phản hồi từ máy chủ
      setNotificationCallback({
        type: "error",
        message: "Không thể kết nối đến máy chủ",
      });
    } else {
      // Xử lý lỗi khác không liên quan đến mạng hoặc máy chủ
      setNotificationCallback({
        type: "error",
        message: "Lỗi không xác định",
      });
    }
    console.error(`Error fetching data from ${url}:`, error);
  }
};

/////////////////////////////////////////////////////////////////
// Lấy thông tin của một đối tượng dựa trên ID
export const fetchDataById = async (
  apiEndpoint,
  objectId,
  setData,
  setNotification
) => {
  try {
    const response = await axios.get(`${apiEndpoint}/${objectId}/`);
    setData(response.data);
  } catch (error) {
    console.error(
      `Error fetching data from ${apiEndpoint} by ID ${objectId}:`,
      error
    );
    if (error.response) {
      if (error.response.status === 404) {
        setNotification({
          type: "error",
          message: "Không tìm thấy dữ liệu",
        });
      } else if (error.response.status === 401) {
        // Xử lý lỗi xác thực
        setNotification({
          type: "error",
          message: "Bạn cần đăng nhập để thực hiện thao tác này.",
        });
      } else {
        // Xử lý các trường hợp lỗi khác
        setNotification({
          type: "error",
          message: "Lỗi không xác định",
        });
      }
    } else {
      // Xử lý lỗi không kết nối đến máy chủ hoặc mạng
      setNotification({
        type: "error",
        message: "Không thể kết nối đến máy chủ.",
      });
    }
  }
};

/////////////////////////////////////////////////////////////////
// Thêm hoặc cập nhật một đối tượng
export const addUpdateData = async (
  url,
  data,
  successMessage,
  fetchCallback,
  setNotificationCallback
) => {
  try {
    console.log(data);

    if (data.id) {
      // Nếu đang cập nhật dữ liệu (có id)
      await axios.put(`${url}/${data.id}/`, data);
    } else {
      // Nếu đang thêm dữ liệu mới
      await axios.post(`${url}/`, data);
    }
    setNotificationCallback({
      type: "success",
      message: successMessage,
    });
    fetchCallback(); // Gọi hàm fetchCallback để cập nhật danh sách dữ liệu sau khi thêm/cập nhật thành công
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        // Lỗi dữ liệu không hợp lệ
        setNotificationCallback({
          type: "error",
          message: "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.",
        });
      } else if (error.response.status === 401) {
        // Lỗi xác thực
        setNotificationCallback({
          type: "error",
          message: "Bạn cần đăng nhập để thực hiện thao tác này.",
        });
      } else {
        // Xử lý lỗi khác
        setNotificationCallback({
          type: "error",
          message: "Lỗi không xác định",
        });
      }
    } else {
      // Lỗi không kết nối đến máy chủ hoặc mạng
      setNotificationCallback({
        type: "error",
        message: "Không thể kết nối đến máy chủ.",
      });
    }
    console.error("Error submitting data:", error);
  }
};

export const addData = async (
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
          "Error submitting data: Unexpected HTTP status code",
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
          "Error submitting data: Unexpected HTTP status code",
          error.response.status
        );
      }
    } else {
      // Lỗi không kết nối đến máy chủ hoặc mạng
      setNotification({
        type: "error",
        message: "Không thể kết nối đến máy chủ.",
      });
      console.error("Error submitting data:", error.message);
    }
    return null;
  }
};

/////////////////////////////////////////////////////////////////
// Xóa một đối tượng dựa trên ID
export const deleteDataById = async (
  apiEndpoint,
  objectId,
  setNotification,
  fetchData
) => {
  try {
    await axios.delete(`${apiEndpoint}/${objectId}/`);
    setNotification({
      type: "success",
      message: "Xóa dữ liệu thành công",
    });
    fetchData(); // Gọi lại hàm fetchData để cập nhật danh sách dữ liệu sau khi xóa
  } catch (error) {
    console.error(
      `Error deleting data from ${apiEndpoint} by ID ${objectId}:`,
      error
    );
    setNotification({
      type: "error",
      message: "Xóa dữ liệu thất bại",
    });
  }
};

export default fetchData;
