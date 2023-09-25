import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import DEFAULT_BACKEND_URL from "../config";
import {
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Grid,
  Button,
  Container,
  Checkbox,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem, // Thêm Checkbox từ @mui/material
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Header from "../components/Header";
import Footer from "../components/Footer";
import status from "../data/status";
import levels from "../data/levels";
import dayjs from "dayjs";

const NO_RESEARCH_IMAGE = require("../assets/img/research.webp");

function ResearchTopics() {
  const backendUrl = DEFAULT_BACKEND_URL;
  const [researchTopics, setResearchTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedItemCount, setSelectedItemCount] = useState(0); // Thêm state cho số lượng item đã chọn
  const [selectAll, setSelectAll] = useState(false);
  const [totalResearchHours, setTotalStudyHours] = useState(0);
  const [sortByColumn, setSortByColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
  });

  // Gửi HTTP request để lấy danh sách đề tài từ backend
  async function fetchTopics() {
    try {
      const response = await axios.get(`${backendUrl}/api/research-topics/`);
      setResearchTopics(response.data);
    } catch (error) {
      if (error.response) {
        // Nếu có phản hồi từ máy chủ, xử lý lỗi dựa trên mã trạng thái HTTP
        if (error.response.status === 404) {
          setNotification({
            type: "error",
            message: "Không tìm thấy đề tài",
          });
        } else if (error.response.status === 401) {
          // Redirect đến trang đăng nhập
          return <Navigate to="/login" />;
        } else {
          // Xử lý các trường hợp lỗi khác
          setNotification({
            type: "error",
            message: "Lỗi không xác định",
          });
        }
      } else if (error.request) {
        // Nếu không có phản hồi từ máy chủ
        setNotification({
          type: "error",
          message: "Không thể kết nối đến máy chủ",
        });
      } else {
        // Xử lý lỗi khác không liên quan đến mạng hoặc máy chủ
        setNotification({
          type: "error",
          message: "Lỗi không xác định",
        });
      }
      console.error("Error fetching research topics:", error);
    }
  }

  // Sử dụng useEffect để tự động gọi hàm fetchTopics khi component được tạo
  useEffect(() => {
    fetchTopics();
    setSelectedHourRange("all");
  }, []);

  function calculateExecutionTime(startDate, endDate) {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const months = end.diff(start, "month");
    return months;
  }

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    // Thiết lập trang hiện tại về 1 khi thay đổi giá trị tìm kiếm
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset lại trang hiện tại về 1 khi thay đổi số lượng danh sách trên mỗi trang
  };

  const handleSelectAllChange = () => {
    const updatedTopics = [...researchTopics];
    const selectAllValue = !selectAll;

    updatedTopics.forEach((topic) => {
      topic.selected = selectAllValue;
    });

    setResearchTopics(updatedTopics);
    setSelectAll(selectAllValue);

    // Tính tổng số giờ nghiên cứu
    const selectedCount = selectAllValue ? updatedTopics.length : 0;
    const totalResearchHours = selectAllValue
      ? updatedTopics.reduce((total, topic) => total + topic.research_hours, 0)
      : 0;

    setSelectedItemCount(selectedCount);
    setTotalStudyHours(totalResearchHours);
  };

  // Xử lý khi checkbox thay đổi
  const handleCheckboxChange = (index) => {
    const updatedItems = filteredTopics?.length
      ? [...filteredTopics]
      : [...researchTopics];

    const topic = updatedItems[index];

    if (topic) {
      // Kiểm tra xem topic tồn tại
      topic.selected = !topic.selected;

      // Cập nhật danh sách các chủ đề đã lọc
      setFilteredTopics([...updatedItems]);

      // Tính tổng số giờ nghiên cứu và kiểm tra tất cả checkbox đã được chọn
      const selectedCount = updatedItems.filter(
        (topic) => topic.selected
      ).length;
      const totalResearchHours = updatedItems
        .filter((topic) => topic.selected)
        .reduce((total, topic) => total + topic.research_hours, 0);

      setSelectedItemCount(selectedCount);
      setTotalStudyHours(totalResearchHours);

      // Kiểm tra nếu tất cả các checkbox đã được chọn
      const allSelected = updatedItems.every((topic) => topic.selected);
      setSelectAll(allSelected);
    }
  };

  const handleSortByColumn = (column) => {
    if (column === sortByColumn) {
      // Đảo ngược hướng sắp xếp nếu cột đã được sắp xếp
      const sortedTopics = [...researchTopics].reverse();
      setResearchTopics(sortedTopics);
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Sắp xếp danh sách theo cột mới và đặt cột và hướng sắp xếp
      const sortedTopics = [...researchTopics].sort((a, b) => {
        if (column === "research_hours") {
          // Sắp xếp theo số giờ nghiên cứu
          return a.research_hours - b.research_hours;
        } else if (column === "name") {
          // Sắp xếp theo tên đề tài
          return a.name.localeCompare(b.name);
        } else if (column === "category") {
          // Sắp xếp theo danh mục
          return a.category.localeCompare(b.category);
        } else {
          // Các trường hợp khác, bạn có thể thêm logic sắp xếp cho các trường khác ở đây
          return 0;
        }
      });
      setResearchTopics(sortedTopics);
      setSortByColumn(column);
      setSortOrder("asc"); // Mặc định sắp xếp theo thứ tự tăng dần
    }
  };

  // Xử lý khi nút "Đăng ký" được nhấn
  const handleRegistration = () => {
    const selectedTopics = researchTopics.filter((topic) => topic.selected);

    // Kiểm tra xem có ít nhất một đề tài được chọn
    if (selectedTopics.length === 0) {
      alert("Vui lòng chọn ít nhất một đề tài để đăng ký.");
      return;
    }

    // Gửi yêu cầu đăng ký lên API
    const registrationData = {
      selectedTopics: selectedTopics.map((topic) => topic.id),
    };
    fetch("http://localhost:8000/api/registration/", {
      method: "POST",
      body: JSON.stringify(registrationData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Đăng ký thành công!") {
          // Đăng ký thành công, thực hiện các hành động cần thiết
          alert("Đăng ký đề tài thành công!");
          // Cập nhật trạng thái đã chọn của các đề tài
          const updatedTopics = researchTopics.map((topic) => ({
            ...topic,
            selected: false,
          }));
          setResearchTopics(updatedTopics);
        } else {
          // Đăng ký thất bại, xử lý lỗi
          alert("Đăng ký đề tài thất bại. Vui lòng thử lại sau.");
        }
      })
      .catch((error) => {
        // Xử lý lỗi khi không thể kết nối tới API
        alert("Có lỗi xảy ra khi kết nối đến máy chủ.");
      });
  };

  const filteredItems = researchTopics.filter((topic) =>
    topic.topic_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const pageNumbers = [];

  const maxDisplayedPages = 5; // Số trang tối đa được hiển thị
  const maxDisplayedPagesHalf = Math.floor(maxDisplayedPages / 2);

  if (totalPages <= maxDisplayedPages) {
    // Hiển thị tất cả các trang nếu tổng số trang ít hơn hoặc bằng số trang tối đa được hiển thị
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // Xác định trang bắt đầu và trang kết thúc để hiển thị
    let startPage;
    let endPage;

    if (currentPage <= maxDisplayedPagesHalf) {
      // Trang hiện tại gần đầu danh sách trang
      startPage = 1;
      endPage = maxDisplayedPages;
    } else if (currentPage >= totalPages - maxDisplayedPagesHalf) {
      // Trang hiện tại gần cuối danh sách trang
      startPage = totalPages - maxDisplayedPages + 1;
      endPage = totalPages;
    } else {
      // Trang hiện tại nằm ở giữa danh sách trang
      startPage = currentPage - maxDisplayedPagesHalf;
      endPage = currentPage + maxDisplayedPagesHalf;
    }

    // Tạo danh sách trang với dấu chấm '...' khi cần thiết
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (currentPage > maxDisplayedPagesHalf + 1) {
      pageNumbers.unshift("...");
    }
    if (currentPage < totalPages - maxDisplayedPagesHalf) {
      pageNumbers.push("...");
    }
  }

  // Xử lý Lọc
  const [filteredTopics, setFilteredTopics] = useState(researchTopics);
  const [selectedHourRange, setSelectedHourRange] = useState("all");
  const [isFiltering, setIsFiltering] = useState(false);

  const handleHourRangeChange = (event) => {
    setSelectedHourRange(event.target.value);
  };

  const handleFilterClick = () => {
    setIsFiltering(true);
    let filteredTopics = [];

    if (selectedHourRange === "all") {
      filteredTopics = researchTopics;
    } else if (selectedHourRange === "lessThan100") {
      filteredTopics = researchTopics.filter(
        (topic) => topic.research_hours < 100
      );
    } else if (selectedHourRange === "100to500") {
      filteredTopics = researchTopics.filter(
        (topic) => topic.research_hours >= 100 && topic.research_hours <= 500
      );
    } else if (selectedHourRange === "moreThan500") {
      filteredTopics = researchTopics.filter(
        (topic) => topic.research_hours > 500
      );
    }

    setFilteredTopics(filteredTopics);
  };

  return (
    <div>
      <Header />
      <Container>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Typography variant="h4" style={{ margin: "20px 0" }}>
              Đăng ký đề tài nghiên cứu
            </Typography>
          </Grid>
        </Grid>
        <div>
          {/* Chọn khoảng số giờ nghiên cứu */}
          <FormControl
            variant="outlined"
            style={{ margin: "10px 0", width: "300px" }}
          >
            <InputLabel>Chọn khoảng số giờ nghiên cứu</InputLabel>
            <Select
              label="Chọn khoảng số giờ nghiên cứu"
              value={selectedHourRange}
              onChange={handleHourRangeChange}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="lessThan100">Dưới 100 giờ</MenuItem>
              <MenuItem value="100to500">100 - 500 giờ</MenuItem>
              <MenuItem value="moreThan500">Trên 500 giờ</MenuItem>
            </Select>
          </FormControl>

          {/* Lọc đề tài */}
          <Button
            style={{ margin: "15px 10px", width: "150px" }}
            variant="contained"
            color="primary"
            onClick={handleFilterClick}
          >
            Lọc Đề Tài
          </Button>

          {/* Hiển thị kết quả lọc nếu isFiltering là true */}
          {isFiltering && (
            <div className="filtered-results">
              {/* Hiển thị kết quả lọc ở đây */}
            </div>
          )}
        </div>

        <div className="research-topics-list-container">
          <Grid container alignItems="center">
            <Grid item xs={6}>
              <Typography variant="h6" style={{ margin: "20px 0" }}>
                Danh sách đề tài
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Tìm kiếm"
                variant="outlined"
                size="small"
                value={searchValue}
                onChange={handleSearchChange}
                style={{ float: "right", marginRight: "10px" }}
              />
            </Grid>
          </Grid>
          <Typography
            variant="body1"
            style={{ float: "right", marginRight: "10px" }}
          >
            Số đề tài đã chọn: {selectedItemCount} - Tổng số giờ nghiên cứu:{" "}
            {totalResearchHours}
          </Typography>
          <div className="pagination">
            <Stack direction="row" spacing={1}>
              {pageNumbers.map((number, index) => (
                <button
                  key={index}
                  className={`page-number ${
                    currentPage === number ? "active" : ""
                  }`}
                  onClick={() => setCurrentPage(number)}
                >
                  {number === "..." ? "..." : number}
                </button>
              ))}
            </Stack>
          </div>
          {researchTopics.length > 0 ? (
            <TableContainer component={Paper}>
              <Table style={{ cursor: "pointer" }}>
                <TableHead>
                  <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell>Năm học</TableCell>
                    <TableCell>Mã đề tài</TableCell>
                    <TableCell onClick={() => handleSortByColumn("name")}>
                      Tên đề tài
                      {sortByColumn === "name" && (
                        <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                      )}
                    </TableCell>
                    <TableCell>Cấp đề tài</TableCell>
                    <TableCell>Thời gian bắt đầu</TableCell>
                    <TableCell>Thời gian kết thúc</TableCell>
                    <TableCell>Thời gian thực hiện</TableCell>
                    <TableCell>Kinh phí được phê duyệt</TableCell>
                    <TableCell>Trạng thái </TableCell>
                    <TableCell
                      onClick={() => handleSortByColumn("research_hours")}
                    >
                      Số Giờ Nghiên Cứu
                      {sortByColumn === "research_hours" && (
                        <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                      )}
                    </TableCell>
                    <TableCell>Ngày kê khai</TableCell>
                    <TableCell>Ngày phê duyệt</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                      />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTopics.length > 0 ? (
                    filteredTopics.map((topic, index) => (
                      <TableRow key={topic.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{topic.academic_year}</TableCell>
                        <TableCell>{topic.id}</TableCell>
                        <TableCell>{topic.topic_name}</TableCell>
                        <TableCell>
                          {
                            levels.find(
                              (status) => status.value === topic.funding_level
                            )?.label
                          }
                        </TableCell>
                        <TableCell>
                          {dayjs(topic.start_date).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell>
                          {dayjs(topic.end_date).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell>
                          {calculateExecutionTime(
                            topic.start_date,
                            topic.end_date
                          )}{" "}
                          tháng
                        </TableCell>

                        <TableCell>{topic.approved_budget}</TableCell>
                        <TableCell>
                          {
                            status.find(
                              (status) => status.value === topic.status
                            )?.label
                          }
                        </TableCell>
                        <TableCell>{topic.research_hours}</TableCell>
                        <TableCell>
                          {dayjs(topic.approval_date).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell>
                          {dayjs(topic.approval_date).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            checked={topic.selected}
                            onChange={() => handleCheckboxChange(index)}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        Không tìm thấy đề tài nào.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              style={{ marginTop: "50px", marginBottom: "50px" }}
            >
              <Grid item xs={12} textAlign="center">
                <img
                  src={NO_RESEARCH_IMAGE}
                  alt="No Research"
                  style={{ width: "300px", height: "300px" }}
                />
                <Typography variant="h6">
                  Hiện chưa có đề tài nghiên cứu.
                </Typography>
              </Grid>
            </Grid>
          )}
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Typography
              variant="body1"
              style={{ float: "right", marginRight: "10px" }}
            >
              Hiển thị&nbsp;
              <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </Typography>
            <div className="pagination">
              <Stack direction="row" spacing={1}>
                {pageNumbers.map((number, index) => (
                  <button
                    key={index}
                    className={`page-number ${
                      currentPage === number ? "active" : ""
                    }`}
                    onClick={() => setCurrentPage(number)}
                  >
                    {number === "..." ? "..." : number}
                  </button>
                ))}
              </Stack>
            </div>
          </div>

          <div style={{ marginTop: "20px", textAlign: "right" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRegistration}
            >
              Đăng ký
            </Button>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default ResearchTopics;
