import { useSelector } from 'react-redux';
import { CheckoutForm, SectionTitle, CartTotals } from '../components';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

const Checkout = () => {
  const { cartTotal } = useSelector((state) => state.cart);

  if (cartTotal === 0) return <SectionTitle text="Your Cart is Empty " />;
  return (
    <>
      <SectionTitle text="Place your order" />
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
};

export default Checkout;

export const loader = (store) => () => {
  const user = store.getState().user.user;

  if (!user) {
    toast.warn('You must be logged in to checkout');
    return redirect('/login');
  }
  return null;
};
