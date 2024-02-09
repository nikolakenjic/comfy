import { Link, useLoaderData } from 'react-router-dom';
import fetchUrl from '../utils/axios';
import { formatPrice, generateAmount } from '../utils/utils';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

// ReactQuery
const singleProductQuery = (id) => {
  return {
    queryKey: ['SingleProduct', id],
    queryFn: () => fetchUrl.get(`/products/${id}`),
  };
};

const SingleProduct = () => {
  const { product } = useLoaderData();
  const { title, price, image, description, colors, company } =
    product.attributes;
  const formattedPrice = formatPrice(price);
  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const amountHandler = (e) => {
    setAmount(Number(e.target.value));
  };

  const cartProduct = {
    cartId: product.id + productColor,
    productId: product.id,
    image,
    title,
    price,
    company,
    productColor,
    amount,
  };

  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addItem({ product: cartProduct }));
  };

  const colorsList = colors.map((color) => {
    return (
      <button
        key={color}
        type="button"
        className={`badge w-6 h-6 mr-2 ${
          color === productColor && 'border-2 border-secondary'
        }`}
        style={{ backgroundColor: color }}
        onClick={() => setProductColor(color)}
      ></button>
    );
  });

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>

      {/* Product */}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* Image */}
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full"
        />
        {/* Product Info */}
        <div>
          <h1 className="capitalize text-3xl font-bold text-primary">
            {title}
          </h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl text-secondary">{formattedPrice}</p>
          <p className="mt-6 leading-8">{description}</p>

          {/* Colors */}
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              Colors
            </h4>
            <div className="mt-2">{colorsList}</div>
          </div>

          {/* Amount */}
          <div className="form-control w-full max-w-xs">
            <label htmlFor="amount" className="label">
              <h4 className="text-md font-bold tracking-wider capitalize">
                Amount
              </h4>
            </label>
            <select
              id="amount"
              className="select select-secondary select-bordered select-md"
              value={amount}
              onChange={amountHandler}
            >
              {generateAmount(20)}
            </select>
          </div>
          {/* Cart Btn */}
          <div className="mt-10">
            <button
              className="btn btn-secondary btn-md capitalize"
              onClick={addToCartHandler}
            >
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    const { data } = await queryClient.ensureQueryData(singleProductQuery(id));

    return { product: data.data };
  };
