import React, { useState } from "react";
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
  MenuItem,// Thêm Checkbox từ @mui/material
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import Header from "../components/Header";
import Footer from "../components/Footer";
import DEFAULT_BACKEND_URL from "../config.js";
import axios from "axios"; 

const NO_RESEARCH_IMAGE = require("../assets/img/research.webp");

function ResearchTopics() {
  // Danh sách đề tài (thay thế cho API call)
  const initialResearchTopics = [
    {
      id: 1,
      name: "Sample Research 1",
      category: "Sample Category 1",
      description: "This is a sample research description.",
      study_hours: 100,
      approval_status: "Pending",
      study_status: "InProgress",
      selected: false,
    },
    {
      id: 2,
      name: "Sample Research 2",
      category: "Sample Category 2",
      description: "Another sample research description.",
      study_hours: 150,
      approval_status: "Approved",
      study_status: "Completed",
      selected: false,
    },
    {
      id: 3,
      name: "Rename",
      category: "Sample Category 2",
      description: "Another sample research description.",
      study_hours: 80,
      approval_status: "Approved",
      study_status: "Completed",
      selected: false,
    },
    {
      id: 4,
      name: "innuyasa",
      category: "Sample Category 2",
      description: "Another sample research description.",
      study_hours: 200,
      approval_status: "Approved",
      study_status: "Completed",
      selected: false,
    },
    {
      id: 5,
      name: "gulinazha",
      category: "Sample Category 2",
      description: "Another sample research description.",
      study_hours: 700,
      approval_status: "Approved",
      study_status: "Completed",
      selected: false,
    },
    {
      id: 6,
      name: "Yoona",
      category: "Sample Category 2",
      description: "Another sample research description.",
      study_hours: 50,
      approval_status: "Approved",
      study_status: "Completed",
      selected: false,
    },
    {
      id: 7,
      name: "Renamekarina",
      category: "Sample Category 2",
      description: "Another sample research description.",
      study_hours: 300,
      approval_status: "Approved",
      study_status: "Completed",
      selected: false,
    },
    {
      id: 8,
      name: "VNG",
      category: "Sample Category 2",
      description: "Another sample research description.",
      study_hours: 150,
      approval_status: "Approved",
      study_status: "Completed",
      selected: false,
    },
    {
      id: 9,
      name: "analyst",
      category: "Sample Category 2",
      description: "Another sample research description.",
      study_hours: 100,
      approval_status: "Approved",
      study_status: "Completed",
      selected: false,
    },
    {
      id: 10,
      name: "10hsang",
      category: "Sample Category 2",
      description: "Another sample research description.",
      study_hours: 20,
      approval_status: "Approved",
      study_status: "Completed",
      selected: false,
    },
    {
      id: 11,
      name: "Khoime",
      category: "Sample Category 2",
      description: "Another sample research description.",
      study_hours: 75,
      approval_status: "Approved",
      study_status: "Completed",
      selected: false,
    },
    {
      id: 12,
      name: "wish",
      category: "Sample Category 2",
      description: "Another sample research description.",
      study_hours: 600,
      approval_status: "Approved",
      study_status: "Completed",
      selected: false,
    },
    // Thêm đề tài khác nếu cần
  ];

  const [researchTopics, setResearchTopics] = useState(initialResearchTopics);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedItemCount, setSelectedItemCount] = useState(0); // Thêm state cho số lượng item đã chọn
  const [selectAll, setSelectAll] = useState(false);
  const [totalStudyHours, setTotalStudyHours] = useState(0);
  const [sortByColumn, setSortByColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  

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
    const totalStudyHours = selectAllValue ? updatedTopics.reduce((total, topic) => total + topic.study_hours, 0) : 0;

    setSelectedItemCount(selectedCount);
    setTotalStudyHours(totalStudyHours);
  };

  // Xử lý khi checkbox thay đổi
  const handleCheckboxChange = (index) => {
    const updatedItems = [...filteredTopics];
    const topic = updatedItems[index];
    topic.selected = !topic.selected;

    // Cập nhật danh sách các chủ đề đã lọc
    setFilteredTopics([...updatedItems]);

    // Tính tổng số giờ nghiên cứu và kiểm tra tất cả checkbox đã được chọn
    const selectedCount = updatedItems.filter((topic) => topic.selected).length;
    const totalStudyHours = updatedItems
      .filter((topic) => topic.selected)
      .reduce((total, topic) => total + topic.study_hours, 0);

    setSelectedItemCount(selectedCount);
    setTotalStudyHours(totalStudyHours);

    // Kiểm tra nếu tất cả các checkbox đã được chọn
    const allSelected = updatedItems.every((topic) => topic.selected);
    setSelectAll(allSelected);
  };
  

  const handleSortByColumn = (column) => {
    if (column === sortByColumn) {
      // Đảo ngược hướng sắp xếp nếu cột đã được sắp xếp
      const sortedTopics = [...researchTopics].reverse();
      setResearchTopics(sortedTopics);
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Sắp xếp danh sách theo cột mới và đặt cột và hướng sắp xếp
      const sortedTopics = [...researchTopics].sort((a, b) => {
        if (column === 'study_hours') {
          // Sắp xếp theo số giờ nghiên cứu
          return a.study_hours - b.study_hours;
        } else if (column === 'name') {
          // Sắp xếp theo tên đề tài
          return a.name.localeCompare(b.name);
        } else if (column === 'category') {
          // Sắp xếp theo danh mục
          return a.category.localeCompare(b.category);
        } else {
          // Các trường hợp khác, bạn có thể thêm logic sắp xếp cho các trường khác ở đây
          return 0;
        }
      });
      setResearchTopics(sortedTopics);
      setSortByColumn(column);
      setSortOrder('asc'); // Mặc định sắp xếp theo thứ tự tăng dần
    }
  };
  
 // Xử lý khi nút "Đăng ký" được nhấn
  const handleRegistration = () => {
    const selectedTopics = researchTopics.filter(topic => topic.selected);

    // Kiểm tra xem có ít nhất một đề tài được chọn
    if (selectedTopics.length === 0) {
      alert('Vui lòng chọn ít nhất một đề tài để đăng ký.');
      return;
    }

    // Gửi yêu cầu đăng ký lên API
    const registrationData = { selectedTopics: selectedTopics.map(topic => topic.id) };
    fetch('http://localhost:8000/api/registration/', {
      method: 'POST',
      body: JSON.stringify(registrationData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Đăng ký thành công!') {
          // Đăng ký thành công, thực hiện các hành động cần thiết
          alert('Đăng ký đề tài thành công!');
          // Cập nhật trạng thái đã chọn của các đề tài
          const updatedTopics = researchTopics.map(topic => ({
            ...topic,
            selected: false
          }));
          setResearchTopics(updatedTopics);
        } else {
          // Đăng ký thất bại, xử lý lỗi
          alert('Đăng ký đề tài thất bại. Vui lòng thử lại sau.');
        }
      })
      .catch(error => {
        // Xử lý lỗi khi không thể kết nối tới API
        alert('Có lỗi xảy ra khi kết nối đến máy chủ.');
      });
  };

  const filteredItems = researchTopics.filter((topic) =>
    topic.name.toLowerCase().includes(searchValue.toLowerCase())
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
      pageNumbers.unshift('...');
    }
    if (currentPage < totalPages - maxDisplayedPagesHalf) {
      pageNumbers.push('...');
    }
  }
  
  // Xử lý Lọc
  const [filteredTopics, setFilteredTopics] = useState(researchTopics);
  const [selectedHourRange, setSelectedHourRange] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);

  const handleHourRangeChange = (event) => {
    setSelectedHourRange(event.target.value);
  };



  const handleFilterClick = () => {
    setIsFiltering(true);
    let filteredTopics = [];

    if (selectedHourRange === 'all') {
      filteredTopics = researchTopics;
    } else if (selectedHourRange === 'lessThan100') {
      filteredTopics = researchTopics.filter((topic) => topic.study_hours < 100);
    } else if (selectedHourRange === '100to500') {
      filteredTopics = researchTopics.filter((topic) => topic.study_hours >= 100 && topic.study_hours <= 500);
    } else if (selectedHourRange === 'moreThan500') {
      filteredTopics = researchTopics.filter((topic) => topic.study_hours > 500);
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
          <FormControl variant="outlined" style={{ margin: "10px 0", width: "300px" }}>
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
          <Typography variant="body1" style={{ float: "right", marginRight: "10px" }}>
            Số đề tài đã chọn: {selectedItemCount} - Tổng số giờ nghiên cứu: {totalStudyHours}
          </Typography>
          <div className="pagination">
                <Stack direction="row" spacing={1}>
                  {pageNumbers.map((number, index) => (
                    <button
                      key={index}
                      className={`page-number ${currentPage === number ? 'active' : ''}`}
                      onClick={() => setCurrentPage(number)}
                    >
                      {number === '...' ? '...' : number}
                    </button>
                  ))}
                </Stack>
          </div>
          {researchTopics.length > 0 ? (
            
            <TableContainer component={Paper}>
              <Table style={{ cursor: 'pointer' }}>
              <TableHead>
                <TableRow style={{ backgroundColor: "LightSkyBlue" }}>
                  <TableCell onClick={() => handleSortByColumn('name')}>
                    Tên Đề Tài
                    {sortByColumn === 'name' && (
                      <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </TableCell>
                  <TableCell>Danh Mục</TableCell>
                  <TableCell>Mô Tả</TableCell>
                  <TableCell onClick={() => handleSortByColumn('study_hours')}>
                    Số Giờ Nghiên Cứu
                    {sortByColumn === 'study_hours' && (
                      <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </TableCell>
                  <TableCell>Trạng Thái Phê Duyệt</TableCell>
                  <TableCell>Trạng Thái Nghiên Cứu</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {isFiltering ? (
                filteredTopics.length > 0 ? (
                  filteredTopics.map((topic, index) => (
                    <TableRow key={topic.id}>
                      <TableCell>{topic.name}</TableCell>
                      <TableCell>{topic.category}</TableCell>
                      <TableCell>{topic.description}</TableCell>
                      <TableCell>{topic.study_hours}</TableCell>
                      <TableCell>{topic.approval_status}</TableCell>
                      <TableCell>{topic.study_status}</TableCell>
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
                )
              ) : (
                currentItems.length > 0 ? (
                  currentItems.map((topic, index) => (
                    <TableRow key={topic.id}>
                      <TableCell>{topic.name}</TableCell>
                      <TableCell>{topic.category}</TableCell>
                      <TableCell>{topic.description}</TableCell>
                      <TableCell>{topic.study_hours}</TableCell>
                      <TableCell>{topic.approval_status}</TableCell>
                      <TableCell>{topic.study_status}</TableCell>
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

              <Typography variant="body1" style={{ float: "right", marginRight: "10px" }}>
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
                      className={`page-number ${currentPage === number ? 'active' : ''}`}
                      onClick={() => setCurrentPage(number)}
                    >
                      {number === '...' ? '...' : number}
                    </button>
                  ))}
                </Stack>
              </div>
          </div>
          
          <div style={{ marginTop: "20px", textAlign: "right" }}>
            <Button variant="contained" color="primary" onClick={handleRegistration}>
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

