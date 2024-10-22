import React, { useState, useEffect } from 'react';

interface Category {
  _id: string;
  category_name: string;
}

interface Author {
  _id: string;
  name: string;
}

interface Blog {
  _id: string;
  title: string;
  content: string;
  translatedTitle?: string;
  translatedContent?: string;
  author: Author;
  categories: Category[];
  createdAt: string;
  updatedAt: string;
  images?: string;
}

const BlogCard: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isTranslated, setIsTranslated] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('https://farmigo-server.onrender.com/api/v1/blogs');
        const result = await response.json();
        if (result.success) {
          setBlogs(result.data);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const translateContent = async (text: string) => {
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|bn`);
    const data = await response.json();
    return data.responseData.translatedText;
  };

  const toggleTranslate = async (id: string, title: string, content: string) => {
    const translated = isTranslated[id];

    if (!translated) {
      setIsLoading((prevState) => ({
        ...prevState,
        [id]: true,
      })); 

      const translatedTitle = await translateContent(title); 
      const translatedContent = await translateContent(content); 
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === id
            ? { ...blog, translatedTitle, translatedContent }
            : blog
        )
      );

      setIsLoading((prevState) => ({
        ...prevState,
        [id]: false,
      })); 
    }

    setIsTranslated((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="grid px-4 md:px-0 lg:px-0 grid-cols-2 gap-6 mx-auto mt-8 lg:mt-12 md:grid-cols-3 lg:grid-cols-4 lg:max-w-full">
      {blogs.map((blog) => {
        const imageUrls = blog.images ? blog.images.split('\n') : [];
        const firstImage = imageUrls.length > 0 ? imageUrls[0] : '/fallback-image.jpg'; 

        return (
          <div key={blog._id} className="overflow-hidden bg-white rounded shadow">
            <div className="relative">
              <img
                className="object-cover w-full h-60"
                src={firstImage}
                alt={blog.title}
              />
              <div className="absolute top-4 left-4">
                {blog.categories.map((category) => (
                  <span key={category._id} className="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full">
                    {category.category_name}
                  </span>
                ))}
              </div>
            </div>
            <div className="px-5 pb-3">
              <span className="block mt-6 text-sm font-semibold tracking-widest text-gray-500 uppercase">
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>
              <p className="mt-5 text-2xl font-semibold">
                <a href={`/blog/${blog._id}`} title={blog.title} className="text-black">
                  {isTranslated[blog._id] && blog.translatedTitle ? blog.translatedTitle : blog.title}
                </a>
              </p>
              <p className="mt-4 text-base text-gray-600">
                {isLoading[blog._id] ? 'অনুবাদ করা হচ্ছে...' : isTranslated[blog._id] && blog.translatedContent ? blog.translatedContent : blog.content}
              </p>
              <button
                onClick={() => toggleTranslate(blog._id, blog.title, blog.content)}
                className="inline-flex items-center justify-center pb-0.5 mt-5 text-base font-semibold text-green-600 transition-all duration-200 border-b-2 border-transparent hover:border-green-600 focus:border-green-600"
              >
                {isTranslated[blog._id] ? 'English' : 'বাংলায় পড়ুন'}
                <svg className="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BlogCard;
