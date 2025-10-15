import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { Star, Truck, RefreshCw } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../slice/cartSlice";
const API_URL = "http://localhost:3000";

function getRandomProducts(allProducts, currentId, count = 4) {
  const filtered = allProducts.filter((p) => p._id !== currentId);
  const shuffled = filtered.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProductData = async () => {
      if (!productId) return;
      setLoading(true);
      window.scrollTo(0, 0);

      try {
        const [productRes, allProductsRes] = await Promise.all([
          fetch(`${API_URL}/products/${productId}`),
          fetch(`${API_URL}/products?all=true`),
        ]);

        const productData = await productRes.json();
        const allProductsData = await allProductsRes.json();

        if (productData.success) {
          setProduct(productData.data);
          setMainImage(productData.data.hinh_anh?.[0] || "");

          if (allProductsData.success) {
            const related = getRandomProducts(
              allProductsData.data,
              productData.data._id,
              4
            );
            setRelatedProducts(related);
          }
        } else {
          throw new Error(productData.message || "Không tìm thấy sản phẩm");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [productId]);
  const changeImage = (src) => setMainImage(src);
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    quantity > 1 && setQuantity((prev) => prev - 1);

  const handleAddToCart = () => {
    if (product) {
      const itemToAdd = { ...product, quantity: quantity };
      dispatch(addToCart(itemToAdd));
      setQuantity(1);
    }
  };

  const formatPrice = (price) => {
    if (typeof price !== "number") return "Liên hệ";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  if (loading)
    return (
      <div className="text-center py-40">Đang tải chi tiết sản phẩm...</div>
    );
  if (error)
    return <div className="text-center py-40 text-red-500">Lỗi: {error}</div>;
  if (!product)
    return <div className="text-center py-40">Không tìm thấy sản phẩm.</div>;

  // --- GIAO DIỆN CHÍNH ---
  return (
    <section className="mb-16 lg:mb-20 animate-fade-in pt-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-8 md:my-10 lg:my-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="flex flex-col gap-4 animate-slide-in-left">
            <div className="bg-gray-100 p-4 flex justify-center items-center hover:shadow-lg transition-all duration-300 rounded-lg aspect-square">
              <img
                src={mainImage}
                alt={product.ten_san_pham}
                className="w-full h-full rounded-lg object-contain transition-all duration-300"
              />
            </div>
            {product.hinh_anh && product.hinh_anh.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2 md:mt-3">
                {product.hinh_anh.map((imgSrc, idx) => (
                  <div
                    key={idx}
                    className={`flex-shrink-0 w-24 h-24 bg-gray-100 p-1 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md ${
                      mainImage === imgSrc
                        ? "ring-2 ring-orange-500"
                        : "hover:ring-2 hover:ring-gray-300"
                    }`}
                    onClick={() => changeImage(imgSrc)}
                  >
                    <img
                      src={imgSrc}
                      alt={`Ảnh sản phẩm ${idx + 1}`}
                      className="w-full h-full rounded-md object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-5 lg:pl-4 animate-slide-in-right">
            <div>
              <span className="text-sm text-gray-500 uppercase tracking-wide">
                {product.ma_danh_muc?.ten_danh_muc || "Chưa phân loại"}
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold font-playfair mt-1">
                {product.ten_san_pham}
              </h1>
            </div>

            <div className="flex items-center gap-4 text-gray-500">
              <div className="flex text-yellow-400">
                <Star size={18} fill="currentColor" />{" "}
                <Star size={18} fill="currentColor" />{" "}
                <Star size={18} fill="currentColor" />{" "}
                <Star size={18} fill="currentColor" /> <Star size={18} />
              </div>
              <span>(Chưa có đánh giá)</span>
              <span className="text-green-600 font-semibold">• Còn hàng</span>
            </div>

            <div className="pt-2">
              <p className="font-bold text-4xl text-orange-600">
                {formatPrice(product.gia)}
              </p>
            </div>

            {product.mo_ta && (
              <p className="text-gray-600 leading-relaxed pt-2">
                {product.mo_ta}
              </p>
            )}

            <div className="flex items-center gap-4 pt-4">
              <div className="flex border border-gray-300 rounded-md overflow-hidden w-fit hover:shadow-lg transition-all">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="px-4 py-2 bg-gray-100 border-r hover:bg-orange-500 hover:text-white transition-all w-12 disabled:opacity-50"
                >
                  -
                </button>
                <span className="px-6 py-2 flex items-center justify-center text-center min-w-[60px] font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={increaseQuantity}
                  className="px-4 py-2 bg-gray-100 border-l hover:bg-orange-500 hover:text-white transition-all w-12"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 px-8 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-all font-semibold"
              >
                Thêm vào giỏ
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 mt-6 space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b">
                <Truck size={32} className="text-gray-700 flex-shrink-0" />
                <div>
                  <h2 className="font-semibold">Miễn phí vận chuyển</h2>
                  <p className="text-gray-600 text-sm">
                    Áp dụng cho mọi đơn hàng trong nội thành.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <RefreshCw size={32} className="text-gray-700 flex-shrink-0" />
                <div>
                  <h2 className="font-semibold">Đổi trả dễ dàng</h2>
                  <p className="text-gray-600 text-sm">
                    Miễn phí đổi trả trong vòng 30 ngày.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex items-center gap-4">
              <div className="w-4 h-10 bg-orange-500 rounded-md"></div>
              <h2 className="text-orange-500 text-xl font-semibold">
                Sản phẩm có thể bạn cũng thích
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              {relatedProducts.map((item) => (
                <Link to={`/product-detail/${item._id}`} key={item._id}>
                  <div className="bg-gray-100 h-[280px] w-full rounded-md flex justify-center items-center relative group hover:shadow-xl transition-all hover:scale-105">
                    <img
                      src={item.hinh_anh?.[0]}
                      alt={item.ten_san_pham}
                      className="max-h-full max-w-full p-4 transition-transform group-hover:scale-110"
                    />
                  </div>
                  <div className="space-y-1 py-3">
                    <p className="text-md font-semibold truncate">
                      {item.ten_san_pham}
                    </p>
                    <p className="text-orange-600 font-bold text-lg">
                      {formatPrice(item.gia)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
