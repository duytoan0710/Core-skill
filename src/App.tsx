/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  UserCheck, 
  Briefcase, 
  MessageSquare, 
  Users, 
  Wrench, 
  Target, 
  Zap,
  ShieldCheck,
  Lightbulb,
  TrendingUp,
  Info,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer,
  PolarRadiusAxis
} from 'recharts';

// --- Types ---

interface Skill {
  name: string;
  description: string;
  example: {
    scenario: string;
    action: string;
    value: string;
  };
}

interface Competency {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  skills: Skill[];
  mindsetWeight: number;
  babokChapter: string;
  color: string;
  survivalTip: string;
  example: string;
  application: string;
}

// --- Data ---

// --- Constants & Helpers ---

const COLOR_MAP: Record<string, { 
  bg: string, 
  text: string, 
  border: string, 
  lightBg: string, 
  hoverBg: string,
  shadow: string
}> = {
  emerald: { 
    bg: 'bg-emerald-600', 
    text: 'text-emerald-600', 
    border: 'border-emerald-100', 
    lightBg: 'bg-emerald-50', 
    hoverBg: 'hover:bg-emerald-700',
    shadow: 'shadow-emerald-500/20'
  },
  indigo: { 
    bg: 'bg-indigo-600', 
    text: 'text-indigo-600', 
    border: 'border-indigo-100', 
    lightBg: 'bg-indigo-50', 
    hoverBg: 'hover:bg-indigo-700',
    shadow: 'shadow-indigo-500/20'
  },
  amber: { 
    bg: 'bg-amber-600', 
    text: 'text-amber-600', 
    border: 'border-amber-100', 
    lightBg: 'bg-amber-50', 
    hoverBg: 'hover:bg-amber-700',
    shadow: 'shadow-amber-500/20'
  },
  rose: { 
    bg: 'bg-rose-600', 
    text: 'text-rose-600', 
    border: 'border-rose-100', 
    lightBg: 'bg-rose-50', 
    hoverBg: 'hover:bg-rose-700',
    shadow: 'shadow-rose-500/20'
  },
  cyan: { 
    bg: 'bg-cyan-600', 
    text: 'text-cyan-600', 
    border: 'border-cyan-100', 
    lightBg: 'bg-cyan-50', 
    hoverBg: 'hover:bg-cyan-700',
    shadow: 'shadow-cyan-500/20'
  },
  slate: { 
    bg: 'bg-slate-600', 
    text: 'text-slate-600', 
    border: 'border-slate-100', 
    lightBg: 'bg-slate-50', 
    hoverBg: 'hover:bg-slate-700',
    shadow: 'shadow-slate-500/20'
  },
};

const COMPETENCIES: Competency[] = [
  {
    id: 'analytical',
    title: 'Analytical Thinking',
    description: 'Khả năng xử lý thông tin, nhận diện mô hình và giải quyết các vấn đề kinh doanh phức tạp một cách hiệu quả.',
    icon: Brain,
    skills: [
      { 
        name: 'Creative Thinking', 
        description: 'Tạo ra các ý tưởng mới và giải pháp thay thế cho các vấn đề kinh doanh.', 
        example: {
          scenario: 'Hệ thống Loyalty hiện tại chỉ cho phép đổi điểm lấy voucher, tỷ lệ sử dụng rất thấp (dưới 5%).',
          action: 'BA đề xuất cơ chế "Gifting Point" - cho phép người dùng tặng điểm cho bạn bè hoặc quyên góp từ thiện ngay trên app.',
          value: 'Tỷ lệ tương tác (Engagement rate) tăng 40%, tạo ra hiệu ứng lan tỏa tự nhiên cho ứng dụng.'
        }
      },
      { 
        name: 'Decision Making', 
        description: 'Đưa ra các quyết định sáng suốt dựa trên phân tích dữ liệu và rủi ro.', 
        example: {
          scenario: 'Dự án đang chậm tiến độ 2 tuần, Stakeholders yêu cầu thêm 3 tính năng mới "khẩn cấp".',
          action: 'BA dùng ma trận MoSCoW để chứng minh 3 tính năng này không thuộc nhóm Must-have và đề xuất dời sang Phase 2 để đảm bảo ngày Go-live.',
          value: 'Dự án Go-live đúng hạn với các tính năng cốt lõi ổn định, tránh được rủi ro cháy ngân sách.'
        }
      },
      { 
        name: 'Learning', 
        description: 'Nhanh chóng nắm bắt kiến thức mới về nghiệp vụ và công nghệ.', 
        example: {
          scenario: 'Công ty trúng thầu dự án về Logistics quốc tế, một lĩnh vực hoàn toàn mới với đội ngũ BA.',
          action: 'BA chủ động nghiên cứu quy trình Incoterms và tiêu chuẩn EDI trong 1 tuần, sau đó tổ chức buổi Knowledge Sharing cho toàn team.',
          value: 'Team nắm bắt yêu cầu nhanh chóng, giảm 50% thời gian chỉnh sửa tài liệu do hiểu sai nghiệp vụ.'
        }
      },
      { 
        name: 'Problem Solving', 
        description: 'Xác định nguyên nhân gốc rễ và đề xuất giải pháp khắc phục triệt để.', 
        example: {
          scenario: 'Tỷ lệ khách hàng bỏ giỏ hàng ở bước thanh toán tăng đột biến lên 70%.',
          action: 'BA thực hiện User Interview và phát hiện ra lỗi không phải do kỹ thuật, mà do phí vận chuyển chỉ hiển thị ở bước cuối cùng gây hụt hẫng.',
          value: 'Đề xuất hiển thị phí vận chuyển ước tính ngay từ giỏ hàng, giúp giảm tỷ lệ bỏ giỏ hàng xuống còn 30%.'
        }
      },
      { 
        name: 'Systems Thinking', 
        description: 'Hiểu cách các thành phần trong hệ thống tương tác và ảnh hưởng lẫn nhau.', 
        example: {
          scenario: 'Khách hàng muốn thay đổi cách tính "Điểm thưởng" từ cố định sang theo hạng thành viên.',
          action: 'BA phân tích và cảnh báo việc này sẽ ảnh hưởng đến module Kế toán (hạch toán nợ), module Marketing (chiến dịch cũ) và module Báo cáo.',
          value: 'Ngăn chặn được lỗi sai lệch dữ liệu tài chính nghiêm trọng trước khi bắt đầu code.'
        }
      },
      { 
        name: 'Conceptual Thinking', 
        description: 'Kết nối các thông tin rời rạc để hiểu bức tranh tổng thể.', 
        example: {
          scenario: 'Các phòng ban Sales, Ops và CS phàn nàn về những vấn đề khác nhau nhưng dường như có liên quan.',
          action: 'BA tổng hợp và nhận ra vấn đề gốc rễ là thiếu một hệ thống CRM tập trung, dẫn đến thông tin khách hàng bị phân mảnh.',
          value: 'Thuyết phục Ban giám đốc đầu tư vào CRM thay vì sửa vụn vặt, giúp tăng 25% hiệu suất làm việc toàn công ty.'
        }
      },
      { 
        name: 'Visual Thinking', 
        description: 'Sử dụng sơ đồ và hình ảnh để đơn giản hóa các khái niệm phức tạp.', 
        example: {
          scenario: 'Quy trình phê duyệt khoản vay ngân hàng quá phức tạp, tài liệu văn bản dài 50 trang khiến Dev bối rối.',
          action: 'BA vẽ sơ đồ BPMN phân tách rõ các luồng (Swimlanes) và các điều kiện rẽ nhánh (Gateways).',
          value: 'Dev hiểu ngay logic trong 30 phút xem sơ đồ, loại bỏ hoàn toàn các câu hỏi lặp đi lặp lại về quy trình.'
        }
      }
    ],
    mindsetWeight: 90,
    babokChapter: 'Chapter 9.1',
    color: 'emerald',
    survivalTip: 'Đừng chỉ tìm giải pháp, hãy tìm "nguyên nhân gốc rễ" của vấn đề.',
    example: 'Khi khách hàng yêu cầu "Thêm nút xuất Excel", BA không làm ngay mà phân tích xem họ cần dữ liệu đó để làm gì (báo cáo, đối soát hay lưu trữ).',
    application: 'Sử dụng kỹ thuật 5 Whys để tìm ra nhu cầu thực sự đằng sau một yêu cầu hời hợt, từ đó đề xuất giải pháp đúng đắn nhất.'
  },
  {
    id: 'behavioral',
    title: 'Behavioral Characteristics',
    description: 'Các phẩm chất cá nhân giúp xây dựng lòng tin và tạo điều kiện cho các mối quan hệ làm việc hiệu quả.',
    icon: UserCheck,
    skills: [
      { 
        name: 'Ethics', 
        description: 'Tuân thủ các chuẩn mực đạo đức nghề nghiệp và sự trung thực.', 
        example: {
          scenario: 'Nhà thầu phụ đề nghị "hoa hồng" cho BA để bỏ qua một số lỗi bảo mật trong báo cáo nghiệm thu.',
          action: 'BA từ chối thẳng thừng và báo cáo trung thực mọi rủi ro trong tài liệu đánh giá giải pháp.',
          value: 'Bảo vệ uy tín cá nhân và ngăn chặn thảm họa bảo mật dữ liệu cho tổ chức trong tương lai.'
        }
      },
      { 
        name: 'Personal Accountability', 
        description: 'Chịu trách nhiệm về kết quả công việc và các cam kết của mình.', 
        example: {
          scenario: 'BA phát hiện mình đã hiểu sai một quy tắc thuế quan quan trọng sau khi Dev đã code xong.',
          action: 'BA không đổ lỗi cho khách hàng mà chủ động xin lỗi team, làm thêm giờ để cập nhật lại Spec và hỗ trợ Dev sửa lỗi.',
          value: 'Duy trì được sự tôn trọng và tinh thần đoàn kết trong team dù có sai sót xảy ra.'
        }
      },
      { 
        name: 'Trustworthiness', 
        description: 'Xây dựng sự tin tưởng thông qua hành động nhất quán và minh bạch.', 
        example: {
          scenario: 'Khách hàng rất lo lắng về việc dữ liệu nhạy cảm bị rò rỉ khi chuyển đổi hệ thống.',
          action: 'BA xây dựng kế hoạch Data Mapping chi tiết, minh bạch từng bước kiểm soát và báo cáo tiến độ hàng ngày.',
          value: 'Khách hàng hoàn toàn yên tâm và phê duyệt các giai đoạn tiếp theo của dự án nhanh chóng.'
        }
      },
      { 
        name: 'Organization & Time Management', 
        description: 'Sắp xếp công việc khoa học để đạt hiệu quả cao nhất.', 
        example: {
          scenario: 'BA phải quản lý yêu cầu cho 2 dự án song song với hàng chục buổi họp mỗi tuần.',
          action: 'Sử dụng kỹ thuật Time-blocking: dành buổi sáng cho việc viết tài liệu tập trung, buổi chiều cho các cuộc họp và xử lý email.',
          value: 'Hoàn thành tài liệu đúng hạn với chất lượng cao mà không bị quá tải hay stress.'
        }
      },
      { 
        name: 'Adaptability', 
        description: 'Linh hoạt điều chỉnh trước những thay đổi của dự án và môi trường.', 
        example: {
          scenario: 'Dự án đang làm theo Waterfall thì khách hàng yêu cầu chuyển sang Agile/Scrum ngay lập tức.',
          action: 'BA nhanh chóng chuyển đổi tài liệu BRD cồng kềnh thành các User Stories nhỏ gọn và bắt nhịp với nhịp độ Sprint.',
          value: 'Dự án không bị gián đoạn, khách hàng hài lòng vì thấy được sản phẩm chạy được sau mỗi 2 tuần.'
        }
      }
    ],
    mindsetWeight: 100,
    babokChapter: 'Chapter 9.2',
    color: 'indigo',
    survivalTip: 'Sự chính trực là "vốn liếng" lớn nhất của một BA.',
    example: 'Trong một cuộc họp căng thẳng, BA giữ bình tĩnh, trung thực về tiến độ dự án thay vì hứa hão để làm hài lòng Stakeholders.',
    application: 'Xây dựng uy tín cá nhân thông qua việc hoàn thành cam kết và quản lý kỳ vọng của các bên liên quan một cách minh bạch.'
  },
  {
    id: 'business',
    title: 'Business Knowledge',
    description: 'Hiểu biết về ngành, tổ chức và lĩnh vực giải pháp để cung cấp bối cảnh cho việc phân tích.',
    icon: Briefcase,
    skills: [
      { 
        name: 'Business Acumen', 
        description: 'Hiểu cách doanh nghiệp vận hành và tạo ra lợi nhuận.', 
        example: {
          scenario: 'Khách hàng muốn xây dựng tính năng "Chatbot AI" đắt đỏ chỉ vì thấy đối thủ có.',
          action: 'BA phân tích dữ liệu và chỉ ra rằng khách hàng của họ thích gọi hotline hơn, đề xuất đầu tư vào hệ thống Tổng đài IP thay thế.',
          value: 'Tiết kiệm 30.000 USD chi phí đầu tư vô ích và tăng tỷ lệ hài lòng của khách hàng thực tế.'
        }
      },
      { 
        name: 'Industry Knowledge', 
        description: 'Nắm bắt các xu hướng, quy định và đối thủ trong ngành.', 
        example: {
          scenario: 'Dự án xây dựng app ngân hàng tại thị trường Châu Âu.',
          action: 'BA chủ động đưa các yêu cầu về tuân thủ GDPR và chỉ thị PSD2 vào ngay từ giai đoạn thiết kế hệ thống.',
          value: 'Tránh được các khoản phạt khổng lồ và việc phải đập đi xây lại hệ thống do vi phạm pháp lý.'
        }
      },
      { 
        name: 'Organization Knowledge', 
        description: 'Hiểu cấu trúc, văn hóa và quy trình nội bộ của khách hàng.', 
        example: {
          scenario: 'Một yêu cầu thay đổi (CR) bị treo 2 tuần vì không biết ai có quyền phê duyệt.',
          action: 'BA dựa trên hiểu biết về sơ đồ tổ chức, chủ động kết nối với Trưởng phòng Vận hành để lấy phê duyệt cuối cùng.',
          value: 'CR được thông qua trong 1 ngày, giúp dự án tiếp tục tiến độ mà không bị đình trệ.'
        }
      },
      { 
        name: 'Solution Knowledge', 
        description: 'Hiểu sâu về các giải pháp IT hiện có và khả năng của chúng.', 
        example: {
          scenario: 'Khách hàng muốn tự xây dựng một module quản lý kho (WMS) từ đầu.',
          action: 'BA tư vấn sử dụng giải pháp Odoo có sẵn và tùy chỉnh lại 20%, thay vì code 100% từ đầu.',
          value: 'Rút ngắn thời gian triển khai từ 12 tháng xuống còn 4 tháng, giảm rủi ro lỗi phần mềm.'
        }
      },
      { 
        name: 'Methodology Knowledge', 
        description: 'Thành thạo các quy trình phát triển phần mềm (Agile, Waterfall).', 
        example: {
          scenario: 'Đội ngũ phát triển thường xuyên làm sai yêu cầu do tài liệu quá sơ sài.',
          action: 'BA áp dụng quy trình BDD (Behavior Driven Development), viết Spec dưới dạng các kịch bản kiểm thử.',
          value: 'Tỷ lệ Bug do hiểu sai yêu cầu giảm 80%, chất lượng phần mềm tăng rõ rệt.'
        }
      }
    ],
    mindsetWeight: 70,
    babokChapter: 'Chapter 9.3',
    color: 'amber',
    survivalTip: 'Nói ngôn ngữ của Business, không chỉ nói ngôn ngữ của Dev.',
    example: 'Làm dự án Ngân hàng, BA phải hiểu về quy trình giải ngân, lãi suất và các quy định của Ngân hàng Nhà nước.',
    application: 'Đề xuất giải pháp tối ưu hóa quy trình dựa trên hiểu biết sâu sắc về mô hình kinh doanh và bối cảnh thị trường của khách hàng.'
  },
  {
    id: 'communication',
    title: 'Communication Skills',
    description: 'Khả năng truyền đạt thông tin rõ ràng và lắng nghe tích cực các đối tượng đa dạng.',
    icon: MessageSquare,
    skills: [
      { 
        name: 'Verbal Communication', 
        description: 'Truyền đạt ý tưởng bằng lời nói một cách tự tin và thuyết phục.', 
        example: {
          scenario: 'Buổi họp chốt yêu cầu giữa bộ phận IT và bộ phận Kinh doanh đang đi vào ngõ cụt.',
          action: 'BA sử dụng ngôn ngữ kinh doanh để giải thích các giới hạn kỹ thuật, giúp hai bên tìm được tiếng nói chung.',
          value: 'Yêu cầu được chốt ngay trong buổi họp, tránh việc phải họp lại nhiều lần gây lãng phí thời gian.'
        }
      },
      { 
        name: 'Non-Verbal Communication', 
        description: 'Sử dụng ngôn ngữ cơ thể và thái độ phù hợp trong giao tiếp.', 
        example: {
          scenario: 'Trong buổi phỏng vấn yêu cầu, khách hàng nói "đồng ý" nhưng tay khoanh lại và ánh mắt e dè.',
          action: 'BA nhận ra sự không thoải mái, tạm dừng đặt câu hỏi và khéo léo hỏi về những lo ngại thầm kín của họ.',
          value: 'Khách hàng trải lòng về những rủi ro họ lo sợ, giúp BA bổ sung các yêu cầu phi chức năng quan trọng.'
        }
      },
      { 
        name: 'Written Communication', 
        description: 'Viết tài liệu, email rõ ràng, súc tích và dễ hiểu.', 
        example: {
          scenario: 'Email giải thích lỗi hệ thống cho khách hàng quá kỹ thuật khiến họ tức giận hơn.',
          action: 'BA viết lại email theo cấu trúc: Vấn đề -> Nguyên nhân (đơn giản) -> Giải pháp khắc phục -> Thời gian hoàn thành.',
          value: 'Khách hàng dịu giọng, thông cảm cho team kỹ thuật và tiếp tục hợp tác vui vẻ.'
        }
      },
      { 
        name: 'Listening', 
        description: 'Lắng nghe chủ động để thấu hiểu nhu cầu thực sự của Stakeholders.', 
        example: {
          scenario: 'Khách hàng yêu cầu "một cái nút xuất báo cáo thật nhanh".',
          action: 'Thay vì chỉ note lại cái nút, BA lắng nghe và hiểu rằng họ đang mất quá nhiều thời gian để tổng hợp dữ liệu thủ công hàng ngày.',
          value: 'Đề xuất tính năng "Tự động gửi báo cáo qua email mỗi sáng", giải quyết triệt để nỗi đau của khách hàng.'
        }
      }
    ],
    mindsetWeight: 85,
    babokChapter: 'Chapter 9.4',
    color: 'rose',
    survivalTip: 'Lắng nghe 80%, nói 20%. Hiểu trước khi được hiểu.',
    example: 'Viết một email giải thích lỗi hệ thống cho khách hàng bằng ngôn ngữ dễ hiểu, tránh dùng thuật ngữ kỹ thuật quá sâu gây bối rối.',
    application: 'Tổ chức các buổi Workshop lấy yêu cầu (Elicitation) hiệu quả và ghi chép lại tài liệu SRS/User Story một cách súc tích, chính xác.'
  },
  {
    id: 'interaction',
    title: 'Interaction Skills',
    description: 'Tạo điều kiện hợp tác và gây ảnh hưởng đến các bên liên quan để đạt được mục tiêu dự án.',
    icon: Users,
    skills: [
      { 
        name: 'Facilitation', 
        description: 'Dẫn dắt các buổi thảo luận nhóm đi đến kết quả mong muốn.', 
        example: {
          scenario: 'Dự án đang bế tắc trong việc chọn lựa giữa 2 giải pháp công nghệ trái ngược nhau.',
          action: 'BA tổ chức buổi Workshop "Decision Matrix", chuẩn bị sẵn các tiêu chí so sánh và điều phối để các bên cùng chấm điểm khách quan.',
          value: 'Team thống nhất được giải pháp tối ưu chỉ sau 2 giờ thảo luận, thay vì tranh cãi kéo dài hàng tuần.'
        }
      },
      { 
        name: 'Leadership & Influencing', 
        description: 'Truyền cảm hứng và thuyết phục người khác đồng thuận với giải pháp.', 
        example: {
          scenario: 'Stakeholders phản đối việc bỏ một tính năng cũ vì "đã dùng quen", dù dữ liệu cho thấy nó gây lỗi hệ thống.',
          action: 'BA trình bày báo cáo phân tích rủi ro và chi phí bảo trì, đồng thời demo giải pháp thay thế hiện đại và dễ dùng hơn.',
          value: 'Stakeholders bị thuyết phục, đồng ý loại bỏ tính năng cũ, giúp hệ thống vận hành ổn định và mượt mà hơn.'
        }
      },
      { 
        name: 'Teamwork', 
        description: 'Hợp tác hiệu quả với các thành viên khác trong dự án.', 
        example: {
          scenario: 'Dev và Designer thường xuyên mâu thuẫn về việc thể hiện các trạng thái lỗi trên giao diện.',
          action: 'BA chủ động ngồi lại với cả hai, làm rõ các quy tắc nghiệp vụ (Business Rules) và thống nhất bộ Error Messages chuẩn.',
          value: 'Quy trình làm việc giữa Dev và Design trơn tru hơn, giảm 40% thời gian chỉnh sửa giao diện.'
        }
      },
      { 
        name: 'Negotiation & Conflict Resolution', 
        description: 'Đàm phán và giải quyết các mâu thuẫn giữa các bên liên quan.', 
        example: {
          scenario: 'Hai phòng ban Sales và Kế toán tranh cãi gay gắt về quy trình phê duyệt chiết khấu.',
          action: 'BA lắng nghe nỗi đau của cả hai bên, đề xuất quy trình phê duyệt tự động theo ngưỡng (Threshold) để cân bằng giữa tốc độ và kiểm soát.',
          value: 'Mâu thuẫn được giải quyết triệt để, cả hai phòng ban đều hài lòng với quy trình mới "win-win".'
        }
      },
      { 
        name: 'Teaching', 
        description: 'Hướng dẫn và đào tạo người dùng về giải pháp mới.', 
        example: {
          scenario: 'Hệ thống ERP mới triển khai nhưng nhân viên kho không biết cách sử dụng, dẫn đến sai lệch tồn kho.',
          action: 'BA trực tiếp xuống kho, tổ chức các buổi đào tạo "Cầm tay chỉ việc" và viết bộ tài liệu hướng dẫn bằng hình ảnh cực kỳ đơn giản.',
          value: 'Nhân viên kho làm chủ hệ thống sau 3 ngày, tỷ lệ sai lệch dữ liệu tồn kho giảm về mức 0%.'
        }
      }
    ],
    mindsetWeight: 95,
    babokChapter: 'Chapter 9.5',
    color: 'cyan',
    survivalTip: 'BA là cầu nối, không phải là bức tường ngăn cách.',
    example: 'Đứng ra hòa giải khi Dev và Design tranh cãi về tính khả thi của một tính năng phức tạp trên giao diện người dùng.',
    application: 'Thuyết phục Stakeholders đồng ý với phương án MVP (Minimum Viable Product) để đảm bảo tiến độ Go-live của dự án.'
  },
  {
    id: 'tools',
    title: 'Tools & Technology',
    description: 'Sử dụng thành thạo các phần mềm và nền tảng hỗ trợ các hoạt động phân tích nghiệp vụ.',
    icon: Wrench,
    skills: [
      { 
        name: 'Office Productivity Tools', 
        description: 'Sử dụng thành thạo Word, Excel, PowerPoint cho công việc.', 
        example: {
          scenario: 'Cần phân tích xu hướng mua hàng từ 1 triệu dòng dữ liệu thô.',
          action: 'BA sử dụng Power Query trong Excel để làm sạch dữ liệu và tạo Dashboard báo cáo tự động.',
          value: 'Thay vì mất 3 ngày làm thủ công, BA chỉ mất 2 giờ để có báo cáo chuyên nghiệp cho khách hàng.'
        }
      },
      { 
        name: 'Business Analysis Tools', 
        description: 'Sử dụng Jira, Confluence, Visio, Figma để phân tích và quản lý.', 
        example: {
          scenario: 'Dự án có quá nhiều yêu cầu thay đổi khiến việc quản lý trở nên hỗn loạn.',
          action: 'BA thiết lập hệ thống "Requirement Traceability Matrix" trên Confluence kết nối trực tiếp với Jira tickets.',
          value: 'Mọi thay đổi đều được kiểm soát, không bao giờ có chuyện "quên" yêu cầu hay làm sai version.'
        }
      },
      { 
        name: 'Communication Tools', 
        description: 'Sử dụng Slack, Teams, Zoom để cộng tác từ xa hiệu quả.', 
        example: {
          scenario: 'Team làm việc remote hoàn toàn, thông tin thường xuyên bị trôi trên chat.',
          action: 'BA thiết lập các "Thread" thảo luận chuyên sâu và sử dụng "Wiki" trên Teams để lưu trữ các quyết định quan trọng.',
          value: 'Thông tin luôn minh bạch, dễ tìm kiếm, giúp team remote phối hợp nhịp nhàng như ngồi cạnh nhau.'
        }
      }
    ],
    mindsetWeight: 20,
    babokChapter: 'Chapter 9.6',
    color: 'slate',
    survivalTip: 'Công cụ chỉ là phương tiện, tư duy mới là người lái tàu.',
    example: 'Sử dụng Jira để quản lý Backlog, Confluence để lưu trữ tài liệu hoặc Figma để vẽ Wireframe minh họa luồng nghiệp vụ.',
    application: 'Tận dụng các công cụ hiện đại để trực quan hóa dữ liệu và quy trình, giúp các bên liên quan dễ dàng hình dung giải pháp.'
  }
];

const RADAR_DATA = COMPETENCIES.map(c => ({
  subject: c.title.split(' ')[0],
  A: c.mindsetWeight,
  fullMark: 100,
}));

// --- Components ---

const SidebarItem: React.FC<{ 
  competency: Competency, 
  isSelected: boolean, 
  onClick: () => void
}> = ({ competency, isSelected, onClick }) => {
  const Icon = competency.icon;
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group ${
        isSelected 
          ? 'bg-white shadow-sm border border-slate-200 text-indigo-600' 
          : 'text-slate-500 hover:bg-white/50 hover:text-slate-900'
      }`}
    >
      <div className={`p-2 rounded-lg transition-colors ${
        isSelected ? COLOR_MAP[competency.color]?.lightBg.replace('50', '100') + ' ' + COLOR_MAP[competency.color]?.text : 'bg-slate-100 group-hover:bg-white'
      }`}>
        <Icon size={18} />
      </div>
      <div className="flex-1 text-left">
        <p className="text-sm font-bold tracking-tight leading-none">{competency.title}</p>
      </div>
      {isSelected && <ChevronRight size={16} className="text-indigo-400" />}
    </button>
  );
};

const SkillCard: React.FC<{ 
  skill: Skill, 
  color: string, 
  onShowExample: (skill: Skill) => void 
}> = ({ skill, color, onShowExample }) => {
  const colors = COLOR_MAP[color] || COLOR_MAP.slate;
  return (
    <div className="group p-5 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col h-full">
      <div className="flex items-start gap-3 mb-3">
        <div className={`mt-1.5 w-2 h-2 rounded-full ${colors.bg.replace('600', '500')} shrink-0 shadow-[0_0_8px_rgba(0,0,0,0.1)]`} />
        <div className="flex-1 min-w-0">
          <h5 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors truncate" title={skill.name}>{skill.name}</h5>
          <p className="text-xs text-slate-500 leading-relaxed text-justify">{skill.description}</p>
        </div>
      </div>
      
      <div className="mt-auto pt-4 border-t border-slate-50">
        <button 
          onClick={() => onShowExample(skill)}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-all"
        >
          <Lightbulb size={12} />
          Xem ví dụ thực tế
        </button>
      </div>
    </div>
  );
};

const SkillModal: React.FC<{ 
  skill: Skill | null, 
  color: string, 
  onClose: () => void 
}> = ({ skill, color, onClose }) => {
  if (!skill) return null;
  const colors = COLOR_MAP[color] || COLOR_MAP.slate;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className={`p-6 sm:p-8 ${colors.lightBg} border-b ${colors.border} flex items-center justify-between`}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${colors.lightBg.replace('50', '100')} ${colors.text}`}>
                <Lightbulb size={24} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{skill.name}</h3>
                <p className="text-sm text-slate-500 font-medium">Case Study & Ứng dụng thực tế</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white rounded-full transition-colors text-slate-400 hover:text-slate-600"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
            <section>
              <h4 className={`text-[10px] font-bold uppercase tracking-[0.2em] ${colors.text} mb-3 flex items-center gap-2`}>
                <span className={`w-1.5 h-1.5 rounded-full ${colors.bg}`}></span>
                Tình huống (Scenario)
              </h4>
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-sm text-slate-700 leading-relaxed text-justify">
                {skill.example.scenario}
              </div>
            </section>

            <section>
              <h4 className={`text-[10px] font-bold uppercase tracking-[0.2em] ${colors.text} mb-3 flex items-center gap-2`}>
                <span className={`w-1.5 h-1.5 rounded-full ${colors.bg}`}></span>
                Hành động của BA (Action)
              </h4>
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-sm text-slate-700 leading-relaxed text-justify">
                {skill.example.action}
              </div>
            </section>

            <section>
              <h4 className={`text-[10px] font-bold uppercase tracking-[0.2em] ${colors.text} mb-3 flex items-center gap-2`}>
                <span className={`w-1.5 h-1.5 rounded-full ${colors.bg}`}></span>
                Giá trị mang lại (Value)
              </h4>
              <div className={`p-5 ${colors.lightBg} rounded-2xl border ${colors.border} text-sm ${colors.text.replace('600', '900')} font-semibold leading-relaxed text-justify`}>
                {skill.example.value}
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button 
              onClick={onClose}
              className={`px-8 py-3 rounded-xl ${colors.bg} text-white text-sm font-bold ${colors.hoverBg} transition-all shadow-lg ${colors.shadow}`}
            >
              Đã hiểu
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default function App() {
  const [selectedId, setSelectedId] = useState<string>(COMPETENCIES[0].id);
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  const selectedCompetency = COMPETENCIES.find(c => c.id === selectedId) || COMPETENCIES[0];

  return (
    <div className="min-h-screen bg-[#F1F3F6] text-slate-900 font-sans selection:bg-indigo-100 flex flex-col">
      <SkillModal 
        skill={activeSkill} 
        color={selectedCompetency.color} 
        onClose={() => setActiveSkill(null)} 
      />
      {/* Top Navigation Bar */}
      <nav className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <Target size={18} />
          </div>
          <span className="font-bold tracking-tighter text-lg">ITBA <span className="text-indigo-600">Survival</span></span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-slate-400">
          <a href="#" className="text-indigo-600">Competencies</a>
        </div>
        <button className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-full hover:bg-indigo-600 transition-all flex items-center gap-2">
          BABOK v3 Guide <ExternalLink size={12} />
        </button>
      </nav>

      <div className="flex-1 flex flex-col lg:flex-row max-w-[1600px] mx-auto w-full p-4 lg:p-8 gap-8">
        {/* Left Sidebar: List of Competencies */}
        <aside className="w-full lg:w-80 flex flex-col gap-6">
          <div className="bg-white/50 rounded-2xl p-6 border border-white/20">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
              <Info size={14} /> Core Competencies
            </h2>
            <div className="space-y-2">
              {COMPETENCIES.map((comp) => (
                <SidebarItem 
                  key={comp.id} 
                  competency={comp} 
                  isSelected={selectedId === comp.id}
                  onClick={() => setSelectedId(comp.id)}
                />
              ))}
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <Zap size={120} />
            </div>
            <h3 className="text-lg font-bold mb-2">Mindset Score</h3>
            <p className="text-xs opacity-80 mb-6 leading-relaxed">Tỉ lệ quan trọng của tư duy so với công cụ trong sự nghiệp BA.</p>
            <div className="flex items-end gap-2">
              <span className="text-5xl font-bold tracking-tighter">85%</span>
              <span className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Survival Rate</span>
            </div>
          </div>
        </aside>

        {/* Main Content: Detail View */}
        <main className="flex-1 flex flex-col gap-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCompetency.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden flex flex-col lg:flex-row"
            >
              {/* Detail Content */}
              <div className="flex-1 p-8 lg:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className={`p-4 rounded-2xl bg-${selectedCompetency.color}-100 text-${selectedCompetency.color}-600 shrink-0`}>
                    <selectedCompetency.icon size={32} />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight whitespace-nowrap">{selectedCompetency.title}</h1>
                  </div>
                </div>

                <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl">
                  {selectedCompetency.description}
                </p>

                <div className="mb-10">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-slate-200"></span>
                    Core Skills & Clarification
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCompetency.skills.map((skill, idx) => (
                      <SkillCard 
                        key={idx} 
                        skill={skill} 
                        color={selectedCompetency.color} 
                        onShowExample={setActiveSkill}
                      />
                    ))}
                  </div>
                </div>

                </div>

              {/* Visual Side Pane */}
              <div className="w-full lg:w-80 bg-slate-50 border-l border-slate-100 p-8 flex flex-col gap-8">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Competency Radar</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Biểu đồ mô phỏng mức độ quan trọng và sự liên kết của 6 nhóm năng lực cốt lõi theo chuẩn BABOK v3. Một BA xuất sắc cần sự phát triển đồng đều ở cả 6 khía cạnh này.
                    </p>
                  </div>
                  <div className="w-full aspect-square relative bg-white rounded-2xl border border-slate-100 p-2 shadow-sm">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={RADAR_DATA}>
                        <PolarGrid stroke="#E2E8F0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 8, fill: '#94A3B8', fontWeight: 'bold' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                          name="Mindset"
                          dataKey="A"
                          stroke="#4F46E5"
                          fill="#4F46E5"
                          fillOpacity={0.1}
                        />
                        {/* Highlight current selection on radar */}
                        <Radar
                          name="Current"
                          data={RADAR_DATA.map(d => ({
                            ...d,
                            A: d.subject === selectedCompetency.title.split(' ')[0] ? d.A : 0
                          }))}
                          stroke={selectedCompetency.color === 'emerald' ? '#10b981' : selectedCompetency.color === 'indigo' ? '#6366f1' : selectedCompetency.color === 'amber' ? '#f59e0b' : selectedCompetency.color === 'rose' ? '#f43f5e' : selectedCompetency.color === 'cyan' ? '#06b6d4' : '#64748b'}
                          fill={selectedCompetency.color === 'emerald' ? '#10b981' : selectedCompetency.color === 'indigo' ? '#6366f1' : selectedCompetency.color === 'amber' ? '#f59e0b' : selectedCompetency.color === 'rose' ? '#f43f5e' : selectedCompetency.color === 'cyan' ? '#06b6d4' : '#64748b'}
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="text-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">Mindset Intensity</p>
                    <p className="text-4xl font-black tracking-tighter text-slate-900">{selectedCompetency.mindsetWeight}%</p>
                    <div className="mt-3 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                      <div className={`h-full bg-indigo-600`} style={{ width: `${selectedCompetency.mindsetWeight}%` }} />
                    </div>
                  </div>

                  <div className={`p-6 rounded-2xl bg-${selectedCompetency.color}-600 text-white relative overflow-hidden shadow-lg shadow-${selectedCompetency.color}-200 group`}>
                    <Zap className="absolute -right-4 -bottom-4 opacity-20 group-hover:scale-110 transition-transform duration-500" size={80} />
                    <div className="relative z-10">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 mb-2">Survival Tip</h4>
                      <p className="text-sm font-bold leading-tight italic">
                        "{selectedCompetency.survivalTip}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Grid: Mindset vs Toolset Comparison */}
          <div className="bg-slate-900 rounded-[32px] p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <Lightbulb size={200} />
            </div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight mb-6">Tại sao Mindset quan trọng hơn?</h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                Công cụ thay đổi theo mùa, nhưng tư duy là vĩnh cửu. Một BA giỏi không phải là người vẽ Flowchart đẹp nhất, mà là người đặt được những câu hỏi "Tại sao" đúng nhất.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-indigo-400 shrink-0">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">Thích nghi nhanh</h4>
                    <p className="text-xs text-slate-500">Dễ dàng chuyển đổi giữa các dự án và công nghệ mới.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">Giá trị bền vững</h4>
                    <p className="text-xs text-slate-500">Kỹ năng mềm không bao giờ bị thay thế bởi AI hoàn toàn.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 opacity-50">
            <Target size={20} />
            <span className="font-bold tracking-tighter">ITBA Survival Guide</span>
          </div>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">
            © 2026 • Based on BABOK v3 Standard • Mindset Over Toolset
          </p>
          <div className="flex gap-6 text-slate-400">
            <a href="#" className="hover:text-indigo-600 transition-colors"><MessageSquare size={18} /></a>
            <a href="#" className="hover:text-indigo-600 transition-colors"><Users size={18} /></a>
            <a href="#" className="hover:text-indigo-600 transition-colors"><Briefcase size={18} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
