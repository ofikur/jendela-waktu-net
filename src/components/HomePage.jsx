import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

const TOPICS = ['Adventure', 'Fantasy', 'Romance', 'History', 'Science Fiction'];

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearch, setActiveSearch] = useState('');

  const [activeTopic, setActiveTopic] = useState(''); 

  const BOOKS_PER_PAGE = 32;

  useEffect(() => {
    async function getBooks() {
      let apiUrl = 'https://gutendex.com/books/?';

      const params = new URLSearchParams();

      if (activeSearch) {
        params.append('search', activeSearch);
      }
      if (activeTopic) {
        params.append('topic', activeTopic);
      }
      if (currentPage > 1) {
        params.append('page', currentPage);
      }
      if (!activeSearch && !activeTopic) {
        params.append('sort', 'popular');
      }

      try {
        setLoading(true);
        const res = await fetch(apiUrl + params.toString());
        const data = await res.json();
        setBooks(data.results);
        setTotalBooks(data.count);
      } catch (error) {
        console.error("Gagal mengambil buku:", error);
        setBooks([]);
        setTotalBooks(0);
      } finally {
        setLoading(false);
      }
    }
    
    window.scrollTo(0, 0);
    getBooks();
  }, [currentPage, activeSearch, activeTopic]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setActiveTopic('');
    setActiveSearch(searchTerm);
  };

  const handleTopicClick = (topic) => {
    setCurrentPage(1);
    setSearchTerm('');
    setActiveSearch('');
    setActiveTopic(current => current === topic ? '' : topic);
  };

  return (
    <div className="w-full">
      <header className="text-center py-12 md:py-20 border-b-2 border-gold/30">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-ink">
          Jendela Waktu .NET
        </h1>
        <p className="text-base sm:text-lg text-ink-light mt-4 max-w-2xl mx-auto px-4">
          Arsip digital untuk melestarikan karya sastra klasik dunia (EN Version).
        </p>
      </header>
      <main className="container mx-auto p-4 sm:p-6 md:p-8">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari judul atau pengarang..."
            className="flex-grow w-full px-4 py-2 rounded border border-gold/50 bg-paper focus:ring-2 focus:ring-gold focus:outline-none"
          />
          <button type="submit" className="px-6 py-2 bg-gold text-paper rounded shadow-md hover:bg-gold-dark transition-colors">
            Cari
          </button>
        </form>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {TOPICS.map(topic => (
            <button
              key={topic}
              onClick={() => handleTopicClick(topic)}
              className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
                activeTopic === topic 
                ? 'bg-ink text-paper border-ink' 
                : 'bg-paper text-ink-light border-gold/50 hover:bg-gold/10'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink border-b border-gold/50 pb-2 mb-6 sm:mb-8">
          {activeSearch
            ? `Hasil Pencarian untuk "${activeSearch}"`
            : activeTopic
            ? `Buku dengan Topik "${activeTopic}"`
            : `Koleksi Populer`
          } - Halaman {currentPage}
        </h2>
        
        {loading ? (
          <p className="text-center text-ink-light">Sedang memuat buku...</p>
        ) : books.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6">
              {books.map((book) => (
                <Link to={`/book/${book.id}`} key={book.id} className="group block">
                  <div className="bg-paper rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-transparent hover:border-gold/50 h-full flex flex-col">
                    <img
                      src={book.formats['image/jpeg']}
                      alt={`Cover of ${book.title}`}
                      className="w-full h-56 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-3 sm:p-4 flex-grow">
                      <h3 className="font-serif text-base sm:text-lg font-bold text-ink line-clamp-2" title={book.title}>
                        {book.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-ink-light mt-1 line-clamp-1">
                        {book.authors.map(author => author.name).join(', ')}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <Pagination
              currentPage={currentPage}
              totalBooks={totalBooks}
              booksPerPage={BOOKS_PER_PAGE}
              onPageChange={page => setCurrentPage(page)}
            />
          </>
        ) : (
          <p className="text-center text-ink-light mt-10">
            Aiyaa! Tidak ada buku yang ditemukan. Coba hapus filter atau cari dengan kata kunci lain.
          </p>
        )}
      </main>
    </div>
  );
}