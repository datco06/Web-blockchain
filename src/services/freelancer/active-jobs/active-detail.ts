import { JobStatus } from '../jobs/typing.d';
import type { ActiveJobDetail } from './typing.d';

export const rawActiveJobDetails: Record<string, ActiveJobDetail> = {
  'aj-001': {
    id: 'aj-001',
    title: 'SPA Financial Dashboard',
    description: 'Xây dựng ứng dụng web SPA hỗ trợ người dùng theo dõi danh mục đầu tư chứng khoán và quản lý chi tiêu hàng ngày với biểu đồ tương tác và dữ liệu thời gian thực. Ứng dụng yêu cầu đảm bảo hiệu suất tốt với dữ liệu realtime websocket, đồng thời UI bắt mắt mang xu hướng Dashboard tài chính.',
    budget: '$4,000',
    client: 'TechVentures Inc.',
    status: JobStatus.InProgress,
    statusLabel: 'In Progress',
    progress: 65,
    startDate: '01/04/2026',
    deadline: '28/04/2026',
    category: 'Frontend',
    technologies: ['React', 'TypeScript', 'Ant Design', 'Recharts', 'WebSockets'],
    files: [
      { id: 'f1', name: 'dashboard-wireframes.fig', size: '12.4 MB' },
      { id: 'f2', name: 'api-documentation.pdf', size: '2.1 MB' },
      { id: 'f3', name: 'user-flows.png', size: '4.8 MB' }
    ],
    tasks: [
      {
        id: 't1',
        title: 'Thiết lập khung sườn dự án với React và Ant Design',
        description: 'Khởi tạo project, cấu trúc thư mục, cài đặt UI framework và routing cơ bản phục vụ cho tất cả các modules sau này.',
        duration: '1 tuần',
        payment: '$500',
        deadline: '05/04/2026',
        status: 'completed',
        aiNote: 'Task này nền tảng quan trọng, cần chuẩn bị layout chuẩn responsive.'
      },
      {
        id: 't2',
        title: 'Tích hợp WebSockets kết nối dữ liệu cổ phiếu realtime',
        description: 'Kết nối backend qua WebSocket để stream dữ liệu chứng khoán trực tiếp hiển thị thay đổi lập tức lên giao diện.',
        duration: '2 tuần',
        payment: '$1,200',
        deadline: '12/04/2026',
        status: 'completed'
      },
      {
        id: 't3',
        title: 'Xây dựng biểu đồ tương tác hiển thị biến động giá',
        description: 'Sử dụng Recharts để vẽ đồ thị có thể zoom in, zoom out, xem lịch sử giá, volume.',
        duration: '1.5 tuần',
        payment: '$1,500',
        deadline: '19/04/2026',
        status: 'pending_review',
        aiNote: 'Cần chú ý tối ưu render biểu đồ khi dữ liệu thay đổi liên tục.'
      },
      {
        id: 't4',
        title: 'Hoàn thiện responsive cho các thiết bị di động và tablet',
        description: 'Tinh chỉnh CSS/Less, đảm bảo bảng biểu và đồ thị hiển thị rõ ràng trên thiết bị có màn hình nhỏ.',
        duration: '1 tuần',
        payment: '$800',
        deadline: '26/04/2026',
        status: 'not_completed'
      }
    ]
  }
};

export const fetchActiveJobDetail = async (id: string): Promise<ActiveJobDetail | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return rawActiveJobDetails[id] || null;
};
