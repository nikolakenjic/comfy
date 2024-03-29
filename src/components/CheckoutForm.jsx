import { Form, redirect } from 'react-router-dom';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';
import { formatPrice } from '../utils/utils';
import { toast } from 'react-toastify';
import fetchUrl from '../utils/axios';
import { clearCart } from '../features/cart/cartSlice';

const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl">Shipping Information</h4>
      <FormInput label="first name" name="name" type="text" />
      <FormInput label="address" name="address" type="text" />
      <div className="mt-4">
        <SubmitBtn btnName="Place Your Order" />
      </div>
    </Form>
  );
};

export default CheckoutForm;

export const action =
  (store, queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { address, name } = Object.fromEntries(formData);

    const user = store.getState().user.user;
    const { cartItems, orderTotal, numItemsInCart } = store.getState().cart;

    const info = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      cartItems,
      numItemsInCart,
    };

    try {
      await fetchUrl.post(
        '/orders',
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      queryClient.removeQueries('orders');
      store.dispatch(clearCart());
      toast.success('order placed successfully');
      return redirect('/orders');
    } catch (err) {
      console.log(err);
      const errorMessage =
        err?.response?.data?.error?.message ||
        'there was an error placing your order';

      toast.error(errorMessage);

      if (err?.response?.status === 401 || err?.response?.status === 403) {
        return redirect('/login');
      }

      return null;
    }
  };
