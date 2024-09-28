import React, { useState, useEffect } from 'react';
import blogsData from '../../data/blogsData';

interface Blog {
  id: number;
  title: string;
  category: string;
  date: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
}

const BlogCard: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [expandedBlogs, setExpandedBlogs] = useState<number[]>([]); // Track expanded blog IDs

  useEffect(() => {
    setBlogs(blogsData);
  }, []);

  const toggleExpandBlog = (id: number) => {
    setExpandedBlogs((prev) => 
      prev.includes(id) ? prev.filter((blogId) => blogId !== id) : [...prev, id]
    );
  };

  return (
    <div className="grid max-w-md grid-cols-1 gap-6 mx-auto mt-8 lg:mt-12 lg:grid-cols-4 lg:max-w-full">
      {blogs.map((blog) => (
        <div key={blog.id} className="overflow-hidden bg-white rounded shadow">
          <div className="">
            <div className="relative">
              <a href="#" title="" className="block aspect-w-4 aspect-h-3">
                <img className="object-cover w-full h-full" src={blog.imageUrl} alt={blog.title} />
              </a>
              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full">
                  {blog.category}
                </span>
              </div>
            </div>
            <div className="px-5 pb-3">
              <span className="block mt-6 text-sm font-semibold tracking-widest text-gray-500 uppercase">
                {blog.date}
              </span>
              <p className="mt-5 text-2xl font-semibold">
                <a href="#" title="" className="text-black">
                  {blog.title}
                </a>
              </p>
              <p className="mt-4 text-base text-gray-600">
                {expandedBlogs.includes(blog.id) ? blog.fullDescription : blog.shortDescription}
              </p>
              <button
                onClick={() => toggleExpandBlog(blog.id)}
                className="inline-flex items-center justify-center pb-0.5 mt-5 text-base font-semibold text-blue-600 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600"
              >
                {expandedBlogs.includes(blog.id) ? 'Show Less' : 'Continue Reading'}
                <svg className="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCard;
