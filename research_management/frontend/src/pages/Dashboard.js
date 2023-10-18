import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Typography } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SlideShow from "../components/SlideShow";
import News from "../components/News";
import StudentPortal from "../components/StudentPortal";
import Calendar from "react-calendar"; // Import thư viện react-calendar
import "react-calendar/dist/Calendar.css"; // Import CSS cho react-calendar

function Dashboard() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (!isLoggedIn) {
      // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
      navigate("/login");
    }
  }, []);

  // // Dữ liệu lịch mẫu
  // const events = [
  //   {
  //     title: 'Thi',
  //     date: new Date('2023-10-15T10:00:00'),
  //   },
  //   {
  //     title: 'Sự kiện 2',
  //     date: new Date('2023-10-17T14:00:00'),
  //   },
  // ];

  // CSS styles for the Calendar
  const calendarStyles = {
    border: "1px solid #ccc", // Đặt border
    borderRadius: "10px", // Đặt border radius
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Đặt đổ bóng
    padding: "20px", // Đặt khoảng cách bên trong border
    backgroundColor: "#53A6D8",
    color: "black",
    fontFamily: "Arial, sans-serif",
    marginTop: "10px",
    display: "flex", // Sử dụng flexbox
    justifyContent: "center", // Canh giữa theo chiều ngang
    alignItems: "center",
  };

  return (
    <div>
      <Header />
      <SlideShow />
      <Container maxWidth="lg" className="dashboard-container">
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <News />
          </Grid>
          <Grid item xs={4}>
            <StudentPortal />
            <div style={calendarStyles}>
              <Calendar
                value={new Date()}
                onClickDay={(date) => console.log(date)}
                // tileContent={({ date }) => {
                //   const event = events.find((event) => event.date.toDateString() === date.toDateString());
                //   return event ? <div>{event.title}</div> : null;
                // }}
                style={calendarStyles}
              />
            </div>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </div>
  );
}

export default Dashboard;
