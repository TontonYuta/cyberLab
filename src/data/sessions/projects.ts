import { Module } from '../../types';

export const PROJECT_MODULES: Module[] = [
  {
    id: 'real-world-projects',
    title: 'Dự án thực tế & Thực hành chuyên sâu',
    sessions: [
      {
        id: 'project-1',
        day: 101,
        category: 'Lab',
        title: 'Dự án 1: Xây dựng hệ thống mạng doanh nghiệp an toàn (Blue Team)',
        description: 'Thiết kế và triển khai kiến trúc mạng bảo mật cho một công ty giả định.',
        content: `Mục tiêu:
Áp dụng các kiến thức về mạng, tường lửa, và hệ điều hành để xây dựng một hệ thống phòng thủ vững chắc.

Yêu cầu dự án:
1. Thiết kế sơ đồ mạng (Network Topology) chia các vùng: DMZ, Internal Network, Management Network.
2. Cài đặt pfSense làm Firewall/Router chính.
3. Cấu hình Windows Server làm Domain Controller (Active Directory).
4. Triển khai Snort/Suricata làm IDS/IPS để giám sát luồng mạng.
5. Cấu hình VPN (OpenVPN hoặc WireGuard) cho nhân viên làm việc từ xa.
6. Viết tài liệu thiết kế và hướng dẫn vận hành.`,
        exercises: [
          {
            title: 'Triển khai Firewall pfSense',
            description: 'Thiết lập tường lửa bảo vệ mạng nội bộ.',
            steps: [
              'Tải và cài đặt pfSense trên máy ảo (VMware/VirtualBox).',
              'Cấu hình 2 interface: WAN (kết nối Internet) và LAN (mạng nội bộ).',
              'Tạo các rule (quy tắc) trên Firewall để chỉ cho phép traffic HTTP/HTTPS ra ngoài, chặn tất cả traffic đi vào từ WAN.',
              'Cấu hình Port Forwarding để cho phép truy cập vào một Web Server nằm trong vùng DMZ.'
            ]
          }
        ]
      },
      {
        id: 'project-2',
        day: 102,
        category: 'Practice',
        title: 'Dự án 2: Pentest ứng dụng Web thương mại điện tử (Red Team)',
        description: 'Đóng vai trò Hacker mũ trắng để tìm và khai thác lỗ hổng trên một trang web bán hàng.',
        content: `Mục tiêu:
Thực hiện một cuộc kiểm thử xâm nhập (Penetration Test) toàn diện trên một ứng dụng web mô phỏng (ví dụ: OWASP Juice Shop hoặc DVWA).

Yêu cầu dự án:
1. Reconnaissance: Thu thập thông tin về công nghệ sử dụng (Wappalyzer, Nmap).
2. Vulnerability Scanning: Sử dụng Burp Suite Professional hoặc OWASP ZAP để quét tự động.
3. Manual Exploitation: Khai thác thủ công các lỗ hổng OWASP Top 10 (SQLi, XSS, IDOR, Broken Authentication).
4. Privilege Escalation: Leo thang đặc quyền từ người dùng thường lên Admin của trang web.
5. Reporting: Viết báo cáo Pentest chuyên nghiệp (Executive Summary, Technical Details, Remediation).`,
        commands: [
          { name: 'Khởi chạy OWASP Juice Shop', description: 'Chạy ứng dụng mục tiêu qua Docker', usage: 'docker run --rm -p 3000:3000 bkimminich/juice-shop' }
        ],
        exercises: [
          {
            title: 'Khai thác SQL Injection (Login Bypass)',
            description: 'Vượt qua màn hình đăng nhập không cần mật khẩu.',
            steps: [
              'Mở trang đăng nhập của Juice Shop.',
              "Nhập payload SQLi cơ bản vào trường email: admin@juice-sh.op' --",
              'Nhập mật khẩu bất kỳ và nhấn Đăng nhập.',
              'Giải thích tại sao payload này lại hoạt động và cách fix lỗi trong mã nguồn.'
            ]
          }
        ]
      },
      {
        id: 'project-3',
        day: 103,
        category: 'Lab',
        title: 'Dự án 3: Phân tích mã độc tống tiền (Ransomware Analysis)',
        description: 'Dịch ngược và phân tích hành vi của một mẫu Ransomware thực tế (WannaCry/Ryuk).',
        content: `Mục tiêu:
Sử dụng các kỹ năng Reverse Engineering và Malware Analysis để mổ xẻ cách hoạt động của Ransomware.

Yêu cầu dự án:
1. Thiết lập môi trường Sandbox an toàn (FlareVM hoặc REMnux).
2. Phân tích tĩnh (Static Analysis): Trích xuất chuỗi (strings), kiểm tra PE headers, tìm các hàm API đáng ngờ (CryptAcquireContext, CreateFile).
3. Phân tích động (Dynamic Analysis): Chạy mã độc và giám sát bằng Process Monitor (Procmon), Wireshark, và Regshot.
4. Dịch ngược (Reverse Engineering): Sử dụng IDA Pro hoặc Ghidra để tìm hiểu thuật toán mã hóa (AES/RSA) và cách mã độc tạo khóa.
5. Viết báo cáo phân tích mã độc (Malware Analysis Report) và tạo YARA rule để nhận diện.`,
        exercises: [
          {
            title: 'Giám sát hành vi mã hóa',
            description: 'Sử dụng Procmon để xem Ransomware làm gì.',
            steps: [
              'Bật Procmon và thiết lập filter để chỉ theo dõi tiến trình của Ransomware.',
              'Chạy mẫu Ransomware trong môi trường máy ảo CÔ LẬP.',
              'Quan sát các hành động WriteFile (ghi đè file) và RegSetValue (thêm key khởi động cùng Windows).',
              'Xuất log của Procmon ra file CSV để phân tích thêm.'
            ]
          }
        ]
      },
      {
        id: 'project-4',
        day: 104,
        category: 'Practice',
        title: 'Dự án 4: Điều tra sự cố lộ lọt dữ liệu (Digital Forensics)',
        description: 'Truy vết hacker sau khi hệ thống bị xâm nhập.',
        content: `Mục tiêu:
Đóng vai trò chuyên gia điều tra số (DFIR) để tìm ra nguyên nhân, thời điểm và cách thức hacker xâm nhập vào máy chủ.

Yêu cầu dự án:
1. Thu thập chứng cứ (Evidence Acquisition): Tạo bản sao bit-by-bit của ổ cứng và dump RAM máy chủ bị nhiễm.
2. Phân tích RAM (Memory Forensics): Sử dụng Volatility để tìm các tiến trình ẩn, kết nối mạng bất thường và trích xuất mã độc đang chạy trên RAM.
3. Phân tích Log (Log Analysis): Đọc Windows Event Logs (Security, System) để tìm dấu vết đăng nhập trái phép (Event ID 4624, 4625).
4. Phân tích File System: Sử dụng Autopsy để khôi phục các file đã bị hacker xóa và phân tích MFT (Master File Table).
5. Xây dựng Timeline: Tạo một dòng thời gian chi tiết về các hành động của hacker từ lúc xâm nhập đến lúc rút lui.`,
        commands: [
          { name: 'Volatility: Tìm tiến trình ẩn', description: 'Liệt kê các tiến trình đang chạy trên RAM', usage: 'volatility -f memory.vmem --profile=Win7SP1x64 pslist' }
        ],
        exercises: [
          {
            title: 'Phân tích Windows Event Logs',
            description: 'Tìm dấu vết Brute-force RDP.',
            steps: [
              'Mở Event Viewer trên máy chủ bị tấn công.',
              'Lọc Event ID 4625 (Logon Failure) trong khoảng thời gian xảy ra sự cố.',
              'Xác định địa chỉ IP của kẻ tấn công và tài khoản bị nhắm mục tiêu.',
              'Tìm Event ID 4624 (Logon Success) để xem hacker có đăng nhập thành công không và vào lúc nào.'
            ]
          }
        ]
      },
      {
        id: 'project-5',
        day: 105,
        category: 'Practice',
        title: 'Dự án 5: Tự động hóa bảo mật với Python & Bash',
        description: 'Viết công cụ bảo mật của riêng bạn.',
        content: `Mục tiêu:
Sử dụng kỹ năng lập trình để tự động hóa các tác vụ lặp đi lặp lại trong quá trình Pentest hoặc giám sát an ninh.

Yêu cầu dự án:
1. Viết một script Python quét cổng (Port Scanner) sử dụng thư viện socket, hỗ trợ đa luồng (multithreading) để tăng tốc độ.
2. Viết một script Bash tự động thu thập thông tin (Recon) từ một tên miền: tìm subdomains (sử dụng sublist3r), quét cổng (nmap), và chụp ảnh màn hình các trang web tìm thấy (EyeWitness).
3. Viết một script Python theo dõi sự thay đổi của file (File Integrity Monitor - FIM): tính toán mã băm SHA-256 của các file quan trọng và cảnh báo qua Telegram/Slack nếu có sự thay đổi.`,
        commands: [
          { name: 'Chạy script FIM', description: 'Khởi động File Integrity Monitor', usage: 'python3 fim.py --dir /etc --webhook https://api.telegram.org/...' }
        ],
        exercises: [
          {
            title: 'Viết công cụ Port Scanner bằng Python',
            description: 'Tạo một phiên bản Nmap thu nhỏ.',
            steps: [
              'Import thư viện socket và threading trong Python.',
              'Tạo một hàm nhận vào IP và Port, thử kết nối (connect_ex). Nếu trả về 0 nghĩa là cổng mở.',
              'Sử dụng ThreadPoolExecutor để quét 1000 cổng cùng lúc.',
              'In ra màn hình danh sách các cổng đang mở.'
            ]
          }
        ]
      }
    ]
  }
];
