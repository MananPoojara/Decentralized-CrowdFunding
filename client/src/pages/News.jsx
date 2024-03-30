import React, { useState, useEffect } from "react";

const News = () => {
  const [news, setNews] = useState([]);
  const apiKey = "4a55897c5abb4dc98068c93a81933e3a"; // Replace 'YOUR_API_KEY' with your actual API key

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=4a55897c5abb4dc98068c93a81933e3a`
        );
        const data = await response.json();
        setNews(data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [apiKey]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Environment News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article, index) => (
          <div
            key={index}
            className="bg-[#2c2f32] rounded-lg overflow-hidden shadow-md"
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt="Article"
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg text-green-300 font-semibold mb-2">
                {article.title}
              </h3>
              <p className="text-sm text-white mb-4">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:underline"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
