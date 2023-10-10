import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";

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
        <TableCell style={{ minWidth: 50 }}>Chọn</TableCell>
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
  researchActivityDetails,
  units,
  handleCheckboxChange,
  registeredListByUser,
}) => {
  const [categoriesByResearchType, setCategoriesByResearchType] = useState([]);
  const [categoriesByResearchTypeLength, setCategoriesByResearchTypeLength] =
    useState(1);

  useEffect(() => {
    async function fetchCategoriesByResearchType() {
      try {
        const categoriesByResearchTypeList = categories.filter(
          (category) => category.research_type === researchType?.id
        );
        setCategoriesByResearchType(categoriesByResearchTypeList);
        setCategoriesByResearchTypeLength(categoriesByResearchTypeList.length);
      } catch (error) {
        console.error("Lỗi khi tải danh sách phân loại hoạt động:", error);
      }
    }
    fetchCategoriesByResearchType();
  }, [categories, researchType?.id]);

  // Hàm kiểm tra xem cặp activity và category có trong danh sách đã đăng ký của người dùng hay không
  const isPairRegistered = (activityId, categoryId) => {
    return registeredListByUser.some((item) => {
      return item.activity === activityId && item.category === categoryId;
    });
  };
  const isDisabled = isPairRegistered(activity?.id, null);
  console.log(isDisabled);
  return (
    <>
      {categoriesByResearchType?.length !== 0 ? (
        categoriesByResearchType.map((category, categoryIndex) => {
          const isDisabledWithCategory = isPairRegistered(
            activity?.id,
            category?.id
          );

          return (
            <TableRow key={`${activity?.id}_${category?.id}`}>
              {categoryIndex === 0 && (
                <>
                  <TableCell rowSpan={categoriesByResearchTypeLength}>
                    {index + 1}
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
                key={`${activity?.id}_${category?.id}`}
                category={category}
                activity={activity}
                researchActivityDetails={researchActivityDetails}
                units={units}
              />

              <TableCell rowSpan={1}>
                <Checkbox
                  disabled={isDisabledWithCategory} // Tắt checkbox nếu cặp đã đăng ký
                  defaultChecked={isDisabledWithCategory}
                  onChange={() =>
                    handleCheckboxChange(activity?.id, category?.id)
                  }
                />
              </TableCell>
            </TableRow>
          );
        })
      ) : (
        <TableRow key={activity?.id}>
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
            <Checkbox
              defaultChecked={isDisabled}
              disabled={isDisabled}
              onChange={() => handleCheckboxChange(activity?.id)}
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
        detail.category === category?.id && detail.activity === activity?.id
    );
    setDetail(activityDetail);
  }, [category?.id, activity?.id, researchActivityDetails]);

  return (
    <>
      <TableCell>{category.name}</TableCell>
      <TableCell>{detail?.total_hours}</TableCell>
      <TableCell>
        {units.find((unit) => unit?.id === detail?.unit)?.name}
      </TableCell>
    </>
  );
};

function ResearchRegistrationTable({
  data,
  academicYears,
  units,
  leadUnits,
  levels,
  researchTypes,
  categories,
  researchActivityDetails,
  handleCheckboxChange,
  registeredListByUser,
}) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHeader />
        <TableBody>
          {data.length > 0 ? (
            data.map((activity, index) => (
              <TableRowComponent
                key={activity?.id}
                index={index}
                activity={activity}
                academicYear={academicYears.find(
                  (academic_year) =>
                    academic_year?.id === activity.academic_year
                )}
                level={levels.find((level) => level?.id === activity.level)}
                leadUnit={leadUnits.find(
                  (lead_unit) => lead_unit?.id === activity.lead_unit
                )}
                unit={units.find((unit) => unit?.id === activity.unit)}
                researchType={researchTypes.find(
                  (research_type) =>
                    research_type?.id === activity.research_type
                )}
                categories={categories}
                researchActivityDetails={researchActivityDetails}
                units={units}
                handleCheckboxChange={handleCheckboxChange}
                registeredListByUser={registeredListByUser}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} align="center">
                Không tìm thấy kết quả phù hợp.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ResearchRegistrationTable;
