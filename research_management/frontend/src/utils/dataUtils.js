// Hàm để lọc danh sách đề tài dựa trên giá trị tìm kiếm
export function filterTopics(topics, searchValue) {
  return topics.filter((topic) =>
    topic.name.toLowerCase().includes(searchValue.toLowerCase())
  );
}

// Hàm để sắp xếp danh sách đề tài theo cột
export function sortTopics(topics, sortByColumn, sortOrder) {
  if (sortByColumn === "name") {
    return topics.sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  } else {
    return [...topics]; // Trường hợp mặc định không sắp xếp
  }
}
