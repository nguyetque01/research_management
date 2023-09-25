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

function ResearchTopicsTable({ data, handleEditItem, openDeleteDialog }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ minWidth: 50 }}>STT</TableCell>
            <TableCell style={{ minWidth: 50 }}>Mã đề tài</TableCell>
            <TableCell style={{ minWidth: 100 }}>Tên đề tài</TableCell>
            <TableCell style={{ minWidth: 100 }}>
              Hoạt động nghiên cứu
            </TableCell>
            <TableCell style={{ minWidth: 100 }}>Người đăng ký</TableCell>
            <TableCell style={{ minWidth: 100 }}>Người phê duyệt</TableCell>
            <TableCell style={{ minWidth: 100 }}>Ngày đăng ký</TableCell>
            <TableCell style={{ minWidth: 100 }}>Ngày phê duyệt</TableCell>
            <TableCell style={{ minWidth: 100 }}>
              Kinh phí được phê duyệt
            </TableCell>
            <TableCell style={{ minWidth: 100 }}>
              Trạng thái phê duyệt
            </TableCell>
            <TableCell style={{ minWidth: 100 }}>
              Trạng thái hoàn thành
            </TableCell>
            <TableCell style={{ minWidth: 100 }}>
              Tài nguyên nghiên cứu
            </TableCell>
            <TableCell style={{ minWidth: 100 }}>Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((topic, index) => (
            <TableRow key={topic.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{topic.id}</TableCell>
              <TableCell>{topic.name}</TableCell>
              <TableCell>{topic.research_topic}</TableCell>
              <TableCell>{topic.registrant}</TableCell>
              <TableCell>{topic.approver}</TableCell>
              <TableCell>{topic.registered_date}</TableCell>
              <TableCell>{topic.approved_date}</TableCell>
              <TableCell>{topic.approved_budget}</TableCell>
              <TableCell>{topic.approval_status}</TableCell>
              <TableCell>{topic.completion_status}</TableCell>
              <TableCell>{topic.research_resource}</TableCell>
              <TableCell>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleEditItem(topic)}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => openDeleteDialog(topic)}
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

export default ResearchTopicsTable;
