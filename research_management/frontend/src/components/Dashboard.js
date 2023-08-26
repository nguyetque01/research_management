import React, { useEffect } from 'react';

function Dashboard() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect hoặc thực hiện xử lý khi chưa đăng nhập
    }
  }, []);

  return (
    <div className="dashboard-container">
      {/* Giao diện của trang Dashboard */}
    </div>
  );
}

export default Dashboard;
