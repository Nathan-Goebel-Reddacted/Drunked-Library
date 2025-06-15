import { usePaintHover } from "../hooks/usePaintHover";

interface ChangeCardProps {
  kind: string;
  timestamp: string;
  comment?: string;
  authorKey?: string;
  id: string;
}

export default function ChangeCard({ kind, timestamp, comment, authorKey, id }: ChangeCardProps) {
  const { onMouseEnter, backgroundColor } = usePaintHover();

  return (
    <div
      key={id}
      className="change-card"
      onMouseEnter={onMouseEnter}
      style={{ backgroundColor }}
    >
      <p><strong>{kind}</strong> — {new Date(timestamp).toLocaleTimeString()}</p>
      <p>{comment || "(pas de commentaire)"}</p>
      {authorKey && (
        <p>
          Auteur : <em>{authorKey.replace("/people/", "")}</em>
        </p>
      )}
    </div>
  );
}