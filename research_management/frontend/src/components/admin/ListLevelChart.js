import React, { useState, useEffect } from 'react';
import { Grid } from "@mui/material";
import { Chart, registerables } from "chart.js";
import fetchData from '../../utils/apiUtils';
import DEFAULT_BACKEND_URL from '../../config';
import { useSelector } from "react-redux";

Chart.register(...registerables);

function ListLevelChart() {
  const backendUrl = DEFAULT_BACKEND_URL;
  const [dataList, setDataList] = useState([]);
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
  });
  const [levels, setLevels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector((state) => state.user.userData);

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

  async function fetchLevels() {
    try {
      await fetchData(
        `${backendUrl}/api/levels/`,
        setLevels,
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
        await Promise.all([
          fetchDataList(),
          fetchLevels(),
        ]);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchAllData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      drawChart();
    }
  }, [isLoading]);

  // Hàm vẽ biểu đồ sử dụng Chart.js
  const drawChart = () => {
    if (levels.length === 0 || dataList.length === 0) {
      return; // Ensure data is available before drawing the chart
    }
  
    const activitiesByLevel = levels.map((level) => {
      const count = dataList.filter((data) => data.level === level.id).length;
      return count;
    });
  
    const levelNames = levels.map((level) => level.name);
  
    const ctx = document.getElementById("chartCanvas").getContext("2d");
  
    // Check if a Chart instance exists and destroy it
    if (window.myChart) {
      window.myChart.destroy();
    }
  
    window.myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: levelNames,
        datasets: [
          {
            label: "Biểu đồ số lượng hoạt động theo mỗi cấp đề tài",
            data: activitiesByLevel,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Số lượng hoạt động",
              font: {
                size: 14,
              },
              color: "blue",
            },
          },
          x: {
            title: {
              display: true,
              text: "Cấp đề tài",
              font: {
                size: 14, 
              },
              color: "blue",
            },
          },
        },
      },
    });
  };
  

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", marginTop: "30px" }}>
        <canvas id="chartCanvas" width="400" height="150"></canvas>
      </Grid>
    </Grid>
  );
}

export default ListLevelChart;