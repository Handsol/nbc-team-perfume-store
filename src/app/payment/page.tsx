import PayMethod from '@/components/payment/PayMethod';
import Shipping from '@/components/payment/Shipping';
import DaumPostcodeEmbed, { useDaumPostcodePopup } from 'react-daum-postcode';
import { postcodeScriptUrl } from 'react-daum-postcode/lib/loadPostcode';
const PaymentPage = () => {
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl mb-4">주문/결제</h1>
      <Shipping />
      <PayMethod />
    </div>
  );
};

export default PaymentPage;
