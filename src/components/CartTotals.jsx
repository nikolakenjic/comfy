import { useSelector } from 'react-redux';
import { formatPrice } from '../utils/utils';

const CartTotals = () => {
  const { cartTotal, shipping, tax, orderTotal } = useSelector(
    (state) => state.cart
  );

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        {/* Subtotal */}
        <p className="flex justify-between text-xs border-b border-base-100 pb-2">
          <span>Subtotal</span>
          <span className="font-medium">{formatPrice(cartTotal)}</span>
        </p>
        {/* Tax */}
        <p className="flex justify-between text-xs border-b border-base-100 pb-2">
          <span>Tax</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </p>
        {/* Shipping */}
        <p className="flex justify-between text-xs border-b border-primary pb-2">
          <span>Shipping</span>
          <span className="font-medium">{formatPrice(shipping)}</span>
        </p>

        {/* Order Total */}
        <p className="flex justify-between text-sm ">
          <span>Order Total</span>
          <span className="font-medium">{formatPrice(orderTotal)}</span>
        </p>
      </div>
    </div>
  );
};

export default CartTotals;
