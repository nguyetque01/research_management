import React, { useState, useEffect } from "react";
import { Button, Grid, Modal, Snackbar, Alert, Container } from "@mui/material";
import ResearchsRegistrationTable from "../components/ResearchsRegistrationTable";
import DEFAULT_BACKEND_URL from "../config";
import fetchData from "../utils/apiUtils";
import Header from "../components/Header";
import AddIcon from "@mui/icons-material/Add";

function ResearchsRegistration() {
  const backendUrl = DEFAULT_BACKEND_URL;
  const pageTitle = "Đăng ký hoạt động nghiên cứu khoa học";
  const dataLabel = "hoạt động";
  const [dataList, setDataList] = useState([]);
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
  });
  const [academicYears, setAcademicYears] = useState([]);
  const [users, setUsers] = useState([]);
  const [units, setUnits] = useState([]);
  const [leadUnits, setLeadUnits] = useState([]);
  const [levels, setLevels] = useState([]);
  const [researchTypes, setResearchTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Gửi HTTP request để lấy danh sách data từ backend
  async function fetchDataList() {
    try {
      await fetchData(
        `${backendUrl}/api/research-activities/`,
        setDataList,
        setNotification
      );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        // Sử dụng Promise.all để đợi cho tất cả các cuộc gọi bất đồng bộ hoàn thành
        await Promise.all([
          fetchDataList(),
          fetchData(`${backendUrl}/api/academic-years/`, setAcademicYears),
          fetchData(`${backendUrl}/api/units/`, setUnits),
          fetchData(`${backendUrl}/api/lead-units/`, setLeadUnits),
          fetchData(`${backendUrl}/api/levels/`, setLevels),
          fetchData(`${backendUrl}/api/research-types/`, setResearchTypes),
          fetchData(`${backendUrl}/api/users/`, setUsers),
          fetchData(
            `${backendUrl}/api/research-activity-categories/`,
            setCategories
          ),
        ]);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchAllData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Hiển thị giao diện
  return (
    <div>
      <Header />
      <Container sx={{ paddingBottom: "40px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#333",
            textTransform: "uppercase",
            borderBottom: "1px solid #777",
            padding: "10px",
            textAlign: "center",
          }}
        >
          {pageTitle}
        </h2>

        <ResearchsRegistrationTable
          data={dataList}
          academicYears={academicYears}
          users={users}
          units={units}
          leadUnits={leadUnits}
          levels={levels}
          researchTypes={researchTypes}
          categories={categories}
          setCategories={setCategories}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "24px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={null}
            startIcon={<AddIcon />}
          >
            Đăng ký
          </Button>
        </div>
      </Container>

      <Snackbar
        open={notification.message !== ""}
        autoHideDuration={3000}
        onClose={() => setNotification({ type: "", message: "" })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert variant="filled" severity={notification.type}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ResearchsRegistration;
