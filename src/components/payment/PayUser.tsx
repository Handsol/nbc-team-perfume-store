import { Input } from '../ui/input';

const PayUser = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl mb-4">주문자 정보</h2>
      <div className="flex flex-col gap-2 justify-start py-6  px-8">
        <div className="flex flex-row gap-6 container">
          <p className="w-32">이름</p>
          <div className="flex items-center w-full">
            <Input type="text" placeholder="주문하시는 분" required className="h-12" />
          </div>
        </div>
        <div className="flex flex-row gap-6 container">
          <p className="w-32">이메일 주소</p>
          <div className="flex items-center w-full">
            <Input type="mail" placeholder="이메일 주소" className="h-12" />
          </div>
        </div>
        <div className="flex flex-row gap-6 container">
          <p className="w-32">연락처</p>
          <div className="flex items-center w-full">
            <Input type="number" placeholder="연락처" required className="h-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayUser;
