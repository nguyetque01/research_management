// Tạo một component mới, ví dụ Categories.js
import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

function Categories({ categories }) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Danh mục
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem key={category.id} alignItems="flex-start">
            <ListItemText primary={category.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Categories;
