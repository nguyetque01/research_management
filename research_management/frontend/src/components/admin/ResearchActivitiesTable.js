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
  setDataToExport,
  dataToExport,
} from "@mui/material";

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
  researchActivityDetails,
  units,
}) => {
  const [categoriesByResearchType, setCategoriesByResearchType] = useState([]);
  const [categoriesByResearchTypeLength, setCategoriesByResearchTypeLength] =
    useState(1);

  useEffect(() => {
    async function fetchCategoriesByResearchType() {
      try {
        const categoriesByResearchTypeList = categories.filter(
          (category) => category.research_type === researchType.id
        );
        setCategoriesByResearchType(categoriesByResearchTypeList);
        setCategoriesByResearchTypeLength(categoriesByResearchTypeList.length);
      } catch (error) {
        console.error("Lỗi khi tải danh sách phân loại hoạt động:", error);
      }
    }
    fetchCategoriesByResearchType();
  }, [categories, researchType.id]);

  return (
    <>
      {categoriesByResearchType?.length !== 0 ? (
        categoriesByResearchType.map((category, categoryIndex) => {
          return (
            <TableRow key={`${activity.id}_${category.id}`}>
              {categoryIndex === 0 && (
                <>
                  <TableCell rowSpan={categoriesByResearchTypeLength}>
                    {index + 1}
                  </TableCell>
                  <TableCell rowSpan={categoriesByResearchTypeLength}>
                    {activity.id}
                  </TableCell>
                  <TableCell rowSpan={categoriesByResearchTypeLength}>
                    {activity.name}
                  </TableCell>
                  <TableCell rowSpan={categoriesByResearchTypeLength}>
                    {academicYear?.name}
                  </TableCell>
                  <TableCell rowSpan={categoriesByResearchTypeLength}>
                    {level?.name}
                  </TableCell>
                  <TableCell rowSpan={categoriesByResearchTypeLength}>
                    {leadUnit?.name}
                  </TableCell>
                  <TableCell rowSpan={categoriesByResearchTypeLength}>
                    {researchType?.name}
                  </TableCell>
                </>
              )}
              <CategoryRows
                key={`${activity.id}_${category.id}`}
                category={category}
                activity={activity}
                researchActivityDetails={researchActivityDetails}
                units={units}
              />
              {categoryIndex === 0 && (
                <TableCell rowSpan={categoriesByResearchTypeLength}>
                  <ActionButton
                    handleEditItem={handleEditItem}
                    openDeleteDialog={openDeleteDialog}
                    activity={activity}
                  />
                </TableCell>
              )}
            </TableRow>
          );
        })
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

const CategoryRows = ({
  category,
  activity,
  researchActivityDetails,
  units,
}) => {
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const activityDetail = researchActivityDetails.find(
      (detail) =>
        detail.category === category.id && detail.activity === activity.id
    );
    setDetail(activityDetail);
  }, [category.id, activity.id, researchActivityDetails]);

  return (
    <>
      <TableCell>{category.name}</TableCell>
      <TableCell>{detail?.total_hours}</TableCell>
      <TableCell>
        {units.find((unit) => unit.id === detail?.unit)?.name}
      </TableCell>
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
  academicYears,
  units,
  leadUnits,
  levels,
  researchTypes,
  categories,
  researchActivityDetails,
  handleEditItem,
  setDataToExport,
  dataToExport,
}) {
  // Khởi tạo mảng exportDataExcel với hàng tiêu đề
  const exportDataExcel = [
    [
      "STT",
      "Tên hoạt động",
      "Năm học",
      "Cấp đề tài",
      "Đơn vị chủ trì",
      "Loại hình nghiên cứu",
      "Phân loại",
      "Tổng số giờ",
      "Đơn vị tính",
    ],
  ];

  data.forEach((activity, index) => {
    const academicYear = academicYears.find(
      (academic_year) => academic_year.id === activity.academic_year
    );
    const level = levels.find((level) => level.id === activity.level);
    const leadUnit = leadUnits.find(
      (lead_unit) => lead_unit.id === activity.lead_unit
    );
    const unit = units.find((unit) => unit.id === activity.unit);
    const researchType = researchTypes.find(
      (research_type) => research_type.id === activity.research_type
    );

    const categoriesByResearchType = categories.filter(
      (category) => category.research_type === activity.research_type
    );

    categoriesByResearchType.forEach((category, categoryIndex) => {
      const detail = researchActivityDetails.find(
        (detail) =>
          detail.category === category.id && detail.activity === activity.id
      );

      exportDataExcel.push([
        categoryIndex === 0 ? index + 1 : "",
        categoryIndex === 0 ? activity.name : "",
        categoryIndex === 0 ? academicYear?.name : "",
        categoryIndex === 0 ? level?.name : "",
        categoryIndex === 0 ? leadUnit?.name : "",
        categoryIndex === 0 ? researchType?.name : "",
        category.name,
        detail?.total_hours || "",
        units.find((unit) => unit.id === detail?.unit)?.name || "",
      ]);
    });
  });

  // In mảng dữ liệu xuống console để kiểm tra
  console.log(exportDataExcel);

  useEffect(() => {
    setDataToExport([...exportDataExcel]);
  }, [dataToExport]);

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
                researchActivityDetails={researchActivityDetails}
                units={units}
                handleEditItem={handleEditItem}
              />
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ResearchActivitiesTable;
