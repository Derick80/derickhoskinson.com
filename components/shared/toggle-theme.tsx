'use client'
import { Moon, Sun } from 'lucide-react';
import React from 'react';

const ToggleTheme = () => {
    const [theme, setTheme] = React.useState('system');

    React.useEffect(() => {
        // Set the initial theme based on the user's preference or default to light
        const savedTheme = localStorage.getItem('theme') || 'system';
        if (savedTheme === 'system') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const initialTheme = prefersDark ? 'dark' : 'light';
            setTheme(initialTheme);
            document.documentElement.classList.add(initialTheme);
        } else {
            setTheme(savedTheme);
            document.documentElement.classList.add(savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <button
            onClick={ toggleTheme }
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 transition-transform duration-300 transform hover:rotate-180"
            aria-label="Toggle Theme"
        >
            { theme === 'light' ? (
                <Sun className="text-gray-800 dark:text-gray-200" />

            ) : (
                <Moon className="text-gray-800 dark:text-gray-200" />

            ) }
        </button>
    );
};

export default ToggleTheme;