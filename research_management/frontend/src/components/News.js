import React, { useState, useEffect } from "react";
import { Tab, Tabs, Divider, Grid } from "@mui/material";
import fetchData from "../utils/apiUtils";
import DEFAULT_BACKEND_URL from "../config";

function News() {
  const backendUrl = DEFAULT_BACKEND_URL;
  const [value, setValue] = useState(0);
  const [articles, setArticles] = useState([]);
  const [awards, setAwards] = useState([]);

  // Gửi HTTP request để lấy danh sách bài báo từ backend
  const fetchArticles = () =>
    fetchData(`${backendUrl}/api/articles/`, setArticles);

  // Sử dụng useEffect để tự động gọi hàm fetchArticles khi component được tạo
  useEffect(() => {
    fetchArticles();
  }, []);

  // Gửi HTTP request để lấy danh sách giải thưởng NCKH từ backend
  const fetchAwards = () =>
    fetchData(`${backendUrl}/api/research-awards/`, setAwards);

  // Sử dụng useEffect để tự động gọi hàm fetchAwards khi component được tạo
  useEffect(() => {
    fetchAwards();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const notifications = [
    {
      date: "2023-10-16",
      title:
        "Thông báo phân loại các hoạt động thành Giá trị HD ≤ 1 tỷ đồng, 1 tỷ đồng < Giá trị HĐ ≤ 2 tỷ đồng, 2 tỷ đồng < Giá trị HĐ",
      description: "Các nhân viên theo dõi thông báo và đăng ký.",
      link: "#",
    },
    {
      date: "2023-09-25",
      title:
        "(GẤP) Thông báo thay đổi cách thức tham gia NCKH tại Trường Đại học Công Nghệ Đồng Nai",
      description: "",
      link: "#",
    },
    {
      date: "2023-09-22",
      title: "Tổ chức “Cuộc thi sáng tạo trong NCKH tại DNTU",
      description: "",
      link: "#",
    },
    {
      date: "2023-09-20",
      title: "Cơ cấu giải thưởng NCKH năm học 2023 -2024",
      description: "",
      link: "#",
    },
    {
      date: "2023-09-02",
      title: "(GẤP) Thông báo làm mới chương trình NCKH tại DNTU",
      description: "",
      link: "#",
    },
    {
      date: "2023-08-10",
      title: "Quy định hình thức hướng dẫn cho sinh viên",
      description: "",
      link: "#",
    },
    {
      date: "2023-08-01",
      title:
        "(GẤP) Thông báo thay đổi cách thức tham gia NCKH tại Trường Đại học Công Nghệ Đồng Nai",
      description: "",
      link: "#",
    },
  ];

  const TabPanel = ({ value, index, children }) => {
    return value === index ? <div>{children}</div> : null;
  };

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="action tabs example"
      >
        <Tab label="Thông Báo Chung" />
        <Tab label="Bài Báo NCKH Đã Phát Hành" />
        <Tab label="Giải Thưởng NCKH" />
      </Tabs>
      <div className="notification-container">
        {notifications?.slice(0, 10).map((notification, index) => (
          <div key={index}>
            <TabPanel value={value} index={0}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <div className="notification-date">
                    <p
                      style={{
                        border: "1px solid blue",
                        fontSize: "20px",
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <span className="caltop" style={{ color: "red" }}>
                        {notification.date.split("-")[2]}
                      </span>
                      <Divider
                        style={{ margin: "5px 0", backgroundColor: "blue" }}
                      />
                      <span className="calbot">{`${
                        notification.date.split("-")[1]
                      }/${notification.date.split("-")[0]}`}</span>
                    </p>
                  </div>
                </Grid>
                <Grid item xs={10}>
                  <div className="notification-header">
                    <h3 style={{ color: "#3f51b5", marginBottom: "5px" }}>
                      {notification.title}
                    </h3>
                  </div>
                  <p
                    className="notification-description"
                    style={{ marginBottom: "5px" }}
                  >
                    {notification.description}
                  </p>
                  <a
                    className="notification-link"
                    href={notification.link}
                    style={{ color: "red", textDecoration: "none" }}
                  >
                    Xem chi tiết
                  </a>
                </Grid>
              </Grid>
              <Divider style={{ margin: "5px 0" }} />
            </TabPanel>
            {index !== notifications.length - 1}
          </div>
        ))}
        {articles?.slice(0, 10).map((article, index) => (
          <div key={index}>
            <TabPanel value={value} index={1}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <div className="notification-date">
                    <p
                      style={{
                        border: "1px solid blue",
                        fontSize: "20px",
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <span className="caltop" style={{ color: "red" }}>
                        {article.published_date.split("-")[2]}
                      </span>
                      <Divider
                        style={{ margin: "5px 0", backgroundColor: "blue" }}
                      />
                      <span className="calbot">{`${
                        article.published_date.split("-")[1]
                      }/${article.published_date.split("-")[0]}`}</span>
                    </p>
                  </div>
                </Grid>
                <Grid item xs={10}>
                  <div className="notification-header">
                    <h3 style={{ color: "#3f51b5", marginBottom: "5px" }}>
                      {article.title}
                    </h3>
                  </div>
                  <p
                    className="notification-description"
                    style={{ marginBottom: "5px" }}
                  >
                    {article.description}
                  </p>
                  <a
                    className="notification-link"
                    href={article.url}
                    style={{ color: "red", textDecoration: "none" }}
                  >
                    Xem chi tiết
                  </a>
                </Grid>
              </Grid>
              <Divider style={{ margin: "5px 0" }} />
            </TabPanel>
            {index !== notifications.length - 1}
          </div>
        ))}
        {awards?.slice(0, 10).map((award, index) => (
          <div key={index}>
            <TabPanel value={value} index={2}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <div className="notification-date">
                    <p
                      style={{
                        border: "1px solid blue",
                        fontSize: "20px",
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <span className="caltop" style={{ color: "red" }}>
                        {award.award_received_date.split("-")[2]}
                      </span>
                      <Divider
                        style={{ margin: "5px 0", backgroundColor: "blue" }}
                      />
                      <span className="calbot">{`${
                        award.award_received_date.split("-")[1]
                      }/${award.award_received_date.split("-")[0]}`}</span>
                    </p>
                  </div>
                </Grid>
                <Grid item xs={10}>
                  <div className="notification-header">
                    <h3 style={{ color: "#3f51b5", marginBottom: "5px" }}>
                      {award.title}
                    </h3>
                  </div>
                  <p
                    className="notification-description"
                    style={{ marginBottom: "5px" }}
                  >
                    {award.description}
                  </p>
                  <p
                    className="notification-authors"
                    style={{ marginBottom: "5px" }}
                  >
                    {award.authors}
                  </p>
                  <a
                    className="notification-link"
                    href={award.url}
                    style={{ color: "red", textDecoration: "none" }}
                  >
                    Xem chi tiết
                  </a>
                </Grid>
                
              </Grid>
              <Divider style={{ margin: "5px 0" }} />
            </TabPanel>
            {index !== awards.length - 1}
          </div>
        ))}
        <div style={{ textAlign: "right" }}>
          <a
            href="/link-to-more"
            style={{
              color: "red",
              fontSize: "20px",
              fontWeight: "500",
              textDecoration: "none",
            }}
          >
            Xem thêm
          </a>
        </div>
      </div>
    </div>
  );
}

export default News;
