import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

function ResearchTopicForm({ open, onClose, onAddResearch }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleAddClick = () => {
    const newData = {
      name: name,
      description: description,
      category: category,
      // Add other fields here
    };
    onAddResearch(newData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Thêm đề tài nghiên cứu</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Vui lòng nhập thông tin đề tài nghiên cứu dưới đây:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Tên đề tài"
          type="text"
          fullWidth
          // variant="standard"
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          margin="dense"
          id="description"
          label="Mô tả"
          type="text"
          fullWidth
          // variant="standard"
          value={description}
          onChange={handleDescriptionChange}
        />
        <FormControl fullWidth style={{ marginTop: "8px" }}>
          <InputLabel htmlFor="category">Danh mục</InputLabel>
          <Select
            value={category}
            onChange={handleCategoryChange}
            label="Danh mục"
            inputProps={{
              name: "category",
              id: "category",
            }}
          >
            <MenuItem value="category1">Danh mục 1</MenuItem>
            <MenuItem value="category2">Danh mục 2</MenuItem>
            {/* Add more categories as needed */}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={handleAddClick}>Thêm</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ResearchTopicForm;
