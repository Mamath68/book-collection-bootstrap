import {Metadata} from "next";
import BookDetail from "./BookDetail";
import path from "path";
import {promises as fs} from "fs";

// Fonction pour récupérer les données du fichier JSON
async function fetchBookData(id: string) {
    const filePath = path.join(process.cwd(), "public", "books.json");
    const data = await fs.readFile(filePath, "utf-8");
    const books = JSON.parse(data);

    return books.find((book: { id: string }) => book.id === id);
}

// Génération dynamique des métadonnées
export async function generateMetadata({params}: { params: { id: string } }): Promise<Metadata> {
    const book = await fetchBookData(params.id);

    if (!book) {
        return {
            title: "Livre non trouvé",
            description: "Ce livre n'existe pas dans votre collection.",
        };
    }

    return {
        title: book.title,
        description: `Découvrez les détails du livre "${book.title}" écrit par ${book.author}.`,
    };
}

// Composant principal de la page
export default async function BookPage({params}: { params: { id: string } }) {
    const book = await fetchBookData(params.id);

    if (!book) {
        return <div>Livre non trouvé</div>;
    }

    return <BookDetail book={book}/>;
}
