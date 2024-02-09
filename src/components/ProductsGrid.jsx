import { Link, useLoaderData } from 'react-router-dom';
import { formatPrice } from '../utils/utils';

const ProductsGrid = () => {
  const { products } = useLoaderData();

  const productList = products.map((product) => {
    const { title, image, price } = product.attributes;
    const formattedPrice = formatPrice(price);

    return (
      <Link
        to={`/products/${product.id}`}
        key={product.id}
        className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
      >
        <figure className="px-4 pt-4">
          <img
            src={image}
            alt={title}
            className="rounded-xl h-64 md:h-48 w-full object-cover"
          />
        </figure>
        <div className="card-title items-center p-4 m-auto">
          <h2 className="card-title capitalize tracking-wider">{title}</h2>
          <span className="text-secondary">{formattedPrice}</span>
        </div>
      </Link>
    );
  });

  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {productList}
    </div>
  );
};

export default ProductsGrid;
