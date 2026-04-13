import React, { useState, useEffect } from "react";
import axios from "axios";

const QuoteSection = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_QUOTE_API_URL);
        setQuote(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-white dark:bg-slate-900 flex justify-center">
      {/* Card */}
      <div className="w-full max-w-2xl bg-transparent text-center">
        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">Loading quote...</p>
        ) : quote ? (
          <>
            {/* Quote */}
            <p className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed text-gray-800 dark:text-gray-200">
              “{quote.quote}”
            </p>

            {/* Divider */}
            <div className="w-16 h-1 bg-sky-500 mx-auto my-5 rounded-full"></div>

            {/* Author */}
            <p className="text-sm sm:text-base font-semibold text-gray-600 dark:text-gray-400">
              — {quote.author}
            </p>
          </>
        ) : (
          <p className="text-red-500">Failed to load quote 😕</p>
        )}
      </div>
    </section>
  );
};

export default QuoteSection;
