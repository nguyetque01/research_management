import React, { useState, useEffect } from "react";
import { Grid, Modal, Snackbar, Alert, Container } from "@mui/material";
import DEFAULT_BACKEND_URL from "../../config";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AcademicProfileTable from "../../components/admin/AcademicProfileTable";
import AcademicProfileForm from "../../components/admin/AcademicProfileForm";
import fetchData, { fetchDataById, addUpdateData } from "../../utils/apiUtils";

function AcademicProfiles() {
  const backendUrl = DEFAULT_BACKEND_URL;
  const [academicProfiles, setAcademicProfiles] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAcademicProfileModalOpen, setIsAcademicProfileModalOpen] =
    useState(false);
  const [editingAcademicProfile, setEditingAcademicProfile] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
  });

  // Gửi HTTP request để lấy danh sách lý lịch khoa học từ backend
  async function fetchAcademicProfiles() {
    try {
      await fetchData(
        `${backendUrl}/api/academic-profiles/`,
        setAcademicProfiles,
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
          fetchAcademicProfiles(),
          fetchData(`${backendUrl}/api/users/`, setUsers),
        ]);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchAllData();
  }, []);

  // Đóng modal hiển thị form sửa lý lịch khoa học
  const handleCloseModal = () => {
    setIsAcademicProfileModalOpen(false);
    setEditingAcademicProfile(null);
  };

  // Xử lý khi muốn chỉnh sửa lý lịch khoa học
  const handleEditAcademicProfile = async (academicProfile) => {
    try {
      await fetchDataById(
        `${backendUrl}/api/academic-profile`,
        academicProfile.id,
        setEditingAcademicProfile,
        setNotification
      );
      await fetchDataById(
        `${backendUrl}/api/user`,
        academicProfile.user,
        setEditingUser,
        setNotification
      );
      setIsAcademicProfileModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  // Xử lý khi submit form sửa lý lịch khoa học
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addUpdateData(
        `${backendUrl}/api/academic-profile`,
        editingAcademicProfile,
        "Cập nhật lý lịch khoa học thành công",
        fetchAcademicProfiles,
        setNotification
      );
      setEditingAcademicProfile(null);

      setIsAcademicProfileModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Hiển thị giao diện
  return (
    <div>
      <Grid container spacing={20}>
        <Grid item xs={2}>
          <AdminSidebar />
        </Grid>
        <Grid item xs={10}>
          <AdminHeader />
          <Container>
            <h2>Quản lý lý lịch khoa học</h2>

            <Modal
              open={isAcademicProfileModalOpen}
              onClose={handleCloseModal}
              aria-labelledby="add-academicProfile-modal-title"
              aria-describedby="add-academicProfile-modal-description"
            >
              <AcademicProfileForm
                editingAcademicProfile={editingAcademicProfile}
                setEditingAcademicProfile={setEditingAcademicProfile}
                editingUser={editingUser}
                handleSubmit={handleSubmit}
                onClose={handleCloseModal}
              />
            </Modal>
            <AcademicProfileTable
              academicProfiles={academicProfiles}
              handleEditAcademicProfile={handleEditAcademicProfile}
              users={users}
            />
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
        </Grid>
      </Grid>
    </div>
  );
}

export default AcademicProfiles;
