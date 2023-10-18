import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserLoginStatus, setUserData } from "./actions/userActions";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Pages
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Login from "./pages/Login";
import AITool from "./pages/AITool";
import ResearchsRegistration from "./pages/ResearchsRegistration";
import ResearchsRegistrated from "./pages/ResearchsRegistrated";

// Profile Pages
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import ResearchActivitiesProfile from "./pages/profile/ResearchActivities";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import AcademicProfiles from "./pages/admin/AcademicProfiles";
import ResearchActivities from "./pages/admin/ResearchActivities";
import ResearchTopics from "./pages/admin/ResearchTopics";

// Admin General Pages
import AcademicYears from "./pages/admin/general/AcademicYears";
import Units from "./pages/admin/general/Units";
import LeadUnits from "./pages/admin/general/LeadUnits";
import Levels from "./pages/admin/general/Levels";
import ResearchTypes from "./pages/admin/general/ResearchTypes";
import ResearchActivityCategories from "./pages/admin/general/ResearchActivityCategories";

// Admin Resource Pages
import Researchs from "./pages/admin/resources/Researchs";
import Articles from "./pages/admin/resources/Articles";
import Books from "./pages/admin/resources/Books";
import Awards from "./pages/admin/resources/Awards";
import Tranfers from "./pages/admin/resources/Tranfers";
import ResearchActivitiesManager from "./pages/admin/ResearchActivitiesManager";
import ResearchTopicsManager from "./pages/admin/ResearchTopicsManager";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Kiểm tra xem có thông tin đăng nhập trong localStorage không
    const storedToken = localStorage.getItem("token");
    const storedUserData = localStorage.getItem("userData");

    if (storedToken && storedUserData) {
      // Nếu có thông tin đăng nhập, bạn có thể dispatch action để cập nhật Redux Store
      dispatch(setUserLoginStatus(true)); // Đánh dấu người dùng đã đăng nhập
      dispatch(setUserData(JSON.parse(storedUserData))); // Cập nhật thông tin người dùng từ localStorage
    } else {
      // Nếu không có thông tin đăng nhập trong localStorage, đảm bảo rằng Redux Store cũng đã được đặt lại để đánh dấu người dùng đã đăng xuất
      dispatch(setUserLoginStatus(false)); // Đánh dấu người dùng đã đăng xuất
    }
  }, [dispatch]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <Routes>
          <Route path="/" Component={Dashboard} />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/about" Component={About} />
          <Route path="/login" Component={Login} />
          <Route path="/profile" Component={Profile} />
          <Route path="/profile/edit" Component={EditProfile} />
          <Route
            path="/profile/activities"
            Component={ResearchActivitiesProfile}
          />
          <Route path="/ai-tool" Component={AITool} />
          <Route
            path="/research-activities/registration"
            Component={ResearchsRegistration}
          />
          <Route
            path="/research-activities/registrated"
            Component={ResearchsRegistrated}
          />

          {/* Admin */}
          <Route path="/admin/" Component={AdminDashboard} />
          <Route path="/admin/dashboard" Component={AdminDashboard} />
          <Route path="/admin/users" Component={Users} />
          <Route path="/admin/academic-profiles" Component={AcademicProfiles} />
          <Route
            path="/admin/research-activities"
            Component={ResearchActivities}
          />
          <Route path="/admin/research-topics" Component={ResearchTopics} />
          <Route
            path="/admin/research-activities-manager"
            Component={ResearchActivitiesManager}
          />
          <Route
            path="/admin/research-topics-manager"
            Component={ResearchTopicsManager}
          />
          <Route path="/admin/academic-years" Component={AcademicYears} />
          <Route path="/admin/units" Component={Units} />
          <Route path="/admin/lead-units" Component={LeadUnits} />
          <Route path="/admin/levels" Component={Levels} />
          <Route path="/admin/research-types" Component={ResearchTypes} />
          <Route
            path="/admin/research-activity-categories"
            Component={ResearchActivityCategories}
          />
          <Route path="/admin/resourses/researchs" Component={Researchs} />
          <Route path="/admin/resourses/articles" Component={Articles} />
          <Route path="/admin/resourses/books" Component={Books} />
          <Route path="/admin/resourses/awards" Component={Awards} />
          <Route path="/admin/resourses/tranfers" Component={Tranfers} />
        </Routes>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
