import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import BookDetailPage from './components/BookDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/book/:id" element={<BookDetailPage />} />
    </Routes>
  );
}

export default App;