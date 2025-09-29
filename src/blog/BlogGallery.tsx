import React, { useState, useMemo } from 'react';

import { format } from 'date-fns';
import Link from 'next/link';

import { IPaginationProps } from '../pagination/Pagination';
import { imageKitExtract, parseDateString } from '../utils/Common';
import { IAppConfig, PostItems } from '../utils/Content';

export type IBlogGalleryProps = {
  title: string;
  description: string;
  posts: PostItems[];
  pagination: IPaginationProps;
  config: IAppConfig;
};

// ✅ SAFE DATE FORMATTING FUNCTION
const formatSafeDate = (dateString: string): string => {
  try {
    if (!dateString) {
      return format(new Date(), 'MMM dd, yyyy');
    }

    const parsedDate = parseDateString(dateString);

    if (Number.isNaN(parsedDate.getTime())) {
      console.warn(`Invalid date string: "${dateString}", using current date`);
      return format(new Date(), 'MMM dd, yyyy');
    }

    return format(parsedDate, 'MMM dd, yyyy');
  } catch (error) {
    console.error(`Date formatting error for "${dateString}":`, error);
    return format(new Date(), 'MMM dd, yyyy');
  }
};

const BlogGallery = (props: IBlogGalleryProps) => {
  // ✨ STATE FOR SEARCH AND PAGINATION
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('latest');
  const postsPerPage = 12;

  // ✨ FILTERED AND SORTED POSTS
  const filteredPosts = useMemo(() => {
    let filtered = props.posts;

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (post) =>
          post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'title':
          return (a.title || '').localeCompare(b.title || '');
        case 'latest':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    return filtered;
  }, [props.posts, searchTerm, sortBy]);

  // ✨ PAGINATION LOGIC
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );

  // ✨ RESET PAGE WHEN SEARCH CHANGES
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy]);

  return (
    <>
      {/* ✨ HERO SECTION - MODERN GRADIENT */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-24 px-4 overflow-hidden">
        {/* ✨ ANIMATED BACKGROUND PATTERN */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-56 h-56 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-bounce"></div>

          {/* ✨ GRID PATTERN OVERLAY - FIXED SVG */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-200 text-sm font-medium mb-6 backdrop-blur-sm">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            Featured Articles & Insights
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              {props.title}
            </span>
          </h1>

          <div className="flex items-center justify-center mb-8">
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
            <div className="w-3 h-3 bg-white rounded-full mx-4 animate-pulse"></div>
            <div className="w-32 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
          </div>

          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            {props.description}
          </p>

          {/* ✨ QUICK STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {props.posts.length}+
              </div>
              <div className="text-slate-400 text-sm uppercase tracking-wide">
                Articles Published
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {new Set(props.posts.map((post) => post.category)).size}+
              </div>
              <div className="text-slate-400 text-sm uppercase tracking-wide">
                Categories
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-slate-400 text-sm uppercase tracking-wide">
                Always Updated
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✨ SEARCH & FILTER TOOLBAR */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* ✨ SEARCH SECTION */}
            <div className="flex-1 max-w-2xl">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search articles, topics, or categories..."
                  className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-gray-700 bg-gray-50 focus:bg-white text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* ✨ FILTER & SORT CONTROLS */}
            <div className="flex items-center space-x-6">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer font-medium"
                >
                  <option value="latest">Latest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">Alphabetical</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Results Counter */}
              <div className="flex items-center px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
                <svg
                  className="w-4 h-4 mr-2 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span className="text-sm font-semibold text-blue-700">
                  {filteredPosts.length}{' '}
                  {filteredPosts.length === 1 ? 'Article' : 'Articles'}
                  {searchTerm && (
                    <span className="text-blue-500 ml-1">
                      for &quot;{searchTerm}&quot;
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✨ MAIN CONTENT AREA */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* ✨ NO RESULTS STATE */}
          {filteredPosts.length === 0 && searchTerm && (
            <div className="text-center py-24">
              <div className="w-40 h-40 mx-auto mb-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-20 h-20 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                No Results Found
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                We couldn&apos;t find any articles matching &quot;
                <span className="font-semibold text-blue-600">
                  {searchTerm}
                </span>
                &quot;. Try different keywords or browse all articles.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setSearchTerm('')}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Clear Search
                </button>
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                  className="inline-flex items-center px-8 py-4 bg-white text-gray-700 border-2 border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-semibold"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                  Back to Top
                </button>
              </div>
            </div>
          )}

          {/* ✨ ARTICLES GRID */}
          {currentPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {currentPosts.map((post, index) => (
                <Link
                  rel="noopener noreferrer"
                  href="/blogs/[slug]"
                  as={`/blogs/${post.slug}`}
                  key={post.slug}
                  className="group block"
                >
                  <article className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-4 border border-gray-100 hover:border-blue-200 h-full flex flex-col">
                    {/* ✨ IMAGE SECTION */}
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <img
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        src={
                          imageKitExtract(post.image)?.url ??
                          '/images/default-blog.jpg'
                        }
                        alt={post.title || 'Article image'}
                        loading={index < 8 ? 'eager' : 'lazy'}
                      />

                      {/* ✨ OVERLAY WITH GRADIENT */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* ✨ CATEGORY BADGE */}
                      {post.category && (
                        <div className="absolute top-4 left-4">
                          <span className="inline-block bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-white/20">
                            {post.category}
                          </span>
                        </div>
                      )}

                      {/* ✨ READ TIME BADGE */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                          Read More
                        </span>
                      </div>
                    </div>

                    {/* ✨ CONTENT SECTION */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* ✨ DATE */}
                      <div className="flex items-center text-gray-500 text-sm mb-3">
                        <svg
                          className="w-4 h-4 mr-2 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <time dateTime={post.date}>
                          {formatSafeDate(post.date)}
                        </time>
                      </div>

                      {/* ✨ TITLE */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight flex-shrink-0">
                        {post.title && post.title.length > 60
                          ? `${post.title.substring(0, 60)}...`
                          : post.title || 'Untitled Article'}
                      </h3>

                      {/* ✨ DESCRIPTION */}
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                        {post.description && post.description.length > 120
                          ? `${post.description.substring(0, 120)}...`
                          : post.description ||
                            'Discover insights and knowledge in this comprehensive article.'}
                      </p>

                      {/* ✨ READ MORE CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-blue-600 text-sm font-semibold group-hover:text-blue-700 transition-colors flex items-center">
                          Read Article
                          <svg
                            className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>

                        {/* ✨ READING TIME ESTIMATE */}
                        <span className="text-xs text-gray-400 flex items-center">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {Math.max(
                            1,
                            Math.ceil((post.description?.length || 0) / 200)
                          )}{' '}
                          min read
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {/* ✨ EMPTY STATE (No Posts at all) */}
          {props.posts.length === 0 && !searchTerm && (
            <div className="text-center py-24">
              <div className="w-40 h-40 mx-auto mb-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <svg
                  className="w-20 h-20 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-4">
                No Articles Published Yet
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                We&apos;re working on bringing you amazing content. Check back
                soon for the latest articles and insights.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ✨ PAGINATION SECTION */}
      {filteredPosts.length > postsPerPage && (
        <div className="bg-white border-t border-gray-200 py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* ✨ PAGINATION HEADER */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl">
                <svg
                  className="w-5 h-5 mr-3 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-lg font-bold text-blue-800">
                  Page {currentPage} of {totalPages}
                </span>
                <span className="ml-3 text-sm text-blue-600">
                  ({filteredPosts.length} articles total)
                </span>
              </div>
            </div>

            {/* ✨ PAGINATION CONTROLS */}
            <div className="flex items-center justify-center space-x-3">
              {/* Previous Button */}
              {currentPage > 1 && (
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="inline-flex items-center px-6 py-4 text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Previous
                </button>
              )}

              {/* Page Numbers */}
              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => {
                    // Show first page, last page, current page, and adjacent pages
                    const showPage =
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 &&
                        pageNum <= currentPage + 1);

                    const showEllipsis =
                      (pageNum === currentPage - 2 && currentPage > 3) ||
                      (pageNum === currentPage + 2 &&
                        currentPage < totalPages - 2);

                    if (showEllipsis) {
                      return (
                        <span
                          key={pageNum}
                          className="px-3 py-2 text-gray-400 font-bold"
                        >
                          ...
                        </span>
                      );
                    }

                    if (!showPage) return null;

                    if (pageNum === currentPage) {
                      return (
                        <button
                          key={pageNum}
                          className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl font-bold shadow-lg transform scale-110 border-2 border-blue-300"
                        >
                          {pageNum}
                        </button>
                      );
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className="w-14 h-14 bg-white text-blue-600 border-2 border-blue-200 rounded-2xl font-bold hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg"
                      >
                        {pageNum}
                      </button>
                    );
                  }
                )}
              </div>

              {/* Next Button */}
              {currentPage < totalPages && (
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="inline-flex items-center px-6 py-4 text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Next
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* ✨ BACK TO TOP */}
            <div className="text-center mt-12">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center px-8 py-4 text-sm font-bold text-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl hover:from-blue-100 hover:to-indigo-100 hover:border-blue-300 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
                Back to Top
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { BlogGallery };
