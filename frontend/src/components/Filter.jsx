import { useState, useMemo } from "react";
import { FaTimes } from "react-icons/fa";

const Filter = ({ products, onFilterChange }) => {
  const [filters, setFilters] = useState({
    language: "",
    bookCategory: "",
    rating: "",
    sales: "",
  });

  // Extract unique languages and categories dynamically
  const { languages, categories } = useMemo(() => {
    const languages = Array.from(
      new Set(products.map((product) => product.language))
    );
    const categories = Array.from(
      new Set(products.map((product) => product.category))
    );
    return { languages, categories };
  }, [products]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = {
      ...filters,
      [name]: value,
    };
    setFilters(updatedFilters);

    // Notify the parent about filter changes
    if (onFilterChange) {
      onFilterChange(updatedFilters);
    }
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      language: "",
      bookCategory: "",
      rating: "",
      sales: "",
    };
    setFilters(clearedFilters);

    // Notify the parent about cleared filters
    if (onFilterChange) {
      onFilterChange(clearedFilters);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-5xl mx-auto my-8 transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
        <button
          onClick={clearAllFilters}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          aria-label="Clear all filters"
        >
          <span className="flex items-center">
            <FaTimes className="mr-2" />
            Clear All
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="language"
            className="block text-sm font-medium text-gray-700"
          >
            Language
          </label>
          <select
            id="language"
            name="language"
            value={filters.language}
            onChange={handleFilterChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">All Languages</option>
            {languages.map((language) => (
              <option key={language} value={language}>
                {language
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="bookCategory"
            className="block text-sm font-medium text-gray-700"
          >
            Book Category
          </label>
          <select
            id="bookCategory"
            name="bookCategory"
            value={filters.bookCategory}
            onChange={handleFilterChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700"
          >
            Rating
          </label>
          <select
            id="rating"
            name="rating"
            value={filters.rating}
            onChange={handleFilterChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Sort by Rating</option>
            <option value="highest">Highest</option>
            <option value="lowest">Lowest</option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="sales"
            className="block text-sm font-medium text-gray-700"
          >
            Sales
          </label>
          <select
            id="sales"
            name="sales"
            value={filters.sales}
            onChange={handleFilterChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Sort by Sales</option>
            <option value="highest">Highest</option>
            <option value="lowest">Lowest</option>
          </select>
        </div>
      </div>

      <div className="mt-8 bg-gray-100 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Applied Filters:</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).map(
            ([key, value]) =>
              value && (
                <span
                  key={key}
                  className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded-full"
                >
                  {key}: {value}
                </span>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
