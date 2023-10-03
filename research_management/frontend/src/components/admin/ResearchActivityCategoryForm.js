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
  index,
  units,
  editingData,
  researchActivityDetails,
  handleChange,
}) {
  const [detail, setDetail] = useState(null);

  const getDetailByActivityCategory = (activity, category) => {
    const activityDetail = researchActivityDetails.find(
      (detail) =>
        detail?.activity === activity?.id && detail?.category === category?.id
    );
    return activityDetail;
  };

  useEffect(() => {
    const activityDetail = getDetailByActivityCategory(editingData, category);
    setDetail(activityDetail);
  }, [editingData, category, researchActivityDetails]);

  return (
    <div>
      <Typography sx={{ fontSize: 16, color: "#333", marginTop: 2 }}>
        Phân loại {index + 1}: {category?.name}
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: 0 }}>
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            name="total_hours"
            label="Tổng số giờ"
            value={detail?.total_hours || ""}
            onChange={(e) => handleChange(e, category.id)}
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
              value={detail?.unit || ""}
              onChange={(e) => handleChange(e, category.id)}
              label="Đơn vị tính"
            >
              {units &&
                units.map((unit) => (
                  <MenuItem key={unit.id} value={unit.id}>
                    {unit.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}
