import Header from "../componants/Header";
import { useEffect, useState } from "react";
import { useLibrarieFetch } from "../hooks/useApiFetch";
import "../css/App.css"

export default function IndexPage() {
  const [endpoint, setEndpoint] = useState("");
  const [changes, setChanges] = useState<any[]>([]);

  useEffect(() => {
    const path = "/recentchanges" + getTodayPath();
    setEndpoint(path);
  }, []);

  const { data } = useLibrarieFetch(endpoint);

  useEffect(() => {
    if (Array.isArray(data)) {
      setChanges(data.slice(0, 100));
    }
  }, [data]);

  return (
    <div className="index-page">
      <Header/>
        <h2>Changements récents — aujourd’hui</h2>
        <div className="change-grid">
        {changes.map((change) => (
            <div key={change.id} className="change-card">
            <p><strong>{change.kind}</strong> — {new Date(change.timestamp).toLocaleTimeString()}</p>
            <p>{change.comment || "(pas de commentaire)"}</p>
            {change.author?.key && (
                <p>Auteur : <em>{change.author.key.replace("/people/", "")}</em></p>
            )}
            </div>
        ))}
        </div>
    </div>
  );
}

function getTodayPath() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `/${yyyy}/${mm}/${dd}.json`;
}