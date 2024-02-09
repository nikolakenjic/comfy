import { Form, useLoaderData, Link } from 'react-router-dom';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormRange from './FormRange';
import FormCheckbox from './FormCheckbox';

const Filters = () => {
  const { meta, params } = useLoaderData();
  const { search, category, company, order, price, shipping } = params;

  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/* Search */}
      <FormInput
        type="search"
        label="search product"
        name="search"
        size="input-sm"
        defaultValue={search}
      />
      {/* Categories */}
      <FormSelect
        label="select category"
        name="category"
        list={meta.categories}
        size="select-sm"
        defaultValue={category}
      />

      {/* Companies */}
      <FormSelect
        label="select company"
        name="company"
        list={meta.companies}
        size="select-sm"
        defaultValue={company}
      />

      {/* Order */}
      <FormSelect
        label="Sort By"
        name="order"
        list={['A-Z', 'Z-A', 'Highest', 'Lowest']}
        size="select-sm"
        defaultValue={order}
      />

      {/* Price Range */}
      <FormRange
        label="select price"
        name="price"
        size="range-sm"
        price={price}
      />

      {/* Free Shipping */}
      <FormCheckbox
        name="shipping"
        label="free shipping"
        size="checkbox-sm"
        defaultValue={shipping}
      />

      {/* Buttons */}
      <button type="submit" className="btn btn-primary btn-sm w-full">
        Search
      </button>
      <Link to="/products" className="btn btn-accent btn-sm w-full">
        Reset
      </Link>
    </Form>
  );
};

export default Filters;
