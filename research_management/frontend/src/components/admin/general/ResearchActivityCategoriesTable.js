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
import { getCategoriesByResearchTypeId } from "../../../utils/commonUtils";
import AddIcon from "@mui/icons-material/Add";

function TableHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell style={{ minWidth: 20 }}>STT</TableCell>
        <TableCell style={{ minWidth: 100 }}>Loại hình nghiên cứu</TableCell>
        <TableCell style={{ minWidth: 100 }}>Phân loại</TableCell>
        <TableCell style={{ minWidth: 100 }}>Thao tác</TableCell>
        <TableCell style={{ minWidth: 150 }}>Thêm phân loại</TableCell>
      </TableRow>
    </TableHead>
  );
}

const TableRowComponent = ({
  index,
  researchType,
  researchActivityCategories,
  handleAddCategory,
  editingCategoryResearchType,
  setEditingCategoryResearchType,
}) => {
  const [categoriesByType, setCategoriesByType] = useState([]);
  const [rows, setRows] = useState(1);
  const [categoriesByTypeLength, setCategoriesByTypeLength] = useState(1);

  useEffect(() => {
    async function fetchActivityCategories() {
      try {
        const categoriesByTypeList = await getCategoriesByResearchTypeId(
          researchActivityCategories,
          researchType.id
        );
        setCategoriesByType(categoriesByTypeList);
        setCategoriesByTypeLength(categoriesByTypeList.length);
      } catch (error) {
        console.error("Lỗi khi tải danh sách phân loại hoạt động:", error);
      }
    }
    fetchActivityCategories();
  }, []);

  // Cập nhật rows khi researchActivityCategoriesLength thay đổi
  useEffect(() => {
    setRows(categoriesByTypeLength);
  }, [categoriesByTypeLength]);

  return (
    <>
      {categoriesByType?.length !== 0 ? (
        categoriesByType.map((category, categoryIndex) => (
          <TableRow key={researchType.id}>
            {categoryIndex === 0 && (
              <>
                <TableCell rowSpan={rows}>{index + 1}</TableCell>
                <TableCell rowSpan={rows}>{researchType?.name}</TableCell>
              </>
            )}

            <TableCell rowSpan={1}>{category.name}</TableCell>
            <TableCell rowSpan={1}>
              <ActionButton />
            </TableCell>
            {categoryIndex === 0 && (
              <>
                <TableCell rowSpan={rows}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleAddCategory(researchType)}
                    sx={{ padding: "4px" }}
                    startIcon={<AddIcon />}
                  >
                    Thêm phân loại
                  </Button>
                </TableCell>
              </>
            )}
          </TableRow>
        ))
      ) : (
        <TableRow key={researchType.id}>
          <TableCell>{index + 1}</TableCell>
          <TableCell colSpan={3}>{researchType.name}</TableCell>
          <TableCell>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleAddCategory(researchType)}
              sx={{ padding: "4px" }}
              startIcon={<AddIcon />}
            >
              Thêm phân loại
            </Button>
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
        // onClick={() => openDeleteDialog(type)}
        sx={{ marginLeft: "8px" }}
      >
        Sửa
      </Button>
      <Button
        variant="outlined"
        color="error"
        size="small"
        // onClick={() => openDeleteDialog(type)}
        sx={{ marginLeft: "8px" }}
      >
        Xóa
      </Button>
    </div>
  );
}

function ResearchActivityCategoriesTable({
  researchTypes,
  researchActivityCategories,
  handleAddCategory,
  editingCategoryResearchType,
  setEditingCategoryResearchType,
  //   handleEditItem,
  //   openDeleteDialog,
}) {
  return (
    <TableContainer component={Paper} sx={{ marginBottom: "40px" }}>
      <Table>
        <TableHeader />

        <TableBody>
          {researchTypes.map((researchType, index) => (
            <TableRowComponent
              index={index}
              researchType={researchType}
              researchActivityCategories={researchActivityCategories}
              handleAddCategory={handleAddCategory}
              editingCategoryResearchType={editingCategoryResearchType}
              setEditingCategoryResearchType={setEditingCategoryResearchType}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ResearchActivityCategoriesTable;
