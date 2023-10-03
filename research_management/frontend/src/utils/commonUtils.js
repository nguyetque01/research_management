export default function getCategoriesByActivityId(categories, activityId) {
  // Tạo một mảng để lưu trữ kết quả
  const result = [];

  // Lặp qua mảng categories
  for (const category of categories) {
    // Kiểm tra xem research_activity của phần tử hiện tại có trùng với activityId không
    if (category.research_activity === activityId) {
      // Nếu trùng, thêm phần tử này vào kết quả
      result.push(category);
    }
  }
  return result;
}

export function getCategoriesByResearchTypeId(categories, typeId) {
  // Tạo một mảng để lưu trữ kết quả
  const result = [];

  // Lặp qua mảng categories
  for (const category of categories) {
    // Kiểm tra xem research_type của phần tử hiện tại có trùng với typeId không
    if (category.research_type === typeId) {
      // Nếu trùng, thêm phần tử này vào kết quả
      result.push(category);
    }
  }
  return result;
}

export function getDetailsByActivityId(details, activityId) {
  // Tạo một mảng để lưu trữ kết quả
  const result = [];

  // Lặp qua mảng details
  for (const detail of details) {
    // Kiểm tra xem research_type của phần tử hiện tại có trùng với activityId không
    if (detail.research_type === activityId) {
      // Nếu trùng, thêm phần tử này vào kết quả
      result.push(detail);
    }
  }
  return result;
}
