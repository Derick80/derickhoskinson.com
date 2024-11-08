'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
// this is a basic bookcover component that fetches the cover image from the google books api. In the future I need to better secure the api key. and also add a fallback image if the cover is not found.
type BookCoverProps = {
    bookId?: string;
    query?: string;
};

const BookCover = ({ bookId, query }: BookCoverProps) => {
    const [coverUrl, setCoverUrl] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        // Function to fetch book data
        const fetchBookCover = async () => {
            try {
                const baseUrl = "https://www.googleapis.com/books/v1/volumes";
                let url = `${baseUrl}?key=`;

                // If a specific book ID is provided
                if (bookId) {
                    url = `${baseUrl}/${bookId}?key=`;
                }
                // If a query is provided, search for the book
                else if (query) {
                    url = `${baseUrl}?q=${encodeURIComponent(query)}&maxResults=1&key=`;
                }

                const response = await fetch(url);
                const data = await response.json();

                // Retrieve cover image URL
                const bookData = bookId ? data : data.items?.[0];
                const thumbnail = bookData?.volumeInfo?.imageLinks?.thumbnail;

                if (thumbnail) {
                    setCoverUrl(thumbnail);
                } else {
                    setError("Cover image not found.");
                }
            } catch (err) {
                setError("Failed to load book cover.");
            }
        };

        fetchBookCover();
    }, [bookId, query]);

    return (
        <div className="w-full max-w-xs p-4 border rounded shadow">
            { error ? (
                <p className="text-red-600">{ error }</p>
            ) : coverUrl ? (
                <Image src={ coverUrl } alt="Book Cover"
                    width={ 200 } height={ 200 }
                    className="w-24 h-32 object-cover rounded"
                />
            ) : (
                <p>Loading...</p>
            ) }
        </div>
    );
};

export default BookCover;
