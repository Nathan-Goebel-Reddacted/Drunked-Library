import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useLibrarieFetch } from "../hooks/useApiFetch";
import ChangeCard from "../components/ChangeCard";
import "../css/App.css";

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
      <Header />
      <h2>Changements récents — aujourd’hui</h2>
      <div className="change-grid">
        {changes.map((change) => (
          <ChangeCard
            key={change.id}
            id={change.id}
            kind={change.kind}
            timestamp={change.timestamp}
            comment={change.comment}
            authorKey={change.author?.key}
          />
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