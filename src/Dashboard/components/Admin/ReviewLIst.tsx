import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'


type Review = {
  id: string
  name: string
  review: string
  rating: number
  productName: string
  productImage: string
}

const reviews: Review[] = [
  { 
    id: '1', 
    name: 'John Doe', 
    review: 'Great product!', 
    rating: 5, 
    productName: 'Wireless Headphones',
    productImage: '/placeholder.svg?height=80&width=80'
  },
  { 
    id: '2', 
    name: 'Jane Smith', 
    review: 'Good value for money.', 
    rating: 4, 
    productName: 'Smart Watch',
    productImage: '/placeholder.svg?height=80&width=80'
  },
  { 
    id: '3', 
    name: 'Bob Johnson', 
    review: 'Could be better.', 
    rating: 3, 
    productName: 'Bluetooth Speaker',
    productImage: '/placeholder.svg?height=80&width=80'
  },
  { 
    id: '4', 
    name: 'Alice Brown', 
    review: 'Excellent service!', 
    rating: 5, 
    productName: 'Fitness Tracker',
    productImage: '/placeholder.svg?height=80&width=80'
  },
  { 
    id: '5', 
    name: 'Charlie Davis', 
    review: 'Not bad, but not great.', 
    rating: 3, 
    productName: 'Wireless Earbuds',
    productImage: '/placeholder.svg?height=80&width=80'
  },
  { 
    id: '6', 
    name: 'Eva Wilson', 
    review: 'Impressive quality!', 
    rating: 5, 
    productName: 'Noise-Cancelling Headphones',
    productImage: '/placeholder.svg?height=80&width=80'
  },
  { 
    id: '7', 
    name: 'Frank Miller', 
    review: 'Decent product, but overpriced.', 
    rating: 3, 
    productName: 'Smartwatch Pro',
    productImage: '/placeholder.svg?height=80&width=80'
  },
]

export default function ReviewList() {
  const [currentPage, setCurrentPage] = useState(1)
  const reviewsPerPage = 5
  const totalPages = Math.ceil(reviews.length / reviewsPerPage)

  const indexOfLastReview = currentPage * reviewsPerPage
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Reviews</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reviewer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentReviews.map((review) => (
                <tr key={review.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-20 w-20">
                        <img
                          className="h-20 w-20 rounded-full"
                          src={review.productImage}
                          alt={review.productName}
                          width={80}
                          height={80}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{review.productName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{review.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{review.review}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </div>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}