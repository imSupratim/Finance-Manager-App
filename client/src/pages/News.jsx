import React, { useEffect, useState } from "react";
import api from "../api/axios.js";
import { Newspaper, ExternalLink, TrendingUp } from "lucide-react";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get("/news/finance");
        setNews(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-lg text-slate-600 font-medium">Loading finance news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-2.5 shadow-lg">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
              Finance News
            </h1>
          </div>
          <p className="text-slate-600 ml-12">
            Stay updated with the latest financial news and market insights
          </p>
        </div>

        {/* News Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {news.map((article, i) => (
            <a
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              {article.urlToImage && (
                <div className="relative overflow-hidden h-48 bg-slate-200">
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-md">
                    <ExternalLink className="w-4 h-4 text-slate-600" />
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-5 space-y-3">
                {/* Title */}
                <h2 className="font-bold text-lg text-slate-800 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h2>

                {/* Description */}
                {article.description && (
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {article.description}
                  </p>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  {article.source?.name && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-xs font-medium text-slate-500">
                        {article.source.name}
                      </span>
                    </div>
                  )}
                  <span className="text-xs text-blue-600 font-medium flex items-center gap-1">
                    Read more
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Empty State */}
        {news.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-slate-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Newspaper className="w-10 h-10 text-slate-400" />
            </div>
            <p className="text-lg text-slate-600 font-medium mb-2">No news available</p>
            <p className="text-sm text-slate-500">Check back later for the latest updates</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;