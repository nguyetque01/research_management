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
import levels from "../../../data/levels";
import awardCategories from "../../../data/awardCategories";
import ranks from "../../../data/ranks";

function AwardsTable({ award, handleEditItem, openDeleteDialog }) {
  return (
    <TableContainer component={Paper} sx={{ marginBottom: "40px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ minWidth: 50 }}>STT</TableCell>
            <TableCell style={{ minWidth: 50 }}>Mã giải thưởng</TableCell>
            <TableCell style={{ minWidth: 100 }}>Tên giải thưởng</TableCell>
            <TableCell style={{ minWidth: 100 }}>Mô tả</TableCell>
            <TableCell style={{ minWidth: 100 }}>Tác giả</TableCell>
            <TableCell style={{ minWidth: 100 }}>Cấp giải thưởng</TableCell>
            <TableCell style={{ minWidth: 100 }}>Phân loại</TableCell>
            <TableCell style={{ minWidth: 100 }}>Thứ hạng</TableCell>
            <TableCell style={{ minWidth: 100 }}>Ngày nhận giải</TableCell>
            <TableCell style={{ minWidth: 100 }}>File đính kèm</TableCell>
            <TableCell style={{ minWidth: 100 }}>Đường dẫn</TableCell>
            <TableCell style={{ minWidth: 100 }}>Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {award?.map((award, index) => (
            <TableRow key={award.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{award.id}</TableCell>
              <TableCell>{award.title}</TableCell>
              <TableCell>{award.description}</TableCell>
              <TableCell>{award.authors}</TableCell>
              <TableCell>
                {
                  levels.find((level) => level.value === award.award_level)
                    ?.label
                }
              </TableCell>
              <TableCell>
                {
                  awardCategories.find(
                    (category) => category.value === award.award_category
                  )?.label
                }
              </TableCell>
              <TableCell>
                {ranks.find((rank) => rank.value === award.award_rank)?.label}
              </TableCell>
              <TableCell>{award.award_received_date}</TableCell>
              <TableCell>
                {award.attachments
                  ? getFileName(award.attachments)
                  : "Chưa có tập tin"}
              </TableCell>
              <TableCell>{award.url}</TableCell>
              <TableCell>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleEditItem(award.id)}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => openDeleteDialog(award)}
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

export default AwardsTable;
