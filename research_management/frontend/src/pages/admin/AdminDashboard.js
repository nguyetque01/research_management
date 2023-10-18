import React from "react";
import { Container, Typography, Grid } from "@mui/material";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import DashboardGrid from "../../components/admin/DashboarGrid";
import ChartUsers from "../../components/admin/ChartUsers";
import DashboardAward from "../../components/admin/DashboardAward";
import ListLevelChart from "../../components/admin/ListLevelChart";

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
        <Container sx={{ pt: 5, textAlign: "center" }}>
          {/* <Typography
            variant="h4"
            sx={{ textAlign: "left", marginBottom: "10px", color: "blue" }}
          >
            Admin Dashboard
          </Typography> */}
          <DashboardGrid />
          <ChartUsers />
          <ListLevelChart />
          <DashboardAward />
        </Container>
      </Grid>
    </Grid>
  );
}

export default AdminDashboard;
