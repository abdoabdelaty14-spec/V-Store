import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import ProductCard from "../../components/FeaturedProducts/ProductCard";

import SearchBar from "../../components/Products/SearchBar";
import CategoryFilter from "../../components/Products/CategoryFilter";
import SortProducts from "../../components/Products/SortProducts";

import {
  getProducts,
  getCategories,
} from "../../services/productService";

import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const [page, setPage] = useState(1);

  const [total, setTotal] = useState(0);

  const limit = 12;

  const totalPages = Math.ceil(total / limit);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [page, category]);

  async function loadCategories() {
    try {
      const data = await getCategories();

      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadProducts() {
    try {
      setLoading(true);

      let data;

      const skip = (page - 1) * limit;

      if (category) {
        data = await fetch(
          `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
        );

        data = await data.json();
      } else {
        data = await getProducts(limit, skip);
      }

      setProducts(data.products);
      setTotal(data.total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e) {
    setSearch(e.target.value);
    setPage(1);
  }

  let displayedProducts = [...products];

  if (search) {
    displayedProducts = displayedProducts.filter((product) =>
      product.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  if (sort === "low") {
    displayedProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    displayedProducts.sort((a, b) => b.price - a.price);
  }

  function changePage(newPage) {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <Navbar />

      <main className="products-page">

        <h1>All Products</h1>

        <div className="filters">

          <SearchBar
            search={search}
            setSearch={handleSearch}
          />

          <CategoryFilter
            categories={categories}
            category={category}
            setCategory={(value) => {
              setCategory(value);
              setPage(1);
            }}
          />

          <SortProducts
            sort={sort}
            setSort={setSort}
          />

        </div>

        {loading ? (

          <div className="products-loading">
            <h2>Loading Products...</h2>
          </div>

        ) : displayedProducts.length === 0 ? (

          <div className="no-products">
            <h2>No Products Found</h2>
            <p>
              Try searching for another product.
            </p>
          </div>

        ) : (

          <div className="products-grid">

            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>

        )}

        {!search && totalPages > 1 && (

          <div className="pagination">

            <button
              onClick={() => changePage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((number) => (

              <button
                key={number}
                className={
                  page === number
                    ? "active-page"
                    : ""
                }
                onClick={() => changePage(number)}
              >
                {number}
              </button>

            ))}

            <button
              onClick={() => changePage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>

          </div>

        )}

      </main>
    </>
  );
}

export default Products;