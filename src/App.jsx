import './App.css';
import Bestsellers from './components/BestSellers';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <HomePage />
      <Bestsellers />
    </div>
  );
}

export default App;