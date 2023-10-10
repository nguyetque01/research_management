import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import getFileName from "../../../utils/fileUtils";

function ArticlesTable({ article, handleEditItem, openDeleteDialog }) {
  return (
    <TableContainer component={Paper} sx={{ marginBottom: "40px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ minWidth: 50 }}>STT</TableCell>
            <TableCell style={{ minWidth: 50 }}>Mã bài báo</TableCell>
            <TableCell style={{ minWidth: 100 }}>Tiêu đề</TableCell>
            <TableCell style={{ minWidth: 100 }}>Mô tả</TableCell>
            <TableCell style={{ minWidth: 100 }}>Tác giả</TableCell>
            <TableCell style={{ minWidth: 100 }}>Tên tạp chí</TableCell>
            <TableCell style={{ minWidth: 100 }}>ISSN/ISBN</TableCell>
            <TableCell style={{ minWidth: 100 }}>Phân loại</TableCell>
            <TableCell style={{ minWidth: 100 }}>Ngày xuất bản</TableCell>
            <TableCell style={{ minWidth: 100 }}>Loại hình xuất bản</TableCell>
            <TableCell style={{ minWidth: 100 }}>File đính kèm</TableCell>
            <TableCell style={{ minWidth: 100 }}>Đường dẫn</TableCell>
            <TableCell style={{ minWidth: 100 }}>Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {article?.map((article, index) => (
            <TableRow key={article.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{article.id}</TableCell>
              <TableCell>{article.title}</TableCell>
              <TableCell>{article.description}</TableCell>
              <TableCell>{article.authors}</TableCell>
              <TableCell>{article.journal_name}</TableCell>
              <TableCell>{article.issn_isbn}</TableCell>
              <TableCell>{article.classification}</TableCell>
              <TableCell>{article.published_date}</TableCell>
              <TableCell>{article.published_type}</TableCell>
              <TableCell>
                {article.attachments
                  ? getFileName(article.attachments)
                  : "Chưa có tập tin"}
              </TableCell>
              <TableCell>{article.url}</TableCell>
              <TableCell>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleEditItem(article.id)}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => openDeleteDialog(article)}
                    sx={{ marginLeft: "8px" }}
                  >
                    Xóa
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ArticlesTable;
