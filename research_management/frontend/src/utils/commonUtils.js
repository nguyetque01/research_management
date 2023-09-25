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
