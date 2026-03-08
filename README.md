# CyberLab 100

CyberLab 100 là một nền tảng học tập trực tuyến về An toàn thông tin (Cybersecurity) được thiết kế với giao diện mang phong cách hacker (hacker aesthetic). Ứng dụng cung cấp các bài học từ cơ bản đến nâng cao, kết hợp với các bài thực hành (Lab) và dự án thực tế.

## 1. Hướng dẫn học tập

Để đạt hiệu quả tốt nhất khi học với CyberLab 100, bạn nên:
- **Học theo lộ trình:** Bắt đầu từ Module 1 và tiến dần đến các Module tiếp theo. Các kiến thức được xây dựng dựa trên nhau.
- **Thực hành liên tục:** Đừng chỉ đọc lý thuyết. Hãy mở Terminal/Command Prompt và gõ lại các lệnh được hướng dẫn trong phần "Terminal Commands".
- **Làm bài tập Lab:** Các bài tập Lab là cơ hội để bạn áp dụng kiến thức vào thực tế. Hãy cố gắng tự hoàn thành trước khi xem đáp án.
- **Kiểm tra kiến thức:** Cuối mỗi bài học hoặc module sẽ có phần Quiz. Hãy làm để ôn tập lại những gì đã học.
- **An toàn là trên hết:** Chỉ thực hành tấn công trên các môi trường giả lập (như máy ảo của bạn, OWASP Juice Shop, v.v.). Không bao giờ tấn công các hệ thống thực tế mà không có sự cho phép.

## 2. Cập nhật nội dung bài học

Nội dung bài học được lưu trữ dưới dạng các object TypeScript trong thư mục `src/data/sessions/`.

Để cập nhật nội dung một bài học hiện có:
1. Mở file tương ứng với module chứa bài học đó (ví dụ: `src/data/sessions/module1.ts`).
2. Tìm đến bài học (session) bạn muốn sửa thông qua thuộc tính `id` hoặc `title`.
3. Chỉnh sửa các trường nội dung như `title`, `description`, `content`, `commands`, `exercises`, hoặc `quizzes`.
4. Lưu file. Ứng dụng sẽ tự động cập nhật nội dung mới.

Ví dụ cấu trúc một bài học:
```typescript
{
  id: 'session-id',
  day: 1,
  category: 'Theory', // 'Theory' | 'Practice' | 'Lab' | 'Assembly'
  title: 'Tên bài học',
  description: 'Mô tả ngắn gọn',
  content: 'Nội dung chi tiết của bài học (có thể dùng markdown hoặc text thuần)',
  commands: [
    { name: 'Tên lệnh', description: 'Mô tả lệnh', usage: 'cú pháp lệnh' }
  ],
  exercises: [
    { title: 'Tên bài tập', description: 'Mô tả', steps: ['Bước 1', 'Bước 2'] }
  ],
  quizzes: [
    {
      question: 'Câu hỏi?',
      options: [
        { id: 'A', text: 'Lựa chọn A', isCorrect: true },
        { id: 'B', text: 'Lựa chọn B' }
      ],
      explanation: 'Giải thích đáp án'
    }
  ]
}
```

## 3. Thêm bài học mới

Để thêm một bài học mới vào một module hiện có:
1. Mở file module tương ứng (ví dụ: `src/data/sessions/module1.ts`).
2. Thêm một object bài học mới vào mảng `sessions` của module đó, tuân theo cấu trúc như ở phần 2.
3. Đảm bảo `id` của bài học là duy nhất.

Để thêm một **Module mới**:
1. Tạo một file mới trong `src/data/sessions/` (ví dụ: `module6.ts`).
2. Định nghĩa và export module mới:
   ```typescript
   import { Module } from '../../types';
   export const MODULE_6: Module = {
     id: 'module-6',
     title: 'Tên Module Mới',
     sessions: [ /* các bài học */ ]
   };
   ```
3. Mở file `src/data/sessions.ts`.
4. Import module mới và thêm vào mảng `ALL_MODULES`:
   ```typescript
   import { MODULE_6 } from './sessions/module6';
   // ...
   export const ALL_MODULES: Module[] = [
     MODULE_1,
     // ...
     MODULE_6
   ];
   ```

## 4. Cách Build thành ứng dụng di động (APK)

Vì CyberLab 100 được xây dựng bằng React (Vite) dưới dạng một ứng dụng web (SPA), bạn có thể dễ dàng chuyển đổi nó thành ứng dụng Android (APK) bằng **Capacitor**.

**Bước 1: Build ứng dụng web**
Chạy lệnh sau để tạo thư mục `dist` chứa code đã được tối ưu hóa:
```bash
npm run build
```

**Bước 2: Cài đặt Capacitor**
Cài đặt Capacitor CLI và các thư viện core:
```bash
npm install @capacitor/core
npm install @capacitor/cli --save-dev
```

**Bước 3: Khởi tạo Capacitor**
```bash
npx cap init
```
- Tên ứng dụng: `CyberLab 100`
- App ID: `com.cyberlab.app` (hoặc tên miền của bạn)
- Web asset directory: `dist`

**Bước 4: Thêm nền tảng Android**
Cài đặt package Android cho Capacitor:
```bash
npm install @capacitor/android
npx cap add android
```

**Bước 5: Đồng bộ code web sang Android**
Mỗi khi bạn build lại web (`npm run build`), hãy chạy lệnh này để copy code mới sang thư mục Android:
```bash
npx cap sync
```

**Bước 6: Build APK**
Mở project Android bằng Android Studio:
```bash
npx cap open android
```
Trong Android Studio:
1. Đợi Gradle sync xong.
2. Chọn **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
3. Sau khi build xong, Android Studio sẽ hiện thông báo có link để mở thư mục chứa file `.apk`.

*(Lưu ý: Bạn cần cài đặt sẵn Android Studio và Android SDK trên máy tính để thực hiện bước 6).*
