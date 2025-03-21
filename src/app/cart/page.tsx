import { createClient } from '@/utils/supabase/createClient';

const CartPage = async () => {
  const supabase = createClient();
  return <h1>CartPage</h1>;
};
export default CartPage;
