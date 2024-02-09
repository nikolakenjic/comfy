import { FeaturedProducts, Hero } from '../components';
import fetchUrl from '../utils/axios';

// React Query
const featuredProductsQuery = {
  queryKey: ['featuredProducts'],
  queryFn: () => fetchUrl.get('/products?featured=true'),
};

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};

export default Landing;

export const loader = (queryClient) => async () => {
  const { data } = await queryClient.ensureQueryData(featuredProductsQuery);
  const products = data.data;

  return { products };
};
