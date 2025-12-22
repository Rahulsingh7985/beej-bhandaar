import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";

export default function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // -------------------------
  // Fetch Single Product
  // -------------------------
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v2/posts/${id}`
        );
        setProduct(res.data.data);
      } catch (err) {
        alert("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // -------------------------
  // Delete Product (ADMIN)
  // -------------------------
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v2/posts/delete/${id}`,
        { withCredentials: true }
      );

      alert("Product deleted successfully");
      navigate(-1);
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  // -------------------------
  // Loading State
  // -------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</p>
          <button
            onClick={() => navigate(-1)}
            className="text-green-600 hover:text-green-700 font-medium mt-4"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 sm:py-10 lg:py-16 px-3 sm:px-4 lg:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold text-sm sm:text-base mb-6 transition duration-200 group"
        >
          <span className="group-hover:mr-2 transition-all">←</span> Back
        </button>

        {/* Main Container */}
        <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 p-5 sm:p-6 lg:p-12">

            {/* Image Section */}
            <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 min-h-72 sm:min-h-96">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-auto max-w-xs sm:max-w-sm lg:max-w-md object-contain drop-shadow-lg"
              />
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-between">
              
              {/* Product Info */}
              <div>
                <div className="mb-4">
                  <span className="inline-block text-xs sm:text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full capitalize mb-3">
                    {product.category}
                  </span>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                    {product.title}
                  </h1>
                </div>

                {/* Price Section */}
                {product.price && (
                  <div className="mb-4 sm:mb-6">
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Price</p>
                    <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-600">
                      ₹ {product.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                )}

                {/* Quantity Section */}
                {product.quantity && (
                  <div className="mb-6 sm:mb-8">
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2">Available Stock</p>
                    <div className="inline-flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-lg">
                      <span className="text-2xl font-bold text-blue-600">{product.quantity}</span>
                      <span className="text-sm text-gray-600">units available</span>
                    </div>
                  </div>
                )}

                <hr className="my-6 sm:my-8 border-gray-200" />

                {/* Description */}
                <div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg">
                    {product.description || "No description available for this product."}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 sm:mt-10 space-y-4">
                
                {/* Contact Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href="tel:7985265078"
                    className="flex-1 px-6 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-center transition duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg text-sm sm:text-base"
                  >
                    📞 Call Now
                  </a>

                  <a
                    href="https://wa.me/7985265078"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 px-6 py-3 sm:py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl text-center transition duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg text-sm sm:text-base"
                  >
                    💬 WhatsApp
                  </a>
                </div>

                {/* Admin Delete Button */}
                {user?.role === "admin" && (
                  <button
                    onClick={handleDelete}
                    className="w-full px-6 py-3 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg text-sm sm:text-base"
                  >
                    🗑 Delete Product
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
