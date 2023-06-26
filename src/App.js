import './App.css';
import Navbar from './component/Navbar';
import ProductsPage from './component/Product';
import ProductDetailPage from './component/ProductDetails';
import CreateOrderPage from './component/Order';
import Home from './component/Home'

function App() {
  return (
    <div className="app-container" style={{ overflow: 'hidden' }}>
      <Navbar />
     {/* <Home/> */}
      {/* <ProductsPage /> */}
        <ProductDetailPage />
     {/*} <CreateOrderPage /> */}
    </div>
  );
}

export default App;
