import React, { useState, useEffect } from "react";
import DEFAULT_BACKEND_URL from '../../config';
import fetchData from '../../utils/apiUtils';
import { 
Grid, 
Container, 
Table, 
TableBody, 
TableCell, 
TableContainer, 
TableHead, 
TableRow, 
Paper, 
} from "@mui/material";
import Calendar from 'react-calendar'; // Import thư viện react-calendar
import 'react-calendar/dist/Calendar.css'; // Import CSS cho react-calendar

function DashboardAward () {
  const backendUrl = DEFAULT_BACKEND_URL;
  const [awards, setAwards] = useState([]);
  const awardRankMapping = {
    'first': 'Nhất',
    'second': 'Nhì',
    'third': 'Ba',
    'encouragement': 'Khuyến khích',
  };

  const awardLevelMapping = {
    'school': 'Trường',
    'province': 'Tỉnh',
    'ministry': 'Bộ',
    'government': 'Nhà nước',
    'international': 'Quốc tế',
  };
    
  // Gửi HTTP request để lấy danh sách giải thưởng NCKH từ backend
  const fetchAwards = () =>
    fetchData(`${backendUrl}/api/research-awards/`, setAwards);

    // Sử dụng useEffect để tự động gọi hàm fetchAwards khi component được tạo
    useEffect(() => {
    fetchAwards();
    }, []);

    // CSS styles for the Calendar
  const calendarStyles = {
    border: "1px solid #ccc", 
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", 
    padding: "20px",
    backgroundColor: "#0080ff",
    color: 'black',
    fontFamily: 'Arial, sans-serif',
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: "20px",
  };
  return (
    <Grid container spacing={2}>
      <Grid xs={8} style={{marginTop: "20px",}}>
        <Container>
          <h2 style={{color: "blue"}}>Quản lý giải thưởng NCKH</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ minWidth: 100 }}>Tên giải thưởng</TableCell>
                    <TableCell style={{ minWidth: 100 }}>Mô tả</TableCell>
                    <TableCell style={{ minWidth: 100 }}>Tác giả</TableCell>
                    <TableCell style={{ minWidth: 100 }}>Cấp giải thưởng</TableCell>
                    <TableCell style={{ minWidth: 100 }}>Thứ hạng</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {awards.map((award) => (
                    <TableRow key={award.id}>
                      <TableCell>{award.title}</TableCell>
                      <TableCell>{award.description}</TableCell>
                      <TableCell>{award.authors}</TableCell>
                      <TableCell>{awardLevelMapping[award.award_level]}</TableCell>
                      <TableCell>{awardRankMapping[award.award_rank]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Grid>
        <Grid xs={4} style={{marginTop: "20px"}}>
          <div style={calendarStyles}>
            <Calendar
              value={new Date()}
              onClickDay={(date) => console.log(date)}
              style={calendarStyles}
            />
          </div>
        </Grid>
      </Grid>
    );
}
export default DashboardAward;