export default function getFileName(fileUrl) {
  // Sử dụng phương thức split() để tách chuỗi thành một mảng dựa trên dấu /
  const parts = fileUrl.split("/");

  // Lấy phần tử cuối cùng trong mảng, đó chính là tên tệp
  return parts[parts.length - 1];
}
