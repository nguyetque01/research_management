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

function AcademicYearsTable({ data, handleEditItem, openDeleteDialog }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ minWidth: 50 }}>STT</TableCell>
            <TableCell style={{ minWidth: 50 }}>Mã năm học</TableCell>
            <TableCell style={{ minWidth: 100 }}>Năm học</TableCell>
            <TableCell style={{ minWidth: 100 }}>Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((academicYear, index) => (
            <TableRow key={academicYear.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{academicYear.id}</TableCell>
              <TableCell>{academicYear.name}</TableCell>
              <TableCell>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleEditItem(academicYear.id)}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => openDeleteDialog(academicYear)}
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

export default AcademicYearsTable;
