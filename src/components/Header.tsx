import { Link } from "react-router-dom";
import QuickSearch from "./QuickSearch";
import { useClickColor } from "../hooks/useClickColor";
import "../css/App.css";

export default function Header() {
  const [homeColor, clickHome] = useClickColor();
  const [searchColor, clickSearch] = useClickColor();

  return (
    <div className="Header">
      <Link
        to="/"
        className="linktoHome"
        onClick={clickHome}
        style={{ color: homeColor }}
      >
        <h1>La Librairie d'internet</h1>
      </Link>

      <QuickSearch />

      <Link
        to="/search"
        className="linktoAdvSearch"
        onClick={clickSearch}
        style={{ color: searchColor }}
      >
        <h1>Recherche avancée</h1>
      </Link>
    </div>
  );
}