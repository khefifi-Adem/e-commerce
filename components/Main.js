import React from 'react';
import ProductItem from './ProductItem';
import data from '../utils/data';

export default function Main() {
  return (
    <main className="container m-auto mt-4 px-4 ">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <ProductItem product={product} key={product.slug} />
        ))}
      </div>
    </main>
  );
}
