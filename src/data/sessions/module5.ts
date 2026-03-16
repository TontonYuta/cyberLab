import { Module } from '../../types';

export const MODULE_5: Module = {
  id: 'advanced-network-programming',
  title: 'Giai đoạn 5: Lập trình mạng nâng cao (Buổi 81-100)',
  sessions: [
    {
      id: 'day-81',
      day: 81,
      category: 'Theory',
      title: 'Kiến trúc Socket và vòng đời kết nối TCP',
      description: 'Hiểu socket là gì và cách một kết nối TCP được tạo ra từ đầu đến cuối.',
      content: `Lý thuyết:
Socket là giao diện lập trình cho phép hai tiến trình giao tiếp với nhau qua mạng. Trong lập trình mạng, socket là điểm cuối (endpoint) của một kết nối.

TCP (Transmission Control Protocol) có các đặc điểm:
1. Hướng kết nối (Connection-oriented): Phải thiết lập kết nối trước khi truyền dữ liệu.
2. Đáng tin cậy (Reliable): Có cơ chế xác nhận, gửi lại khi mất gói.
3. Có thứ tự (Ordered): Dữ liệu đến đúng thứ tự đã gửi.
4. Kiểm soát luồng và tắc nghẽn.

Vòng đời của TCP Server:
1. socket(): Tạo socket.
2. bind(): Gắn socket với IP và Port.
3. listen(): Chuyển socket sang chế độ chờ kết nối.
4. accept(): Chấp nhận kết nối từ client, tạo ra một socket mới để trao đổi dữ liệu.
5. recv()/send(): Nhận và gửi dữ liệu.
6. close(): Đóng kết nối.

Vòng đời của TCP Client:
1. socket(): Tạo socket.
2. connect(): Kết nối đến server.
3. send()/recv(): Trao đổi dữ liệu.
4. close(): Đóng kết nối.

Các khái niệm quan trọng:
- Server Socket: Socket dùng để lắng nghe kết nối mới.
- Connected Socket: Socket riêng được tạo sau accept(), dùng để trao đổi dữ liệu với từng client.
- Port: Số hiệu để phân biệt dịch vụ trên một máy.
- IP Address: Địa chỉ xác định máy trên mạng.
- 127.0.0.1 / localhost: Chỉ chính máy hiện tại.
- 0.0.0.0: Lắng nghe trên mọi card mạng.

Lưu ý:
- Một server chỉ bind một lần, nhưng có thể accept nhiều kết nối.
- TCP là stream, không có khái niệm ranh giới message tự nhiên.
- Server thường chạy vòng lặp vô hạn để chấp nhận nhiều client.`,
      commands: [
        { name: 'Run Node TCP Server', description: 'Chạy server TCP bằng Node.js', usage: 'node tcp_server.js' },
        { name: 'Run Node TCP Client', description: 'Chạy client TCP bằng Node.js', usage: 'node tcp_client.js' }
      ],
      exercises: [
        {
          title: 'Viết Echo Server đầu tiên',
          description: 'Tạo TCP server nhận dữ liệu và trả lại đúng nội dung đã nhận.',
          steps: [
            'Tạo một TCP server lắng nghe trên cổng 9000.',
            'Khi client kết nối, in ra IP và port của client.',
            'Nhận dữ liệu client gửi lên và gửi lại nguyên văn.',
            'Khi client ngắt kết nối, ghi log ra màn hình.'
          ]
        },
        {
          title: 'Viết Echo Client',
          description: 'Tạo client kết nối đến server và gửi tin nhắn.',
          steps: [
            'Kết nối đến server 127.0.0.1:9000.',
            'Cho người dùng nhập chuỗi từ bàn phím.',
            'Gửi chuỗi đó đến server.',
            'In phản hồi từ server rồi đóng kết nối.'
          ]
        }
      ]
    },
    {
      id: 'day-82',
      day: 82,
      category: 'Practice',
      title: 'UDP Socket Programming',
      description: 'Lập trình với UDP và so sánh với TCP.',
      content: `Lý thuyết:
UDP (User Datagram Protocol) là giao thức không kết nối.
Khác với TCP:
- Không cần bắt tay thiết lập kết nối.
- Không đảm bảo gói tin sẽ đến nơi.
- Không đảm bảo đúng thứ tự.
- Nhanh hơn, overhead thấp hơn.

Khái niệm quan trọng:
1. Datagram: Một gói tin độc lập.
2. sendto()/recvfrom(): Hai thao tác chính khi làm việc với UDP.
3. Connectionless: Không duy trì trạng thái kết nối như TCP.
4. Packet loss: Mất gói có thể xảy ra, ứng dụng phải tự xử lý nếu cần.

Khi nào dùng UDP:
- DNS
- Game online
- Streaming
- Telemetry
- Service discovery

So sánh TCP và UDP:
- TCP phù hợp khi cần độ tin cậy.
- UDP phù hợp khi cần tốc độ và chấp nhận mất mát nhỏ.

Lưu ý khi lập trình:
- Một lần recvfrom() thường tương ứng một datagram.
- Không nên gửi datagram quá lớn.
- Không có cơ chế tự chia lại message như stream TCP.`,
      commands: [
        { name: 'Run UDP Server', description: 'Chạy UDP server bằng Node.js', usage: 'node udp_server.js' },
        { name: 'Run UDP Client', description: 'Chạy UDP client bằng Node.js', usage: 'node udp_client.js' }
      ],
      exercises: [
        {
          title: 'UDP Echo',
          description: 'Viết server/client dùng UDP để gửi nhận datagram.',
          steps: [
            'Tạo UDP server lắng nghe cổng 9999.',
            'Khi nhận datagram, in nội dung và địa chỉ người gửi.',
            'Gửi lại phản hồi ACK kèm nội dung gốc.',
            'Viết client gửi 5 gói tin liên tiếp đến server.'
          ]
        },
        {
          title: 'So sánh TCP và UDP',
          description: 'Quan sát khác biệt về hành vi.',
          steps: [
            'Gửi cùng một loại dữ liệu bằng TCP và UDP.',
            'Quan sát cách xử lý ở server.',
            'So sánh khái niệm kết nối, trạng thái và độ phức tạp code.',
            'Ghi lại khi nào nên dùng TCP, khi nào nên dùng UDP.'
          ]
        }
      ]
    },
    {
      id: 'day-83',
      day: 83,
      category: 'Theory',
      title: 'IP, Port, Byte Order và Serialization',
      description: 'Hiểu cách dữ liệu được biểu diễn và đóng gói khi truyền qua mạng.',
      content: `Lý thuyết:
Muốn giao tiếp qua mạng, dữ liệu phải được biểu diễn thành bytes.

Các khái niệm cốt lõi:
1. IPv4 và IPv6:
- IPv4: 32 bit, ví dụ 192.168.1.10
- IPv6: 128 bit, ví dụ 2001:db8::1

2. Port:
- Số hiệu logic gắn với dịch vụ.
- Ví dụ HTTP = 80, HTTPS = 443.

3. Byte Order:
- Big-endian: Byte lớn trước.
- Little-endian: Byte nhỏ trước.
- Network byte order chuẩn là Big-endian.

4. Serialization:
- Chuyển object/struct thành chuỗi bytes để gửi đi.
- Phía nhận phải deserialize đúng định dạng.

Các kỹ thuật serialize phổ biến:
- Text protocol (JSON, CSV, dòng text)
- Binary protocol (Buffer, struct, protobuf)

Vấn đề thường gặp:
- Bên gửi dùng number, bên nhận đọc sai kích thước.
- Không thống nhất encoding UTF-8.
- Không có length prefix nên bị dính message boundary.

Lời khuyên:
- Protocol phải quy định rõ:
  - Kiểu dữ liệu
  - Thứ tự trường
  - Kích thước trường
  - Encoding
- Nên có version cho protocol`,
      exercises: [
        {
          title: 'Tự đóng gói dữ liệu',
          description: 'Biểu diễn object thành bytes rồi khôi phục lại.',
          steps: [
            'Tạo object có các trường: id, username, age.',
            'Serialize object sang JSON string rồi sang Buffer.',
            'Deserialize phía nhận và in lại dữ liệu.',
            'Thử làm thêm một phiên bản binary đơn giản với Buffer.'
          ]
        },
        {
          title: 'Phân biệt text protocol và binary protocol',
          description: 'So sánh ưu và nhược điểm.',
          steps: [
            'Tạo một message text dạng LOGIN|huy|123456.',
            'Tạo một message JSON tương đương.',
            'So sánh độ dễ đọc, độ dài và khả năng mở rộng.',
            'Viết kết luận khi nào nên dùng text, khi nào nên dùng binary.'
          ]
        }
      ]
    },
    {
      id: 'day-84',
      day: 84,
      category: 'Practice',
      title: 'Thiết kế Application Protocol riêng',
      description: 'Tự định nghĩa giao thức tầng ứng dụng cho client-server.',
      content: `Lý thuyết:
TCP chỉ cung cấp luồng bytes, không tự hiểu message của ứng dụng. Vì vậy bạn phải tự thiết kế giao thức riêng.

Một protocol tốt nên có:
1. Header: Phần mở đầu cho biết loại gói tin.
2. Length: Độ dài dữ liệu.
3. Type: Loại message (LOGIN, MSG, LIST, FILE...)
4. Payload: Nội dung thật.

Ví dụ message:
- Type = LOGIN
- Payload = username
- Length = 12

Hai cách thiết kế phổ biến:
1. Line-based protocol:
- Mỗi message là một dòng kết thúc bằng \\n
- Dễ debug
- Khó xử lý dữ liệu nhị phân

2. Length-prefixed protocol:
- Đầu message chứa số byte của payload
- Phù hợp với binary data và stream TCP

Khái niệm quan trọng:
- Message framing: Xác định ranh giới từng message trong stream.
- Versioning: Thêm version để nâng cấp protocol sau này.
- Error code: Phải có cách báo lỗi rõ ràng.

Lưu ý:
- Không nên gửi object "thô" mà không có format rõ ràng.
- Phải nghĩ đến trường hợp nhận thiếu dữ liệu hoặc dữ liệu sai format.`,
      exercises: [
        {
          title: 'Thiết kế protocol cho chat app',
          description: 'Định nghĩa format message giữa client và server.',
          steps: [
            'Định nghĩa các loại message: LOGIN, MSG, LIST, QUIT.',
            'Chọn text protocol hoặc JSON protocol.',
            'Mô tả rõ format mỗi loại message.',
            'Viết ví dụ 5 message hợp lệ.'
          ]
        },
        {
          title: 'Cài parser cho protocol',
          description: 'Phân tích dữ liệu nhận được thành cấu trúc có nghĩa.',
          steps: [
            'Nhận một dòng text từ socket.',
            'Parse type và payload.',
            'Kiểm tra dữ liệu có hợp lệ không.',
            'Trả về object message cho tầng ứng dụng xử lý.'
          ]
        }
      ]
    },
    {
      id: 'day-85',
      day: 85,
      category: 'Practice',
      title: 'Multi-client TCP Server với Thread/Event',
      description: 'Xây server phục vụ nhiều client đồng thời.',
      content: `Lý thuyết:
Một server thực tế không chỉ phục vụ một client. Nó phải xử lý nhiều kết nối cùng lúc.

Các mô hình phổ biến:
1. Sequential Server:
- Xử lý từng client một.
- Đơn giản nhưng chậm.

2. Thread per Client:
- Mỗi client một luồng.
- Dễ hiểu nhưng tốn tài nguyên nếu quá nhiều client.

3. Event-driven:
- Một hoặc vài luồng xử lý nhiều socket bằng sự kiện.
- Hiệu quả hơn khi số lượng client lớn.

Các vấn đề cần hiểu:
- Shared state: Danh sách client đang kết nối.
- Race condition: Hai luồng cùng sửa dữ liệu.
- Broadcast: Gửi message đến nhiều client.
- Cleanup: Xóa client đã ngắt kết nối.

Trong Node.js:
- Không dùng thread per client theo kiểu truyền thống.
- Thường dùng event loop và callback/event handler.

Mục tiêu buổi này:
- Hiểu nhiều client đồng thời
- Quản lý danh sách client
- Xây chat server đơn giản`,
      commands: [
        { name: 'Run Chat Server', description: 'Chạy server chat nhiều client', usage: 'node chat_server.js' }
      ],
      exercises: [
        {
          title: 'Server chat nhiều người',
          description: 'Mỗi client gửi tin nhắn và server broadcast cho mọi người.',
          steps: [
            'Cho nhiều client cùng kết nối đến server.',
            'Khi một client gửi tin nhắn, server broadcast cho tất cả client khác.',
            'Lưu danh sách client đang online.',
            'Khi client thoát, xóa khỏi danh sách.'
          ]
        },
        {
          title: 'Hiển thị số client online',
          description: 'Theo dõi trạng thái kết nối.',
          steps: [
            'Mỗi khi client connect/disconnect, cập nhật số lượng online.',
            'Gửi thông báo hệ thống cho các client còn lại.',
            'In log toàn bộ sự kiện lên server.',
            'Kiểm tra trường hợp client tắt đột ngột.'
          ]
        }
      ]
    },
    {
      id: 'day-86',
      day: 86,
      category: 'Theory',
      title: 'I/O Multiplexing: select, poll, epoll',
      description: 'Hiểu cách một tiến trình theo dõi nhiều socket cùng lúc.',
      content: `Lý thuyết:
Khi số lượng kết nối tăng cao, mô hình một luồng một client trở nên kém hiệu quả. I/O Multiplexing giải quyết bài toán đó.

Khái niệm:
- Readiness: Socket sẵn sàng đọc/ghi.
- File descriptor: Định danh tài nguyên I/O trong hệ điều hành.
- Event loop: Vòng lặp chờ sự kiện từ nhiều socket.

Các cơ chế:
1. select:
- Cũ, dễ hiểu.
- Bị giới hạn số lượng fd.
- Mỗi lần gọi phải quét toàn bộ tập fd.

2. poll:
- Cải tiến hơn select.
- Không bị giới hạn số fd như select.
- Vẫn phải duyệt danh sách.

3. epoll (Linux) / kqueue (BSD, macOS):
- Hiệu quả cao với số lượng lớn kết nối.
- Chỉ báo những fd thực sự có sự kiện.

Lợi ích:
- Không cần tạo quá nhiều thread.
- Tiết kiệm memory.
- Phù hợp server hiệu năng cao.

Mối liên hệ với Node.js:
- Node dùng event loop phía dưới dựa trên cơ chế tương tự epoll/kqueue/libuv.

Điểm quan trọng:
- Non-blocking I/O thường đi cùng I/O multiplexing.
- Ứng dụng phải thiết kế theo hướng event-driven.`,
      exercises: [
        {
          title: 'So sánh mô hình xử lý nhiều client',
          description: 'Phân tích ưu và nhược điểm.',
          steps: [
            'So sánh sequential, thread-based và event-driven server.',
            'Liệt kê ưu nhược điểm của từng mô hình.',
            'Cho ví dụ khi nào dùng mô hình nào.',
            'Vẽ sơ đồ event loop xử lý nhiều client.'
          ]
        },
        {
          title: 'Nghiên cứu cơ chế readiness',
          description: 'Hiểu socket nào sẵn sàng để đọc/ghi.',
          steps: [
            'Tìm hiểu thế nào là readable socket.',
            'Tìm hiểu writable socket nghĩa là gì.',
            'Phân biệt ready và completed I/O.',
            'Viết ghi chú ngắn về vai trò của event loop.'
          ]
        }
      ]
    },
    {
      id: 'day-87',
      day: 87,
      category: 'Practice',
      title: 'Non-blocking Socket, Timeout và Partial Read/Write',
      description: 'Xử lý các trường hợp mạng thực tế không lý tưởng.',
      content: `Lý thuyết:
Trong môi trường thực tế:
- Kết nối có thể chậm
- Dữ liệu có thể đến từng phần
- Ghi dữ liệu có thể không ghi hết trong một lần

Khái niệm quan trọng:
1. Blocking I/O:
- Hàm chờ cho đến khi hoàn tất hoặc lỗi.

2. Non-blocking I/O:
- Hàm trả về ngay, ứng dụng tự xử lý trạng thái sau.

3. Timeout:
- Giới hạn thời gian chờ connect/read/write.

4. Partial Read:
- recv() có thể chỉ nhận được một phần message.

5. Partial Write:
- send() có thể chỉ gửi được một phần buffer.

Vấn đề thường gặp:
- Giả định recv() luôn trả đủ một message.
- Không xử lý client treo.
- Không có timeout dẫn đến connection bị kẹt mãi.

Giải pháp:
- Dùng buffer tích lũy dữ liệu.
- Dùng protocol có length prefix hoặc delimiter.
- Thiết kế retry và timeout hợp lý.`,
      exercises: [
        {
          title: 'Xử lý message đến từng phần',
          description: 'Thực hành với stream TCP.',
          steps: [
            'Thiết kế protocol có delimiter hoặc length prefix.',
            'Tích lũy dữ liệu vào buffer.',
            'Chỉ parse khi đã nhận đủ một message hoàn chỉnh.',
            'Thử chia nhỏ dữ liệu gửi để kiểm tra parser.'
          ]
        },
        {
          title: 'Timeout và reconnect',
          description: 'Giúp client không treo vô hạn.',
          steps: [
            'Đặt timeout cho kết nối client.',
            'Nếu quá thời gian, báo lỗi rõ ràng.',
            'Thêm cơ chế reconnect đơn giản.',
            'Ghi log số lần retry.'
          ]
        }
      ]
    },
    {
      id: 'day-88',
      day: 88,
      category: 'Practice',
      title: 'Async Networking với async/await',
      description: 'Viết ứng dụng mạng bất đồng bộ hiện đại.',
      content: `Lý thuyết:
Async programming cho phép xử lý nhiều công việc I/O mà không chặn luồng chính.

Khái niệm:
- Event loop
- Promise
- async/await
- Coroutine
- Concurrency khác Parallelism

Vì sao async quan trọng:
- Mạng là I/O-bound, không phải CPU-bound.
- Chờ socket đọc/ghi là khoảng thời gian lý tưởng để chuyển sang xử lý tác vụ khác.

Ưu điểm:
- Code gọn hơn callback truyền thống
- Dễ mở rộng nhiều kết nối
- Phù hợp với server hiện đại

Nhược điểm:
- Khó debug một số lỗi trạng thái
- Dễ gây memory leak nếu quản lý promise kém
- Không phải lúc nào cũng thay thế được mọi mô hình khác

Mục tiêu buổi này:
- Viết lại logic client/server theo hướng async
- Hiểu rõ tư duy event-driven ở mức code`,
      exercises: [
        {
          title: 'Viết async chat server',
          description: 'Ứng dụng async/await để tổ chức code rõ ràng hơn.',
          steps: [
            'Tách phần nhận message, parse message và broadcast thành các hàm riêng.',
            'Dùng Promise hoặc async flow để tổ chức xử lý.',
            'Xử lý lỗi socket mà không làm crash server.',
            'Kiểm tra khi nhiều client gửi cùng lúc.'
          ]
        },
        {
          title: 'So sánh code callback và code async',
          description: 'Đánh giá khả năng bảo trì.',
          steps: [
            'Viết cùng một logic theo 2 cách.',
            'So sánh độ dài code.',
            'So sánh độ dễ đọc và xử lý lỗi.',
            'Rút ra khi nào async/await giúp ích rõ nhất.'
          ]
        }
      ]
    },
    {
      id: 'day-89',
      day: 89,
      category: 'Practice',
      title: 'File Transfer Protocol mini',
      description: 'Tự xây hệ thống truyền file qua TCP.',
      content: `Lý thuyết:
Truyền file qua mạng không chỉ là gửi một chuỗi bytes. Bạn phải nghĩ tới:
- Tên file
- Kích thước
- Kiểu dữ liệu nhị phân
- Tính toàn vẹn
- Trạng thái hoàn tất

Thành phần của một giao thức truyền file:
1. Metadata:
- filename
- filesize
- optional checksum

2. Data:
- Gửi thành nhiều chunk nhỏ.

3. Completion:
- Bên nhận xác nhận đã nhận đủ.

Khái niệm quan trọng:
- Chunking
- Buffering
- Checksum (MD5/SHA256)
- Resume upload/download (cơ bản)
- Binary-safe transmission

Lưu ý:
- Không đọc cả file lớn vào RAM cùng lúc.
- Phải dùng stream hoặc chunk.
- Cần kiểm tra file nhận có đầy đủ không.`,
      exercises: [
        {
          title: 'Gửi file từ client lên server',
          description: 'Thiết kế protocol truyền file có metadata.',
          steps: [
            'Client gửi tên file và kích thước trước.',
            'Server tạo file đích để ghi dữ liệu.',
            'Client chia file thành các chunk và gửi dần.',
            'Server xác nhận hoàn tất khi nhận đủ byte.'
          ]
        },
        {
          title: 'Kiểm tra toàn vẹn file',
          description: 'So sánh checksum trước và sau truyền.',
          steps: [
            'Tính SHA256 của file gốc.',
            'Tính SHA256 của file nhận được.',
            'So sánh hai giá trị.',
            'Nếu lệch, đánh dấu file bị lỗi truyền.'
          ]
        }
      ]
    },
    {
      id: 'day-90',
      day: 90,
      category: 'Theory',
      title: 'HTTP từ góc nhìn lập trình viên mạng',
      description: 'Hiểu HTTP ở mức raw request/response thay vì chỉ dùng framework.',
      content: `Lý thuyết:
HTTP là giao thức tầng ứng dụng phổ biến nhất trên Internet.

Cấu trúc HTTP Request:
1. Request line:
- METHOD PATH VERSION
- Ví dụ: GET /index.html HTTP/1.1

2. Headers:
- Host
- User-Agent
- Content-Type
- Content-Length
- Connection

3. Body:
- Có thể có hoặc không, tùy method.

Cấu trúc HTTP Response:
1. Status line:
- HTTP/1.1 200 OK

2. Headers

3. Body

Các method phổ biến:
- GET
- POST
- PUT
- DELETE

Khái niệm quan trọng:
- Stateless
- Keep-Alive
- Content-Length
- Chunked encoding
- MIME type
- Status code 2xx, 4xx, 5xx

Điểm cần nhớ:
- HTTP chạy trên TCP.
- Mỗi request/response chỉ là dữ liệu text có format chặt chẽ.
- Nếu hiểu HTTP ở mức raw socket, bạn sẽ hiểu web framework sâu hơn.`,
      exercises: [
        {
          title: 'Phân tích một HTTP request thật',
          description: 'Đọc từng dòng request bằng mắt.',
          steps: [
            'Mở DevTools hoặc dùng netcat/telnet để gửi request đơn giản.',
            'Ghi lại request line và headers.',
            'Giải thích ý nghĩa từng header chính.',
            'Xác định đâu là body, đâu là phần kết thúc header.'
          ]
        },
        {
          title: 'Thiết kế HTTP response thủ công',
          description: 'Tự viết response text hợp lệ.',
          steps: [
            'Tạo response 200 OK trả về HTML đơn giản.',
            'Thêm Content-Type và Content-Length.',
            'Thử tạo response 404 Not Found.',
            'Kiểm tra response bằng trình duyệt hoặc curl.'
          ]
        }
      ]
    },
    {
      id: 'day-91',
      day: 91,
      category: 'Practice',
      title: 'Tự viết HTTP Server và REST API cơ bản',
      description: 'Xây web server mini và trả về dữ liệu JSON.',
      content: `Lý thuyết:
Sau khi hiểu HTTP thô, bước tiếp theo là viết HTTP server tối giản.

Mục tiêu:
- Nhận request từ trình duyệt hoặc client
- Parse method, path, header
- Trả HTML hoặc JSON

Khái niệm REST cơ bản:
- Resource-oriented
- Stateless
- Dùng HTTP method đúng nghĩa

Ví dụ endpoint:
- GET /messages
- POST /messages
- GET /users

Khi trả JSON:
- Content-Type phải là application/json
- Body nên là chuỗi JSON hợp lệ

Những phần phải xử lý:
- Route matching
- Parse body
- Status code hợp lý
- Error response rõ ràng

Lưu ý:
- Không cần framework lớn cho buổi này.
- Mục tiêu là hiểu nền tảng trước.`,
      commands: [
        { name: 'Run HTTP Server', description: 'Chạy HTTP server nội bộ', usage: 'node http_server.js' },
        { name: 'Test API with curl', description: 'Gửi request đến API', usage: 'curl http://127.0.0.1:8080/messages' }
      ],
      exercises: [
        {
          title: 'Web server trả HTML',
          description: 'Viết server trả về một trang HTML đơn giản.',
          steps: [
            'Lắng nghe ở cổng 8080.',
            'Nếu request là GET / thì trả về một trang HTML.',
            'Nếu path không tồn tại thì trả 404.',
            'In log method và path của từng request.'
          ]
        },
        {
          title: 'REST API mini',
          description: 'Tạo API quản lý danh sách tin nhắn.',
          steps: [
            'Tạo endpoint GET /messages trả JSON array.',
            'Tạo endpoint POST /messages để thêm tin nhắn mới.',
            'Lưu dữ liệu tạm thời trong memory.',
            'Trả mã lỗi nếu request body không hợp lệ.'
          ]
        }
      ]
    },
    {
      id: 'day-92',
      day: 92,
      category: 'Theory',
      title: 'TLS/SSL và Secure Socket',
      description: 'Hiểu cách mã hóa và xác thực kết nối mạng.',
      content: `Lý thuyết:
Nếu chỉ dùng TCP/HTTP thường, dữ liệu truyền đi ở dạng plaintext và có thể bị đọc lén. TLS giải quyết vấn đề này.

TLS cung cấp:
1. Confidentiality: Mã hóa dữ liệu.
2. Integrity: Chống sửa đổi dữ liệu.
3. Authentication: Xác thực server (và đôi khi cả client).

Các thành phần chính:
- Certificate
- Public key / Private key
- Symmetric encryption
- Handshake

Quy trình TLS ở mức đơn giản:
1. Client kết nối đến server.
2. Server gửi certificate.
3. Client kiểm tra certificate có hợp lệ không.
4. Hai bên thỏa thuận khóa phiên.
5. Dữ liệu sau đó được mã hóa.

Khái niệm cần nắm:
- CA (Certificate Authority)
- Self-signed certificate
- Hostname verification
- HTTPS = HTTP chạy trên TLS

Lưu ý:
- TLS không thay thế logic bảo mật ứng dụng.
- Certificate hết hạn hoặc sai hostname sẽ gây lỗi xác thực.`,
      exercises: [
        {
          title: 'Quan sát HTTPS',
          description: 'Tìm hiểu khác biệt giữa HTTP và HTTPS.',
          steps: [
            'Truy cập một website bằng HTTP và HTTPS.',
            'Quan sát biểu tượng khóa trong trình duyệt.',
            'Xem certificate của website.',
            'Ghi lại các trường quan trọng như CN, SAN, Issuer, Expiry.'
          ]
        },
        {
          title: 'Kết nối TLS bằng code',
          description: 'Viết client kết nối tới một HTTPS server.',
          steps: [
            'Dùng thư viện TLS của ngôn ngữ bạn học.',
            'Kết nối đến một server HTTPS hợp lệ.',
            'In ra thông tin certificate phía server.',
            'Kiểm tra điều gì xảy ra khi xác thực thất bại.'
          ]
        }
      ]
    },
    {
      id: 'day-93',
      day: 93,
      category: 'Theory',
      title: 'DNS và lập trình phân giải tên miền',
      description: 'Hiểu cách domain name được ánh xạ thành địa chỉ IP.',
      content: `Lý thuyết:
DNS (Domain Name System) là "sổ danh bạ" của Internet. Nó chuyển tên miền thành IP.

Các record phổ biến:
- A: IPv4
- AAAA: IPv6
- CNAME: Alias
- MX: Mail server
- TXT: Dữ liệu text
- NS: Name server

Quy trình phân giải DNS:
1. Client hỏi resolver.
2. Resolver có thể trả từ cache.
3. Nếu không có cache, resolver đi hỏi tiếp các DNS server khác.
4. Kết quả trả về IP đích.

Khái niệm cần nắm:
- Recursive query
- Iterative query
- TTL
- Cache
- Stub resolver

DNS chủ yếu dùng UDP, nhưng có thể dùng TCP trong một số trường hợp.

Lập trình DNS:
- Dùng API có sẵn để lookup domain
- Hoặc tự xây parser/query ở mức protocol cơ bản

Ý nghĩa thực tiễn:
- Ứng dụng mạng hiếm khi kết nối trực tiếp bằng IP cố định.
- Hiểu DNS giúp debug rất nhiều lỗi mạng.`,
      exercises: [
        {
          title: 'Tool tra cứu DNS',
          description: 'Viết chương trình nhập domain và in ra IP.',
          steps: [
            'Nhập domain từ bàn phím.',
            'Lookup record A và AAAA.',
            'In toàn bộ kết quả ra màn hình.',
            'Xử lý lỗi khi domain không tồn tại.'
          ]
        },
        {
          title: 'Phân tích TTL và caching',
          description: 'Hiểu cache ảnh hưởng đến truy vấn DNS ra sao.',
          steps: [
            'Tra cứu một domain nhiều lần.',
            'Quan sát thời gian phản hồi.',
            'Tìm hiểu ý nghĩa của TTL.',
            'Ghi lại vì sao cache giúp tăng tốc hệ thống.'
          ]
        }
      ]
    },
    {
      id: 'day-94',
      day: 94,
      category: 'Practice',
      title: 'Packet Capture và đọc file PCAP',
      description: 'Làm quen với phân tích gói tin ở mức thấp hơn socket ứng dụng.',
      content: `Lý thuyết:
Khi lập trình socket, bạn nhìn thấy dữ liệu sau khi hệ điều hành đã xử lý một phần. Packet capture cho phép nhìn gần hơn vào traffic thật.

Khái niệm:
- Packet capture
- Network interface
- PCAP file
- Packet metadata
- Timestamp

Các lớp header phổ biến:
1. Ethernet Header
2. IP Header
3. TCP/UDP Header
4. Application Data

Những gì có thể lấy từ packet:
- Source IP
- Destination IP
- Source Port
- Destination Port
- Protocol
- Payload length

Mục tiêu buổi này:
- Không đi quá sâu vào raw packet injection
- Tập trung đọc và phân tích packet/file pcap phục vụ debug, monitoring và học giao thức`,
      commands: [
        { name: 'Open PCAP with Wireshark', description: 'Mở file pcap để phân tích', usage: 'wireshark sample.pcap' }
      ],
      exercises: [
        {
          title: 'Đọc file PCAP',
          description: 'Trích xuất thông tin cơ bản từ packet.',
          steps: [
            'Mở một file PCAP bằng Wireshark hoặc thư viện parser.',
            'Lọc các packet TCP.',
            'Ghi lại source IP, destination IP, source port, destination port.',
            'Đếm tổng số packet theo từng protocol.'
          ]
        },
        {
          title: 'Viết script thống kê traffic',
          description: 'Phân tích dữ liệu packet tự động.',
          steps: [
            'Đọc file PCAP bằng code.',
            'Thống kê top 5 IP gửi nhiều packet nhất.',
            'Thống kê top protocol xuất hiện nhiều nhất.',
            'Xuất kết quả ra terminal hoặc file JSON.'
          ]
        }
      ]
    },
    {
      id: 'day-95',
      day: 95,
      category: 'Practice',
      title: 'Packet Parsing: Ethernet, IP, TCP, UDP',
      description: 'Tự đọc cấu trúc header của các giao thức cơ bản.',
      content: `Lý thuyết:
Để hiểu traffic thật, bạn phải biết trong packet có gì.

Ethernet Header thường chứa:
- Destination MAC
- Source MAC
- EtherType

IPv4 Header chứa:
- Version
- Header Length
- Total Length
- TTL
- Protocol
- Source IP
- Destination IP

TCP Header chứa:
- Source Port
- Destination Port
- Sequence Number
- Acknowledgment Number
- Flags (SYN, ACK, FIN, RST...)
- Window Size

UDP Header chứa:
- Source Port
- Destination Port
- Length
- Checksum

Mục tiêu:
- Không chỉ dùng công cụ xem packet
- Mà còn hiểu cách parser hoạt động

Điểm cần nhớ:
- Offset byte rất quan trọng
- Sai offset là parser đọc sai toàn bộ packet
- Một số field có kích thước bit-level, không phải byte tròn`,
      exercises: [
        {
          title: 'Tự parse IPv4 header',
          description: 'Đọc các trường quan trọng từ một packet mẫu.',
          steps: [
            'Lấy một packet IPv4 mẫu từ PCAP.',
            'Đọc Version, IHL, TTL, Protocol, Source IP, Destination IP.',
            'In các trường đó ra theo định dạng dễ đọc.',
            'Kiểm tra lại bằng Wireshark.'
          ]
        },
        {
          title: 'Phân biệt TCP và UDP bằng parser',
          description: 'Dựa vào protocol number để xử lý tiếp.',
          steps: [
            'Sau khi parse IPv4 header, kiểm tra trường protocol.',
            'Nếu là TCP thì parse TCP header.',
            'Nếu là UDP thì parse UDP header.',
            'In ra port nguồn và port đích.'
          ]
        }
      ]
    },
    {
      id: 'day-96',
      day: 96,
      category: 'Practice',
      title: 'Viết TCP Proxy / Relay Server',
      description: 'Xây một server trung gian chuyển tiếp dữ liệu giữa client và server đích.',
      content: `Lý thuyết:
Proxy là một thành phần trung gian trong giao tiếp mạng.

Các loại proxy:
1. Forward Proxy:
- Đại diện client đi ra ngoài.

2. Reverse Proxy:
- Đứng trước backend server.

3. TCP Relay:
- Chuyển tiếp luồng bytes từ bên này sang bên kia.

Lợi ích:
- Logging
- Filtering
- Authentication
- Load balancing
- Caching (ở mức ứng dụng phù hợp)

Mục tiêu buổi này:
- Xây proxy đơn giản ở mức TCP
- Hiểu luồng dữ liệu 2 chiều
- Ghi log kết nối và số byte truyền

Điểm khó:
- Một kết nối thực ra có 2 luồng:
  - client -> target
  - target -> client
- Phải xử lý ngắt kết nối ở một bên đúng cách.`,
      exercises: [
        {
          title: 'TCP relay cơ bản',
          description: 'Client kết nối vào proxy, proxy chuyển dữ liệu tới server đích.',
          steps: [
            'Tạo proxy lắng nghe cổng 7000.',
            'Khi có client kết nối, proxy tự kết nối tới server đích.',
            'Chuyển tiếp dữ liệu hai chiều.',
            'Ghi log số byte gửi/nhận cho từng phiên.'
          ]
        },
        {
          title: 'Proxy có logging',
          description: 'Theo dõi hoạt động của các phiên kết nối.',
          steps: [
            'Gán ID cho từng kết nối.',
            'Log thời gian bắt đầu và kết thúc.',
            'Log địa chỉ client và server đích.',
            'Tính tổng byte đã relay.'
          ]
        }
      ]
    },
    {
      id: 'day-97',
      day: 97,
      category: 'Theory',
      title: 'Retry, Timeout, Backoff và Rate Limiting',
      description: 'Thiết kế ứng dụng mạng chịu lỗi tốt hơn.',
      content: `Lý thuyết:
Ứng dụng mạng production không thể giả định rằng mọi request đều thành công ngay.

Các kỹ thuật quan trọng:
1. Timeout:
- Không chờ vô hạn.

2. Retry:
- Thử lại khi lỗi tạm thời.

3. Exponential Backoff:
- Mỗi lần retry chờ lâu hơn một chút để giảm áp lực lên hệ thống.

4. Rate Limiting:
- Giới hạn số request từ một nguồn trong một khoảng thời gian.

5. Circuit Breaker:
- Nếu hệ thống phía sau đang lỗi hàng loạt, tạm thời ngắt yêu cầu mới.

Lưu ý:
- Retry bừa bãi có thể làm hệ thống tệ hơn.
- Timeout quá ngắn gây false failure.
- Rate limit giúp bảo vệ server khỏi burst traffic.

Các chiến lược phổ biến:
- Fixed retry
- Exponential backoff + jitter
- Token bucket / sliding window cho rate limiting`,
      exercises: [
        {
          title: 'Thêm retry cho client',
          description: 'Client thử kết nối lại khi server chưa sẵn sàng.',
          steps: [
            'Nếu connect thất bại, retry tối đa 3 lần.',
            'Mỗi lần retry chờ lâu hơn lần trước.',
            'In log rõ số lần retry.',
            'Nếu hết số lần thử, báo lỗi thân thiện.'
          ]
        },
        {
          title: 'Giới hạn request theo IP',
          description: 'Bảo vệ server khỏi lạm dụng.',
          steps: [
            'Theo dõi số request từ mỗi IP trong 1 phút.',
            'Nếu vượt ngưỡng, trả lỗi hoặc từ chối.',
            'Tự động reset bộ đếm sau khoảng thời gian quy định.',
            'Ghi log các IP bị chặn.'
          ]
        }
      ]
    },
    {
      id: 'day-98',
      day: 98,
      category: 'Practice',
      title: 'Traffic Monitor và Mini IDS cơ bản',
      description: 'Xây công cụ giám sát lưu lượng mạng và phát hiện bất thường đơn giản.',
      content: `Lý thuyết:
IDS (Intrusion Detection System) là hệ thống phát hiện hành vi bất thường hoặc đáng ngờ trong mạng.

Hai hướng phát hiện phổ biến:
1. Signature-based:
- Dựa trên mẫu đã biết.

2. Behavior-based:
- Dựa trên hành vi bất thường.

Trong buổi này, ta chỉ làm bản mini an toàn và hợp pháp:
- Đếm số kết nối
- Theo dõi IP hoạt động nhiều bất thường
- Cảnh báo khi một IP mở quá nhiều kết nối trong thời gian ngắn

Khái niệm:
- Flow
- Threshold
- Alert
- Window time

Mục tiêu:
- Kết hợp kỹ năng đọc traffic, thống kê và lập trình mạng
- Tạo công cụ phục vụ giám sát/phòng thủ nội bộ`,
      exercises: [
        {
          title: 'Theo dõi số kết nối theo IP',
          description: 'Phát hiện IP hoạt động dày đặc bất thường.',
          steps: [
            'Thu thập danh sách kết nối hoặc packet từ nguồn lab.',
            'Đếm số kết nối theo source IP.',
            'Đặt ngưỡng cảnh báo ví dụ 50 kết nối trong 30 giây.',
            'Khi vượt ngưỡng, in cảnh báo ra màn hình.'
          ]
        },
        {
          title: 'Mini dashboard dạng text',
          description: 'Hiển thị thống kê theo thời gian thực.',
          steps: [
            'Hiển thị top 5 IP hoạt động mạnh nhất.',
            'Hiển thị số lượng TCP và UDP packet.',
            'Hiển thị số lượng alert đã sinh ra.',
            'Cập nhật giao diện terminal theo chu kỳ.'
          ]
        }
      ]
    },
    {
      id: 'day-99',
      day: 99,
      category: 'Theory',
      title: 'Thiết kế hệ thống mạng thời gian thực: Chat App hoàn chỉnh',
      description: 'Ghép các khái niệm lại thành một hệ thống client-server thực tế hơn.',
      content: `Lý thuyết:
Một hệ thống chat thời gian thực là ví dụ rất tốt để kết hợp kiến thức lập trình mạng.

Các thành phần:
1. Connection management
2. Session / identity management
3. Room hoặc channel
4. Broadcast / private message
5. Heartbeat để phát hiện mất kết nối
6. Reconnect logic
7. Logging

Các vấn đề thiết kế:
- Làm sao biết client còn sống?
- Làm sao phát hiện mất mạng?
- Làm sao quản lý nickname trùng?
- Làm sao gửi tin nhắn riêng?
- Làm sao lưu lịch sử đơn giản?

Khái niệm quan trọng:
- Heartbeat / Ping-Pong
- Presence
- Session
- Fan-out
- Backpressure (ở mức khái niệm)

Buổi này thiên về kiến trúc:
- Thiết kế trước khi code
- Tư duy modular
- Chuẩn bị cho capstone buổi sau`,
      exercises: [
        {
          title: 'Thiết kế giao thức chat hoàn chỉnh',
          description: 'Mô tả mọi loại message cần thiết.',
          steps: [
            'Định nghĩa LOGIN, JOIN_ROOM, LEAVE_ROOM, PUBLIC_MSG, PRIVATE_MSG, PING, PONG, QUIT.',
            'Quy định format dữ liệu cho từng message.',
            'Mô tả hành vi server với mỗi loại.',
            'Vẽ sơ đồ tương tác giữa 2 client và server.'
          ]
        },
        {
          title: 'Thiết kế heartbeat',
          description: 'Phát hiện client mất kết nối không sạch.',
          steps: [
            'Server gửi PING định kỳ hoặc client gửi heartbeat.',
            'Nếu quá thời gian không nhận phản hồi, đánh dấu client offline.',
            'Thông báo trạng thái mới cho các client còn lại.',
            'Ghi log thời điểm timeout.'
          ]
        }
      ]
    },
    {
      id: 'day-100',
      day: 100,
      category: 'Lab',
      title: 'Tổng kết Giai đoạn 5: Network Programming Capstone',
      description: 'Xây một sản phẩm mạng hoàn chỉnh bằng toàn bộ kiến thức của giai đoạn.',
      content: `Lý thuyết:
Hôm nay là bài kiểm tra tổng hợp của Giai đoạn 5. Mục tiêu là biến các khái niệm về socket, protocol, parsing, proxy, monitoring và concurrency thành một sản phẩm thực tế.

Bạn chọn 1 trong 4 đề tài:
1. Multi-client Chat Server hoàn chỉnh
2. File Transfer System có checksum
3. TCP Proxy có logging và thống kê
4. Mini Traffic Monitor / IDS cơ bản

Yêu cầu tối thiểu của mọi đề tài:
- Có protocol rõ ràng
- Có logging
- Có error handling
- Có timeout
- Có README mô tả cách chạy
- Có sơ đồ kiến trúc
- Có test với nhiều client hoặc nhiều tình huống

Tiêu chí đánh giá:
- Đúng chức năng
- Code rõ ràng, chia module tốt
- Xử lý lỗi hợp lý
- Log hữu ích
- Hiểu rõ kiến trúc thay vì chỉ chạy được

Gợi ý báo cáo cuối buổi:
- Mục tiêu hệ thống
- Thiết kế protocol
- Kiến trúc chương trình
- Các case test
- Các lỗi gặp phải và cách sửa
- Hướng nâng cấp tiếp theo`,
      exercises: [
        {
          title: 'Capstone Project',
          description: 'Chọn một đề tài và hoàn thiện sản phẩm.',
          steps: [
            'Chọn 1 dự án trong 4 đề tài gợi ý.',
            'Thiết kế protocol và sơ đồ kiến trúc trước khi code.',
            'Hoàn thiện code client/server hoặc tool phân tích.',
            'Viết README, chạy thử và ghi lại kết quả.'
          ]
        }
      ],
      quizzes: [
        {
          question: 'Trong TCP, tại sao ứng dụng cần tự xử lý message boundary thay vì giả định mỗi lần recv() sẽ nhận đúng một message hoàn chỉnh?',
          options: [
            { id: 'A', text: 'Vì TCP là giao thức datagram giống UDP', isCorrect: false },
            { id: 'B', text: 'Vì TCP chỉ cung cấp một luồng bytes liên tục, không bảo toàn ranh giới message ứng dụng', isCorrect: true },
            { id: 'C', text: 'Vì TCP luôn cắt dữ liệu thành đúng 1 byte mỗi lần truyền', isCorrect: false },
            { id: 'D', text: 'Vì TCP không hỗ trợ truyền chuỗi ký tự', isCorrect: false }
          ],
          explanation: 'TCP là byte stream, không giữ ranh giới từng message ở tầng ứng dụng. Vì vậy ứng dụng phải tự dùng delimiter, length prefix hoặc format khác để xác định message hoàn chỉnh.'
        },
        {
          question: 'Ưu điểm chính của mô hình event-driven/I/O multiplexing so với mô hình một luồng cho mỗi client là gì?',
          options: [
            { id: 'A', text: 'Luôn dễ code hơn trong mọi trường hợp', isCorrect: false },
            { id: 'B', text: 'Không cần quản lý socket nữa', isCorrect: false },
            { id: 'C', text: 'Giảm số lượng thread và xử lý hiệu quả hơn khi có nhiều kết nối đồng thời', isCorrect: true },
            { id: 'D', text: 'Biến TCP thành UDP', isCorrect: false }
          ],
          explanation: 'I/O multiplexing cho phép một tiến trình hoặc rất ít luồng theo dõi nhiều socket cùng lúc, giúp tiết kiệm tài nguyên và phù hợp với server nhiều kết nối.'
        },
        {
          question: 'Vì sao một giao thức truyền file nên có metadata như filename, filesize và checksum?',
          options: [
            { id: 'A', text: 'Để làm cho file truyền chậm hơn', isCorrect: false },
            { id: 'B', text: 'Để bên nhận biết cách lưu file, kiểm tra đã nhận đủ chưa và xác minh tính toàn vẹn', isCorrect: true },
            { id: 'C', text: 'Vì TCP không cho phép gửi dữ liệu nhị phân', isCorrect: false },
            { id: 'D', text: 'Để tránh phải dùng socket', isCorrect: false }
          ],
          explanation: 'Metadata giúp bên nhận biết tên file, kích thước mong đợi và kiểm tra dữ liệu có bị lỗi hay thiếu trong quá trình truyền hay không.'
        },
        {
          question: 'Thành phần nào là cốt lõi của TLS khi client muốn xác thực đúng server mình đang kết nối?',
          options: [
            { id: 'A', text: 'Certificate hợp lệ và kiểm tra hostname', isCorrect: true },
            { id: 'B', text: 'Chỉ cần port server là 443', isCorrect: false },
            { id: 'C', text: 'Chỉ cần dùng UDP thay TCP', isCorrect: false },
            { id: 'D', text: 'Chỉ cần body HTTP không rỗng', isCorrect: false }
          ],
          explanation: 'TLS dựa vào certificate, chuỗi tin cậy CA và kiểm tra hostname để xác thực danh tính server. Chỉ dùng cổng 443 là không đủ.'
        },
        {
          question: 'Trong một mini traffic monitor, việc đặt ngưỡng số kết nối theo IP trong một khoảng thời gian chủ yếu nhằm mục đích gì?',
          options: [
            { id: 'A', text: 'Nén dữ liệu mạng cho nhỏ hơn', isCorrect: false },
            { id: 'B', text: 'Phát hiện hoạt động bất thường hoặc quá dày đặc từ một nguồn', isCorrect: true },
            { id: 'C', text: 'Biến hệ thống thành firewall phần cứng', isCorrect: false },
            { id: 'D', text: 'Tăng tốc DNS resolution', isCorrect: false }
          ],
          explanation: 'Đếm kết nối theo IP trong một time window là một kỹ thuật giám sát cơ bản để phát hiện hành vi bất thường, burst traffic hoặc nguồn truy cập đáng ngờ.'
        }
      ]
    }
  ]
};