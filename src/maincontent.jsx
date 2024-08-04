import React, { useState, useRef, useEffect } from "react";
import "./maincontent.css";
import { Link } from "react-router-dom";
import Loginpage from "./loginpage";
import birdsMusic from "./Music/bird.mp3";
import breezeMusic from "./Music/rain.mp3";
import coffeeMusic from "./Music/coffee.mp3";
import knowledgeGirl from "./illustrations/knowledgeGirl.png";
import ReactMarkdown from "react-markdown";
import { useUser } from "./userContext";

const Maincontent = () => {
  const { handleLogout } = useUser();
  const [prompt, setPrompt] = useState("");
  const [isLoginPageVisible, setIsLoginPageVisible] = useState(false);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("user");
  const [token, setToken] = useState("anonymous");
  const [typingEffectText, setTypingEffectText] = useState("");
  const [response, setResponse] = useState("");
  const [adaptedResponse, setAdaptedResponse] = useState({
    Twitter: "",
    Instagram: "",
    Medium: "",
    LinkedIn: "",
  });
  const themes = ["theme-1", "theme-2"];
  const [currentTheme, setCurrentTheme] = useState(themes[1]);
  const [themeIndex, setThemeIndex] = useState(0);
  const platforms = ["Twitter", "Instagram", "Medium", "LinkedIn"];
  const [musicPlaying, setMusicPlaying] = useState({
    bird: false,
    breeze: false,
    coffee: false,
  });
  const birdsAudio = useRef(new Audio(birdsMusic));
  const breezeAudio = useRef(new Audio(breezeMusic));
  const coffeeAudio = useRef(new Audio(coffeeMusic));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hashtag, setHashtag] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUsername = localStorage.getItem("username");
    const storedToken = localStorage.getItem("token");
    if (storedUserId && storedUsername && storedToken) {
      setUserId(storedUserId);
      setUsername(storedUsername);
      setToken(storedToken);
    } else {
      setIsLoginPageVisible(false);
    }
  }, []);

  console.log("TOKEN: ", token);

  const handleLoginSuccess = (id, name, token) => {
    localStorage.setItem("userId", id); // Store userId in local storage
    localStorage.setItem("username", name);
    localStorage.setItem("token", token); // Store username in local storage
    setUserId(id);
    setUsername(name);
    setToken(token);
    setIsLoginPageVisible(false); // Hide the login page after successful login
  };

  console.log("TOKEN AFTER LOGIN: ", token);

  const onhandleLogout = () => {
    handleLogout();
    localStorage.removeItem("username");
    localStorage.removeItem("token"); // Clear username from local storage// Clear userId state
    setUsername("user");
    setToken("");
    handleLogout();
  };
  console.log("TOKEN AFTER LOGOUT: ", token);

  const handleLogin = () => {
    setIsLoginPageVisible(true); // Show the login page
  };
  const handleCloseLogin = () => {
    console.log("Closinggg");
    setIsLoginPageVisible(false); // Show the login page
  };

  const handleTemplateClick = () => {
    const nextIndex = (themeIndex + 1) % themes.length; // Calculate the next index
    setCurrentTheme(themes[nextIndex]); // Set the next theme
    setThemeIndex(nextIndex); // Update the index state
  };
  const handleNotification = async () => {
    try {
      const res = await fetch("https://wora-api.vercel.app/WORA/reminders/notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }), // Include userId in the request body
      });
      console.log({ userId });
      if (!res.ok) {
        throw new Error("Failed to send notification");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  const handleGenerate = async () => {
    try {
      const contentRes = await fetch("https://wora-api.vercel.app/WORA/contents/getResponse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!contentRes.ok) {
        throw new Error("Failed to fetch content");
      }

      const contentData = await contentRes.json();
      const contentString = contentData.content;

      const [headingRes, hashtagRes] = await Promise.all([
        fetch("https://wora-api.vercel.app/WORA/contents/getHeading", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ responsePrompt: contentString }),
        }),
        fetch("https://wora-api.vercel.app/WORA/contents/getHashtags", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ responsePrompt: contentString }),
        }),
      ]);

      if (!headingRes.ok || !hashtagRes.ok) {
        throw new Error("Failed to fetch heading or hashtags");
      }

      const [headingData, hashtagData] = await Promise.all([
        headingRes.json(),
        hashtagRes.json(),
      ]);

      setTitle(headingData.adaptedHeading);
      setDescription(contentString);
      setHashtag(hashtagData.adaptedHashtags);

      const formattedContent = `
        <div class="prompt-style">${prompt}</div>
        <h3 class="heading-style">${
          headingData.adaptedHeading || "No heading available"
        }</h3>
        <p class="content-style">${contentString}</p>
        <div class="hashtag-style">${
          hashtagData.adaptedHashtags || "No hashtags available"
        }</div>
      `;

      setResponse(formattedContent);
      setPrompt("");
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse("Error fetching data");
    }
  };

  const handleAdapt = async () => {
    try {
      const res = await fetch("https://wora-api.vercel.app/WORA/contents/getAdaptedContent", {
        //4
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ responsePrompt: response }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch adapted content");
      }

      const adapted = await res.json();
      console.log(adapted);
      console.log(adapted.adaptedContent.twitterContent);
      console.log(adapted.adaptedContent.twitterContent);
      console.log(adapted.adaptedContent.twitterContent);
      console.log(adapted.adaptedContent.twitterContent);

      setAdaptedResponse({
        Twitter: adapted.adaptedContent.twitterContent,
        Instagram: adapted.adaptedContent.instagramContent,
        LinkedIn: adapted.adaptedContent.linkedinContent,
        Medium: adapted.adaptedContent.mediumContent,
      });
    } catch (error) {
      console.error("Error fetching adapted content:", error);
      setAdaptedResponse({
        Twitter: "Error fetching adapted content",
        Instagram: "Error fetching adapted content",
        Medium: "Error fetching adapted content",
        LinkedIn: "Error fetching adapted content",
      });
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      await handleGenerate();
    }
  };

  const toggleMusic = (musicType) => {
    let audioRef;

    switch (musicType) {
      case "bird":
        audioRef = birdsAudio.current;
        break;
      case "breeze":
        audioRef = breezeAudio.current;
        break;
      case "coffee":
        audioRef = coffeeAudio.current;
        break;
      default:
        return;
    }

    // Check if the music is currently playing
    if (musicPlaying[musicType]) {
      audioRef.pause(); // Pause the audio
      audioRef.currentTime = 0; // Reset audio to the beginning
    } else {
      // Stop any currently playing audio
      stopAllMusic();

      audioRef.loop = true; // Loop the audio
      audioRef.play(); // Start playing the audio
    }

    // Update the state to toggle the music playing state
    setMusicPlaying((prevState) => ({
      ...prevState,
      [musicType]: !prevState[musicType],
    }));
  };
  const stopAllMusic = () => {
    Object.values(musicPlaying).forEach((isPlaying, index) => {
      if (isPlaying) {
        switch (index) {
          case 0:
            birdAudio.current.pause();
            birdAudio.current.currentTime = 0;
            break;
          case 1:
            breezeAudio.current.pause();
            breezeAudio.current.currentTime = 0;
            break;
          case 2:
            coffeeAudio.current.pause();
            coffeeAudio.current.currentTime = 0;
            break;
          default:
            break;
        }
      }
    });
    setMusicPlaying({
      birds: false,
      coffee: false,
      breeze: false,
    });
  };

  const typingEffect = (text, index = 0) => {
    if (index < text.length) {
      setTypingEffectText((prev) => prev + text[index]);
      setTimeout(() => {
        typingEffect(text, index + 1);
      }, 10); // Adjust the delay as needed
    }
  };

  useEffect(() => {
    if (response !== typingEffectText) {
      setTypingEffectText(""); // Clear previous effect text
      typingEffect(response); // Start typing effect on response change
    }
  }, [response]);

  function convertMarkdownToPlainText(markdownText) {
    // Define a custom component for rendering plain text
    const TextRenderer = ({ children }) => <>{children}</>;

    return (
      <ReactMarkdown components={{ text: TextRenderer }}>
        {markdownText}
      </ReactMarkdown>
    );
  }
  const generateAnonymousId = () =>
    `anonymous#${Math.floor(100000 + Math.random() * 900000)}`;
  const handleSaveContent = async () => {
    // Ensure `generateAnonymousId` is defined if user_id can be null
    const noteUserId = userId || generateAnonymousId();

    console.log(`Title: ${title}`);
    console.log(`Description: ${description}`);
    console.log(`Hashtag: ${hashtag}`);
    console.log(`User ID: ${noteUserId}`);

    try {
      const response = await fetch("https://wora-api.vercel.app/WORA/contents/saveContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: noteUserId,
          title: title,
          body: description,
          hashtags: hashtag,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Note saved:", result);
      } else {
        console.error("Error saving note:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const onHandleReminder=()=>
  {
    alert("New Update coming soon...")
  }
  return (
    <div className={`app-container ${currentTheme}`}>
      <aside className="sidebar">
        <div className="user">
          <svg
            className="user-icon"
            xmlns="http://www.w3.org/2000/svg"
            height="25"
            width="20"
            viewBox="0 0 448 512"
          >
            <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
          </svg>
          <div className="user-title">{username}</div>
        </div>
        <div className="navigation">
          <a
            className="nav-icon"
            href="#templates"
            onClick={handleTemplateClick}
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
            <span>Theme</span>
          </a>
          <a
            className="nav-item"
            href="#"
            rel="ugc"
            onClick={handleSaveContent}
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
              <path d="M12 3v12"></path>
              <path d="m8 11 4 4 4-4"></path>
              <path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"></path>
            </svg>
            <span>Save</span>
          </a>
          <a className="nav-item" href="#" rel="ugc" onClick={onHandleReminder}>
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
            <Link to="/notes" className="nav-item">
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
            </Link>
            <a className="nav-item" href="#" rel="ugc" onClick={onHandleReminder}>
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
            <a className="nav-item" href="#" rel="ugc" onClick={onHandleReminder}>
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
            <a className="nav-item" href="#" rel="ugc">
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
            </a>
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
            <a className="nav-item" href="#" rel="ugc"onClick={onhandleLogout}>
              <svg
                className="nav-icon logout"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                width="20"
                viewBox="0 0 512 512"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
              </svg>
              <span>Logout</span>
            </a>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <h2 style={{ fontSize: "40px" }}>wora.</h2>
          <div className="header-actions">
            <input
              className="search-input"
              type="search"
              placeholder="Search notes"
            />
            <button onClick={handleNotification}>
              <svg
                className="header-icon"
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
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
            </button>
            <button>
              <svg
                className="header-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
            </button>
            <button onClick={handleLogin}>
              {isLoginPageVisible && (
                <>
                  <div className="login-overlay">
                    <Loginpage onLoginSuccess={handleLoginSuccess} />
                  </div>
                </>
              )}

              <svg
                className="user-icon"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                width="20"
                viewBox="0 0 448 512"
              >
                <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
              </svg>
            </button>
          </div>
        </header>

        <div className="notes-grid">
          <div className="notes-content">
            <div className="content-header">
              <h2 className="content-title">Write down your ideas</h2>
              <div className="content-actions">
                <div className="music-buttons">
                  <button
                    className={`button ${musicPlaying.birds ? "active" : ""}`}
                    onClick={() => toggleMusic("birds")}
                  >
                    <svg
                      className="music"
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      width="25"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="#666666"
                        d="M160.8 96.5c14 17 31 30.9 49.5 42.2c25.9 15.8 53.7 25.9 77.7 31.6V138.8C265.8 108.5 250 71.5 248.6 28c-.4-11.3-7.5-21.5-18.4-24.4c-7.6-2-15.8-.2-21 5.8c-13.3 15.4-32.7 44.6-48.4 87.2zM320 144v30.6l0 0v1.3l0 0 0 32.1c-60.8-5.1-185-43.8-219.3-157.2C97.4 40 87.9 32 76.6 32c-7.9 0-15.3 3.9-18.8 11C46.8 65.9 32 112.1 32 176c0 116.9 80.1 180.5 118.4 202.8L11.8 416.6C6.7 418 2.6 421.8 .9 426.8s-.8 10.6 2.3 14.8C21.7 466.2 77.3 512 160 512c3.6 0 7.2-1.2 10-3.5L245.6 448H320c88.4 0 160-71.6 160-160V128l29.9-44.9c1.3-2 2.1-4.4 2.1-6.8c0-6.8-5.5-12.3-12.3-12.3H400c-44.2 0-80 35.8-80 80zm80-16a16 16 0 1 1 0 32 16 16 0 1 1 0-32z"
                      />
                    </svg>
                  </button>
                  <button
                    className={`button ${musicPlaying.breeze ? "active" : ""}`}
                    onClick={() => toggleMusic("breeze")}
                  >
                    <svg
                      className="music"
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      width="25"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="#666666"
                        d="M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43 96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z"
                      />
                    </svg>
                  </button>
                  <button
                    className={`button ${musicPlaying.coffee ? "active" : ""}`}
                    onClick={() => toggleMusic("coffee")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      width="25"
                      viewBox="0 0 640 512"
                    >
                      <path
                        fill="#666666"
                        d="M96 64c0-17.7 14.3-32 32-32H448h64c70.7 0 128 57.3 128 128s-57.3 128-128 128H480c0 53-43 96-96 96H192c-53 0-96-43-96-96V64zM480 224h32c35.3 0 64-28.7 64-64s-28.7-64-64-64H480V224zM32 416H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="adapt-button">
                  <button onClick={handleAdapt}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      width="17.5"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="#666666"
                        d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3 192 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-210.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-64z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="editor-background">
              <div
                id="textarea"
                className={`input shadow ${response ? "content" : ""}`}
              >
                {typingEffectText && (
                  <div dangerouslySetInnerHTML={{ __html: typingEffectText }} />
                )}
                {!response && ( // Render placeholder only when no response
                  <img
                    src={knowledgeGirl}
                    alt="Placeholder"
                    className="editor-image"
                  />
                )}
              </div>
            </div>

            <div className="input-section">
              <input
                className="prompt"
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here"
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          <div className="notes-column">
            {platforms.map((platform) => (
              <div className="card" key={platform}>
                <div className="card-header">
                  <div className="card-title">
                    <h3>{platform}</h3>
                  </div>
                  <p className="card-description">
                    {convertMarkdownToPlainText(adaptedResponse[platform]) ||
                      "Here goes your content..."}
                  </p>
                </div>
                {/* Conditionally render the footer based on description content */}
                {!adaptedResponse[platform] && ( // Check if description is empty or falsy
                  <div className="card-footer">
                    <p className="card-footer-item">Please wait...</p>
                    <p className="card-footer-item">
                      Adapting content may take some time.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
export default Maincontent;
