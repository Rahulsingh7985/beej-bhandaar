
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Phone, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import HomeStampSlider from "../HomeStampSlider/HomeStampSlider";

const CATEGORIES = [
  { key: "seed", label: "बीज (Seed)" },
  { key: "pesticide", label: "कीटनाशक (Pesticide)" },
  { key: "fertilizer", label: "उर्वरक (Fertilizer)" },
  { key: "equipment", label: "उपकरण (Equipment)" },
];

export default function CategoryPosts() {
  const [posts, setPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("seed");
  const [loading, setLoading] = useState(false);

  // Fetch posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v2/posts`);
      setPosts(res.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch posts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) => post.category === activeCategory
  );

  return (
    <div className="bg-green-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
          {/* 🔰 STAMP SLIDER */}
        {/* <HomeStampSlider /> */}


        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-8 text-green-900">
          हमारे उत्पाद (Products)
        </h1>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-6 py-2 rounded-full border text-sm font-medium transition ${
                activeCategory === cat.key
                  ? "bg-green-600 text-white"
                  : "bg-green-300 text-gray-700 hover:bg-green-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products */}
        {loading ? (
          <p className=" text-center text-gray-600">Loading...</p>
        ) : filteredPosts.length === 0 ? (
          <p className="text-center text-gray-500">No products available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredPosts.map((post) => (
              <motion.div
                key={post._id}
                whileHover={{ y: -5 }}
                className="bg-gray-200 rounded-2xl shadow-md hover:shadow-xl transition p-5 text-center"
              >
                {/* Product Image */}
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-40 mx-auto object-contain mb-4 rounded-lg"
                />

                {/* Title */}
                <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                  {post.title}
                </h3>

                {/* Quantity */}
                {post.quantity && (
                  <p className="text-sm text-gray-500 mt-1">
                    {post.quantity}
                  </p>
                )}

                {/* Price */}
                {post.price > 0 && (
                  <p className="text-lg font-bold text-green-700 mt-2">
                    ₹ {post.price}
                  </p>
                )}

                {/* Buttons Row */}
                <div className="flex justify-center items-center gap-2 mt-4">
                  {/* View Product */}
                  <Link
                    to={`/viewproduct/${post._id}`}
                    className="px-4 py-2 bg-[#8B3E1F] text-white rounded-full text-sm hover:bg-[#733218] flex items-center gap-1"
                  >
                    <Eye size={14} /> View Product
                  </Link>

                  {/* Call */}
                  <a
                    href="tel:7985265078"
                    className="w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800"
                  >
                    📞
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/7985265078"
                    target="_blank"
                    className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700"
                  >
                    💬
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
