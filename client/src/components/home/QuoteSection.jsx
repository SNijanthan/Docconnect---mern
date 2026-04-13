import React, { useState, useEffect } from "react";
import axios from "axios";

const QuoteSection = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_QUOTE_API_URL);

        // Handle different API formats safely
        const data = res.data;

        setQuote(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8 bg-sky-50 dark:bg-slate-950 flex justify-center rounded-xl">
      {/* Card */}
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 sm:p-8">
        {/* Loading */}
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading quote...
          </p>
        ) : quote ? (
          <>
            {/* Quote */}
            <p className="text-lg sm:text-xl md:text-2xl text-center  font-medium leading-relaxed text-gray-800 dark:text-gray-200">
              “{quote.quote}”
            </p>

            {/* Divider */}
            <div className="w-16 h-1 bg-sky-500 mx-auto my-4 rounded-full"></div>

            {/* Author */}
            <p className="text-right text-sm sm:text-base font-semibold text-gray-600 dark:text-gray-400">
              — {quote.author}
            </p>
          </>
        ) : (
          <p className="text-center text-red-500">Failed to load quote 😕</p>
        )}
      </div>
    </section>
  );
};

export default QuoteSection;
