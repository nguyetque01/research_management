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
  Pagination, // Thêm Checkbox từ @mui/material
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

function RegisteredTopics() {

  const backendUrl = DEFAULT_BACKEND_URL;
  const [researchTopics, setResearchTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalResearchHours, setTotalStudyHours] = useState(0);
  const [sortByColumn, setSortByColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [selectedYearFilter, setSelectedYearFilter] = useState("all");
  const [isFiltering, setIsFiltering] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
  });
  function calculateExecutionTime(startDate, endDate) {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const months = end.diff(start, "month");
    return months;
  }

  // Xử lý sự kiện khi tìm kiếm
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    /// Thiết lập trang hiện tại về 1 khi thay đổi giá trị tìm kiếm
    setCurrentPage(1);
  };

  // Xử lý khi thay đổi số trang
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1); // Đặt lại trang hiện tại về 1 khi thay đổi số lượng mục trên mỗi trang
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
  const handleYearFilterChange = (event) => {
    setSelectedYearFilter(event.target.value);
  };
  
  const handleFilterClick = () => {
    setIsFiltering(true);
    let filteredTopics = [];
    
    if (selectedYearFilter === "all") {
      filteredTopics = researchTopics;
    } else {
      filteredTopics = researchTopics.filter((topic) => {
        const topicYear = topic.academic_year; // Thay "year" bằng thuộc tính chứa thông tin năm học trong đề tài của bạn
        return topicYear === selectedYearFilter;
      });
    }
  
    // Cắt danh sách đã lọc dựa trên trang hiện tại và số lượng mục trên mỗi trang
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredTopics.length);
    const currentItems = filteredTopics.slice(startIndex, endIndex);
  
    setFilteredTopics(currentItems); // Cập nhật danh sách đã lọc
  };

  // Cập nhật trang hiện tại
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Sử dụng useEffect để cập nhật lại danh sách đề tài lọc khi researchTopics thay đổi
  useEffect(() => {
    if (isFiltering) {
      handleFilterClick();
    }
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
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"}}>
            <div style={{ textAlign: "left" }}>
              {/* Chọn năm học */}
              <FormControl
                variant="outlined"
                style={{ margin: "10px 0", width: "300px", height: "80px"}}
              >
                <InputLabel style={{ color:"Blue"}}>
                  Chọn năm học
                </InputLabel>
                <Select
                  label="Chọn năm học"
                  value={selectedYearFilter}
                  onChange={handleYearFilterChange}
                  style={{ height: "50px"}}
                >
                  <MenuItem value="all">Tất cả</MenuItem>
                  <MenuItem value="2020to2021">2020-2021</MenuItem>
                  <MenuItem value="2021to2022">2021-2022</MenuItem>
                  <MenuItem value="2022to2023">2022-2023</MenuItem>
                  <MenuItem value="2023to2024">2023-2024</MenuItem>
                  <MenuItem value="2024to2025">2024-2025</MenuItem>
                  <MenuItem value="2025to2026">2025-2026</MenuItem>
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
          </Container>

          <Container style={{ borderRadius: "5px", marginTop: "10px",
                      paddingBottom: "10px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"}}>
            <div className="research-topics-list-container">
              <div style={{paddingTop:"20px"}}>
                <Typography variant="h6" style={{ color:"MediumBlue"}}>
                   Danh sách đề tài đã đăng ký
                </Typography>
                <div style={{ float: "right", margin: "15px 10px", fontWeight: "bold", fontSize:"20px" }}>
                  Tổng số giờ đã đăng ký:{" "}
                  {totalResearchHours}
                </div>
              </div>
              <hr style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", width: "100%" }} />
              <div style={{ display: "flex", justifyContent: "right", margin: "10px 0 10px 0" }}>
                <TextField
                  label="Tìm kiếm"
                  variant="outlined"
                  size="small"
                  value={searchValue}
                  onChange={handleSearchChange}
                  style={{ float: "right", marginRight: "10px", width: "300px", }}
                />
              </div>
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
                          <Button>
                            Hủy Đăng ký
                          </Button>
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
                                <Button>
                                  Hủy
                                </Button>
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
                            ) : (
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
                                    <Button>
                                      Hủy 
                                    </Button>
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
                        Hiện chưa có đề tài nghiên cứu đã đăng ký.
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
            </div>
          </Container>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default RegisteredTopics;
