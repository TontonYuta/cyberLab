import { Module } from '../../types';

export const MODULE_3: Module = {
  id: 'malware-analysis',
  title: 'Giai đoạn 3: Phân tích mã độc (Buổi 41-60)',
  sessions: [
    {
      id: 'day-41',
      day: 41,
      category: 'Theory',
      title: 'Quy trình phân tích mã độc chuyên nghiệp',
      description: 'Các bước từ tiếp nhận đến báo cáo.',
      content: `Lý thuyết:
Phân tích mã độc không chỉ là chạy file. Nó là một quy trình khoa học:
1. Phân tích tĩnh cơ bản (Basic Static): Xem strings, headers, hash.
2. Phân tích động cơ bản (Basic Dynamic): Chạy trong môi trường ảo, theo dõi file/registry/network.
3. Phân tích tĩnh nâng cao (Advanced Static): Dịch ngược code bằng Ghidra/IDA.
4. Phân tích động nâng cao (Advanced Dynamic): Debug code bằng x64dbg để xem luồng thực thi.

Mục tiêu: Hiểu mã độc làm gì, cách nó lây lan, cách nó liên lạc với C2 (Command & Control) và cách gỡ bỏ nó.`,
      exercises: [
        {
          title: 'Thiết lập mạng Flare-VM',
          description: 'Chuẩn bị máy ảo chuyên dụng cho phân tích.',
          steps: [
            'Tìm hiểu về Flare-VM (bộ công cụ của Mandiant).',
            'Cài đặt các công cụ cơ bản: Pestudio, Process Hacker, Wireshark, x64dbg.',
            'Đảm bảo máy ảo đã được ngắt kết nối internet hoàn toàn.'
          ]
        }
      ]
    },
    {
      id: 'day-42',
      day: 42,
      category: 'Practice',
      title: 'Phân tích tĩnh: Dấu vân tay mã độc',
      description: 'Sử dụng Hash và Strings để nhận diện.',
      content: `Lý thuyết:
Mỗi file có một mã băm (Hash) duy nhất (MD5, SHA256). Nếu file bị thay đổi dù chỉ 1 bit, mã băm sẽ khác hoàn toàn.
Strings: Các chuỗi văn bản nằm trong file có thể tiết lộ:
- Địa chỉ IP/Domain của hacker.
- Tên file nó định xóa/tạo.
- Các hàm API nó sử dụng.`,
      commands: [
        { name: 'Get Hash', description: 'Tính mã SHA256', usage: 'sha256sum malware.exe' },
        { name: 'Extract Strings', description: 'Trích xuất chuỗi văn bản', usage: 'strings malware.exe > strings.txt' }
      ],
      exercises: [
        {
          title: 'Sử dụng Pestudio',
          description: 'Công cụ phân tích tĩnh nhanh nhất.',
          steps: [
            'Mở một file nghi ngờ bằng Pestudio.',
            'Kiểm tra phần "Blacklisted" để xem các hàm API nguy hiểm.',
            'Xem phần "Strings" và lọc ra các URL hoặc đường dẫn file.',
            'Tra cứu mã băm của file trên VirusTotal để xem cộng đồng nói gì.'
          ]
        }
      ]
    },
    {
      id: 'day-43',
      day: 43,
      category: 'Practice',
      title: 'Phân tích động: Theo dõi hệ thống',
      description: 'Sử dụng Procmon để xem mã độc làm gì với Windows.',
      content: `Lý thuyết:
Process Monitor (Procmon) ghi lại mọi hoạt động của Hệ thống:
- File System: Tạo, xóa, đọc file.
- Registry: Thay đổi các khóa khởi động cùng Windows (Persistence).
- Network: Kết nối đi đâu.
- Process: Tạo ra các tiến trình con (Child processes).`,
      exercises: [
        {
          title: 'Bắt quả tang mã độc',
          description: 'Theo dõi hành vi tạo file và registry.',
          steps: [
            'Mở Procmon, thiết lập filter "Process Name is malware.exe".',
            'Chạy mã độc (trong máy ảo!).',
            'Tìm các thao tác "RegSetValue" để xem nó có tự thêm mình vào khóa Run của Windows không.',
            'Tìm các thao tác "CreateFile" để xem nó giấu mình ở đâu.'
          ]
        }
      ]
    },
    {
      id: 'day-44',
      day: 44,
      category: 'Lab',
      title: 'Phân tích mạng mã độc',
      description: 'Sử dụng FakeNet-NG để giả lập internet.',
      content: `Lý thuyết:
Mã độc thường sẽ không hoạt động nếu không thấy internet. Nhưng chúng ta không thể cho nó kết nối thật.
FakeNet-NG sẽ giả lập các dịch vụ internet (DNS, HTTP, SSL) ngay trong máy ảo để lừa mã độc thực thi hành vi của nó.`,
      exercises: [
        {
          title: 'Lừa mã độc kết nối',
          description: 'Xem yêu cầu HTTP từ mã độc.',
          steps: [
            'Chạy FakeNet-NG.',
            'Chạy mã độc.',
            'Quan sát cửa sổ FakeNet để xem mã độc đang cố gắng tải file gì hoặc gửi dữ liệu gì về server của hacker.',
            'Phân tích cấu trúc gói tin HTTP đó.'
          ]
        }
      ]
    },
    {
      id: 'day-45',
      day: 45,
      category: 'Theory',
      title: 'Kỹ thuật ẩn mình: Packing & Obfuscation',
      description: 'Cách hacker làm khó các chuyên gia phân tích.',
      content: `Lý thuyết:
Packing: Nén và mã hóa file thực thi. Khi chạy, nó sẽ tự giải nén vào bộ nhớ (Unpacking).
Obfuscation: Làm rối mã nguồn để chuyên gia không đọc được logic.
Dấu hiệu nhận biết file bị Pack:
- Rất ít Strings có nghĩa.
- Tên các Section lạ (ví dụ: UPX0, UPX1).
- Entry Point nằm ở section cuối cùng thay vì section đầu tiên.`,
      exercises: [
        {
          title: 'Nhận diện UPX Packer',
          description: 'Sử dụng Detect It Easy (DIE).',
          steps: [
            'Mở file bằng DIE.',
            'Kiểm tra phần "Entropy" (Entropy cao thường là file bị nén/mã hóa).',
            'Nếu thấy nhãn "UPX", hãy thử dùng lệnh "upx -d malware.exe" để giải nén nó.'
          ]
        }
      ]
    },
    {
      id: 'day-46',
      day: 46,
      category: 'Practice',
      title: 'Dịch ngược mã độc với Ghidra (Phần 2)',
      description: 'Đi sâu vào logic của Trojan.',
      content: `Lý thuyết:
Khi phân tích tĩnh cơ bản không đủ, ta phải đọc code.
Các hàm cần chú ý trong mã độc Windows:
- CreateProcess: Chạy tiến trình khác.
- ShellExecute: Mở file/URL.
- InternetOpenUrl: Kết nối internet.
- WriteProcessMemory: Kỹ thuật tiêm mã (Process Injection).`,
      exercises: [
        {
          title: 'Phân tích hàm Main',
          description: 'Tìm luồng thực thi chính.',
          steps: [
            'Mở mã độc trong Ghidra.',
            'Tìm hàm WinMain hoặc main.',
            'Xác định xem nó có kiểm tra sự hiện diện của máy ảo (Anti-VM) không.',
            'Đổi tên các biến và hàm để code dễ đọc hơn.'
          ]
        }
      ]
    },
    {
      id: 'day-47',
      day: 47,
      category: 'Assembly',
      title: 'Debug mã độc với x64dbg',
      description: 'Vượt qua các rào cản trong lúc chạy.',
      content: `Lý thuyết:
Debugger cho phép ta dừng chương trình tại bất kỳ thời điểm nào (Breakpoint).
Kỹ thuật "Run to User Code": Bỏ qua các code thư viện của Windows để tập trung vào code của hacker.
Hardware Breakpoint: Dừng lại khi một vùng nhớ bị truy cập (Rất hữu ích để tìm code giải nén).`,
      exercises: [
        {
          title: 'Tìm OEP (Original Entry Point)',
          description: 'Kỹ thuật Unpacking thủ công.',
          steps: [
            'Mở file bị Pack trong x64dbg.',
            'Sử dụng lệnh "Find Command: pushad" (thường thấy ở đầu code giải nén).',
            'Đặt breakpoint tại lệnh "popad" tương ứng.',
            'Sau khi popad, thường sẽ có một lệnh JMP lớn. Đó là đường dẫn tới OEP thật.'
          ]
        }
      ]
    },
    {
      id: 'day-48',
      day: 48,
      category: 'Theory',
      title: 'Phân tích Ransomware',
      description: 'Cách nó khóa dữ liệu của bạn.',
      content: `Lý thuyết:
Ransomware thường sử dụng kết hợp:
1. AES (Mã hóa đối xứng): Để mã hóa file cực nhanh.
2. RSA (Mã hóa bất đối xứng): Để mã hóa Key AES đó.
Hacker giữ Private Key RSA, nên bạn không thể giải mã nếu không có nó.
Các hành vi đặc trưng:
- Xóa Shadow Copies (vssadmin.exe delete shadows /all).
- Đổi đuôi file hàng loạt.
- Tạo file "README.txt" trong mọi thư mục.`,
      exercises: [
        {
          title: 'Phục hồi file giả định',
          description: 'Hiểu về cơ chế mã hóa.',
          steps: [
            'Viết một script Python nhỏ để mã hóa file bằng AES.',
            'Thử xóa Key và xem bạn có cách nào cứu dữ liệu không.',
            'Tìm hiểu về dự án "No More Ransom" và cách họ tạo ra các công cụ giải mã.'
          ]
        }
      ]
    },
    {
      id: 'day-49',
      day: 49,
      category: 'Practice',
      title: 'Phân tích tài liệu độc hại (Office/PDF)',
      description: 'Macro và JavaScript ẩn trong file văn bản.',
      content: `Lý thuyết:
Hacker không chỉ dùng .exe. Họ dùng file .docm hoặc .pdf.
- Office Macros: Sử dụng ngôn ngữ VBA để tải mã độc.
- PDF: Sử dụng JavaScript hoặc các lỗ hổng trong trình đọc PDF.
Công cụ: olevba (để trích xuất macro), pdfid (để kiểm tra cấu trúc PDF).`,
      commands: [
        { name: 'Analyze Macro', description: 'Trích xuất VBA Macro', usage: 'olevba document.docm' }
      ],
      exercises: [
        {
          title: 'Giải mã Macro bị làm rối',
          description: 'Phân tích script VBA.',
          steps: [
            'Sử dụng olevba trên một file mẫu.',
            'Tìm các hàm "Shell" hoặc "URLDownloadToFile".',
            'Làm sạch code VBA (De-obfuscate) để tìm ra URL tải mã độc thật sự.'
          ]
        }
      ]
    },
    {
      id: 'day-50',
      day: 50,
      category: 'Lab',
      title: 'Xây dựng báo cáo phân tích mã độc',
      description: 'Tổng kết và đưa ra phương án phòng chống.',
      content: `Lý thuyết:
Một chuyên gia giỏi là người có thể giải thích kỹ thuật phức tạp cho người không chuyên.
Báo cáo cần có:
1. Tóm tắt (Executive Summary).
2. Chỉ số nhận diện (IoCs): Hash, IP, Domain, File paths.
3. Phân tích kỹ thuật chi tiết.
4. Đánh giá mức độ nguy hiểm và cách khắc phục.`,
      exercises: [
        {
          title: 'Viết báo cáo đầu tiên',
          description: 'Tổng hợp kết quả từ các buổi trước.',
          steps: [
            'Chọn một mẫu mã độc bạn đã phân tích.',
            'Trình bày các IoCs tìm được.',
            'Vẽ sơ đồ luồng hoạt động của nó (Flowchart).',
            'Đề xuất 3 quy tắc tường lửa để chặn mã độc này.'
          ]
        }
      ]
    },
    {
      id: 'day-51',
      day: 51,
      category: 'Theory',
      title: 'Phân tích mã độc nâng cao: Rootkit',
      description: 'Cách mã độc ẩn mình sâu trong hệ điều hành.',
      content: `Lý thuyết:
Rootkit là loại mã độc nguy hiểm nhất vì nó hoạt động ở mức Kernel (Ring 0).
Nó có thể sửa đổi các cấu trúc dữ liệu của hệ điều hành để che giấu:
- Tiến trình (Process hiding).
- File và thư mục.
- Kết nối mạng.
- Module/Driver đã nạp.

Các kỹ thuật phổ biến:
- SSDT Hooking (System Service Descriptor Table).
- IRP Hooking (I/O Request Packet).
- DKOM (Direct Kernel Object Manipulation).`,
      exercises: [
        {
          title: 'Tìm hiểu về SSDT Hooking',
          description: 'Nghiên cứu cách Rootkit can thiệp vào System Calls.',
          steps: [
            'Tìm hiểu cấu trúc SSDT trên Windows 32-bit.',
            'Giải thích cách một Rootkit thay thế địa chỉ của hàm NtQuerySystemInformation để ẩn tiến trình.',
            'Tại sao PatchGuard (Kernel Patch Protection) trên Windows 64-bit lại làm khó Rootkit?'
          ]
        }
      ]
    },
    {
      id: 'day-52',
      day: 52,
      category: 'Practice',
      title: 'Phân tích Fileless Malware',
      description: 'Mã độc không để lại file trên ổ cứng.',
      content: `Lý thuyết:
Fileless Malware (Mã độc không file) cư trú hoàn toàn trong bộ nhớ RAM hoặc sử dụng các công cụ hợp pháp của hệ điều hành (Living off the Land - LotL) để thực thi.
Nó tránh được hầu hết các phần mềm diệt virus truyền thống vốn chỉ quét file trên đĩa.

Các công cụ LotL thường bị lợi dụng:
- PowerShell (rất phổ biến).
- WMI (Windows Management Instrumentation).
- Mshta, Rundll32, Regsvr32.`,
      commands: [
        { name: 'PowerShell Encoded Command', description: 'Chạy lệnh PowerShell đã mã hóa Base64', usage: 'powershell -ExecutionPolicy Bypass -WindowStyle Hidden -EncodedCommand <base64_string>' }
      ],
      exercises: [
        {
          title: 'Phân tích PowerShell Script',
          description: 'Giải mã một đoạn script độc hại.',
          steps: [
            'Tìm một mẫu PowerShell script bị làm rối (obfuscated).',
            'Sử dụng CyberChef để giải mã Base64 và các kỹ thuật làm rối khác.',
            'Xác định xem script đó tải payload từ đâu (URL nào) và thực thi nó như thế nào (ví dụ: Invoke-Expression).'
          ]
        }
      ]
    },
    {
      id: 'day-53',
      day: 53,
      category: 'Assembly',
      title: 'Kỹ thuật Anti-Analysis: Anti-VM & Anti-Debugging',
      description: 'Cách mã độc phát hiện môi trường phân tích.',
      content: `Lý thuyết:
Mã độc thường kiểm tra xem nó có đang chạy trong máy ảo (VM) hay bị debug không trước khi thực hiện hành vi độc hại.
Anti-VM:
- Kiểm tra địa chỉ MAC (OUI của VMware/VirtualBox).
- Kiểm tra các file/driver đặc trưng của VM (vboxguest.sys, vmtoolsd.exe).
- Kiểm tra CPUID, nhiệt độ CPU.

Anti-Debugging:
- IsDebuggerPresent(), CheckRemoteDebuggerPresent().
- Kiểm tra cờ BeingDebugged trong cấu trúc PEB (Process Environment Block).
- Tìm kiếm các ngắt phần mềm (INT 3 - 0xCC).`,
      exercises: [
        {
          title: 'Bypass Anti-VM',
          description: 'Làm "cứng" máy ảo phân tích.',
          steps: [
            'Sử dụng công cụ pafish (Paranoid Fish) để kiểm tra xem máy ảo của bạn có bị phát hiện không.',
            'Chỉnh sửa file cấu hình .vmx (VMware) hoặc cấu hình VirtualBox để ẩn các dấu hiệu của máy ảo.',
            'Chạy lại pafish để xem kết quả.'
          ]
        }
      ]
    },
    {
      id: 'day-54',
      day: 54,
      category: 'Assembly',
      title: 'Kỹ thuật Anti-Analysis: Anti-Disassembly',
      description: 'Làm rối các công cụ dịch ngược.',
      content: `Lý thuyết:
Anti-Disassembly là kỹ thuật đánh lừa các công cụ như IDA Pro hay Ghidra để chúng hiển thị sai mã Assembly.
Các kỹ thuật phổ biến:
- Junk Code / Opaque Predicates: Chèn các lệnh rác hoặc các điều kiện luôn đúng/luôn sai.
- Jump in the middle of an instruction: Nhảy vào giữa một lệnh hợp lệ để công cụ dịch ngược hiểu sai các byte tiếp theo.
- Call/Pop: Sử dụng lệnh CALL để lấy địa chỉ EIP hiện tại (thay vì gọi hàm thực sự).`,
      exercises: [
        {
          title: 'Nhận diện Anti-Disassembly',
          description: 'Phân tích đoạn code bị làm rối.',
          steps: [
            'Mở một file mẫu có chứa kỹ thuật Anti-Disassembly trong Ghidra.',
            'Quan sát các vùng code màu đỏ (báo lỗi dịch ngược) hoặc các lệnh Assembly vô nghĩa.',
            'Sử dụng tính năng "Clear and Disassemble" (phím C và D) trong Ghidra để ép công cụ dịch ngược lại từ một địa chỉ cụ thể.'
          ]
        }
      ]
    },
    {
      id: 'day-55',
      day: 55,
      category: 'Practice',
      title: 'Phân tích mã độc trên Linux (ELF Analysis)',
      description: 'Mã độc không chỉ có trên Windows.',
      content: `Lý thuyết:
Mã độc trên Linux (thường là file ELF) ngày càng phổ biến, đặc biệt là các botnet IoT (như Mirai) và cryptominers.
Cấu trúc file ELF khác với PE của Windows, nhưng nguyên lý phân tích tĩnh và động vẫn tương tự.
Các công cụ hữu ích trên Linux:
- readelf: Xem thông tin header, sections.
- ltrace: Theo dõi các lệnh gọi thư viện (Library calls).
- strace: Theo dõi các lệnh gọi hệ thống (System calls).`,
      commands: [
        { name: 'strace', description: 'Theo dõi System Calls', usage: 'strace ./malware_elf' },
        { name: 'ltrace', description: 'Theo dõi Library Calls', usage: 'ltrace ./malware_elf' }
      ],
      exercises: [
        {
          title: 'Phân tích hành vi ELF',
          description: 'Sử dụng strace và ltrace.',
          steps: [
            'Chạy một file ELF đáng ngờ với strace.',
            'Quan sát các lệnh gọi open(), read(), write(), connect() để xem nó đọc/ghi file nào và kết nối đi đâu.',
            'Sử dụng ltrace để xem nó gọi các hàm thư viện C nào (ví dụ: strcpy, malloc).'
          ]
        }
      ]
    },
    {
      id: 'day-56',
      day: 56,
      category: 'Practice',
      title: 'Phân tích mã độc trên di động (Android APK)',
      description: 'Dịch ngược ứng dụng Android.',
      content: `Lý thuyết:
File APK thực chất là một file ZIP chứa mã nguồn đã biên dịch (classes.dex), tài nguyên (res/) và file cấu hình (AndroidManifest.xml).
Quy trình phân tích cơ bản:
1. Giải nén APK (dùng apktool).
2. Đọc AndroidManifest.xml để xem quyền (Permissions) và các thành phần (Activities, Services, Receivers).
3. Dịch ngược classes.dex thành mã Java (dùng jadx hoặc dex2jar + jd-gui).`,
      commands: [
        { name: 'apktool', description: 'Giải nén và decode APK', usage: 'apktool d malware.apk' },
        { name: 'jadx', description: 'Dịch ngược APK sang Java', usage: 'jadx-gui malware.apk' }
      ],
      exercises: [
        {
          title: 'Dịch ngược APK',
          description: 'Tìm hiểu hành vi của ứng dụng Android.',
          steps: [
            'Sử dụng jadx-gui để mở một file APK nghi ngờ.',
            'Kiểm tra AndroidManifest.xml xem ứng dụng có yêu cầu quyền gửi SMS (SEND_SMS) hay đọc danh bạ (READ_CONTACTS) không.',
            'Tìm hàm MainActivity và theo dõi luồng thực thi của mã Java.'
          ]
        }
      ]
    },
    {
      id: 'day-57',
      day: 57,
      category: 'Lab',
      title: 'Tự động hóa phân tích với Sandbox',
      description: 'Sử dụng Cuckoo Sandbox / CAPE.',
      content: `Lý thuyết:
Khi phải đối mặt với hàng ngàn mẫu mã độc mỗi ngày, phân tích thủ công là không thể.
Sandbox là môi trường ảo tự động chạy mã độc, ghi lại mọi hành vi (file, registry, network, API calls) và tạo ra một báo cáo chi tiết.
CAPE Sandbox là một phiên bản nâng cao của Cuckoo, chuyên dùng để trích xuất payload từ các loại mã độc phức tạp.`,
      exercises: [
        {
          title: 'Đọc báo cáo Sandbox',
          description: 'Phân tích kết quả từ môi trường tự động.',
          steps: [
            'Tải một file mã độc lên một dịch vụ Sandbox trực tuyến (như Any.Run hoặc Hybrid Analysis).',
            'Xem video quá trình mã độc thực thi.',
            'Đọc báo cáo chi tiết: Xem đồ thị tiến trình (Process Tree), các kết nối mạng (HTTP/DNS), và các file bị thay đổi.'
          ]
        }
      ]
    },
    {
      id: 'day-58',
      day: 58,
      category: 'Practice',
      title: 'Phân tích bộ nhớ (Memory Forensics)',
      description: 'Sử dụng Volatility để tìm mã độc ẩn.',
      content: `Lý thuyết:
Nhiều loại mã độc (như Fileless Malware hoặc Rootkit) không để lại dấu vết trên ổ cứng, nhưng chúng BẮT BUỘC phải nằm trong RAM để thực thi.
Memory Forensics là kỹ thuật chụp lại toàn bộ RAM (Memory Dump) và phân tích nó.
Công cụ tiêu chuẩn: Volatility Framework.`,
      commands: [
        { name: 'Volatility Image Info', description: 'Xác định profile của memory dump', usage: 'volatility -f memdump.mem imageinfo' },
        { name: 'Volatility Process List', description: 'Liệt kê các tiến trình', usage: 'volatility -f memdump.mem --profile=Win7SP1x64 pslist' }
      ],
      exercises: [
        {
          title: 'Săn tìm tiến trình ẩn',
          description: 'Sử dụng Volatility để phân tích RAM.',
          steps: [
            'Tải một file memory dump mẫu (ví dụ từ các cuộc thi CTF).',
            'Sử dụng plugin "pslist" để xem danh sách tiến trình hợp lệ.',
            'Sử dụng plugin "psxview" để so sánh và tìm ra các tiến trình bị ẩn (Rootkit).',
            'Sử dụng plugin "netscan" để xem các kết nối mạng tại thời điểm dump RAM.'
          ]
        }
      ]
    },
    {
      id: 'day-59',
      day: 59,
      category: 'Theory',
      title: 'Xây dựng quy tắc YARA (YARA Rules)',
      description: 'Tạo "chữ ký" để phát hiện mã độc.',
      content: `Lý thuyết:
YARA là "công cụ nhận dạng mẫu" dành cho các nhà nghiên cứu mã độc.
Nó cho phép bạn tạo ra các quy tắc (rules) dựa trên các chuỗi văn bản (strings) hoặc chuỗi byte (hex) đặc trưng của một họ mã độc.
Cấu trúc cơ bản của một YARA rule:
rule MalwareName {
    strings:
        $s1 = "malicious_string"
        $hex1 = { E2 34 A1 C8 23 FB }
    condition:
        $s1 or $hex1
}`,
      commands: [
        { name: 'Run YARA', description: 'Quét file với YARA rule', usage: 'yara my_rule.yar suspicious_file.exe' }
      ],
      exercises: [
        {
          title: 'Viết YARA Rule đầu tiên',
          description: 'Tạo luật phát hiện mã độc dựa trên strings.',
          steps: [
            'Trích xuất các chuỗi đặc trưng từ một mẫu mã độc bạn đã phân tích.',
            'Viết một file YARA rule đơn giản chứa các chuỗi đó.',
            'Sử dụng công cụ YARA để quét một thư mục chứa nhiều file và xem nó có phát hiện đúng file mã độc không.'
          ]
        }
      ]
    },
    {
      id: 'day-60',
      day: 60,
      category: 'Lab',
      title: 'Tổng kết Giai đoạn 3: Malware Analysis Challenge',
      description: 'Thử thách cuối khóa về Phân tích mã độc.',
      content: `Lý thuyết:
Chúc mừng bạn đã hoàn thành Giai đoạn 3!
Hôm nay, bạn sẽ nhận được một mẫu mã độc thực tế (đã được làm an toàn). Bạn cần áp dụng toàn bộ quy trình: Phân tích tĩnh, Phân tích động, Dịch ngược, và viết YARA rule để phát hiện nó.`,
      exercises: [
        {
          title: 'The Final Malware',
          description: 'Phân tích toàn diện một mẫu mã độc.',
          steps: [
            'Thực hiện Basic Static Analysis (Hash, Strings, PE headers).',
            'Thực hiện Basic Dynamic Analysis (Procmon, FakeNet-NG).',
            'Sử dụng Ghidra/x64dbg để tìm hiểu logic mã hóa hoặc thuật toán tạo Domain (DGA) của nó.',
            'Viết một báo cáo ngắn gọn và một YARA rule để phát hiện mẫu này.'
          ]
        }
      ],
      quizzes: [
        {
          question: "Công cụ nào sau đây thường được sử dụng để theo dõi các thay đổi về File và Registry trên Windows trong quá trình phân tích động?",
          options: [
            { id: 'A', text: 'Wireshark', isCorrect: false },
            { id: 'B', text: 'Process Monitor (Procmon)', isCorrect: true },
            { id: 'C', text: 'Ghidra', isCorrect: false },
            { id: 'D', text: 'x64dbg', isCorrect: false }
          ],
          explanation: "Procmon (Process Monitor) của Sysinternals là công cụ tiêu chuẩn để theo dõi thời gian thực các hoạt động của File System, Registry, và Process/Thread."
        },
        {
          question: "Kỹ thuật nào sau đây KHÔNG phải là một phương pháp Anti-Analysis (chống phân tích)?",
          options: [
            { id: 'A', text: 'Kiểm tra địa chỉ MAC để phát hiện máy ảo (Anti-VM)', isCorrect: false },
            { id: 'B', text: 'Sử dụng hàm IsDebuggerPresent() (Anti-Debugging)', isCorrect: false },
            { id: 'C', text: 'Chèn các lệnh rác (Junk Code) vào mã Assembly (Anti-Disassembly)', isCorrect: false },
            { id: 'D', text: 'Sử dụng thuật toán mã hóa AES để bảo vệ dữ liệu người dùng', isCorrect: true }
          ],
          explanation: "Mã hóa AES để bảo vệ dữ liệu là một tính năng bảo mật hợp pháp, không phải là kỹ thuật để chống lại việc phân tích mã độc (mặc dù ransomware có sử dụng AES cho mục đích xấu)."
        },
        {
          question: "Trong phân tích bộ nhớ (Memory Forensics) với Volatility, plugin nào thường được dùng để tìm các tiến trình bị ẩn (Rootkit)?",
          options: [
            { id: 'A', text: 'pslist', isCorrect: false },
            { id: 'B', text: 'netscan', isCorrect: false },
            { id: 'C', text: 'psxview', isCorrect: true },
            { id: 'D', text: 'imageinfo', isCorrect: false }
          ],
          explanation: "psxview so sánh danh sách tiến trình từ nhiều nguồn khác nhau trong bộ nhớ. Nếu một tiến trình xuất hiện ở nguồn này nhưng không có ở nguồn khác (ví dụ: bị ẩn khỏi pslist), đó có thể là dấu hiệu của Rootkit."
        },
        {
          question: "YARA Rules chủ yếu được sử dụng để làm gì trong an toàn thông tin?",
          options: [
            { id: 'A', text: 'Dịch ngược mã máy thành mã C', isCorrect: false },
            { id: 'B', text: 'Tạo các "chữ ký" (signatures) dựa trên mẫu chuỗi/byte để nhận diện và phân loại mã độc', isCorrect: true },
            { id: 'C', text: 'Giả lập môi trường mạng (Fake Internet) cho mã độc', isCorrect: false },
            { id: 'D', text: 'Khôi phục các file bị mã hóa bởi Ransomware', isCorrect: false }
          ],
          explanation: "YARA là công cụ nhận dạng mẫu, cho phép các nhà nghiên cứu tạo ra các quy tắc (rules) để tìm kiếm và phân loại các mẫu mã độc dựa trên các đặc điểm (strings, hex) của chúng."
        },
        {
          question: "Đặc điểm chính của Fileless Malware là gì?",
          options: [
            { id: 'A', text: 'Nó không thể lây lan qua mạng', isCorrect: false },
            { id: 'B', text: 'Nó chỉ tấn công các hệ điều hành Linux', isCorrect: false },
            { id: 'C', text: 'Nó cư trú trong bộ nhớ RAM và thường lợi dụng các công cụ hợp pháp của hệ điều hành (như PowerShell) để thực thi', isCorrect: true },
            { id: 'D', text: 'Nó luôn yêu cầu người dùng phải tải về một file .exe', isCorrect: false }
          ],
          explanation: "Fileless Malware tránh việc ghi file thực thi (.exe, .dll) xuống ổ cứng để né tránh các phần mềm diệt virus truyền thống, thay vào đó nó chạy trực tiếp trong bộ nhớ (RAM) bằng các công cụ có sẵn (LotL)."
        }
      ]
    }
  ]
};
