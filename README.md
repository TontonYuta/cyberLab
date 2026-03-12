# 🚀 Nền tảng Học tập Trực tuyến (Course App Template)

Đây là một template ứng dụng học tập trực tuyến linh hoạt, giao diện hiện đại (Dark Mode mặc định), được thiết kế để bạn có thể **tạo ra một ứng dụng dạy học cho bất kỳ môn học nào** (Tiếng Anh, Lập trình, Toán học, Kỹ năng mềm...) mà **không cần phải sửa code giao diện**.

Mọi thứ từ màu sắc, tên ứng dụng, icon cho đến các tiêu đề nút bấm đều được quản lý tập trung tại một file cấu hình duy nhất.

---

## ✨ Tính năng nổi bật

- 🎨 **Tùy chỉnh 100% qua Config:** Đổi môn học, đổi màu sắc, đổi icon chỉ trong 1 file.
- 📱 **Responsive Design:** Hoạt động hoàn hảo trên cả Máy tính, Máy tính bảng và Điện thoại.
- 📊 **Theo dõi tiến độ:** Tự động tính toán % hoàn thành khóa học dựa trên các bài tập đã làm.
- 📝 **Hỗ trợ đa dạng nội dung:** Lý thuyết, Bảng lệnh (Commands/Từ vựng), Bài tập từng bước (Exercises), và Trắc nghiệm (Quizzes) có giải thích đáp án.
- 🚀 **Sẵn sàng cho Mobile:** Tích hợp sẵn hướng dẫn build thành file APK cho Android.

---

## 📂 Cấu trúc thư mục quan trọng

Bạn chỉ cần quan tâm đến 2 thư mục chính để tùy chỉnh ứng dụng:

```text
src/
├── config.ts              <-- ⚙️ NƠI ĐỔI TÊN MÔN HỌC, MÀU SẮC, ICON
└── data/
    ├── sessions.ts        <-- 📚 Nơi khai báo danh sách các Chương (Modules)
    └── sessions/          <-- 📄 Nơi chứa nội dung chi tiết của từng bài học
        ├── module1.ts
        ├── module2.ts
        └── ...
```

---

## 🛠️ BƯỚC 1: Tùy chỉnh Ứng dụng (Đổi môn học)

Mở file `src/config.ts`. Đây là "trái tim" của template. Bạn hãy thay đổi các giá trị trong này để biến ứng dụng thành môn học của bạn.

**Ví dụ: Biến app thành ứng dụng học Tiếng Anh (English Mastery)**

```typescript
import { BookA, BookOpen, Headphones, PenTool, MessageCircle } from 'lucide-react';

export const COURSE_CONFIG = {
  appName: "English Mastery",       // Tên ứng dụng
  appIcon: BookA,                   // Icon chính (lấy từ lucide-react)
  themeColor: "#3B82F6",            // Màu chủ đạo (VD: Xanh dương)
  
  labels: {
    searchPlaceholder: "Tìm kiếm bài học...",
    progress: "Tiến độ học tập",
    sessionPrefix: "BÀI",           // Thay vì "BUỔI"
    actionButton: "Chia sẻ",        // Thay cho nút Tài liệu PDF
    status: "Offline",
    commands: "Từ vựng mới",        // Đổi "Terminal Commands" thành "Từ vựng"
    exercises: "Bài tập thực hành", // Đổi "Thực hành Lab" thành "Bài tập"
    exerciseComplete: "Đánh dấu hoàn thành",
    exerciseCompleted: "Đã hoàn thành",
    quizzes: "Kiểm tra ngữ pháp",
    quizCheck: "Kiểm tra đáp án",
    quizCorrect: "Chính xác! 🎉",
    quizIncorrect: "Chưa đúng rồi, thử lại nhé.",
  },

  warning: {
    enabled: false, // Tắt cảnh báo an ninh mạng vì học Tiếng Anh không cần
    title: "",
    message: ""
  },

  getCategoryIcon: (category: string) => {
    // Tùy chỉnh icon cho các loại bài học của bạn
    switch (category) {
      case 'Grammar': return <BookOpen size={14} />;
      case 'Vocabulary': return <PenTool size={14} />;
      case 'Listening': return <Headphones size={14} />;
      case 'Speaking': return <MessageCircle size={14} />;
      default: return <BookOpen size={14} />;
    }
  }
};
```

---

## 📝 BƯỚC 2: Viết nội dung bài học

Nội dung bài học được lưu trong thư mục `src/data/sessions/`. Mỗi file đại diện cho một Chương (Module) chứa nhiều Bài học (Sessions).

Dưới đây là **Template chuẩn của một Bài học (Session)** để bạn copy-paste:

```typescript
{
  id: 'bai-1-id-duy-nhat',
  day: 1, // Số thứ tự bài học
  category: 'Grammar', // Thể loại (sẽ map với getCategoryIcon ở config.ts)
  title: 'Thì Hiện Tại Đơn (Present Simple)',
  description: 'Học cách diễn tả thói quen và sự thật hiển nhiên.',
  
  // 1. NỘI DUNG CHÍNH (Hỗ trợ xuống dòng bằng \n)
  content: `Thì hiện tại đơn được dùng để diễn tả:
1. Một thói quen lặp đi lặp lại.
2. Một sự thật hiển nhiên.

Cấu trúc: S + V(s/es) + O`,

  // 2. DANH SÁCH TỪ VỰNG / LỆNH (Tùy chọn)
  commands: [
    { 
      name: 'Always', 
      description: 'Trạng từ chỉ tần suất', 
      usage: 'I always wake up at 6 AM.' 
    },
    { 
      name: 'Usually', 
      description: 'Trạng từ chỉ tần suất', 
      usage: 'She usually goes to school by bus.' 
    }
  ],

  // 3. BÀI TẬP TỪNG BƯỚC (Tùy chọn)
  exercises: [
    {
      title: 'Luyện tập chia động từ',
      description: 'Làm theo các bước sau để hoàn thành bài tập',
      steps: [
        'Đọc kỹ chủ ngữ của câu (Số ít hay số nhiều?).',
        'Thêm "s" hoặc "es" nếu chủ ngữ là ngôi thứ 3 số ít (He, She, It).',
        'Kiểm tra lại câu hoàn chỉnh.'
      ]
    }
  ],

  // 4. TRẮC NGHIỆM (Tùy chọn)
  quizzes: [
    {
      question: 'Chọn đáp án đúng: He ___ to the gym every day.',
      options: [
        { id: 'A', text: 'go', isCorrect: false },
        { id: 'B', text: 'goes', isCorrect: true },
        { id: 'C', text: 'going', isCorrect: false }
      ],
      explanation: 'Vì chủ ngữ là "He" (ngôi thứ 3 số ít) nên động từ "go" phải thêm "es".'
    }
  ]
}
```

---

## 📚 BƯỚC 3: Quản lý các Chương (Modules)

Sau khi tạo xong file nội dung (VD: `src/data/sessions/module_grammar.ts`), bạn cần khai báo nó để ứng dụng nhận diện.

Mở file `src/data/sessions.ts` và thêm module của bạn vào mảng `ALL_MODULES`:

```typescript
import { MODULE_GRAMMAR } from './sessions/module_grammar';
import { MODULE_VOCAB } from './sessions/module_vocab';

export const ALL_MODULES: Module[] = [
  MODULE_GRAMMAR,
  MODULE_VOCAB,
  // Thêm các module khác vào đây...
];
```

---

## 📱 BƯỚC 4: Xuất bản ứng dụng (Build)

### 1. Build thành trang web (Web App)
Chạy lệnh sau để tạo thư mục `dist` chứa code đã được tối ưu hóa để đưa lên hosting (Vercel, Netlify, GitHub Pages...):
```bash
npm run build
```

### 2. Build thành ứng dụng Android (APK)
Template này đã sẵn sàng để chuyển đổi thành App Android bằng **Capacitor**.

**Cài đặt lần đầu:**
```bash
npm install @capacitor/core
npm install @capacitor/cli --save-dev
npx cap init "Tên App Của Bạn" "com.tenban.app" --web-dir dist
npm install @capacitor/android
npx cap add android
```

**Mỗi khi bạn cập nhật nội dung mới:**
1. Build lại web: `npm run build`
2. Đồng bộ sang Android: `npx cap sync`
3. Mở Android Studio để xuất file APK: `npx cap open android`
   *(Trong Android Studio: Chọn Build > Build Bundle(s) / APK(s) > Build APK(s))*

---

🎉 **Chúc bạn tạo ra những ứng dụng học tập tuyệt vời!**
