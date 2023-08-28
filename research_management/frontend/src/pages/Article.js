// Trang Bài viết

import React from "react";
import { useParams } from "react-router-dom";

function Article() {
  const { articleId } = useParams();

  // Đây là nơi bạn có thể tải dữ liệu của bài viết từ API hoặc từ dữ liệu cục bộ
  // Dùng `articleId` để xác định bài viết cần hiển thị

  const article = {
    id: articleId,
    title: "Tiêu đề bài viết",
    content: "Nội dung bài viết...",
    date: "Ngày viết",
    // Thêm các thuộc tính khác của bài viết
  };

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <p>Ngày viết: {article.date}</p>
    </div>
  );
}

export default Article;
