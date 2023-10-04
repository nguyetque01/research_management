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
  MenuItem,
  Pagination,
  Divider,
   // Thêm Checkbox từ @mui/material
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Header from "../components/Header";
import Footer from "../components/Footer";
import researchStatus from "../data/researchStatus";
import fundingLevels from "../data/fundingLevels";
import dayjs from "dayjs";
import "../assets/css/pagination.css";
import UserSideBar from "../components/user/UserSideBar";

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
  const [atLeastOneTopicSelected, setAtLeastOneTopicSelected] = useState(false);
  const [totalResearchHours, setTotalStudyHours] = useState(0);
  const [sortByColumn, setSortByColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [selectedHourRange, setSelectedHourRange] = useState("all");
  const [isFiltering, setIsFiltering] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
  });

  // Gửi HTTP request để lấy danh sách đề tài từ backend
  async function fetchTopics() {
    try {
      const response = await axios.get(`${backendUrl}/api/research-topics/`);
      setResearchTopics(response.data);

      // Cập nhật tổng số item trong dataset
      const totalItems = response.data.length;
      setTotalItems(totalItems);
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

  // Xử lý khi thay đổi số trang
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1); // Đặt lại trang hiện tại về 1 khi thay đổi số lượng mục trên mỗi trang
  };

  // Xử lý checkbox khi chọn All
  const handleSelectAllChange = () => {
    const updatedItems = filteredTopics?.length ? [...filteredTopics] : [...researchTopics];
    const selectAllValue = !selectAll;

    updatedItems.forEach((topic) => {
      topic.selected = selectAllValue;
    });

    setFilteredTopics([...updatedItems]);
    setSelectAll(selectAllValue);

    // Tính tổng số giờ nghiên cứu
    const selectedCount = selectAllValue ? updatedItems.length : 0;
    const totalResearchHours = selectAllValue
      ? updatedItems.reduce((total, topic) => total + topic.research_hours, 0)
      : 0;

    setSelectedItemCount(selectedCount);
    setTotalStudyHours(totalResearchHours);
  };

  // Xử lý khi checkbox thay đổi
  const handleCheckboxChange = (index) => {
    const updatedItems = filteredTopics?.length ? [...filteredTopics] : [...researchTopics];
    const topic = updatedItems[index];

    if (topic) {
      // Kiểm tra xem topic tồn tại
      topic.selected = !topic.selected;

      // Cập nhật danh sách các chủ đề đã lọc
      setFilteredTopics([...updatedItems]);

      // Tính tổng số giờ nghiên cứu và kiểm tra tất cả checkbox đã được chọn
      const selectedCount = updatedItems.filter((topic) => topic.selected).length;
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

  // Xử lý sắp xếp khi nhấn vào cột
  const handleSortByColumn = (column) => {
    if (column === sortByColumn) {
      /// Đảo ngược hướng sắp xếp nếu cột đã được sắp xếp
      const sortedTopics = [...researchTopics].reverse();
      setResearchTopics(sortedTopics);
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      /// Sắp xếp danh sách theo cột mới và đặt cột và hướng sắp xếp
      const sortedTopics = [...researchTopics].sort((a, b) => {
        if (column === "research_hours") {
          //// Sắp xếp theo số giờ nghiên cứu
          return a.research_hours - b.research_hours;
        } else if (column === "name") {
          //// Sắp xếp theo tên đề tài
          return a.name.localeCompare(b.name);
        } else if (column === "category") {
          //// Sắp xếp theo danh mục
          return a.category.localeCompare(b.category);
        } else {
          //// Các trường hợp khác, bạn có thể thêm logic sắp xếp cho các trường khác ở đây
          return 0;
        }
      });
      setResearchTopics(sortedTopics);
      setSortByColumn(column);
      setSortOrder("asc"); /// Mặc định sắp xếp theo thứ tự tăng dần
    }
  };

  // Xử lý khi nút "Đăng ký" được nhấn
  const handleRegistration = () => {
    const selectedTopics = researchTopics.filter((topic) => topic.selected);

    /// Kiểm tra xem có ít nhất một đề tài được chọn
    if (selectedTopics.length === 0) {
      alert("Vui lòng chọn ít nhất một đề tài để đăng ký.");
      return;
    }

    /// Gửi yêu cầu đăng ký lên API
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
          //// Đăng ký thành công, thực hiện các hành động cần thiết
          alert("Đăng ký đề tài thành công!");
          //// Cập nhật trạng thái đã chọn của các đề tài
          const updatedTopics = researchTopics.map((topic) => ({
            ...topic,
            selected: false,
          }));
          setResearchTopics(updatedTopics);
        } else {
          //// Đăng ký thất bại, xử lý lỗi
          alert("Đăng ký đề tài thất bại. Vui lòng thử lại sau.");
        }
      })
      .catch((error) => {
        //// Xử lý lỗi khi không thể kết nối tới API
        alert("Có lỗi xảy ra khi kết nối đến máy chủ.");
      });
  };

  // Lọc các mục trong mảng researchTopics dựa trên giá trị tìm kiếm  
  const filteredItems = researchTopics.filter((topic) =>
    topic.topic_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  ////// Tính toán số trang
  // Tính chỉ số của mục đầu và mục cuối cùng trong trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Lấy danh sách các mục hiện tại từ mảng đã lọc
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Tính tổng số trang dựa trên số lượng mục đã lọc và số lượng mục trên mỗi trang
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const pageNumbers = [];// Khởi tạo một mảng để lưu trữ số trang

  const maxDisplayedPages = 5; // Số trang tối đa được hiển thị

  // Tính giá trị một nửa của số trang cần hiển thị tối đa
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
  
   // Tính số item đầu và cuối trên trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  ///////// Xử lý Lọc
  const handleHourRangeChange = (event) => {
    setSelectedHourRange(event.target.value); 
    setIsFiltering(true); // Thiết lập isFiltering thành true để kích hoạt useEffect
  };

  // Xử lý sự kiện khi tìm kiếm
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setCurrentPage(1);
  };

  const handleFilterClick = () => {
    setIsFiltering(true);
    let filteredTopics = [];
  
    if (searchValue) {
      // Tìm kiếm dựa trên giá trị nhập vào
        filteredTopics = researchTopics.filter((topic) => {
          const academicYear = topic.academic_year.toLowerCase();
          const topicName = topic.topic_name.toLowerCase();
          const fundingLevel = topic.funding_level.toLowerCase();

          // Kiểm tra xem giá trị tìm kiếm có tồn tại trong bất kỳ trường nào hay không
          return (
            academicYear.includes(searchValue.toLowerCase()) ||
            topicName.includes(searchValue.toLowerCase()) ||
            fundingLevel.includes(searchValue.toLowerCase())
          );
        });
    } else {
      // Xử lý logic lọc theo giờ ở đây, giữ nguyên phần này nếu bạn cần
      if (selectedHourRange === "all") {
        filteredTopics = researchTopics;
      } else if (selectedHourRange === "lessThan100") {
        filteredTopics = researchTopics.filter((topic) => topic.research_hours < 100);
      } else if (selectedHourRange === "100to500") {
        filteredTopics = researchTopics.filter(
          (topic) => topic.research_hours >= 100 && topic.research_hours <= 500
        );
      } else if (selectedHourRange === "moreThan500") {
        filteredTopics = researchTopics.filter((topic) => topic.research_hours > 500);
      }
    }

    // cắt chiều dài khi đã lọc bằng với số select được chọn
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredTopics.length);
    const currentItems = filteredTopics.slice(startIndex, endIndex);

    setFilteredTopics(currentItems);
  };

  // Cập nhật trang hiện tại
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Sử dụng useEffect để cập nhật lại danh sách đề tài lọc khi researchTopics thay đổi
  useEffect(() => {
    handleFilterClick();
  }, [researchTopics, currentPage, isFiltering, itemsPerPage]);

  return (
    <div>
      <Header />
        <Grid container spacing={20}>
          {/* Sidebar */}
          <Grid item xs={2}>
            <UserSideBar />
          </Grid>

          {/* Content */}
          <Grid item xs={10}>
            <Container style={{ borderRadius: "5px",
                          paddingBottom: "10px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"}}>
              <div className="research-topics-list-container">
                <div style={{paddingTop:"20px"}}>
                  <Typography variant="h6" style={{ color:"MediumBlue"}}>
                    Danh sách đề tài
                  </Typography>
                </div>
                <hr style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", width: "100%" }} />

                {/* hiển thị phần lọc, phần tìm kiếm và nút tìm kiếm*/}
                <Paper
                  component="form"
                  sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%", marginTop: "20px"}}
                >
                  <FormControl
                    variant="outlined"
                    size="small"
                    style={{ margin: "0", width: "300px"}}
                  >
                    <InputLabel style={{ color: "Blue" }}>
                      Chọn khoảng số giờ nghiên cứu
                    </InputLabel>
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
                  <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> {/* dấu cách gạch đứng*/}
                  <TextField
                    sx={{ flex: 1, height: "30px", marginBottom:"10px" }}
                    size="small"
                    placeholder="Tìm kiếm"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchValue}
                    onChange={handleSearchChange}
                  />
                  {/* dấu cách gạch đứng*/}
                  <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                  <div>
                    {/* Nút tìm kiếm */}
                    <Button
                      style={{ width: "150px", height: "38px", textAlign: "center" }}
                      variant="contained"
                      color="primary"
                      onClick={handleFilterClick}
                    >
                      Tìm kiếm
                    </Button>
                    {/* Hiển thị kết quả lọc nếu đang lọc */}
                    {isFiltering && (
                      <div className="filtered-results">
                        {/* Hiển thị kết quả lọc ở đây */}
                      </div>
                    )}
                  </div>
                </Paper>
                {/* Hiển thị kết quả item được chọn và tổng số giờ được cộng khi chọn vào item */}
                <div style={{ marginTop: "20px", display: "flex", alignItems: "center" }}>
                  {atLeastOneTopicSelected && (
                    <Typography
                      variant="body1"
                      style={{
                        flex: 1,
                        marginRight: "10px",
                        padding: "5px", // Padding cho màu nền
                      }}
                    >
                      Tổng số giờ nghiên cứu: {totalResearchHours}
                    </Typography>
                  )}
                  <Typography variant="body1" 
                    style={{ 
                      display: atLeastOneTopicSelected ? "block" : "none", 
                      backgroundColor: 'PowderBlue' 
                  }}>
                    Số đề tài đã chọn: {selectedItemCount}
                  </Typography>
                </div>
                {/* Hiển thị phần bảng*/}
                {researchTopics.length > 0 ? (
                  <TableContainer component={Paper}>
                    <Table style={{ cursor: "pointer" }}>
                      <TableHead>
                        <TableRow style={{ backgroundColor: "LightBlue"}}>
                          <TableCell style={{fontWeight: "bold" }}>STT</TableCell>
                          <TableCell style={{fontWeight: "bold" }}>Năm học</TableCell>
                          <TableCell style={{fontWeight: "bold" }}>Mã đề tài</TableCell>
                          <TableCell onClick={() => handleSortByColumn("topic_name")}
                            style={{fontWeight: "bold" }}>
                            Tên đề tài
                            {sortByColumn === "topic_name" && (
                              <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                            )}
                          </TableCell>
                          <TableCell style={{fontWeight: "bold" }}>Cấp đề tài</TableCell>
                          <TableCell style={{fontWeight: "bold" }}>Thời gian bắt đầu</TableCell>
                          <TableCell style={{fontWeight: "bold" }}>Thời gian kết thúc</TableCell>
                          <TableCell style={{fontWeight: "bold" }}>Thời gian thực hiện</TableCell>
                          <TableCell style={{fontWeight: "bold" }}>Kinh phí được phê duyệt</TableCell>
                          <TableCell style={{fontWeight: "bold" }}>Trạng thái </TableCell>
                          <TableCell
                            onClick={() => handleSortByColumn("research_hours")}
                            style={{fontWeight: "bold" }}
                          >
                            Số Giờ Nghiên Cứu
                            {sortByColumn === "research_hours" && (
                              <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                            )}
                          </TableCell>
                          <TableCell style={{fontWeight: "bold" }}>Ngày kê khai</TableCell>
                          <TableCell style={{fontWeight: "bold" }}>Ngày phê duyệt</TableCell>
                          <TableCell style={{fontWeight: "bold" }}>
                            <Checkbox
                              checked={selectAll}
                              onChange={() => {
                                handleSelectAllChange();
                                setAtLeastOneTopicSelected(!selectAll); // Đánh dấu rằng có ít nhất một đề tài đã được chọn
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {/* Hiển thị Danh sách đã lọc */}
                        {isFiltering ? (
                          filteredTopics.length > 0 ? (
                            filteredTopics.map((topic, index) => (
                              <TableRow key={topic.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{topic.academic_year}</TableCell>
                                <TableCell>{topic.id}</TableCell>
                                <TableCell>{topic.topic_name}</TableCell>
                                <TableCell>
                                  {
                                    fundingLevels.find(
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
                                    researchStatus.find(
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
                                    onChange={() => {
                                      handleCheckboxChange(index);
                                      setAtLeastOneTopicSelected(true); // Đánh dấu rằng có ít nhất một đề tài đã được chọn
                                    }}
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
                            )
                          ) : ( //Danh sách ban đầu
                            currentItems.length > 0 ? ( 
                              currentItems.map((topic, index) => (
                                <TableRow key={topic.id}>
                                  <TableCell>{index + 1}</TableCell>
                                  <TableCell>{topic.academic_year}</TableCell>
                                  <TableCell>{topic.id}</TableCell>
                                  <TableCell>{topic.topic_name}</TableCell>
                                  <TableCell>
                                    {
                                      fundingLevels.find(
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
                                      researchStatus.find(
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
                                      onChange={() => {
                                        handleCheckboxChange(index);
                                        setAtLeastOneTopicSelected(true); // Đánh dấu rằng có ít nhất một đề tài đã được chọn
                                      }}
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
                            )
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
                  <Stack direction="row" spacing={1} style={{ marginBottom: "5px", justifyContent: "flex-end" }}>
                    <Typography variant="body1" style={{ marginTop: "5px", display: "inline-block" }}>
                      Rows per page:&nbsp;
                    </Typography>{/* lựa chọn số item được hiển thị */}
                    <select
                      value={itemsPerPage}
                      onChange={handleItemsPerPageChange}
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
                    {/* Hiển thị số lượng item trên trang hiện tại */}
                    <p style={{
                        marginTop: "6px",
                        fontSize: "15px",
                        marginRight:"15px"
                      }}>{`${startIndex + 1}–${endIndex} of ${totalItems}`}</p>
                    {/* Chuyển trang */}
                    <Pagination
                      count={pageNumbers.length}
                      page={currentPage}
                      onChange={(event, page) => handlePageChange(page)}
                      showFirstButton
                      showLastButton
                    />
                  </Stack>
                </div>
                <div style={{ marginTop: "20px", textAlign: "right" }}>
                  <a href="/researchs/registered" style={{ padding: "20px", textDecoration: "none", 
                      fontStyle: "italic", color: "MediumBlue"}}>
                    Các đề tài đã đăng ký
                  </a>
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
          </Grid>
        </Grid>
      <Footer />
    </div>
  );
}

export default ResearchTopics;
