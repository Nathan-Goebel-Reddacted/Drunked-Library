import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLibrarieFetch } from "../hooks/useApiFetch";
import SearchResultItem from "./SearchResultItem";
import { useInputColor } from "../hooks/useInputColor";
import "../css/App.css";

export default function QuickSearch() {
  const [search, setSearch] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const navigate = useNavigate();

  useInputColor(search, inputRef);
  const { data } = useLibrarieFetch(endpoint);

  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      setEndpoint("");
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(() => {
      const encoded = encodeURIComponent(search.trim());
      setEndpoint(`/search.json?q=${encoded}`);
    }, 300);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [search]);

  useEffect(() => {
    if (data?.docs) {
      setResults(data.docs.slice(0, 5));
    }
  }, [data]);

  const handleItemClick = (book: any) => {
    const id = book.key.replace("/works/", "").split("/").pop();
    setSearch("");
    setResults([]);
    navigate(`/book/${id}`);
  };

  return (
    <div className="quick-search">
      <input
        ref={inputRef}
        type="text"
        className="quick-search-input"
        placeholder="Recherche rapide..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {results.length > 0 && (
        <ul className="quick-search-results">
          {results.map((book, index) => (
            <SearchResultItem
              key={index}
              book={book}
              onClick={handleItemClick}
            />
          ))}
        </ul>
      )}
    </div>
  );
}