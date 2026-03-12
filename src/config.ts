import { Terminal, BookOpen, Code, Monitor, Cpu, Shield } from 'lucide-react';
import React from 'react';

export const COURSE_CONFIG = {
  // Thông tin chung của khóa học
  appName: "CyberLab 100",
  appIcon: Terminal, // Icon chính của ứng dụng (từ lucide-react)
  themeColor: "#00FF41", // Màu chủ đạo (mặc định là xanh hacker)
  
  // Cấu hình các nhãn (labels) hiển thị trên UI
  labels: {
    searchPlaceholder: "Tìm kiếm bài học...",
    progress: "Tiến độ học tập",
    sessionPrefix: "BUỔI",
    actionButton: "Chia sẻ",
    status: "Offline",
    commands: "Terminal Commands", // Tiêu đề phần lệnh (có thể đổi thành "Mã nguồn", "Từ vựng", v.v.)
    exercises: "Thực hành Lab", // Tiêu đề phần bài tập
    exerciseComplete: "Hoàn thành thử thách",
    exerciseCompleted: "Đã hoàn thành",
    quizzes: "Kiểm tra kiến thức",
    quizCheck: "Kiểm tra đáp án",
    quizCorrect: "Chính xác!",
    quizIncorrect: "Chưa đúng rồi.",
  },

  // Cảnh báo ở cuối trang (Có thể tắt nếu học môn khác không cần cảnh báo)
  warning: {
    enabled: true,
    title: "An toàn là trên hết",
    message: "Mọi hành động tấn công mạng không có sự cho phép là vi phạm pháp luật. CyberLab 100 chỉ phục vụ mục đích giáo dục và nghiên cứu trong môi trường Lab ảo cô lập."
  },

  // Hàm lấy icon cho từng thể loại bài học (category)
  getCategoryIcon: (category: string): React.ReactNode => {
    switch (category) {
      case 'Theory': return React.createElement(BookOpen, { size: 14 });
      case 'Practice': return React.createElement(Code, { size: 14 });
      case 'Lab': return React.createElement(Monitor, { size: 14 });
      case 'Assembly': return React.createElement(Cpu, { size: 14 });
      default: return React.createElement(BookOpen, { size: 14 });
    }
  }
};
