import React, { useState, useEffect } from 'react';

function RecentBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://www.dbooks.org/api/recent')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 'ok' && Array.isArray(data.books)) {
          // Filter out the unwanted book by title
          const filteredBooks = data.books.filter(
            (book) => book.title !== 'Intro to Social Media'
          );
          setBooks(filteredBooks);
        } else {
          setError('Invalid response from API');
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading recent books...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div style={{
      fontFamily: 'system-ui, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '32px' }}>
        Recent Free Books
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '24px',
      }}>
        {books.map((book) => (
          <div
            key={book.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden',
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.15s',
              textAlign: 'center',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <a
              href={book.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <img
                src={book.image}
                alt={book.title}
                style={{
                  width: '100%',
                  height: '260px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div style={{ padding: '12px 10px' }}>
                <h3 style={{
                  fontSize: '1.05rem',
                  margin: '0 0 8px 0',
                  lineHeight: '1.3',
                  minHeight: '2.6em',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {book.title}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#555',
                  margin: '0 0 6px 0',
                }}>
                  {book.authors}
                </p>
                {book.subtitle && (
                  <p style={{
                    fontSize: '0.85rem',
                    color: '#777',
                    margin: '0',
                    fontStyle: 'italic',
                  }}>
                    {book.subtitle}
                  </p>
                )}
              </div>
            </a>
          </div>
        ))}
      </div>

      <p style={{ textAlign: 'center', marginTop: '40px', color: '#666' }}>
        Showing {books.length} recent books (filtered)
      </p>
    </div>
  );
}

export default RecentBooks;