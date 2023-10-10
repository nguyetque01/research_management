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

function BooksTable({ book, handleEditItem, openDeleteDialog }) {
  return (
    <TableContainer component={Paper} sx={{ marginBottom: "40px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ minWidth: 50 }}>STT</TableCell>
            <TableCell style={{ minWidth: 50 }}>Mã sách</TableCell>
            <TableCell style={{ minWidth: 100 }}>Tên sách</TableCell>
            <TableCell style={{ minWidth: 100 }}>Mô tả</TableCell>
            <TableCell style={{ minWidth: 100 }}>Tác giả</TableCell>
            <TableCell style={{ minWidth: 100 }}>Nhà xuất bản</TableCell>
            <TableCell style={{ minWidth: 100 }}>Ngày xuất bản</TableCell>
            <TableCell style={{ minWidth: 100 }}>ISBN</TableCell>
            <TableCell style={{ minWidth: 100 }}>Lĩnh vực</TableCell>
            <TableCell style={{ minWidth: 100 }}>File đính kèm</TableCell>
            <TableCell style={{ minWidth: 100 }}>Đường dẫn</TableCell>
            <TableCell style={{ minWidth: 100 }}>Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {book?.map((book, index) => (
            <TableRow key={book.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{book.id}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.description}</TableCell>
              <TableCell>{book.authors}</TableCell>
              <TableCell>{book.publisher}</TableCell>
              <TableCell>{book.published_date}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.field_of_study}</TableCell>
              <TableCell>
                {book.attachments
                  ? getFileName(book.attachments)
                  : "Chưa có tập tin"}
              </TableCell>
              <TableCell>{book.url}</TableCell>
              <TableCell>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleEditItem(book.id)}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => openDeleteDialog(book)}
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

export default BooksTable;
