import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Grid,
  MenuItem,
} from "@mui/material";

export default function ResearchActivityCategoryForm({
  category,
  currentCategories,
  setCurrentCategories,
  setCategoriesToUpdate,
  index,
  units,
}) {
  const [isVisible, setIsVisible] = useState(true);

  // Khi người dùng thay đổi form
  const handleChange = () => {};

  // Khi người dùng xóa phân loại
  const handleDelete = () => {
    setCurrentCategories((prevCurrentCategories) =>
      prevCurrentCategories.filter((item) => item !== category)
    );
    setIsVisible(false);
  };
  return (
    <>
      {isVisible && (
        <div>
          <Typography sx={{ fontSize: 16, color: "#333" }}>
            Phân loại {index + 1}
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: "0px" }}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                name="name"
                label="Phân loại"
                value={category?.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                name="total_hours"
                label="Tổng số giờ"
                value={category?.total_hours}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={2}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p>
                giờ <span style={{ fontSize: 20 }}>/</span>
              </p>
            </Grid>
            <Grid item xs={12} sm={5}>
              <FormControl fullWidth>
                <InputLabel id="unit-label">Đơn vị tính</InputLabel>
                <Select
                  labelId="unit-label"
                  id="unit"
                  name="unit"
                  value={category?.unit}
                  onChange={handleChange}
                  label="Đơn vị tính"
                >
                  {units?.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <div
            style={{
              marginTop: 16,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={handleDelete}
            >
              Xóa phân loại
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
