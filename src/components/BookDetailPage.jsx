import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getBookDetails() {
      try {
        setLoading(true);
        const res = await fetch(`https://gutendex.com/books/${id}`);
        const data = await res.json();
        setBook(data);
      } catch (error) {
        console.error("Gagal mengambil detail buku:", error);
      } finally {
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id]);

  if (loading) {
    return <p className="text-center text-ink-light p-10">Sedang memuat detail buku...</p>;
  }

  if (!book) {
    return <p className="text-center text-red-500 p-10">Aiyaa! Gagal menemukan buku.</p>;
  }

  return (
    <main className="container mx-auto p-4 sm:p-6 md:p-12">
      <div className="mb-8">
        <Link to="/" className="text-gold hover:text-gold-dark transition-colors">
          &larr; Kembali ke Koleksi
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-8 md:gap-12">
        <aside className="md:col-span-1">
          <img
            src={book.formats['image/jpeg']}
            alt={`Cover of ${book.title}`}
            className="w-full max-w-sm mx-auto md:max-w-full rounded-lg shadow-2xl border-4 border-paper"
          />
          <div className="mt-6 bg-paper/50 p-4 rounded-lg border border-gold/20">
            <h3 className="font-serif text-xl font-bold text-ink mb-4">Unduh E-Book</h3>
            <div className="space-y-3">
              {book.formats['application/epub+zip'] && (
                <a href={book.formats['application/epub+zip']} className="block w-full text-center px-4 py-2 bg-gold text-paper rounded shadow hover:bg-gold-dark transition-colors">
                  Unduh EPUB
                </a>
              )}
            </div>
          </div>
        </aside>
        <article className="md:col-span-2">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ink leading-tight">{book.title}</h1>
          <h2 className="font-sans text-lg sm:text-xl text-ink-light mt-2">
            oleh {book.authors.map(a => a.name).join(', ')}
          </h2>

          <div className="mt-8 pt-6 border-t border-gold/30">
            <h3 className="font-serif text-2xl font-bold text-ink mb-4">Subjek & Genre</h3>
            <p className="text-ink-light leading-relaxed mb-4">
              API tidak menyediakan ringkasan cerita. Namun, buku ini mencakup subjek-subjek berikut yang bisa memberikan gambaran tentang isinya:
            </p>
            <div className="flex flex-wrap gap-2">
              {book.subjects && book.subjects.length > 0 ? (
                book.subjects.slice(0, 15).map(subject => (
                  <span key={subject} className="bg-gold/20 text-ink text-xs font-medium px-3 py-1 rounded-full border border-gold/30">
                    {subject}
                  </span>
                ))
              ) : (
                <p className="text-ink-light italic">Data subjek tidak tersedia.</p>
              )}
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}