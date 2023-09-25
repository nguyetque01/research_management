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
import getCategoriesByActivityId from "../utils/commonUtils";

function TableHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell style={{ minWidth: 20 }}>STT</TableCell>
        <TableCell style={{ minWidth: 50 }}>Tên hoạt động</TableCell>
        <TableCell style={{ minWidth: 50 }}>Năm học</TableCell>
        <TableCell style={{ minWidth: 50 }}>Cấp đề tài</TableCell>
        <TableCell style={{ minWidth: 50 }}>Đơn vị chủ trì</TableCell>
        <TableCell style={{ minWidth: 50 }}>Loại hình nghiên cứu</TableCell>
        <TableCell style={{ minWidth: 50 }}>Phân loại</TableCell>
        <TableCell style={{ minWidth: 50 }}>Tổng số giờ</TableCell>
        <TableCell style={{ minWidth: 50 }}>Đơn vị tính</TableCell>
        <TableCell style={{ minWidth: 50 }}>Đăng ký</TableCell>
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
  categories,
  units,
}) => {
  const [activityCategories, setActivityCategories] = useState([]);
  const [rows, setRows] = useState(1);
  const [activityCategoriesLength, setActivityCategoriesLength] = useState(1);

  useEffect(() => {
    async function fetchActivityCategories() {
      try {
        const activityCategoriesList = await getCategoriesByActivityId(
          categories,
          activity.id
        );
        console.log(activityCategoriesList);
        setActivityCategories(activityCategoriesList);
        setActivityCategoriesLength(activityCategoriesList.length);
      } catch (error) {
        console.error("Lỗi khi tải danh sách phân loại hoạt động:", error);
      }
    }
    fetchActivityCategories();
  }, []);

  useEffect(() => {
    setRows(activityCategoriesLength);
  }, [activityCategoriesLength]);

  return (
    <>
      {activityCategories?.length !== 0 ? (
        activityCategories.map((category, categoryIndex) => (
          <TableRow key={activity.id}>
            {categoryIndex === 0 && (
              <>
                <TableCell rowSpan={rows}>{index + 1}</TableCell>
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
            <TableCell rowSpan={1}>
              <ActionButton />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow key={activity.id}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{activity.name}</TableCell>
          <TableCell>{academicYear?.name}</TableCell>
          <TableCell>{level?.name}</TableCell>
          <TableCell>{leadUnit?.name}</TableCell>
          <TableCell>{researchType?.name}</TableCell>
          <TableCell />
          <TableCell>{activity.total_hours}</TableCell>
          <TableCell>{unit?.name}</TableCell>
          <TableCell>
            <ActionButton />
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

function ActionButton({}) {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        onClick={() => null}
      >
        Đăng ký
      </Button>
    </div>
  );
}

function ResearchRegistrationTable({
  data,
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

export default ResearchRegistrationTable;
