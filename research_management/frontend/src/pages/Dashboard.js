import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Typography } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import Categories from "../components/Categories";
// import ResearchTopics from "../components/ResearchTopics";
// import Articles from "../components/Articles";
// import Authors from "../components/Authors";

function Dashboard() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  // const userData = useSelector((state) => state.user.userData);

  // const categories = [
  //   { id: 1, name: "Category 1" },
  //   { id: 2, name: "Category 2" },
  //   { id: 3, name: "Category 3" },
  // ];
  // const researchTopics = [
  //   {
  //     id: 1,
  //     title: "Topic 1",
  //     summary: "Summary of Topic 1",
  //   },
  //   {
  //     id: 2,
  //     title: "Topic 2",
  //     summary: "Summary of Topic 2",
  //   },
  // ];
  // const articles = [
  //   {
  //     id: 1,
  //     title: "Bài viết 1",
  //     image: require("../assets/img/research.webp"),
  //     summary: "Tóm tắt bài viết 1",
  //     content: "Nội dung bài viết 1",
  //     author: "Tác giả 1",
  //     publishDate: "Ngày xuất bản 1",
  //     quote: "Trích dẫn bài viết 1",
  //     topic: "Chủ đề 1",
  //     tags: ["Tag 1", "Tag 2"],
  //   },
  //   {
  //     id: 2,
  //     title: "Bài viết 2",
  //     image: require("../assets/img/research.webp"),
  //     summary: "Tóm tắt bài viết 2",
  //     content: "Nội dung bài viết 2",
  //     author: "Tác giả 2",
  //     publishDate: "Ngày xuất bản 2",
  //     quote: "Trích dẫn bài viết 2",
  //     topic: "Chủ đề 2",
  //     tags: ["Tag 3", "Tag 4"],
  //   },
  // ];
  // const authors = [
  //   { id: 1, name: "Author 1" },
  //   { id: 2, name: "Author 2" },
  //   { id: 3, name: "Author 3" },
  // ];

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (!isLoggedIn) {
      // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
      navigate("/login");
      console.log(isLoggedIn);
    }
  }, []);

  return (
    <div>
      <Header />
      <Container maxWidth="lg" className="dashboard-container">
        {/* <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Categories categories={categories} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Authors authors={authors} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ResearchTopics topics={researchTopics} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Articles articles={articles} />{" "}
          </Grid>
        </Grid> */}
        <Grid
          container
          spacing={20}
          sx={{
            minHeight: "100vh",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Content */}
          <Grid item xs={12}>
            <Container>
              <Typography variant="h4"> Dashboard</Typography>
            </Container>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}

export default Dashboard;
