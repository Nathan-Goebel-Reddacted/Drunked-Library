import { useState, useRef } from "react";
import { useLibrarieFetch } from "../hooks/useApiFetch";
import { useInputColor } from "../hooks/useInputColor";
import SearchResultItem from "../components/SearchResultItem";
import { useClickColor } from "../hooks/useClickColor";
import "../css/App.css";

export default function AdvancedSearchPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [btnColor, handleBtnClick] = useClickColor("white");

    const titleRef = useRef<HTMLInputElement>(null);
    const authorRef = useRef<HTMLInputElement>(null);
    const subjectRef = useRef<HTMLInputElement>(null);

  useInputColor(title, titleRef);
  useInputColor(author, authorRef);
  useInputColor(subject, subjectRef);

  const { data } = useLibrarieFetch(endpoint);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (title.trim()) params.append("title", title.trim());
    if (author.trim()) params.append("author", author.trim());
    if (subject.trim()) params.append("subject", subject.trim());

    const final = `/search.json?${params.toString()}`;
    setEndpoint(final);
  };

  return (
    <div className="advanced-search-page">
      <h2>Recherche avancée</h2>

      <form onSubmit={handleSearch} className="advanced-search-form">
        <input
            ref={titleRef}
            type="text"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-title"
        />
        <input
            ref={authorRef}
            type="text"
            placeholder="Auteur"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="input-author"
        />
        <input
            ref={subjectRef}
            type="text"
            placeholder="Genre"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="input-subject"
        />
        <button
          type="submit"
          className="search-button"
          style={{ backgroundColor: btnColor }}
          onClick={handleBtnClick}
        >
          Rechercher
        </button>
      </form>

      <ul className="advanced-search-results">
        {data?.docs?.slice(0, 20).map((book: any, index: number) => (
          <SearchResultItem key={index} book={book} className="advanced-search-item" />
        ))}
      </ul>
    </div>
  );
}
