import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // or 'next/link' if Next.js
import Button from "./Button";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // On mount, sync dark mode with html class (optional: also sync with localStorage)
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/70 dark:bg-background/90 border-b border-border transition-colors">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-neon-green to-futuristic-blue flex items-center justify-center">
            <span className="text-black font-bold text-lg select-none">B</span>
          </div>
          <span className="font-bold text-2xl text-foreground select-none">Blyop</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-foreground">
          <Link
            to="#features"
            className="text-sm hover:text-neon-green transition-colors"
          >
            Features
          </Link>
          <Link
            to="#builder"
            className="text-sm hover:text-neon-green transition-colors"
          >
            Card Builder
          </Link>
          <Link
            to="#dashboard"
            className="text-sm hover:text-neon-green transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="#share"
            className="text-sm hover:text-neon-green transition-colors"
          >
            Share
          </Link>
        </nav>

        {/* Actions: Dark mode toggle + Get Started button + Mobile menu button */}
        <div className="flex items-center gap-4">
          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle Dark Mode"
            className="p-2 rounded-md bg-muted text-muted-foreground hover:bg-neon-green hover:text-black transition-colors"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? (
              // Sun icon for light mode
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m8.66-11H21m-18 0H3m15.364 6.364l.707.707m-12.02-12.02l.707.707M16.95 7.05l.707-.707m-12.02 12.02l.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z"
                />
              </svg>
            ) : (
              // Moon icon for dark mode
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                stroke="none"
              >
                <path d="M17.293 13.293a8 8 0 01-10.586-10.586 7 7 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          {/* Get Started button */}
          <Button className="hidden sm:inline-block bg-gradient-to-r from-neon-green to-futuristic-blue text-black hover:shadow-glow transition-all duration-300">
            Get Started
          </Button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-md text-foreground hover:text-neon-green focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {/* Hamburger / close icon */}
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-background dark:bg-background border-t border-border px-6 py-4 flex flex-col gap-4 text-foreground">
          <Link
            to="#features"
            onClick={() => setMenuOpen(false)}
            className="text-base hover:text-neon-green transition-colors"
          >
            Features
          </Link>
          <Link
            to="#builder"
            onClick={() => setMenuOpen(false)}
            className="text-base hover:text-neon-green transition-colors"
          >
            Card Builder
          </Link>
          <Link
            to="#dashboard"
            onClick={() => setMenuOpen(false)}
            className="text-base hover:text-neon-green transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="#share"
            onClick={() => setMenuOpen(false)}
            className="text-base hover:text-neon-green transition-colors"
          >
            Share
          </Link>
          <Button
            className="w-full bg-gradient-to-r from-neon-green to-futuristic-blue text-black hover:shadow-glow transition-all duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Get Started
          </Button>
        </nav>
      )}
    </header>
  );
}
