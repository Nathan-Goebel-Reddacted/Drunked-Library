import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLibrarieFetch } from "../hooks/useApiFetch";
import "../css/App.css"

export default function QuickSearch() {
  const [search, setSearch] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();

  const timeoutRef = useRef<number | null>(null);

  
  const { data } = useLibrarieFetch(endpoint);


  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      setEndpoint("");
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    //throttle a 300 ms
    timeoutRef.current = window.setTimeout(() => {
      const encoded = encodeURIComponent(search.trim());
      setEndpoint(`/search.json?q=${encoded}`);
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [search]);


  useEffect(() => {
    if (data?.docs) {
      setResults(data.docs.slice(0, 5));
    }
  }, [data]);

  return (
    <div className="quick-search">
      <input
        type="text"
        className="quick-search-input"
        placeholder="Recherche rapide..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {results.length > 0 && (
        <ul className="quick-search-results">
          {results.map((book, index) => (
            <li
                key={index}
                className="quick-search-item"
                onClick={() => {
                    const id = book.key.replace("/works/", "");
                    navigate(`/book/${id}`);
                }}
            >
              <strong>{book.title}</strong>{" "}
              {book.author_name?.[0] && (
                <span>— {book.author_name[0]}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}