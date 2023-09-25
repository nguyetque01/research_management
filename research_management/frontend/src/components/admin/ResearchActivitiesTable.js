import React, { useState, useEffect } from "react";
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
import getCategoriesByActivityId from "../../utils/commonUtils";

function TableHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell style={{ minWidth: 50 }}>STT</TableCell>
        <TableCell style={{ minWidth: 50 }}>Mã hoạt động</TableCell>
        <TableCell style={{ minWidth: 100 }}>Tên hoạt động</TableCell>
        <TableCell style={{ minWidth: 100 }}>Năm học</TableCell>
        <TableCell style={{ minWidth: 100 }}>Cấp đề tài</TableCell>
        <TableCell style={{ minWidth: 100 }}>Đơn vị chủ trì</TableCell>
        <TableCell style={{ minWidth: 100 }}>Loại hình nghiên cứu</TableCell>
        <TableCell style={{ minWidth: 100 }}>Phân loại</TableCell>
        <TableCell style={{ minWidth: 100 }}>Tổng số giờ</TableCell>
        <TableCell style={{ minWidth: 100 }}>Đơn vị tính</TableCell>
        <TableCell style={{ minWidth: 100 }}>Thao tác</TableCell>
      </TableRow>
    </TableHead>
  );
}

const TableRowComponent = ({
  activity,
  index,
  academicYear,
  level,
  leadUnit,
  unit,
  researchType,
  handleEditItem,
  openDeleteDialog,
  categories,
  units,
}) => {
  const [researchActivityCategories, setActivityCategories] = useState([]);
  const [rows, setRows] = useState(1);
  const [researchActivityCategoriesLength, setActivityCategoriesLength] =
    useState(1);

  useEffect(() => {
    async function fetchActivityCategories() {
      try {
        const researchActivityCategoriesList = await getCategoriesByActivityId(
          categories,
          activity.id
        );
        console.log(researchActivityCategoriesList);
        setActivityCategories(researchActivityCategoriesList);
        setActivityCategoriesLength(researchActivityCategoriesList.length);
      } catch (error) {
        console.error("Lỗi khi tải danh sách phân loại hoạt động:", error);
      }
    }
    fetchActivityCategories();
  }, []);

  // Cập nhật rows khi researchActivityCategoriesLength thay đổi
  useEffect(() => {
    setRows(researchActivityCategoriesLength);
  }, [researchActivityCategoriesLength]);

  return (
    <>
      {researchActivityCategories?.length !== 0 ? (
        researchActivityCategories.map((category, categoryIndex) => (
          <TableRow key={activity.id}>
            {categoryIndex === 0 && (
              <>
                <TableCell rowSpan={rows}>{index + 1}</TableCell>
                <TableCell rowSpan={rows}>{activity.id}</TableCell>
                <TableCell rowSpan={rows}>{activity.name}</TableCell>
                <TableCell rowSpan={rows}>{academicYear?.name}</TableCell>
                <TableCell rowSpan={rows}>{level?.name}</TableCell>
                <TableCell rowSpan={rows}>{leadUnit?.name}</TableCell>
                <TableCell rowSpan={rows}>{researchType?.name}</TableCell>
              </>
            )}
            <TableCell rowSpan={1}>{category.name}</TableCell>
            <TableCell rowSpan={1}>{category.total_hours}</TableCell>
            <TableCell rowSpan={1}>
              {units.find((unit) => unit.id === category.unit)?.name}
            </TableCell>
            {categoryIndex === 0 && (
              <TableCell rowSpan={rows}>
                <ActionButton
                  handleEditItem={handleEditItem}
                  openDeleteDialog={openDeleteDialog}
                  activity={activity}
                />
              </TableCell>
            )}
          </TableRow>
        ))
      ) : (
        <TableRow key={activity.id}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{activity.id}</TableCell>
          <TableCell>{activity.name}</TableCell>
          <TableCell>{academicYear?.name}</TableCell>
          <TableCell>{level?.name}</TableCell>
          <TableCell>{leadUnit?.name}</TableCell>
          <TableCell>{researchType?.name}</TableCell>
          <TableCell />
          <TableCell>{activity.total_hours}</TableCell>
          <TableCell>{unit?.name}</TableCell>
          <TableCell>
            <ActionButton
              handleEditItem={handleEditItem}
              openDeleteDialog={openDeleteDialog}
              activity={activity}
            />
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

function ActionButton({ handleEditItem, openDeleteDialog, activity }) {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        onClick={() => handleEditItem(activity.id)}
      >
        Sửa
      </Button>
      <Button
        variant="outlined"
        color="error"
        size="small"
        onClick={() => openDeleteDialog(activity)}
        sx={{ marginLeft: "8px" }}
      >
        Xóa
      </Button>
    </div>
  );
}

function ResearchActivitiesTable({
  data,
  handleEditItem,
  openDeleteDialog,
  academicYears,
  units,
  leadUnits,
  levels,
  researchTypes,
  categories,
}) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHeader />
        <TableBody>
          {data.map((activity, index) => (
            <>
              <TableRowComponent
                key={activity.id}
                index={index}
                activity={activity}
                academicYear={academicYears.find(
                  (academic_year) => academic_year.id === activity.academic_year
                )}
                level={levels.find((level) => level.id === activity.level)}
                leadUnit={leadUnits.find(
                  (lead_unit) => lead_unit.id === activity.lead_unit
                )}
                unit={units.find((unit) => unit.id === activity.unit)}
                researchType={researchTypes.find(
                  (research_type) => research_type.id === activity.research_type
                )}
                handleEditItem={handleEditItem}
                openDeleteDialog={openDeleteDialog}
                categories={categories}
                units={units}
              />
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ResearchActivitiesTable;
