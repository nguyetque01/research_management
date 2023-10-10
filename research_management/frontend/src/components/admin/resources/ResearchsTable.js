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

function ResearchsTable({ data, handleEditItem, openDeleteDialog }) {
  return (
    <TableContainer component={Paper} sx={{ marginBottom: "40px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ minWidth: 50 }}>STT</TableCell>
            <TableCell style={{ minWidth: 50 }}>Mã nghiên cứu</TableCell>
            <TableCell style={{ minWidth: 100 }}>Tên nghiên cứu</TableCell>
            <TableCell style={{ minWidth: 100 }}>Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((research, index) => (
            <TableRow key={research.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{research.id}</TableCell>
              <TableCell>{research.name}</TableCell>
              <TableCell>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleEditItem(research.id)}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => openDeleteDialog(research)}
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

export default ResearchsTable;
