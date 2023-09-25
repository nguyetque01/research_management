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
import positions from "../../data/positions";
import degrees from "../../data/degrees";

const textOverflowStyle = {
  padding: 0,
  margin: 0,
  maxWidth: 100,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

function AcademicProfileTable({
  academicProfiles,
  handleEditAcademicProfile,
  users,
}) {
  return (
    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ minWidth: 10 }}>STT</TableCell>
            <TableCell style={{ minWidth: 20 }}>Họ và tên</TableCell>
            <TableCell style={{ minWidth: 20 }}>Học hàm/Học vị</TableCell>
            <TableCell style={{ minWidth: 20 }}>Chức vụ</TableCell>
            <TableCell style={{ minWidth: 50 }}>Quá trình đào tạo</TableCell>
            <TableCell style={{ minWidth: 50 }}>Quá trình công tác</TableCell>
            <TableCell style={{ minWidth: 50 }}>Hoạt động nghiên cứu</TableCell>
            <TableCell style={{ minWidth: 50 }}>
              Xem thông tin cá nhân
            </TableCell>
            <TableCell style={{ minWidth: 50 }}>Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {academicProfiles.map((academicProfile, index) => (
            <TableRow key={academicProfile.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {
                  users.find((user) => user.id === academicProfile.user)
                    ?.full_name
                }
              </TableCell>
              <TableCell>
                {
                  degrees.find(
                    (degree) => degree.value === academicProfile.academic_degree
                  )?.label
                }
              </TableCell>
              <TableCell>
                {
                  positions.find(
                    (position) => position.value === academicProfile.position
                  )?.label
                }
              </TableCell>
              <TableCell>
                {academicProfile.education_history
                  .split("\n")
                  .map((line, index) => (
                    <p key={index} style={textOverflowStyle}>
                      {line}
                    </p>
                  ))}
              </TableCell>
              <TableCell>
                {academicProfile.work_history.split("\n").map((line, index) => (
                  <p key={index} style={textOverflowStyle}>
                    {line}
                  </p>
                ))}
              </TableCell>
              <TableCell>
                {academicProfile.research_activities
                  .split("\n")
                  .map((line, index) => (
                    <p key={index} style={textOverflowStyle}>
                      {line}
                    </p>
                  ))}
              </TableCell>
              <TableCell>
                <Button
                  size="small"
                  sx={{ fontSize: 12, padding: "4px" }}
                  onClick={null}
                >
                  Chi tiết
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => handleEditAcademicProfile(academicProfile)}
                >
                  Sửa
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AcademicProfileTable;
