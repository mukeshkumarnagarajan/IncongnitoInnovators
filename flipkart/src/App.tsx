import React, { useState } from 'react';
import { Search, ShoppingCart, User, Package, FileText, Star, MapPin, Phone, Mail, Calendar, Truck, CheckCircle, Clock } from 'lucide-react';

interface Order {
  id: string;
  productName: string;
  brand: string;
  model: string;
  price: number;
  orderDate: string;
  deliveryDate: string;
  status: 'delivered' | 'shipped' | 'processing';
  image: string;
  invoiceNumber: string;
}

interface InvoiceData {
  invoiceNumber: string;
  orderDate: string;
  deliveryDate: string;
  productName: string;
  brand: string;
  model: string;
  price: number;
  tax: number;
  total: number;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  customerEmail: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'orders'>('home');
  const [showInvoice, setShowInvoice] = useState(false);

  const sampleOrder: Order = {
    id: 'ORD789456123',
    productName: 'LG 55" 4K UHD Smart OLED TV',
    brand: 'LG',
    model: 'OLED55C1PTZ',
    price: 129999,
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-20',
    status: 'delivered',
    image: 'https://images.pexels.com/photos/1444416/pexels-photo-1444416.jpeg?auto=compress&cs=tinysrgb&w=500',
    invoiceNumber: 'INV-2024-001234'
  };

  const invoiceData: InvoiceData = {
    invoiceNumber: sampleOrder.invoiceNumber,
    orderDate: sampleOrder.orderDate,
    deliveryDate: sampleOrder.deliveryDate,
    productName: sampleOrder.productName,
    brand: sampleOrder.brand,
    model: sampleOrder.model,
    price: sampleOrder.price,
    tax: Math.round(sampleOrder.price * 0.18),
    total: Math.round(sampleOrder.price * 1.18),
    customerName: 'Rajesh Kumar',
    customerAddress: '123, MG Road, Sector 14, Gurgaon, Haryana - 122001',
    customerPhone: '+91 9876543210',
    customerEmail: 'rajesh.kumar@email.com'
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const Header = () => (
    <header className="bg-[#2874f0] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold">Flipkart</h1>
              <span className="text-xs text-yellow-300 font-medium">Explore Plus</span>
            </div>
            
            <div className="hidden md:flex flex-1 max-w-md">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-4 py-2 text-gray-900 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-[#2874f0]" />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setCurrentPage('orders')}
              className="hidden md:flex items-center space-x-1 hover:bg-[#1c5aa8] px-3 py-2 rounded transition-colors"
            >
              <Package className="h-4 w-4" />
              <span className="text-sm font-medium">Orders</span>
            </button>
            
            <button className="flex items-center space-x-1 hover:bg-[#1c5aa8] px-3 py-2 rounded transition-colors">
              <ShoppingCart className="h-4 w-4" />
              <span className="text-sm font-medium">Cart</span>
            </button>
            
            <button className="flex items-center space-x-1 hover:bg-[#1c5aa8] px-3 py-2 rounded transition-colors">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">Account</span>
            </button>
          </div>
        </div>

        <div className="md:hidden mt-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="w-full px-4 py-2 text-gray-900 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-[#2874f0]" />
          </div>
        </div>
      </div>
    </header>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#2874f0] to-[#1c5aa8] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            India's #1 Online Store
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Shop from millions of products at unbeatable prices
          </p>
          <button 
            onClick={() => setCurrentPage('orders')}
            className="bg-yellow-400 text-[#2874f0] px-8 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors transform hover:scale-105"
          >
            View My Orders
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-8">Shop by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {['Electronics', 'Fashion', 'Home', 'Books', 'Sports', 'Beauty'].map((category) => (
            <div key={category} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2874f0] to-[#1c5aa8] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Package className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-800">{category}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-8">Featured Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
              <div className="h-48 bg-gray-200 group-hover:scale-105 transition-transform"></div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Sample Product {item}</h4>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">(234)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[#2874f0]">₹{(item * 1000).toLocaleString()}</span>
                  <button className="bg-[#ff9f00] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#e88f00] transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const OrdersPage = () => (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <button 
              onClick={() => setCurrentPage('home')}
              className="text-[#2874f0] hover:underline mb-2 flex items-center"
            >
              ← Back to Home
            </button>
            <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
            <p className="text-gray-600">Track, return, or buy things again</p>
          </div>
        </div>

        {/* Order Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-start space-y-6 lg:space-y-0 lg:space-x-6">
              {/* Product Image */}
              <div className="flex-shrink-0">
                <img 
                  src={sampleOrder.image} 
                  alt={sampleOrder.productName}
                  className="w-full lg:w-48 h-48 object-cover rounded-lg"
                />
              </div>
              
              {/* Order Details */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{sampleOrder.productName}</h2>
                    <p className="text-gray-600 mb-1">Brand: {sampleOrder.brand}</p>
                    <p className="text-gray-600 mb-3">Model: {sampleOrder.model}</p>
                    <p className="text-2xl font-bold text-[#2874f0]">{formatPrice(sampleOrder.price)}</p>
                  </div>
                  
                  <div className="mt-4 sm:mt-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-green-600 font-semibold capitalize">{sampleOrder.status}</span>
                    </div>
                    <p className="text-sm text-gray-600">Delivered on {formatDate(sampleOrder.deliveryDate)}</p>
                  </div>
                </div>

                {/* Order Timeline */}
                <div className="border-t pt-6 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Order Timeline</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800">Order Delivered</p>
                        <p className="text-sm text-gray-600">{formatDate(sampleOrder.deliveryDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Truck className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800">Out for Delivery</p>
                        <p className="text-sm text-gray-600">19 Jan 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Package className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800">Order Shipped</p>
                        <p className="text-sm text-gray-600">17 Jan 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800">Order Confirmed</p>
                        <p className="text-sm text-gray-600">{formatDate(sampleOrder.orderDate)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Actions */}
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => setShowInvoice(true)}
                    className="flex items-center space-x-2 bg-[#2874f0] text-white px-6 py-2 rounded-lg hover:bg-[#1c5aa8] transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    <span>View Invoice</span>
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    Rate Product
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    Buy Again
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                <span>Order ID: {sampleOrder.id}</span>
                <span>•</span>
                <span>Placed on {formatDate(sampleOrder.orderDate)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Delivered to: 123, MG Road, Gurgaon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const InvoiceModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Invoice</h2>
          <button 
            onClick={() => setShowInvoice(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="p-8">
          {/* Invoice Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#2874f0] mb-2">FLIPKART</h1>
              <p className="text-gray-600">Buildings Alyssa, Begonia &</p>
              <p className="text-gray-600">Clove Embassy Tech Village,</p>
              <p className="text-gray-600">Outer Ring Road, Devarabeesanahalli Village,</p>
              <p className="text-gray-600">Bengaluru, 560103, Karnataka, India</p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">INVOICE</h2>
              <p className="text-gray-600">Invoice No: {invoiceData.invoiceNumber}</p>
              <p className="text-gray-600">Date: {formatDate(invoiceData.orderDate)}</p>
            </div>
          </div>

          {/* Customer Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Bill To:</h3>
              <p className="font-semibold text-gray-800">{invoiceData.customerName}</p>
              <p className="text-gray-600">{invoiceData.customerAddress}</p>
              <div className="flex items-center mt-2 text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <span>{invoiceData.customerPhone}</span>
              </div>
              <div className="flex items-center mt-1 text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <span>{invoiceData.customerEmail}</span>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Order Details:</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Order Date: {formatDate(invoiceData.orderDate)}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <Truck className="h-4 w-4 mr-2" />
                <span>Delivery Date: {formatDate(invoiceData.deliveryDate)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Package className="h-4 w-4 mr-2" />
                <span>Order ID: {sampleOrder.id}</span>
              </div>
            </div>
          </div>

          {/* Product Details Table */}
          <div className="border rounded-lg overflow-hidden mb-8">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="font-semibold text-gray-800">{invoiceData.productName}</p>
                      <p className="text-sm text-gray-600">Brand: {invoiceData.brand}</p>
                      <p className="text-sm text-gray-600">Model: {invoiceData.model}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">1</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{formatPrice(invoiceData.price)}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-800">{formatPrice(invoiceData.price)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">{formatPrice(invoiceData.price)}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Tax (18% GST):</span>
                <span className="font-semibold">{formatPrice(invoiceData.tax)}</span>
              </div>
              <div className="flex justify-between py-3 text-lg font-bold text-[#2874f0]">
                <span>Total:</span>
                <span>{formatPrice(invoiceData.total)}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t text-center text-gray-600">
            <p className="mb-2">Thank you for shopping with Flipkart!</p>
            <p className="text-sm">For any queries, contact customer support at 1800-208-9898</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end space-x-3">
          <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
            Download PDF
          </button>
          <button className="bg-[#2874f0] text-white px-6 py-2 rounded-lg hover:bg-[#1c5aa8] transition-colors">
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans">
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'orders' && <OrdersPage />}
      {showInvoice && <InvoiceModal />}
    </div>
  );
}

export default App;