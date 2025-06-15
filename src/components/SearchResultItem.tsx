import { useNavigate } from "react-router-dom";
import { usePaintHover } from "../hooks/usePaintHover";

interface SearchResultItemProps {
  book: any;
  onClick?: (book: any) => void;
  className?: string;
}

export default function SearchResultItem({
  book,
  onClick,
  className = "search-item"
}: SearchResultItemProps) {
  const { onMouseEnter, backgroundColor } = usePaintHover();
  const navigate = useNavigate();

  const handleClick = () => {
    const id = book.key.replace("/works/", "").split("/").pop();
    if (onClick) {
      onClick(book);
    } else {
      navigate(`/book/${id}`);
    }
  };

  return (
    <li
      className={className}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      style={{ backgroundColor }}
    >
      <strong>{book.title}</strong>{" "}
      {book.author_name?.[0] && <span>— {book.author_name[0]}</span>}
    </li>
  );
}
