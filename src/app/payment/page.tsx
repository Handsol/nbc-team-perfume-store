import Shipping from '@/components/payment/Shipping';
import DaumPostcodeEmbed, { useDaumPostcodePopup } from 'react-daum-postcode';
import { postcodeScriptUrl } from 'react-daum-postcode/lib/loadPostcode';
const PaymentPage = () => {
  return <Shipping />;
};

export default PaymentPage;
