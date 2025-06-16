import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLibrarieFetch, useWikiFetch } from "../hooks/useApiFetch";

export default function BookDetailPage() {
  const { bookId } = useParams();
  const { data: bookData } = useLibrarieFetch(bookId ? `/works/${bookId}.json` : "");

  const [wikiTitle, setWikiTitle] = useState<string | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  const { data: wikiData } = useWikiFetch(wikiTitle || "");

  useEffect(() => {
    if (bookData?.title) {
      setWikiTitle(bookData.title);
    }

    if (bookData?.covers?.[0]) {
      setCoverUrl(`https://covers.openlibrary.org/b/id/${bookData.covers[0]}-L.jpg`);
    }
  }, [bookData]);

  return (
    <div className="book-detail-page">
        {bookData ? (
            <>
            <div className="book-main">
                <div className="book-meta">
                <h2>{bookData.title}</h2>
                {coverUrl && (
                    <img
                    src={coverUrl}
                    alt={`Couverture de ${bookData.title}`}
                    className="book-cover"
                    />
                )}
                </div>

                <div className="book-info">
                {bookData.description && (
                    <p>
                    <strong>Description OpenLibrary : </strong>
                    {typeof bookData.description === "string"
                        ? bookData.description
                        : bookData.description.value}
                    </p>
                )}

                {bookData.authors?.length > 0 && (
                    <p>
                    <strong>Auteur(s) :</strong>{" "}
                    {bookData.authors.map((a: any, i: number) => (
                        <span key={i}>{a.author.key.replace("/authors/", "")} </span>
                    ))}
                    </p>
                )}

                {bookData.first_publish_date && (
                    <p>
                    <strong>Première publication :</strong> {bookData.first_publish_date}
                    </p>
                )}
                </div>
            </div>

            {wikiData?.extract && (
                <div className="book-wikipedia">
                <h3>Résumé Wikipédia :</h3>
                <p>{wikiData.extract}</p>
                {wikiData.content_urls?.desktop?.page && (
                    <a
                    href={wikiData.content_urls.desktop.page}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Voir sur Wikipédia
                    </a>
                )}
                </div>
            )}
            </>
        ) : (
            <p>Chargement...</p>
        )}
    </div>
  );
}