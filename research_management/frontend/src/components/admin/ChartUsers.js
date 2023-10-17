import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend} from 'recharts';
import { Grid, Divider  } from "@mui/material";
import fetchData from '../../utils/apiUtils';
import DEFAULT_BACKEND_URL from '../../config';
import * as d3 from "d3";

function ChartUsers() {
  const backendUrl = DEFAULT_BACKEND_URL;
  const [users, setUsers] = useState([]); // State để lưu danh sách người dùng
  const [genderData, setGenderData] = useState([]);

  ////// Gửi HTTP request để lấy danh sách user từ backend//////
  const fetchUsers = () =>
    fetchData(`${backendUrl}/api/users/`, setUsers);

    // Sử dụng useEffect để tự động gọi hàm fetchAwards khi component được tạo
    useEffect(() => {
        fetchUsers();
    }, []);

  //////Xử lý biểu đồ cột cho số lượng người có tài khoản trong tháng//////
  useEffect(() => {
    // Tính toán số lượng người tham gia mỗi tháng
    const userData = users.map((user) => ({
      ...user,
      month: new Date(user.date_joined).getMonth() + 1,
    }));
  
    const monthlyCounts = d3.rollup(
      userData,
      (v) => v.length,
      (d) => d.month
    );
  
    const data = Array.from(monthlyCounts, ([month, count]) => ({
      month,
      count,
    }));
  
    // Xóa bỏ các biểu đồ cũ
    d3.select("#chart").selectAll("*").remove();
  
    // Mảng các màu
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  
    // Vẽ biểu đồ sử dụng d3.js
    const margin = { top: 20, right: 30, bottom: 30, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;
  
    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.month))
      .range([0, width])
      .padding(0.1);
  
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count)])
      .nice()
      .range([height, 0]);
  
    const line = d3
      .line()
      .x((d) => x(d.month) + x.bandwidth() / 2)
      .y((d) => y(d.count));
  
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .append("text") // Thêm label cho trục x
      .attr("x", width / 2)
      .attr("y", margin.bottom - 10)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .attr("font-family", "Georgia, serif")
      .attr("font-size", "14px")
      .text("Tháng tham gia");
  
    svg
      .append("g")
      .call(d3.axisLeft(y).ticks(d3.max(data, (d) => d.count)))
      .append("text") // Thêm label cho trục y
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 10)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .attr("font-family", "Georgia, serif")
      .attr("font-size", "14px")
      .text("Số lượng người tham gia");
  
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);
  
    svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => x(d.month) + x.bandwidth() / 2)
      .attr("cy", (d) => y(d.count))
      .attr("r", 4)
      .attr("fill", "steelblue");
  
    }, [users]);

    //////Xử lý biểu đồ tròn tính số lượng nam nữ //////
    const COLORS = ['#0088FE', '#FF8042']; // Màu cho các phần
    useEffect(() => {
      // Tính toán dữ liệu về giới tính từ dữ liệu người dùng
      const calculateGenderData = () => {
      const maleCount = users.filter(user => user.gender === 'male').length;
      const femaleCount = users.filter(user => user.gender === 'female').length;
      const data = [
        { name: 'Nam', value: maleCount },
        { name: 'Nữ', value: femaleCount },
      ];
      setGenderData(data);
    };

      calculateGenderData();
  }, [users]);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text x={x} y={y} fill="white" textAnchor="middle">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={8} style={{boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", marginTop: "20px"}}>
        <p style={{color: "blue", fontWeight: "bold"}}>Biểu Đồ Cho Số Lượng Người Dùng Đã Có Tài Khoản Trong Tháng</p>
        <div id="chart"></div>
      </Grid>
      <Grid item xs={6} md={4}>
        <p style={{color: "blue", fontWeight: "bold"}}>Biểu Đồ Tỷ Lệ Giới Tính</p>
        <PieChart width={300} height={300}>
          <Pie
            data={genderData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            outerRadius={80}
            fill="#8884d8"
            labelLine={false}
            label={renderCustomizedLabel}
            style={{width: "200px", height: "100px", marginTop: "20px"}}
          >
            {genderData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend align="center" layout="vertical" verticalAlign="bottom" />
        </PieChart>
      </Grid>
    </Grid>
  );
}

export default ChartUsers;