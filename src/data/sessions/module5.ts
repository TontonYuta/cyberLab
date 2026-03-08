import { Module } from '../../types';

export const MODULE_5: Module = {
  id: 'advanced-topics',
  title: 'Giai đoạn 5: Nâng cao & Tổng kết (Buổi 81-100)',
  sessions: [
    {
      id: 'day-81',
      day: 81,
      category: 'Theory',
      title: 'Khai thác lỗi bộ nhớ: Buffer Overflow (Phần 1)',
      description: 'Nguyên lý tràn bộ đệm trên kiến trúc x86.',
      content: `Lý thuyết:
Buffer Overflow xảy ra khi chương trình ghi dữ liệu vượt quá dung lượng của bộ đệm (buffer) được cấp phát trên Stack.
Hacker có thể ghi đè lên địa chỉ trả về (Return Address) để điều hướng EIP sang đoạn mã độc (Shellcode) của mình.
Các khái niệm:
- Junk: Dữ liệu rác để lấp đầy buffer.
- EIP: Thanh ghi chứa địa chỉ tiếp theo.
- NOP Sled: Chuỗi lệnh \\x90 để CPU trượt đến shellcode.`,
      exercises: [
        {
          title: 'Tìm điểm gây crash',
          description: 'Sử dụng script Python để làm sập chương trình.',
          steps: [
            'Sử dụng một chương trình C++ có lỗi strcpy().',
            'Viết script Python gửi các chuỗi "A" với độ dài tăng dần.',
            'Quan sát trong Debugger xem tại bao nhiêu ký tự thì EIP bị ghi đè bởi 0x41414141.'
          ]
        }
      ]
    },
    {
      id: 'day-82',
      day: 82,
      category: 'Practice',
      title: 'Buffer Overflow (Phần 2): Chiếm quyền điều khiển',
      description: 'Viết exploit hoàn chỉnh để mở CMD.',
      content: `Lý thuyết:
Sau khi tìm được offset (khoảng cách đến EIP), ta cần:
1. Tìm địa chỉ của lệnh JMP ESP trong các DLL của hệ thống.
2. Tạo shellcode (ví dụ bằng msfvenom).
3. Cấu trúc gói tin: [Junk] + [JMP ESP Address] + [NOPs] + [Shellcode].`,
      exercises: [
        {
          title: 'Khai thác thực tế',
          description: 'Viết exploit cho ứng dụng bị lỗi.',
          steps: [
            'Sử dụng công cụ mona.py trong x64dbg để tìm JMP ESP.',
            'Tạo shellcode reverse shell.',
            'Hoàn thiện script exploit và chạy nó để chiếm shell từ máy Kali.'
          ]
        }
      ]
    },
    {
      id: 'day-83',
      day: 83,
      category: 'Theory',
      title: 'Vượt qua cơ chế bảo mật: DEP & ASLR',
      description: 'Cách hacker đối phó với các lớp bảo vệ hiện đại.',
      content: `Lý thuyết:
- DEP (Data Execution Prevention): Ngăn chặn thực thi mã trên Stack. Hacker vượt qua bằng ROP (Return Oriented Programming).
- ASLR (Address Space Layout Randomization): Làm ngẫu nhiên địa chỉ bộ nhớ mỗi khi khởi động. Hacker vượt qua bằng kỹ thuật Information Leak hoặc Brute-force địa chỉ.`,
      exercises: [
        {
          title: 'Tìm hiểu về ROP Chain',
          description: 'Sử dụng các đoạn mã có sẵn trong bộ nhớ.',
          steps: [
            'Sử dụng mona.py để tìm các "gadgets" (đoạn code kết thúc bằng lệnh RET).',
            'Hiểu cách kết nối các gadgets này để gọi hàm VirtualProtect() nhằm tắt DEP.'
          ]
        }
      ]
    },
    {
      id: 'day-84',
      day: 84,
      category: 'Practice',
      title: 'Tấn công mạng không dây (WiFi Hacking)',
      description: 'Bẻ khóa WPA2 với Aircrack-ng.',
      content: `Lý thuyết:
WPA2 sử dụng bắt tay 4 bước (4-way handshake). Hacker cần bắt được gói tin này để bẻ khóa offline.
Quy trình:
1. Chuyển card mạng sang Monitor Mode.
2. Quét các mạng xung quanh (airodump-ng).
3. Ngắt kết nối một thiết bị đang dùng (aireplay-ng) để ép nó bắt tay lại.
4. Bắt gói tin handshake và bẻ khóa bằng wordlist.`,
      commands: [
        { name: 'Monitor Mode', description: 'Bật chế độ giám sát', usage: 'airmon-ng start wlan0' },
        { name: 'Capture', description: 'Bắt gói tin', usage: 'airodump-ng -c 6 --bssid MAC_AP -w output wlan0' }
      ],
      exercises: [
        {
          title: 'Bẻ khóa WPA2 giả lập',
          description: 'Sử dụng file .cap có sẵn.',
          steps: [
            'Tải một file handshake mẫu.',
            'Sử dụng aircrack-ng với file từ điển rockyou.txt để tìm mật khẩu WiFi.'
          ]
        }
      ]
    },
    {
      id: 'day-85',
      day: 85,
      category: 'Theory',
      title: 'Social Engineering: Nghệ thuật thao túng tâm lý',
      description: 'Con người là mắt xích yếu nhất.',
      content: `Lý thuyết:
Hacker không cần hack máy tính nếu họ có thể hack con người.
Các kỹ thuật:
- Phishing: Email giả mạo (Ngân hàng, Công ty).
- Pretexting: Tạo ra một kịch bản giả để lấy thông tin.
- Baiting: Để lại USB "độc" ở bãi xe.
- Tailgating: Đi theo nhân viên vào khu vực cấm.`,
      exercises: [
        {
          title: 'Tạo trang Phishing với SET',
          description: 'Sử dụng Social Engineering Toolkit.',
          steps: [
            'Mở setoolkit trên Kali.',
            'Chọn Website Attack Vectors -> Credential Harvester.',
            'Clone trang đăng nhập Facebook hoặc Gmail.',
            'Gửi link cho máy ảo Windows và xem mật khẩu bị thu thập.'
          ]
        }
      ]
    },
    {
      id: 'day-86',
      day: 86,
      category: 'Practice',
      title: 'Tấn công Active Directory (Phần 1)',
      description: 'Hiểu về môi trường mạng doanh nghiệp.',
      content: `Lý thuyết:
Trong doanh nghiệp, các máy tính được quản lý bởi Domain Controller (DC) thông qua Active Directory.
Giao thức quan trọng: Kerberos.
Các kiểu tấn công:
- LLMNR/NBT-NS Poisoning (Sử dụng Responder).
- Pass-the-Hash: Sử dụng mã băm mật khẩu để đăng nhập mà không cần mật khẩu thật.`,
      exercises: [
        {
          title: 'Sử dụng Responder',
          description: 'Đánh cắp Hash trong mạng nội bộ.',
          steps: [
            'Chạy Responder trên Kali.',
            'Trên máy Windows, thử truy cập một đường dẫn mạng không tồn tại (ví dụ: \\\\fileserver_xyz).',
            'Quan sát Kali để thấy mã băm NTLMv2 của user Windows hiện ra.'
          ]
        }
      ]
    },
    {
      id: 'day-87',
      day: 87,
      category: 'Practice',
      title: 'Tấn công Active Directory (Phần 2)',
      description: 'Kerberoasting & Golden Ticket.',
      content: `Lý thuyết:
- Kerberoasting: Trích xuất vé dịch vụ (TGS) và bẻ khóa offline để lấy mật khẩu của tài khoản dịch vụ.
- Golden Ticket: Sau khi chiếm được quyền Domain Admin, hacker tạo ra một vé vạn năng để có quyền truy cập vĩnh viễn vào mọi máy trong Domain.`,
      exercises: [
        {
          title: 'Phân tích sơ đồ mạng với BloodHound',
          description: 'Tìm đường tấn công ngắn nhất đến Domain Admin.',
          steps: [
            'Chạy SharpHound trên máy nạn nhân để thu thập dữ liệu AD.',
            'Import dữ liệu vào BloodHound trên Kali.',
            'Sử dụng các query có sẵn để tìm các user có quyền cao hoặc các đường dẫn leo thang.'
          ]
        }
      ]
    },
    {
      id: 'day-88',
      day: 88,
      category: 'Theory',
      title: 'An toàn ứng dụng Mobile (Android)',
      description: 'Phân tích file APK.',
      content: `Lý thuyết:
Ứng dụng Android viết bằng Java/Kotlin, biên dịch sang mã Dalvik (DEX).
Quy trình phân tích:
1. Giải nén APK (apktool).
2. Chuyển DEX sang Jar (dex2jar).
3. Đọc code Java (jd-gui).
Lỗ hổng phổ biến: Lưu trữ dữ liệu nhạy cảm trong SharedPreferences, Hardcoded API keys.`,
      commands: [
        { name: 'Decompile APK', description: 'Giải mã file APK', usage: 'apktool d app.apk' }
      ],
      exercises: [
        {
          title: 'Tìm Secret Key trong APK',
          description: 'Dịch ngược ứng dụng Android.',
          steps: [
            'Sử dụng jadx-gui để mở một file APK mẫu.',
            'Tìm kiếm các chuỗi như "API_KEY", "SECRET", "PASSWORD".',
            'Phân tích cách ứng dụng mã hóa dữ liệu cục bộ.'
          ]
        }
      ]
    },
    {
      id: 'day-89',
      day: 89,
      category: 'Practice',
      title: 'Phòng thủ: Cài đặt & Cấu hình IDS/IPS',
      description: 'Sử dụng Snort để phát hiện tấn công.',
      content: `Lý thuyết:
IDS (Intrusion Detection System): Hệ thống phát hiện xâm nhập.
IPS (Intrusion Prevention System): Hệ thống ngăn chặn xâm nhập.
Snort sử dụng các "Rules" để đối chiếu với gói tin mạng. Nếu khớp, nó sẽ đưa ra cảnh báo hoặc chặn gói tin đó.`,
      exercises: [
        {
          title: 'Viết luật Snort',
          description: 'Phát hiện hành vi quét Nmap.',
          steps: [
            'Cài đặt Snort trên Linux.',
            'Viết một rule để cảnh báo khi thấy gói tin ICMP (Ping).',
            'Viết rule để phát hiện các gói tin SYN scan từ Nmap.',
            'Chạy Snort và thực hiện quét từ máy khác để xem cảnh báo.'
          ]
        }
      ]
    },
    {
      id: 'day-90',
      day: 90,
      category: 'Theory',
      title: 'Incident Response (Ứng cứu sự cố)',
      description: 'Làm gì khi hệ thống bị hack?',
      content: `Lý thuyết:
Quy trình 6 bước của SANS:
1. Preparation: Chuẩn bị công cụ, đội ngũ.
2. Identification: Xác định xem có thực sự bị tấn công không.
3. Containment: Cô lập hệ thống bị nhiễm (ngắt mạng).
4. Eradication: Loại bỏ mã độc, xóa backdoor.
5. Recovery: Khôi phục hệ thống từ backup.
6. Lessons Learned: Rút kinh nghiệm.`,
      exercises: [
        {
          title: 'Điều tra máy bị nhiễm',
          description: 'Tìm dấu vết hacker để lại.',
          steps: [
            'Sử dụng lệnh "netstat -ano" để tìm các kết nối lạ.',
            'Kiểm tra "Task Scheduler" để tìm các tác vụ đáng ngờ.',
            'Kiểm tra Event Viewer để xem các lần đăng nhập thất bại hoặc thành công bất thường.'
          ]
        }
      ]
    },
    {
      id: 'day-91',
      day: 91,
      category: 'Lab',
      title: 'Thực hành CTF (Capture The Flag) - Phần 1',
      description: 'Giải các bài toán bảo mật thực tế.',
      content: `Lý thuyết:
CTF là cuộc thi nơi bạn phải tìm các "Flag" (chuỗi ký tự ẩn) thông qua việc hack hệ thống.
Các dạng bài: Web, Pwn (Exploit), Reverse, Crypto, Forensics.`,
      exercises: [
        {
          title: 'Giải bài Web cơ bản',
          description: 'Tìm flag ẩn trong mã nguồn hoặc cookie.',
          steps: [
            'Truy cập một trang web CTF mẫu (ví dụ: PicoCTF).',
            'Sử dụng Inspect Element để tìm flag trong comment HTML.',
            'Kiểm tra file robots.txt để tìm các thư mục ẩn.'
          ]
        }
      ]
    },
    {
      id: 'day-92',
      day: 92,
      category: 'Lab',
      title: 'Thực hành CTF - Phần 2',
      description: 'Giải bài Reverse Engineering.',
      content: `Lý thuyết:
Sử dụng tất cả kỹ năng Assembly và Ghidra đã học để tìm flag trong file thực thi.`,
      exercises: [
        {
          title: 'Bẻ khóa file ELF (Linux)',
          description: 'Phân tích file thực thi trên Linux.',
          steps: [
            'Sử dụng lệnh "strings" để tìm flag nhanh.',
            'Nếu không thấy, dùng Ghidra để xem logic kiểm tra đầu vào.',
            'Tìm ra chuỗi ký tự thỏa mãn điều kiện của chương trình.'
          ]
        }
      ]
    },
    {
      id: 'day-93',
      day: 93,
      category: 'Theory',
      title: 'Cloud Security (AWS/Azure/GCP)',
      description: 'Bảo mật trên môi trường đám mây.',
      content: `Lý thuyết:
Mô hình trách nhiệm chung (Shared Responsibility Model).
Lỗ hổng phổ biến:
- S3 Bucket bị hở (Public access).
- Lộ Access Keys trong code GitHub.
- Cấu hình sai Identity and Access Management (IAM).`,
      exercises: [
        {
          title: 'Tìm kiếm lỗi cấu hình Cloud',
          description: 'Sử dụng công cụ quét tự động.',
          steps: [
            'Tìm hiểu về công cụ ScoutSuite hoặc Prowler.',
            'Giải thích tại sao việc lộ Access Key trên GitHub lại dẫn đến thảm họa tài chính cho doanh nghiệp.'
          ]
        }
      ]
    },
    {
      id: 'day-94',
      day: 94,
      category: 'Theory',
      title: 'IoT Security (Internet of Things)',
      description: 'Bảo mật camera, router, thiết bị thông minh.',
      content: `Lý thuyết:
Thiết bị IoT thường có bảo mật rất kém:
- Mật khẩu mặc định (admin/admin).
- Firmware không được cập nhật.
- Các cổng debug (Telnet, UART) bị bỏ ngỏ.`,
      exercises: [
        {
          title: 'Phân tích Firmware',
          description: 'Sử dụng binwalk.',
          steps: [
            'Tải một file firmware của Router từ trang chủ nhà sản xuất.',
            'Sử dụng binwalk để giải nén hệ điều hành bên trong.',
            'Tìm kiếm các file mật khẩu (/etc/shadow) hoặc các script khởi động nguy hiểm.'
          ]
        }
      ]
    },
    {
      id: 'day-95',
      day: 95,
      category: 'Practice',
      title: 'Kỹ thuật ẩn giấu thông tin (Steganography)',
      description: 'Giấu dữ liệu trong ảnh, âm thanh.',
      content: `Lý thuyết:
Khác với mã hóa (làm dữ liệu không đọc được), Steganography làm dữ liệu "không tồn tại" đối với người quan sát thông thường.
Kỹ thuật LSB (Least Significant Bit): Thay đổi bit cuối cùng của mỗi pixel để giấu thông tin mà không làm thay đổi màu sắc ảnh đáng kể.`,
      exercises: [
        {
          title: 'Giấu file trong ảnh',
          description: 'Sử dụng steghide.',
          steps: [
            'Sử dụng steghide để giấu một file text vào một file ảnh .jpg.',
            'Gửi ảnh cho bạn bè và hướng dẫn họ cách trích xuất.',
            'Thử dùng các công cụ online để xem họ có phát hiện ra ảnh có chứa dữ liệu ẩn không.'
          ]
        }
      ]
    },
    {
      id: 'day-96',
      day: 96,
      category: 'Theory',
      title: 'Pháp luật & Đạo đức nghề nghiệp',
      description: 'Ranh giới giữa White Hat và Black Hat.',
      content: `Lý thuyết:
- Luật An ninh mạng Việt Nam.
- Các chứng chỉ quốc tế uy tín: CEH, OSCP, CISSP.
- Đạo đức: Luôn xin phép trước khi kiểm thử, bảo mật thông tin khách hàng, không trục lợi từ lỗ hổng.`,
      exercises: [
        {
          title: 'Xây dựng quy tắc đạo đức cá nhân',
          description: 'Cam kết sử dụng kiến thức đúng đắn.',
          steps: [
            'Viết ra 5 nguyên tắc bạn sẽ tuân thủ khi làm nghề bảo mật.',
            'Tìm hiểu về chương trình Bug Bounty (ví dụ: HackerOne) - cách kiếm tiền hợp pháp từ việc tìm lỗi.'
          ]
        }
      ]
    },
    {
      id: 'day-97',
      day: 97,
      category: 'Lab',
      title: 'Dự án cuối khóa: Pentest toàn diện (Phần 1)',
      description: 'Thu thập thông tin và quét lỗ hổng.',
      content: `Lý thuyết:
Bạn sẽ được cấp một máy ảo mục tiêu hoàn toàn mới với nhiều lỗ hổng khác nhau.
Nhiệm vụ: Chiếm quyền Root/Admin.`,
      exercises: [
        {
          title: 'Giai đoạn thám mã',
          description: 'Xác định bề mặt tấn công.',
          steps: [
            'Thực hiện quét Nmap toàn diện.',
            'Liệt kê tất cả các dịch vụ và phiên bản.',
            'Tìm kiếm các exploit có sẵn trên Exploit-DB.'
          ]
        }
      ]
    },
    {
      id: 'day-98',
      day: 98,
      category: 'Lab',
      title: 'Dự án cuối khóa: Khai thác & Chiếm quyền (Phần 2)',
      description: 'Thực hiện tấn công và leo thang đặc quyền.',
      content: `Lý thuyết:
Sử dụng các kỹ năng đã học để xâm nhập vào hệ thống.`,
      exercises: [
        {
          title: 'Giai đoạn đột nhập',
          description: 'Lấy được user shell đầu tiên.',
          steps: [
            'Thực hiện tấn công vào dịch vụ yếu nhất tìm thấy.',
            'Sử dụng kỹ thuật leo thang đặc quyền để lên Root.',
            'Lấy file flag.txt trong thư mục /root.'
          ]
        }
      ]
    },
    {
      id: 'day-99',
      day: 99,
      category: 'Lab',
      title: 'Dự án cuối khóa: Báo cáo & Thuyết trình (Phần 3)',
      description: 'Hoàn thiện hồ sơ năng lực.',
      content: `Lý thuyết:
Viết báo cáo chi tiết về quá trình xâm nhập máy ảo ở buổi 97-98.`,
      exercises: [
        {
          title: 'Hoàn thiện báo cáo',
          description: 'Trình bày chuyên nghiệp.',
          steps: [
            'Ghi lại từng bước kèm ảnh chụp màn hình.',
            'Giải thích lỗ hổng và cách vá lỗi.',
            'Tự đánh giá kỹ năng nào bạn còn yếu để tiếp tục rèn luyện.'
          ]
        }
      ]
    },
    {
      id: 'day-100',
      day: 100,
      category: 'Theory',
      title: 'Lễ tốt nghiệp CyberLab 100',
      description: 'Nhìn lại hành trình và định hướng tương lai.',
      content: `Lý thuyết:
Chúc mừng bạn! Bạn đã đi qua 100 buổi học đầy thử thách từ những lệnh Linux đầu tiên đến những kỹ thuật khai thác lỗ hổng phức tạp.
An ninh mạng là một cuộc đua không có hồi kết. Công nghệ thay đổi mỗi ngày, hacker ngày càng tinh vi.
Lời khuyên cuối cùng:
- Luôn giữ sự tò mò.
- Thực hành, thực hành và thực hành.
- Tham gia cộng đồng (diễn đàn, group bảo mật).
- Luôn làm việc có đạo đức.

Hẹn gặp lại bạn trong thế giới của những chiến binh an ninh mạng!`,
      exercises: [
        {
          title: 'Lập kế hoạch học tập tiếp theo',
          description: 'Đừng dừng lại ở đây.',
          steps: [
            'Chọn một chứng chỉ mục tiêu (ví dụ: OSCP).',
            'Xây dựng Lab cá nhân mạnh mẽ hơn trên Server riêng.',
            'Bắt đầu viết blog chia sẻ kiến thức để củng cố những gì đã học.'
          ]
        }
      ],
      quizzes: [
        {
          question: "Trong tấn công Buffer Overflow, thanh ghi nào thường bị hacker nhắm tới để ghi đè nhằm thay đổi luồng thực thi của chương trình (chuyển hướng đến shellcode)?",
          options: [
            { id: 'A', text: 'EAX (Accumulator Register)', isCorrect: false },
            { id: 'B', text: 'ESP (Stack Pointer)', isCorrect: false },
            { id: 'C', text: 'EIP (Instruction Pointer)', isCorrect: true },
            { id: 'D', text: 'EBP (Base Pointer)', isCorrect: false }
          ],
          explanation: "EIP (Extended Instruction Pointer) chứa địa chỉ của lệnh tiếp theo sẽ được CPU thực thi. Bằng cách ghi đè EIP, hacker có thể ép CPU chạy đoạn mã độc (shellcode) của mình."
        },
        {
          question: "Kỹ thuật nào sau đây được hệ điều hành sử dụng để làm ngẫu nhiên hóa vị trí của các vùng nhớ (như stack, heap, libraries) nhằm gây khó khăn cho các cuộc tấn công Buffer Overflow?",
          options: [
            { id: 'A', text: 'DEP (Data Execution Prevention)', isCorrect: false },
            { id: 'B', text: 'ASLR (Address Space Layout Randomization)', isCorrect: true },
            { id: 'C', text: 'ROP (Return Oriented Programming)', isCorrect: false },
            { id: 'D', text: 'NOP Sled', isCorrect: false }
          ],
          explanation: "ASLR (Address Space Layout Randomization) thay đổi ngẫu nhiên địa chỉ bộ nhớ mỗi khi chương trình chạy, khiến hacker khó đoán được địa chỉ chính xác của shellcode hoặc các hàm hệ thống."
        },
        {
          question: "Trong tấn công mạng WiFi (WPA2), bước nào là BẮT BUỘC để hacker có thể bẻ khóa mật khẩu offline?",
          options: [
            { id: 'A', text: 'Đổi địa chỉ MAC của máy tính tấn công', isCorrect: false },
            { id: 'B', text: 'Bắt được gói tin 4-way handshake giữa thiết bị hợp lệ và Access Point', isCorrect: true },
            { id: 'C', text: 'Gửi hàng ngàn gói tin Ping (ICMP Flood) đến Access Point', isCorrect: false },
            { id: 'D', text: 'Chạy công cụ Nmap để quét các cổng mở trên Router', isCorrect: false }
          ],
          explanation: "WPA2 bảo vệ mật khẩu bằng cách không bao giờ gửi nó qua mạng dạng rõ. Hacker phải bắt được quá trình xác thực (4-way handshake) và dùng từ điển (wordlist) để thử bẻ khóa (brute-force) offline."
        },
        {
          question: "Kỹ thuật Social Engineering nào liên quan đến việc tạo ra một kịch bản giả mạo (ví dụ: đóng giả nhân viên IT) để lừa nạn nhân cung cấp thông tin nhạy cảm?",
          options: [
            { id: 'A', text: 'Baiting', isCorrect: false },
            { id: 'B', text: 'Tailgating', isCorrect: false },
            { id: 'C', text: 'Phishing', isCorrect: false },
            { id: 'D', text: 'Pretexting', isCorrect: true }
          ],
          explanation: "Pretexting là việc kẻ tấn công tạo ra một tình huống hoặc kịch bản giả (pretext) để thao túng nạn nhân, khiến họ tin tưởng và tiết lộ thông tin."
        },
        {
          question: "Trong quy trình Ứng cứu sự cố (Incident Response) của SANS, bước 'Containment' (Cô lập) có mục đích chính là gì?",
          options: [
            { id: 'A', text: 'Khôi phục hệ thống từ các bản sao lưu (backup)', isCorrect: false },
            { id: 'B', text: 'Ngăn chặn sự lây lan của mã độc hoặc giới hạn thiệt hại do cuộc tấn công gây ra', isCorrect: true },
            { id: 'C', text: 'Xóa bỏ hoàn toàn mã độc khỏi hệ thống', isCorrect: false },
            { id: 'D', text: 'Phân tích nguyên nhân gốc rễ của cuộc tấn công', isCorrect: false }
          ],
          explanation: "Containment (Cô lập) là bước khẩn cấp nhằm ngăn chặn mối đe dọa lây lan sang các hệ thống khác (ví dụ: ngắt kết nối mạng của máy bị nhiễm) trước khi tiến hành tiêu diệt (Eradication) nó."
        }
      ]
    }
  ]
};
