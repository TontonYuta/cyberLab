import { Network, BookOpen, Code, Server, Radio, Shield } from 'lucide-react';
import React from 'react';

export const COURSE_CONFIG = {
  // Thông tin chung của khóa học
  appName: "Lập Trình Mạng Máy Tính",
  appIcon: Network, // Icon chính của ứng dụng
  themeColor: "#2563EB", // Xanh dương hiện đại, dễ nhìn, hợp chủ đề công nghệ
  
  // Các nhãn hiển thị trên giao diện
  labels: {
    searchPlaceholder: "Tìm kiếm bài học về mạng...",
    progress: "Tiến độ học tập",
    sessionPrefix: "BÀI",
    actionButton: "Chia sẻ",
    status: "Sẵn sàng học",
    commands: "Khái niệm / Lệnh / API mạng",
    exercises: "Bài thực hành từng bước",
    exerciseComplete: "Đánh dấu đã hoàn thành",
    exerciseCompleted: "Đã hoàn thành",
    quizzes: "Câu hỏi ôn tập",
    quizCheck: "Kiểm tra đáp án",
    quizCorrect: "Chính xác! Bạn đang tiến bộ rất tốt.",
    quizIncorrect: "Chưa đúng, nhưng không sao. Xem lại giải thích và thử lại nhé.",
  },

  // Cảnh báo / ghi chú ở cuối trang
  warning: {
    enabled: true,
    title: "Học đúng cách để đi xa",
    message:
      "Môn Lập trình mạng máy tính cần học từ gốc thật chắc: hiểu cách máy tính giao tiếp, cách client-server hoạt động, cách dữ liệu được gửi và nhận. Hãy ưu tiên hiểu bản chất trước khi code, vì đó là con đường nhanh nhất để trở thành kỹ sư giỏi thật sự."
  },

  // Icon cho từng loại bài học
  getCategoryIcon: (category: string): React.ReactNode => {
    switch (category) {
      case 'Theory':
        return React.createElement(BookOpen, { size: 14 });

      case 'Socket Programming':
        return React.createElement(Code, { size: 14 });

      case 'Client-Server':
        return React.createElement(Server, { size: 14 });

      case 'Protocol':
        return React.createElement(Radio, { size: 14 });

      case 'Network Security':
        return React.createElement(Shield, { size: 14 });

      default:
        return React.createElement(BookOpen, { size: 14 });
    }
  }
};