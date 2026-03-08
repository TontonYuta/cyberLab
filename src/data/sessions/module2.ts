import { Module } from '../../types';

export const MODULE_2: Module = {
  id: 'assembly-re',
  title: 'Giai đoạn 2: Hợp ngữ & Reverse Engineering (Buổi 21-40)',
  sessions: [
    {
      id: 'day-21',
      day: 21,
      category: 'Assembly',
      title: 'Kiến trúc CPU x86 & Thanh ghi',
      description: 'Hiểu cách CPU lưu trữ và xử lý dữ liệu ở mức thấp nhất.',
      content: `Lý thuyết:
Hợp ngữ (Assembly) là ngôn ngữ bậc thấp, có mối quan hệ 1-1 với mã máy. Để dịch ngược được phần mềm, bạn phải hiểu CPU x86 hoạt động như thế nào.

Các thanh ghi (Registers) quan trọng:
1. General Purpose: EAX (Accumulator), EBX (Base), ECX (Counter), EDX (Data).
2. Index/Pointer: ESI (Source Index), EDI (Destination Index), EBP (Base Pointer), ESP (Stack Pointer).
3. EIP (Instruction Pointer): Chứa địa chỉ của lệnh tiếp theo sẽ được thực thi. Đây là thanh ghi quan trọng nhất trong khai thác lỗ hổng.

Kích thước thanh ghi:
RAX (64-bit) -> EAX (32-bit) -> AX (16-bit) -> AH/AL (8-bit).`,
      exercises: [
        {
          title: 'Quan sát thanh ghi',
          description: 'Sử dụng Debugger để xem giá trị thanh ghi.',
          steps: [
            'Cài đặt x64dbg trên máy Windows.',
            'Mở một file .exe bất kỳ (ví dụ: notepad.exe).',
            'Tìm cửa sổ "Registers" và quan sát giá trị của EAX, ESP thay đổi khi bạn thực thi từng lệnh (Step into).'
          ]
        }
      ]
    },
    {
      id: 'day-22',
      day: 22,
      category: 'Assembly',
      title: 'Tập lệnh di chuyển dữ liệu (Data Movement)',
      description: 'Lệnh MOV và các chế độ địa chỉ.',
      content: `Lý thuyết:
Lệnh MOV dùng để sao chép dữ liệu từ nguồn sang đích.
Cú pháp: MOV destination, source

Ví dụ:
MOV EAX, 10 (Gán giá trị 10 vào EAX)
MOV EBX, EAX (Copy giá trị từ EAX sang EBX)
MOV EAX, [0x401000] (Lấy giá trị tại địa chỉ bộ nhớ 0x401000 đưa vào EAX)

Lưu ý: Không thể MOV trực tiếp từ bộ nhớ sang bộ nhớ.`,
      commands: [
        { name: 'Assemble', description: 'Biên dịch file asm', usage: 'nasm -f win32 test.asm -o test.obj' }
      ],
      exercises: [
        {
          title: 'Viết chương trình gán giá trị',
          description: 'Sử dụng NASM để viết code Assembly đơn giản.',
          steps: [
            'Tạo file lab1.asm.',
            'Viết code để đưa ngày sinh của bạn vào EAX.',
            'Đưa tháng sinh vào EBX.',
            'Sử dụng x64dbg để kiểm tra xem các thanh ghi có nhận đúng giá trị không.'
          ]
        }
      ]
    },
    {
      id: 'day-23',
      day: 23,
      category: 'Assembly',
      title: 'Toán tử số học & Logic',
      description: 'ADD, SUB, MUL, DIV, AND, OR, XOR.',
      content: `Lý thuyết:
Các lệnh tính toán cơ bản:
- ADD EAX, 5 (EAX = EAX + 5)
- SUB EAX, EBX (EAX = EAX - EBX)
- XOR EAX, EAX (Cách nhanh nhất để reset EAX về 0)
- INC/DEC: Tăng/Giảm 1 đơn vị.

Cờ trạng thái (Flags):
Sau mỗi phép tính, thanh ghi EFLAGS sẽ cập nhật:
- ZF (Zero Flag): Bật nếu kết quả bằng 0.
- CF (Carry Flag): Bật nếu có nhớ.
- SF (Sign Flag): Bật nếu kết quả âm.`,
      exercises: [
        {
          title: 'Thực hành XOR',
          description: 'Hiểu tại sao XOR lại quan trọng trong mã hóa.',
          steps: [
            'Viết một đoạn code Assembly thực hiện XOR một giá trị với một Key.',
            'Thực hiện XOR kết quả đó với cùng Key đó một lần nữa.',
            'Quan sát xem giá trị ban đầu có quay trở lại không (Nguyên lý của mã hóa XOR).'
          ]
        }
      ]
    },
    {
      id: 'day-24',
      day: 24,
      category: 'Assembly',
      title: 'Điều khiển luồng (Flow Control)',
      description: 'CMP, JMP và các lệnh nhảy có điều kiện.',
      content: `Lý thuyết:
CPU thực hiện các quyết định thông qua lệnh so sánh (CMP) và nhảy (JMP).
CMP thực chất là một phép trừ ngầm định để cập nhật các Cờ (Flags).

Các lệnh nhảy phổ biến:
- JMP: Nhảy không điều kiện.
- JZ/JE: Nhảy nếu bằng 0 (ZF=1).
- JNZ/JNE: Nhảy nếu không bằng 0 (ZF=0).
- JG/JL: Nhảy nếu lớn hơn/nhỏ hơn.`,
      exercises: [
        {
          title: 'Bẻ khóa logic đơn giản',
          description: 'Thay đổi luồng thực thi của chương trình.',
          steps: [
            'Viết một chương trình C++ đơn giản yêu cầu nhập mật khẩu.',
            'Sử dụng x64dbg để tìm lệnh JNE (nhảy nếu sai mật khẩu).',
            'Thay đổi (Patch) lệnh JNE thành JE hoặc NOP (No Operation).',
            'Chạy lại chương trình và xem nó có chấp nhận mật khẩu sai không.'
          ]
        }
      ]
    },
    {
      id: 'day-25',
      day: 25,
      category: 'Assembly',
      title: 'Cấu trúc Stack (Ngăn xếp)',
      description: 'PUSH, POP và cách hàm hoạt động.',
      content: `Lý thuyết:
Stack là vùng bộ nhớ hoạt động theo cơ chế LIFO (Last In, First Out).
- PUSH: Đưa dữ liệu vào đỉnh Stack (ESP giảm).
- POP: Lấy dữ liệu từ đỉnh Stack (ESP tăng).

Stack dùng để:
1. Lưu trữ biến cục bộ.
2. Truyền tham số cho hàm.
3. Lưu địa chỉ trả về (Return Address) khi gọi hàm (CALL).`,
      exercises: [
        {
          title: 'Quan sát Stack Frame',
          description: 'Theo dõi ESP và EBP trong Debugger.',
          steps: [
            'Viết một hàm đơn giản trong C++ có 2 tham số.',
            'Debug chương trình và quan sát lệnh PUSH các tham số vào Stack trước khi gọi hàm.',
            'Xem cách EBP được dùng để tạo "khung" cho hàm đó.'
          ]
        }
      ]
    },
    {
      id: 'day-26',
      day: 26,
      category: 'Practice',
      title: 'Giới thiệu công cụ Ghidra',
      description: 'Sử dụng công cụ của NSA để dịch ngược mã nguồn.',
      content: `Lý thuyết:
Ghidra là một framework dịch ngược mạnh mẽ. Điểm mạnh nhất của nó là khả năng Decompile (Chuyển từ Assembly về code C gần đúng).
Quy trình:
1. Import file.
2. Auto Analyze.
3. Xem cửa sổ Decompiler để hiểu logic chương trình.`,
      exercises: [
        {
          title: 'Phân tích file CrackMe',
          description: 'Tìm mật khẩu ẩn trong một file thực thi.',
          steps: [
            'Tải một file CrackMe level 1 từ crackmes.one.',
            'Mở bằng Ghidra.',
            'Tìm hàm main và xem logic so sánh chuỗi.',
            'Tìm ra chuỗi mật khẩu đúng được lưu trong bộ nhớ.'
          ]
        }
      ]
    },
    {
      id: 'day-27',
      day: 27,
      category: 'Assembly',
      title: 'Hàm hệ thống (System Calls)',
      description: 'Cách Assembly tương tác với hệ điều hành.',
      content: `Lý thuyết:
Chương trình không thể tự in ra màn hình hay xóa file. Nó phải nhờ Hệ điều hành thông qua System Calls.
Trên Linux x86:
- EAX chứa số hiệu System Call (ví dụ: 1 là sys_exit, 4 là sys_write).
- EBX, ECX, EDX chứa các tham số.
- Lệnh 'int 0x80' để thực hiện gọi.`,
      exercises: [
        {
          title: 'Viết Hello World bằng Assembly',
          description: 'Chương trình không cần thư viện C.',
          steps: [
            'Viết code Assembly sử dụng sys_write (EAX=4) để in chuỗi.',
            'Sử dụng sys_exit (EAX=1) để kết thúc chương trình sạch sẽ.',
            'Biên dịch và chạy trên Kali Linux.'
          ]
        }
      ]
    },
    {
      id: 'day-28',
      day: 28,
      category: 'Practice',
      title: 'Phân tích file PE (Portable Executable)',
      description: 'Cấu trúc file .exe trên Windows.',
      content: `Lý thuyết:
Mọi file .exe đều bắt đầu bằng chữ "MZ" (DOS Header).
Các Section quan trọng:
- .text: Chứa mã máy thực thi.
- .data: Chứa các biến toàn cục đã khởi tạo.
- .rsrc: Chứa icon, menu, hình ảnh.
- .idata: Chứa danh sách các hàm Import từ DLL khác (ví dụ: MessageBoxA từ user32.dll).`,
      exercises: [
        {
          title: 'Sử dụng PE-bear',
          description: 'Khám phá cấu trúc file thực thi.',
          steps: [
            'Mở notepad.exe bằng PE-bear.',
            'Xem danh sách các DLL mà nó sử dụng.',
            'Tìm địa chỉ bắt đầu (Entry Point) của chương trình.'
          ]
        }
      ]
    },
    {
      id: 'day-29',
      day: 29,
      category: 'Assembly',
      title: 'Kỹ thuật Anti-Debugging cơ bản',
      description: 'Cách mã độc phát hiện nó đang bị phân tích.',
      content: `Lý thuyết:
Mã độc thường không muốn bị debug. Nó sử dụng các hàm như IsDebuggerPresent() để kiểm tra.
Nếu phát hiện đang bị debug, nó sẽ:
- Thoát chương trình.
- Chạy sang một luồng code giả.
- Tự xóa chính mình.`,
      exercises: [
        {
          title: 'Vượt qua IsDebuggerPresent',
          description: 'Học cách đánh lừa mã độc.',
          steps: [
            'Viết một chương trình C++ có kiểm tra IsDebuggerPresent.',
            'Mở trong x64dbg.',
            'Khi chương trình gọi hàm này, hãy thay đổi giá trị trả về trong EAX từ 1 thành 0.',
            'Tiếp tục chạy và xem chương trình có bị lừa không.'
          ]
        }
      ]
    },
    {
      id: 'day-30',
      day: 30,
      category: 'Lab',
      title: 'Xây dựng Keylogger đơn giản bằng C++',
      description: 'Kết nối kiến thức lập trình hệ thống và bảo mật.',
      content: `Lý thuyết:
Keylogger hoạt động bằng cách lắng nghe các sự kiện bàn phím từ Hệ điều hành.
Trên Windows, hàm GetAsyncKeyState() thường được dùng để kiểm tra trạng thái phím.
Dữ liệu sau đó được ghi vào một file ẩn trong thư mục %TEMP%.`,
      exercises: [
        {
          title: 'Thực hành Keylogger an toàn',
          description: 'Viết và phân tích hành vi ghi phím.',
          steps: [
            'Viết code C++ sử dụng vòng lặp vô tận để check phím.',
            'Ghi các phím bấm được vào file log.txt.',
            'Chạy thử và gõ một vài dòng, sau đó kiểm tra file log.',
            'Thử dùng Antivirus quét file .exe vừa tạo xem nó có bị cảnh báo không.'
          ]
        }
      ]
    },
    {
      id: 'day-31',
      day: 31,
      category: 'Assembly',
      title: 'Phân tích mã độc thực tế (Phần 1)',
      description: 'Sử dụng các kỹ năng RE để hiểu hành vi mã độc.',
      content: `Lý thuyết:
Phân tích mã độc (Malware Analysis) chia làm 2 loại:
1. Static Analysis: Xem code, string, header mà không chạy file.
2. Dynamic Analysis: Chạy file trong môi trường an toàn và quan sát hành vi.

Hôm nay chúng ta tập trung vào Static Analysis với Ghidra và Strings.`,
      exercises: [
        {
          title: 'Trích xuất Strings',
          description: 'Tìm kiếm manh mối từ các chuỗi văn bản.',
          steps: [
            'Dùng lệnh strings trên Kali để xem các chuỗi trong một file mã độc mẫu.',
            'Tìm kiếm các địa chỉ IP, URL hoặc tên file lạ.',
            'Giải thích tại sao hacker thường dùng kỹ thuật Obfuscation để che giấu strings.'
          ]
        }
      ]
    },
    {
      id: 'day-32',
      day: 32,
      category: 'Assembly',
      title: 'Kỹ thuật Packing & Unpacking',
      description: 'Cách mã độc nén và mã hóa chính nó.',
      content: `Lý thuyết:
Packer là công cụ nén file thực thi để giảm dung lượng và tránh bị AV phát hiện.
Khi chạy, file sẽ tự giải nén vào bộ nhớ (Unpacking) rồi mới thực thi mã độc thật.
Công cụ phổ biến: UPX.`,
      commands: [
        { name: 'UPX Pack', description: 'Nén file bằng UPX', usage: 'upx -9 malware.exe' },
        { name: 'UPX Unpack', description: 'Giải nén file', usage: 'upx -d malware.exe' }
      ],
      exercises: [
        {
          title: 'Thực hành với UPX',
          description: 'Nén và giải nén file thực thi.',
          steps: [
            'Nén một file .exe bằng UPX.',
            'Dùng PE-bear quan sát sự thay đổi của các Section (thường sẽ thấy section UPX0, UPX1).',
            'Thử dùng lệnh strings và thấy rằng các chuỗi ban đầu đã biến mất.'
          ]
        }
      ]
    },
    {
      id: 'day-33',
      day: 33,
      category: 'Assembly',
      title: 'Phân tích Shellcode',
      description: 'Mã máy nhỏ gọn dùng trong khai thác lỗ hổng.',
      content: `Lý thuyết:
Shellcode là một đoạn mã máy được chèn vào bộ nhớ của tiến trình bị lỗi để chiếm quyền điều khiển.
Đặc điểm:
- Không có header.
- Phải tự tìm địa chỉ các hàm (Position Independent Code).
- Thường dùng để mở một Reverse Shell.`,
      exercises: [
        {
          title: 'Tạo Shellcode với Msfvenom',
          description: 'Sử dụng công cụ của Metasploit.',
          steps: [
            'Dùng msfvenom để tạo một đoạn shellcode thực hiện lệnh calc.exe.',
            'Quan sát các byte mã máy được tạo ra.',
            'Giải thích tại sao shellcode không được chứa byte NULL (0x00).'
          ]
        }
      ]
    },
    {
      id: 'day-34',
      day: 34,
      category: 'Assembly',
      title: 'Kỹ thuật Code Injection',
      description: 'Chèn mã độc vào một tiến trình đang chạy hợp lệ.',
      content: `Lý thuyết:
Hacker thường chèn mã vào các tiến trình tin cậy như explorer.exe hoặc svchost.exe để ẩn mình.
Các bước cơ bản:
1. OpenProcess: Mở tiến trình mục tiêu.
2. VirtualAllocEx: Cấp phát bộ nhớ trong tiến trình đó.
3. WriteProcessMemory: Ghi mã độc vào vùng nhớ vừa cấp phát.
4. CreateRemoteThread: Thực thi mã độc đó.`,
      exercises: [
        {
          title: 'Phân tích API Call',
          description: 'Tìm kiếm các hàm nguy hiểm trong Ghidra.',
          steps: [
            'Mở một file mã độc mẫu trong Ghidra.',
            'Tìm kiếm trong bảng Symbol Tree các hàm: VirtualAllocEx, WriteProcessMemory.',
            'Xem code decompile để hiểu nó đang nhắm vào tiến trình nào.'
          ]
        }
      ]
    },
    {
      id: 'day-35',
      day: 35,
      category: 'Assembly',
      title: 'DLL Injection',
      description: 'Ép buộc một tiến trình tải file DLL độc hại.',
      content: `Lý thuyết:
Tương tự Code Injection, nhưng thay vì chèn shellcode, hacker chèn đường dẫn tới một file DLL.
Tiến trình mục tiêu sẽ gọi LoadLibrary() để nạp DLL này vào không gian địa chỉ của nó.`,
      exercises: [
        {
          title: 'Mô phỏng DLL Injection',
          description: 'Sử dụng công cụ Injector.',
          steps: [
            'Viết một DLL đơn giản hiện MessageBox khi được nạp.',
            'Sử dụng một công cụ Injector để chèn DLL này vào Notepad.',
            'Quan sát xem MessageBox có hiện lên không.'
          ]
        }
      ]
    },
    {
      id: 'day-36',
      day: 36,
      category: 'Assembly',
      title: 'Phân tích Ransomware (Phần 1)',
      description: 'Cách mã độc mã hóa file của nạn nhân.',
      content: `Lý thuyết:
Ransomware thường thực hiện các bước:
1. Duyệt toàn bộ ổ cứng (Recursive file search).
2. Kiểm tra phần mở rộng file (để tránh mã hóa file hệ thống gây hỏng máy).
3. Sử dụng thư viện mã hóa (như CryptoAPI của Windows) để mã hóa file.
4. Để lại file hướng dẫn trả tiền chuộc (Ransom Note).`,
      exercises: [
        {
          title: 'Phân tích logic mã hóa',
          description: 'Tìm kiếm các hàm mã hóa trong mã nguồn.',
          steps: [
            'Phân tích một mẫu ransomware cũ (như WannaCry) trong môi trường Lab cô lập.',
            'Tìm hàm thực hiện việc duyệt file.',
            'Xác định thuật toán mã hóa được sử dụng (AES/RSA).'
          ]
        }
      ]
    },
    {
      id: 'day-37',
      day: 37,
      category: 'Assembly',
      title: 'Kỹ thuật Persistence (Duy trì sự hiện diện)',
      description: 'Cách mã độc tự khởi động cùng Windows.',
      content: `Lý thuyết:
Sau khi xâm nhập, mã độc cần đảm bảo nó vẫn chạy sau khi máy khởi động lại.
Các vị trí phổ biến:
- Registry Run Keys: HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run.
- Startup Folder.
- Scheduled Tasks (Tác vụ lập lịch).
- Windows Services.`,
      exercises: [
        {
          title: 'Kiểm tra Registry',
          description: 'Sử dụng Regedit để tìm kiếm mã độc.',
          steps: [
            'Mở Registry Editor.',
            'Kiểm tra các khóa Run và RunOnce.',
            'Thử tạo một entry để tự động mở Notepad khi máy khởi động.'
          ]
        }
      ]
    },
    {
      id: 'day-38',
      day: 38,
      category: 'Assembly',
      title: 'Phân tích Network Behavior của Mã độc',
      description: 'Cách mã độc liên lạc với máy chủ C2 (Command & Control).',
      content: `Lý thuyết:
Mã độc thường kết nối về server của hacker để nhận lệnh hoặc gửi dữ liệu đánh cắp.
Dấu hiệu:
- Kết nối tới các tên miền lạ (DGA - Domain Generation Algorithm).
- Sử dụng giao thức HTTP/HTTPS hoặc DNS để truyền tin.
- Gửi các gói tin Beacon (tín hiệu "tôi vẫn đang sống") định kỳ.`,
      exercises: [
        {
          title: 'Sử dụng FakeNet-NG',
          description: 'Đánh lừa mã độc trong môi trường Lab.',
          steps: [
            'Chạy FakeNet-NG trên máy phân tích.',
            'Chạy mã độc mẫu và quan sát các request nó gửi đi.',
            'Phân tích nội dung gói tin để hiểu giao thức C2.'
          ]
        }
      ]
    },
    {
      id: 'day-39',
      day: 39,
      category: 'Assembly',
      title: 'Kỹ thuật Obfuscation (Làm rối mã)',
      description: 'Cách hacker làm khó các chuyên gia Reverse Engineering.',
      content: `Lý thuyết:
Obfuscation không thay đổi chức năng của chương trình nhưng làm code trở nên cực kỳ khó đọc.
Các kỹ thuật:
- Junk Code: Chèn các lệnh vô nghĩa.
- Control Flow Flattening: Làm mất cấu trúc if/else, vòng lặp.
- String Encryption: Mã hóa toàn bộ chuỗi văn bản.`,
      exercises: [
        {
          title: 'Đối mặt với Junk Code',
          description: 'Học cách bỏ qua các lệnh thừa.',
          steps: [
            'Phân tích một đoạn code bị làm rối trong x64dbg.',
            'Xác định các lệnh không ảnh hưởng đến kết quả cuối cùng.',
            'Tập trung vào các lệnh thay đổi thanh ghi quan trọng và System Calls.'
          ]
        }
      ]
    },
    {
      id: 'day-40',
      day: 40,
      category: 'Lab',
      title: 'Tổng kết Giai đoạn 2: Reverse Engineering Challenge',
      description: 'Thử thách cuối khóa về Assembly và RE.',
      content: `Lý thuyết:
Bạn đã đi được gần nửa chặng đường!
Hôm nay bạn sẽ đối mặt với một file thực thi bí ẩn. Bạn cần sử dụng tất cả kiến thức về x64dbg, Ghidra, PE-bear để giải mã nó.`,
      exercises: [
        {
          title: 'The Final CrackMe',
          description: 'Giải mã và tìm Flag.',
          steps: [
            'File thực thi yêu cầu một Serial Key.',
            'Key này không được lưu trực tiếp mà được tính toán qua một thuật toán phức tạp.',
            'Nhiệm vụ: Tìm ra thuật toán đó và viết một Keygen đơn giản bằng Python.'
          ]
        }
      ],
      quizzes: [
        {
          question: "Thanh ghi nào chứa địa chỉ của lệnh tiếp theo sẽ được thực thi trong kiến trúc x86?",
          options: [
            { id: 'A', text: 'EAX', isCorrect: false },
            { id: 'B', text: 'ESP', isCorrect: false },
            { id: 'C', text: 'EIP', isCorrect: true },
            { id: 'D', text: 'EBP', isCorrect: false }
          ],
          explanation: "EIP (Instruction Pointer) luôn trỏ tới lệnh kế tiếp trong luồng thực thi."
        },
        {
          question: "Lệnh nào sau đây giúp reset thanh ghi EAX về 0 nhanh nhất và tối ưu nhất?",
          options: [
            { id: 'A', text: 'MOV EAX, 0', isCorrect: false },
            { id: 'B', text: 'SUB EAX, EAX', isCorrect: false },
            { id: 'C', text: 'XOR EAX, EAX', isCorrect: true },
            { id: 'D', text: 'Cả B và C đều đúng', isCorrect: false }
          ],
          explanation: "XOR EAX, EAX là cách tối ưu nhất (opcode ngắn hơn và thực thi nhanh hơn MOV)."
        },
        {
          question: "Khi thực hiện lệnh PUSH EAX, giá trị của thanh ghi ESP sẽ thay đổi như thế nào?",
          options: [
            { id: 'A', text: 'Tăng lên 4 đơn vị', isCorrect: false },
            { id: 'B', text: 'Giảm đi 4 đơn vị', isCorrect: true },
            { id: 'C', text: 'Không thay đổi', isCorrect: false },
            { id: 'D', text: 'Tăng lên 8 đơn vị', isCorrect: false }
          ],
          explanation: "Trong kiến trúc x86, Stack phát triển về phía địa chỉ thấp, nên PUSH sẽ làm giảm ESP."
        },
        {
          question: "Section nào trong file PE (Portable Executable) thường chứa mã máy thực thi?",
          options: [
            { id: 'A', text: '.data', isCorrect: false },
            { id: 'B', text: '.rsrc', isCorrect: false },
            { id: 'C', text: '.text', isCorrect: true },
            { id: 'D', text: '.reloc', isCorrect: false }
          ],
          explanation: ".text (hoặc .code) là nơi lưu trữ các lệnh Assembly đã được biên dịch thành mã máy."
        },
        {
          question: "Mục đích chính của kỹ thuật Obfuscation trong mã độc là gì?",
          options: [
            { id: 'A', text: 'Giảm dung lượng file thực thi', isCorrect: false },
            { id: 'B', text: 'Làm cho code trở nên khó đọc và khó phân tích', isCorrect: true },
            { id: 'C', text: 'Tăng tốc độ thực thi của chương trình', isCorrect: false },
            { id: 'D', text: 'Tự động lây lan qua mạng LAN', isCorrect: false }
          ],
          explanation: "Obfuscation không thay đổi chức năng của chương trình nhưng làm code trở nên cực kỳ khó đọc đối với các chuyên gia phân tích."
        }
      ]
    }
  ]
};
