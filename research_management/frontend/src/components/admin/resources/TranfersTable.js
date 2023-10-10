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

function TranfersTable({ tranfer, handleEditItem, openDeleteDialog }) {
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
            <TableCell style={{ minWidth: 100 }}>Công ty chuyển giao</TableCell>
            <TableCell style={{ minWidth: 100 }}>
              Mã hợp đồng chuyển giao
            </TableCell>
            <TableCell style={{ minWidth: 100 }}>
              Mã hợp đồng thành ký
            </TableCell>
            <TableCell style={{ minWidth: 100 }}>Ngày ký hợp đồng</TableCell>
            <TableCell style={{ minWidth: 100 }}>Giá trị hợp đồng</TableCell>
            <TableCell style={{ minWidth: 100 }}>File đính kèm</TableCell>
            <TableCell style={{ minWidth: 100 }}>Đường dẫn</TableCell>
            <TableCell style={{ minWidth: 100 }}>Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tranfer?.map((tranfer, index) => (
            <TableRow key={tranfer.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{tranfer.id}</TableCell>
              <TableCell>{tranfer.title}</TableCell>
              <TableCell>{tranfer.description}</TableCell>
              <TableCell>{tranfer.authors}</TableCell>
              <TableCell>{tranfer.transfer_company}</TableCell>
              <TableCell>{tranfer.transfer_contract_id}</TableCell>
              <TableCell>{tranfer.signed_contract_id}</TableCell>
              <TableCell>{tranfer.signed_contract_date}</TableCell>
              <TableCell>{tranfer.contract_value}</TableCell>
              <TableCell>
                {tranfer.attachments
                  ? getFileName(tranfer.attachments)
                  : "Chưa có tập tin"}
              </TableCell>
              <TableCell>{tranfer.url}</TableCell>
              <TableCell>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleEditItem(tranfer.id)}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => openDeleteDialog(tranfer)}
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

export default TranfersTable;
