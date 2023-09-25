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
  Switch,
} from "@mui/material";
import dayjs from "dayjs";
import roles from "../../data/roles";

function UserTable({
  users,
  handleEditUser,
  openDeleteDialog,
  handleToggleActive,
}) {
  return (
    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ minWidth: 10 }}>STT</TableCell>
            <TableCell style={{ minWidth: 20 }}>Tên đăng nhập</TableCell>
            <TableCell style={{ minWidth: 20 }}>Họ và tên</TableCell>
            <TableCell style={{ minWidth: 50 }}>Email</TableCell>
            <TableCell style={{ minWidth: 20 }}>Ngày sinh</TableCell>
            <TableCell style={{ minWidth: 20 }}>Giới tính</TableCell>
            <TableCell style={{ minWidth: 50 }}>Số điện thoại</TableCell>
            <TableCell style={{ minWidth: 50 }}>Địa chỉ</TableCell>
            <TableCell style={{ minWidth: 30 }}>Ảnh đại diện</TableCell>
            <TableCell style={{ minWidth: 20 }}>Vai trò</TableCell>
            <TableCell style={{ minWidth: 30 }}>Ngày tham gia</TableCell>
            <TableCell style={{ minWidth: 20 }}>Đang hoạt động</TableCell>
            <TableCell style={{ minWidth: 50 }}>Lý lịch khoa học</TableCell>
            <TableCell style={{ minWidth: 50 }}>Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.full_name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{dayjs(user.birthday).format("DD/MM/YYYY")}</TableCell>
              <TableCell>{user.gender === "male" ? "Nam" : "Nữ"}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>
                {user.avatar ? (
                  <img
                    src={user.profile_picture}
                    alt="Avatar"
                    width="30"
                    height="30"
                  />
                ) : (
                  <img
                    src={require("../../assets/img/default-avatar.png")}
                    alt="Default Avatar"
                    width="30"
                    height="30"
                  />
                )}
              </TableCell>
              <TableCell>
                {roles.find((role) => role.value === user.role)?.label}
              </TableCell>
              <TableCell>
                {dayjs(user.date_joined).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell>
                <Switch
                  checked={user.is_active}
                  onChange={() => handleToggleActive(user)}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={null}
                >
                  Xem
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => handleEditUser(user)}
                >
                  Sửa
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => openDeleteDialog(user)}
                  sx={{ marginTop: "4px" }}
                >
                  Xóa
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserTable;
