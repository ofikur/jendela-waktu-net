import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import BookDetailPage from './components/BookDetailPage';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen"> 
      <main className="flex-grow"> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:id" element={<BookDetailPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;