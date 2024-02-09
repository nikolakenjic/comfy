import fetchUrl from '../utils/axios';
import { Filters, PaginationContainer, ProductsContainer } from '../components';

// React Query
const allProductsQuery = (queryParams) => {
  const { search, category, company, sort, price, shipping, page } =
    queryParams;
  return {
    queryKey: [
      'products',
      search ?? '',
      category ?? 'all',
      company ?? 'all',
      sort ?? 'a-z',
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () =>
      fetchUrl.get('/products', {
        params: queryParams,
      }),
  };
};

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};

export default Products;

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    const { data } = await queryClient.ensureQueryData(
      allProductsQuery(params)
    );
    return { products: data.data, meta: data.meta, params };
  };
