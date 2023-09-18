import React from "react";
import { Container, Typography, Grid } from "@mui/material";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

function AdminDashboard() {
  return (
    <Grid container spacing={20}>
      {/* Sidebar */}
      <Grid item xs={2}>
        <AdminSidebar />
      </Grid>

      {/* Content */}
      <Grid item xs={10}>
        <AdminHeader />
        <Container sx={{ pt: 10, textAlign: "center" }}>
          <Typography variant="h4">Admin Dashboard</Typography>
        </Container>
      </Grid>
    </Grid>
  );
}

export default AdminDashboard;
