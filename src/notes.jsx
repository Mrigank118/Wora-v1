import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './notes.css';
import { useUser } from './userContext';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Maincontent from './maincontent';


const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const { userId } = useUser();
  const themesNote = ["themeNote-1", "themeNote-2"];
  const [currentThemeNote, setCurrentThemeNote] = useState(themesNote[1]);
  const [themeIndexNote, setThemeIndexNote] = useState(0);

  useEffect(() => {
    const fetchNotes = async () => {
      if (!userId) {
        console.error('No userId provided');
        return;
      }
      console.log("fetching notes for ", userId);
      try {
        const response = await axios.get(`https://wora-api.vercel.app/WORA/contents/getContent/${userId}`);
        console.log(response.data);
        console.log(typeof(response.data));
          setNotes(response.data.notes);
      } catch (error) {
        setError('An error occurred while fetching notes.');
        console.error('Error in API call:', error);
      }
    };

    fetchNotes();
  }, [userId]);

  const navigate = useNavigate();
  const handleDashboardClick = () => {
    console.log("navigating to main page");
    navigate("/"); // Adjust the path if your main page has a different route
  };
  
 const handleTemplate = () => {
  console.log("In Template Notes");
    const nextIndexNote = (themeIndexNote + 1) % themesNote.length; // Calculate the next index
    setCurrentThemeNote(themesNote[nextIndexNote]); // Set the next theme
    setThemeIndexNote(nextIndexNote); // Update the index state
  };

  return (
    <div className={`note-complete-container ${currentThemeNote}`}>
    <aside className="note-sidebar">
      <div className="navigation">
      <a
            className="nav-icon"
            href="#templates"
            onClick={handleTemplate}
            style={{ textDecoration: "none" }}
          >
            <svg
              className="nav-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="7" x="3" y="3" rx="1"></rect>
              <rect width="9" height="7" x="3" y="14" rx="1"></rect>
              <rect width="5" height="7" x="16" y="14" rx="1"></rect>
            </svg>
            <span>Templates</span>
          </a>
          <a className="nav-item" href="#">
            <svg
              className="nav-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3v12"></path>
              <path d="m8 11 4 4 4-4"></path>
              <path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"></path>
            </svg>
            <span>Save</span>
          </a>
          <a className="nav-item" href="#">
            <svg
              className="nav-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>
            <span>Trash</span>
          </a>
          <div className="workspace">
            <h3 className="workspace-title">Workspace</h3>
            <a href="/notes" className="nav-item">
              <svg
                className="nav-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"></path>
                <path d="M15 3v4a2 2 0 0 0 2 2h4"></path>
              </svg>
              <span>Notes</span>
            </a>
            <a className="nav-item" href="#">
              <svg
                className="nav-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="10" x2="14" y1="2" y2="2"></line>
                <line x1="12" x2="15" y1="14" y2="11"></line>
                <circle cx="12" cy="14" r="8"></circle>
              </svg>
              <span>Reminders</span>
            </a>
            <a className="nav-item" href="#">
              <svg
                className="nav-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
              <span>Calendar</span>
            </a>
            <Link to="/" onClick={handleDashboardClick} className="nav-item" href="#">
              <svg
                className="nav-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="7" height="9" x="3" y="3" rx="1"></rect>
                <rect width="7" height="5" x="14" y="3" rx="1"></rect>
                <rect width="7" height="9" x="14" y="12" rx="1"></rect>
                <rect width="7" height="5" x="3" y="16" rx="1"></rect>
              </svg>
              <span>Dashboard</span>
            </Link>
            <a className="nav-item" href="#">
              <svg
                className="nav-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span>Settings</span>
            </a>
          </div>
          <a
            className="nav-item"
            href="#"
            rel="ugc"
            onClick={() => window.location.reload()}
          >
            <svg
              className="nav-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
            </svg>
            <span>New Page</span>
          </a>
        </div>
      </aside>
      <div className="note-container">
        <header className="note-header">
          <div className="note-header-title">Notes</div>
        </header>
        <main className="note-main-content">
          <div className="note-grid">
            {error ? (
              <div className="error">Error: {error}</div>
            ) : (
                notes.map((note) => (
                <div className="note-card" key={note.id}>
                  <div className="note-content">
                    <h3 className="note-title">{note.title}</h3>
                    <p className="note-description">{note.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notes;
