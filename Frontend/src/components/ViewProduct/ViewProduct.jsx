import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v2/posts/${id}`
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

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center mt-20">No product found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-8">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="text-green-600 mb-6 hover:underline"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Image */}
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[420px] object-contain border rounded-xl"
          />

          {/* Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {product.title}
            </h1>

            <p className="text-sm text-gray-500 mb-2">
              Category: <span className="capitalize">{product.category}</span>
            </p>

            {product.price && (
              <p className="text-xl font-semibold text-green-700 mb-4">
                ₹ {product.price}
              </p>
            )}

            {product.quantity && (
              <p className="text-sm text-gray-600 mb-4">
                Quantity: {product.quantity}
              </p>
            )}

            <hr className="my-4" />

            <h3 className="font-semibold text-gray-800 mb-2">
              Product Description
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description || "No description available."}
            </p>

            {/* Contact Buttons */}
            <div className="flex gap-4 mt-20 justify-center ">
              <a
                href="tel:7985265078"
                className="px-5 py-2 bg-blue-700 text-white rounded-full"
              >
                📞 Call
              </a>
              <a
                href="https://wa.me/7985265078"
                target="_blank"
                className="px-5 py-2 bg-green-600 text-white rounded-full"
              >
                💬 WhatsApp
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
