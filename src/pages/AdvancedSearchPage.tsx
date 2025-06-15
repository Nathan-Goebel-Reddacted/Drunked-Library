import { useState } from "react";
import { useLibrarieFetch } from "../hooks/useApiFetch";
import { useNavigate } from "react-router-dom";
import Header from "../componants/Header";

export default function AdvancedSearchPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [endpoint, setEndpoint] = useState("");

  const { data } = useLibrarieFetch(endpoint);
  const navigate = useNavigate();

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
      <Header/>
      <h2>Recherche avancée</h2>

      <form onSubmit={handleSearch} className="advanced-search-form">
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-title"
        />
        <input
          type="text"
          placeholder="Auteur"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="input-author"
        />
        <input
          type="text"
          placeholder="Genre"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="input-subject"
        />
        <button type="submit">Rechercher</button>
      </form>

      <ul className="advanced-search-results">
        {data?.docs?.slice(0, 20).map((book: any, index: number) => (
          <li
            key={index}
            className="advanced-search-item"
            onClick={() => {
              const id = book.key.split("/").pop();
              navigate(`/book/${id}`);
            }}
          >
            <strong>{book.title}</strong>
            {book.author_name?.[0] && <span> — {book.author_name[0]}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}