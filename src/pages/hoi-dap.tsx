import React from 'react';

import { GetServerSideProps } from 'next';
import Link from 'next/link';

import Booking from '../layout/Booking';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { IAppConfig, getDataConfig } from '../utils/Content';

interface IhomeProps {
  config: IAppConfig;
}

const QUESTIONS: { question: string; answer: any }[] = [
  {
    question: '1. TN7 solutions là gì?',
    answer: (
      <p>
        TN7 Solutions là công ty chuyên cung cấp dịch vụ tư vấn miễn phí và hỗ
        trợ giải quyết các vấn đề du học, định cư tại Canada - Hoa Kỳ và các
        nước khác. Chúng tôi sẽ giúp bạn đưa ra các giải pháp tối ưu với tiêu
        chí “nhanh, gọn và thật tiết kiệm”. Ngoài ra TN7 còn có những dịch vụ đi
        kèm để giúp bạn ổn định cuộc sống khi định cư tại nước ngoài như luyện
        thi chứng chỉ ngoại ngữ, săn học bổng, thuê nhà, mua xe, tìm kiếm việc
        làm. Chúng tôi mong muốn mang lại cho bạn sự an tâm khi bạn lựa chọn
        trao niềm tin và hy vọng của mình dành cho chúng tôi, TN7 sẽ thay bạn
        giải quyết khó khăn đang cản bước bạn.
      </p>
    ),
  },
  {
    question:
      '2. Có gì khác biệt khi khách hàng chọn TN7 solutions mà không phải các đơn vị tư vấn khác?',
    answer: (
      <p>
        Sự khác biệt lớn nhất ở TN7 Solutions với các đơn vị tư khác chính là sự
        hỗ trợ tận tình từ các dịch vụ đi kèm như tìm kiếm việc làm part-time
        cho các bạn du học sinh giúp giảm áp lực tài chính cho gia đình và hiểu
        được văn hóa của của quốc gia bạn đang đi học; Thuê nhà giúp bạn có chỗ
        ở ngay khi đặt chân tới đất nước mới, việc này nhằm hỗ trợ bạn sớm ổn
        định cuộc sống và an tâm hơn khi qua một đất nước mới; Thuê xe, trợ giúp
        mua xe với giá tốt nhất, giúp bạn chủ động trong cuộc sống,... TN7 tự
        tin cho rằng không có đơn vị tư vấn hỗ trợ nào có thể cùng bạn đồng hành
        từ khi bạn còn ở Việt Nam đến khi bạn định cư tại đất nước bạn mong
        muốn, xuyên suốt chặng đường này mọi khó khăn TN7 Solutions đều có thể
        giải quyết thay bạn.
      </p>
    ),
  },
  {
    question:
      '3. Tôi muốn đi Canada, không rõ nên đi du học, đi lao động hay diện đầu tư sẽ tốt hơn?',
    answer: (
      <p>
        Đừng quá lo lắng, nếu bạn chưa rõ mình nên lựa chọn hướng đi nào, chỉ
        cần cho TN7 Solutions những mong muốn và khả năng tài chính của bạn.
        Chúng tôi sẽ đưa ra những giải pháp tối ưu nhất để hiện thực mong muốn
        của bạn. Với tiêu chí “nhanh, gọn và thật tiết kiệm”, mỗi giải pháp
        chúng tôi đưa ra đều dựa trên mong muốn của khách hàng và là giải pháp
        tối ưu nhất, giúp tiết kiệm chi phí và thời gian của khách hàng. Để biết
        thêm thông tin chi tiết, bạn có thể liên hệ ngay đến hotline: 0763
        771191 (zalo, viber, whatsapp) để nhận được những tư vấn tận tình và
        giải đáp thắc mắc nhanh nhất từ chuyên viên tư vấn có nhiều năm kinh
        nghiệm từ chúng tôi. TN7 chào đón bạn.
      </p>
    ),
  },
  {
    question:
      '4. Thẻ thường trú có giá trị trong bao lâu và được gia hạn như thế nào?',
    answer: (
      <p>
        Permanent Resident Card là thẻ thường trú Canada, cho phép người sở hữu
        thẻ chứng minh tình trạng nhập cư của mình. Thẻ thường trú có giá trị 5
        năm. Hết 5 năm thẻ sẽ cần được gia hạn. Thường trú nhân cần phải có thời
        gian sống ở Canada tối thiểu 2 năm trong 5 năm đó thì mới được gia hạn
        thẻ.
      </p>
    ),
  },
  {
    question:
      '5. Quyền lợi của thường trú nhân Canada khác gì với quyền lợi của công dân Canada?',
    answer: (
      <p>
        Thường trú nhân Canada được hưởng các quyền lợi như công dân Canada gồm
        chăm sóc sức khỏe, phúc lợi xã hội, sống và làm việc ở mọi nơi trên lãnh
        thổ Canada. Khác với công dân Canada, thường trú nhân Canada sẽ không có
        quyền bầu cử và làm việc trong các cơ quan chính phủ hay liên quan đến
        chính trị.
      </p>
    ),
  },
  {
    question: '6. Khi nào sẽ mất tình trạng Thường Trú Nhân?',
    answer: (
      <ul>
        <li>- Người đó trở thành công dân Canada.</li>
        <li>- Người đó không ở tại Canada đủ 2 năm trong 5 năm.</li>
        <li>- Người đó phạm tội nghiêm trọng và bị trục xuất khỏi Canada.</li>
        <li>
          - Nếu thường trú hết hạn, người đó không bị mất tình trạng thường trú
          nhân nhưng sẽ bị những hạn chế khi đi lại và làm việc.
        </li>
      </ul>
    ),
  },
  {
    question:
      '7. Nếu ba mẹ li dị thì con còn nhỏ có được xuất ngoại theo cha mẹ theo chương trình này được không? Và thủ tục cần làm gì?',
    answer: (
      <p>
        Có, cần giấy chấp nhận cho con đi định cư Canada có chữ ký cha mẹ mới có
        thể đi được. Ngoài ra, nếu cha/mẹ có quyết định của Toà án về việc toàn
        quyền nuôi con thì hoàn toàn có thể thực hiện thủ tục đưa con đi xuất
        ngoại.
      </p>
    ),
  },
  {
    question:
      '8. Bao lâu có thể bảo lãnh được người thân cùng định cư? Những người nào được bảo lãnh? Và ở dạng nào?',
    answer: (
      <>
        <p>- Canada cho phép bảo lãnh cha mẹ và con cái dưới 22 tuổi.</p>
        <p>
          - Khi đi được thì sau 3 năm có thể mở hồ sơ bảo lãnh người thân. Đối
          với Canada chỉ có con cái bảo lãnh được cha mẹ, còn cha mẹ chỉ bảo
          lãnh đc con cái phụ thuộc vào độ tuổi. Trên 22 tuổi không được bảo
          lãnh, anh em không bảo lãnh được nhau.
        </p>
        <p>- Để bảo lãnh cần phải chứng minh tài chính và nộp thuế đầy đủ.</p>
        <p>
          - Nếu muốn bảo lãnh sớm thì có thể dùng dịch vụ hỗ trợ để bảo lãnh chỉ
          sau 1 năm sang Canada.
        </p>
      </>
    ),
  },
  {
    question: '9. Được mang bao nhiêu tiền mặt khi nhập cảnh Canada?',
    answer: (
      <p>
        Bạn chỉ được mang tối đa 5.000 USD tiền mặt theo quy định mà không cần
        phải khai báo. Vì vậy, nên chuẩn bị cho mình thẻ tín dụng hoặc thẻ ATM
        quốc tế khi sang Canada du học sẽ giúp bạn dễ dàng thanh toán và có thể
        mang theo một lượng tiền mặt lớn giúp bạn chủ động trong mọi công việc.
      </p>
    ),
  },
  {
    question:
      '10. Chương trình định cư nào nhanh nhất để lấy được thẻ Xanh hiện nay?',
    answer: (
      <p>
        Hiện nay, chính phủ Canada đã ban hành nhiều chương trình và chính sách
        hỗ trợ người nhập cư. Nếu bạn có kỹ năng tay nghề cao thì định cư diện
        tay nghề là cách định cư Canada dễ nhất và phổ biến nhất mà bạn có thể
        lựa chọn.
      </p>
    ),
  },
  {
    question: '11. Không biết Tiếng Anh thì làm sao?',
    answer: (
      <p>
        Các chương trình Du học, Di trú Canada đều cần tiếng Anh, tối thiểu
        IELTS 4.0 General Training, giao tiếp được thì mới được chấp thuận. TN7
        Solutions chúng tôi có dịch vụ luyện thi ngoại ngữ để đạt trình độ mà
        chương trình bạn yêu cầu.
      </p>
    ),
  },
  {
    question: '12. Bị mất bằng Tốt nghiệp THPT, Cao đẳng, Đại học thì làm sao?',
    answer: (
      <>
        <p>
          - Đối với văn bằng và bảng điểm Cao Đẳng, Đại Học thì về trường xin
          trích lục.
        </p>
        <p>
          - Đối với bằng và bảng điểm Trung Học Phổ Thông thì về Sở Giáo Dục &
          Đào Tạo xin cấp trích lục.
        </p>
      </>
    ),
  },
  {
    question: '13. Chi phí để định cư Canada khoảng bao nhiêu tiền?',
    answer: (
      <p>
        Tùy vào từng chương trình mà chi phí định cư sẽ không giống nhau. Nhưng
        nhìn chung, chi phí định cư Canada khoảng 20.000 CAD/người/năm. Tuy
        nhiên, chi phí này có thể thay đổi tùy vào từng thời điểm và số lượng
        thành viên trong gia đình đi cùng.
      </p>
    ),
  },
  {
    question:
      '14. Có phải tất cả người lao động đều có thể xin được visa lao động?',
    answer: (
      <p>
        Không, không phải tất cả người lao động đều được chấp nhận. Việc xin
        visa lao động Canada phụ thuộc vào nhiều yếu tố như kỹ năng, kinh nghiệm
        làm việc, sức khỏe, tình hình tài chính,...
      </p>
    ),
  },
  {
    question: '15. Cơ hội việc làm cho người nhập cư nằm ở nhóm ngành nào?',
    answer: (
      <p>
        Chính phủ Canada lập ra nhóm danh sách các nghề nghiệp thiếu hụt lao
        động cần được tuyển dụng người lao động để đáp ứng nhu cầu là NOC. Bạn
        nên lựa chọn các ngành có tên trong danh sách này để có phần trăm cơ hội
        định cư cao hơn.
      </p>
    ),
  },
  {
    question: '16. Có thể mang gia đình cùng định cư không?',
    answer: (
      <p>
        Có thể mang gia đình định cư cùng mình nếu như bạn đã có được Thẻ Xanh.
        Bạn có thể mang theo vợ/chồng và con cái theo. Đối với con dưới 18 tuổi
        sẽ nhận nền tảng giáo dục miễn phí từ Chính phủ Canada. Thêm vào đó, cả
        gia đình bạn được hưởng chính sách y tế miễn phí của Canada và các thành
        viên trong gia đình đều được giữ song tịch Việt Nam và Canada.
      </p>
    ),
  },
  {
    question: '17. Canada có những trường đại học nào tốt?',
    answer: (
      <p>
        Đầu năm 2024, Canada có 3 ngôi trường nằm trong Top 100 các trường có
        chất lượng giảng dạy tốt trên bảng xếp hạng QS Rankings thế giới Đại học
        Toronto, Đại học McGill, Đại học British Columbia.
      </p>
    ),
  },
  {
    question:
      '18. Du học sinh quốc tế tại Canada có thể đi làm thêm ngoài giờ học không?',
    answer: (
      <p>
        Bộ Di trú, Người tị nạn và Quốc tịch Canada (IRCC) có chính sách cho du
        học sinh quốc tế được làm việc ngoài giờ học. Trong chính sách này có 2
        hình thức: 1 là làm việc part-time trong năm học tối đa 20h/tuần; 2 là
        làm việc full-time trong các kì nghỉ đông, … tối đa 40h/tuần.
      </p>
    ),
  },
  {
    question:
      '19. Làm việc bao lâu sau khi tốt nghiệp thì có thể nộp hồ sơ xin trở thành Thường Trú Nhân?',
    answer: (
      <p>
        Việc nộp hồ sơ xin trở thành Thường Trú Nhân tại Canada tức là xin được
        Thẻ Xanh sẽ tùy thuộc vào chính sách của từng nơi bạn ở. Thường bạn sẽ
        phải làm việc tại Canada sau khi tốt nghiệp từ 1 - 2 năm sau đó dựa vào
        các điều kiện và yêu cầu của IRCC để xem xét việc nộp hồ sơ xin Thẻ
        Xanh.
      </p>
    ),
  },
  {
    question:
      '20. Có phải muốn đi du học sau Trung học trường nào tại Canada cũng được?',
    answer: (
      <p>
        Điều này hoàn là suy nghĩ sai lầm. Canada chỉ cho phép du học sau Trung
        học các trường nằm trong danh sách DLI, chỉ có các du học sinh nằm ở lứa
        tuổi tiểu học và trung học mới được tự do lựa chọn các ngôi trường mà họ
        muốn.
      </p>
    ),
  },
];

const hoiDap = (props: IhomeProps) => {
  return (
    <Main
      config={props.config}
      meta={
        <Meta
          title={props.config.seo.site_title}
          description={props.config.seo.site_description}
          config={props.config}
        />
      }
    >
      <section className="pt-20 md:pt-4 my-16">
        <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
          <p className="p-2 text-large font-medium tracking-wider text-center uppercase">
            Giải đáp
          </p>
          <h2 className="mb-20 text-3xl font-bold leading-none text-center sm:text-4xl">
            Những câu hỏi thường gặp
          </h2>
          <div className="flex flex-col divide-y sm:px-16 lg:px-32 xl:px-48 dark:divide-gray-300">
            {QUESTIONS.map((q, i) => (
              <details key={i} className="py-4 md:py-2">
                <summary className="text-xl md:text-lg py-2 outline-none cursor-pointer font-medium">
                  {q.question}
                </summary>
                <div className="px-4 pb-4 text-lg md:text-base">{q.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
      {/* Booking */}
      <div id="booking" className="md:pt-20 my-6">
        <div className="">
          <div className="relative bg-gray-900 py-8 px-8 md:py-28 md:px-12 shadow-2xl overflow-hidden aos-init aos-animate">
            <div className="mx-auto max-w-screen-lg relative flex flex-col lg:flex-row justify-between items-center gap-4">
              <div className="text-center lg:text-left lg:w-3/5">
                <h3 className="h3 text-white text-3xl font-bold mb-2">
                  Tư vấn tận tâm và hoàn toàn miễn phí
                </h3>
                <p className="text-gray-300 text-lg mb-6">
                  Đội ngũ luật sư và chuyên gia di trú luôn sẵn sàng hỗ trợ tư
                  vấn hồ sơ bước đầu giúp bạn tiết kiệm thời gian và chi phí.
                </p>
              </div>
              <Booking></Booking>
            </div>
          </div>
        </div>
      </div>
      {/* Services */}
      <div className="relative mx-auto max-w-screen-lg py-12 md:py-20 max-w-6xl my-6">
        <div
          className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 pointer-events-none -z-1"
          aria-hidden="true"
        >
          {/* <svg
            width="1360"
            height="578"
            viewBox="0 0 1360 578"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
                id="illustration-01"
              >
                <stop stopColor="#FFF" offset="0%"></stop>
                <stop stopColor="#EAEAEA" offset="77.402%"></stop>
                <stop stopColor="#DFDFDF" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g fill="url(#illustration-01)" fillRule="evenodd">
              <circle cx="1232" cy="128" r="128"></circle>
              <circle cx="155" cy="443" r="64"></circle>
            </g>
          </svg> */}
        </div>
        <div className="max-w-3xl mx-auto text-center pb-12">
          <h2 className="text-3xl font-bold">Dịch vụ của TN7 Solutions</h2>
        </div>
        <div className="max-w-sm mx-auto grid gap-4 lg:grid-cols-4 md:grid-cols-2 items-start md:max-w-2xl lg:max-w-none">
          <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-md hover:shadow-lg border duration-300 ease-in-out">
            <img
              className="h-20 m-4"
              src="/assets/icons/study.png"
              alt="Dịch vụ của TN7 Solutions"
            />
            <h4 className="text-xl font-bold leading-snug tracking-tight mb-1 text-center">
              Lộ trình định cư theo diện tại Canada
            </h4>
            <p className="text-gray-600 text-center h-24 text-base">
              Giải pháp du học và mang theo cả gia đình đi định cư tại Canada.
            </p>
            <Link
              href={
                'https://tn7solutions.com/blogs/lo-trinh-du-hoc-dinh-cu-tai-canada-412024/'
              }
              className="text-sm"
            >
              Chi tiết
            </Link>
          </div>
          <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-md hover:shadow-lg border duration-300 ease-in-out">
            <img
              className="h-20 m-4"
              src="/assets/icons/worker.png"
              alt="icon worker"
            />
            <h4 className="text-xl font-bold leading-snug tracking-tight mb-1 text-center">
              Quá trình định cư theo diện tay nghề Canada
            </h4>
            <p className="text-gray-600 text-center h-24 text-base">
              Giải pháp định cư tay nghề phù hợp cho bạn và gia đình.
            </p>
            <Link
              href={
                'https://tn7solutions.com/blogs/qua-trinh-dinh-cu-theo-dien-tay-nghe-tai-canada-422024/'
              }
              className="text-sm"
            >
              Chi tiết
            </Link>
          </div>
          <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-md hover:shadow-lg border duration-300 ease-in-out">
            <img
              className="h-20 m-4"
              src="/assets/icons/startup.png"
              alt="Quy trình định cư theo diện start-up"
            />
            <h4 className="text-xl font-bold leading-snug tracking-tight mb-1 text-center">
              Quy trình định cư theo diện start-up
            </h4>
            <p className="text-gray-600 text-center h-24 text-base">
              Định cư cùng gia đình với ý tưởng khởi nghiệp sáng tạo.
            </p>
            <Link
              href={
                'https://tn7solutions.com/blogs/quy-trinh-dinh-cu-theo-dien-start-up-422024/'
              }
              className="text-sm"
            >
              Chi tiết
            </Link>
          </div>
          <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-md hover:shadow-lg border duration-300 ease-in-out">
            <img
              className="h-20 m-4"
              src="/assets/icons/services.png"
              alt="icon services"
            />
            <h4 className="text-xl font-bold leading-snug tracking-tight mb-1 text-center">
              Các dịch vụ hỗ trợ đi kèm
            </h4>
            <p className="text-gray-600 text-center h-28 text-base">
              Ngoài những dịch vụ chính, TN7 còn có những hỗ trợ khác, cùng bạn
              an tâm định cư.
            </p>
            <Link
              href={
                'https://tn7solutions.com/blogs/cac-dich-vu-ho-tro-di-kem-422024/'
              }
              className="text-sm"
            >
              Chi tiết
            </Link>
          </div>
        </div>
      </div>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps<IhomeProps> = async () => {
  const config = getDataConfig();
  return {
    props: {
      config,
    },
  };
};

export default hoiDap;
