import { Link } from "react-router-dom";
import QuickSearch from "./QuickSearch"
import "../css/App.css"


export default function Header() {

    return(
        <div className="Header">
            <Link to="/" className="linktoHome">
                <h1>La Librairie de Strasbourg</h1>
            </Link>
            <QuickSearch />
            <Link to="/search" className="linktoAdvSearch">
                <h1>Recherche avancée</h1>
            </Link>
        </div>
    )
}