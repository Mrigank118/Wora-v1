import React, {useState} from 'react'
import './maincontent.css'
import ReadingManOrange from './illustrations/ReadingManOrange.png';
import Sidebar from './sidebar'

export default function Maincontent() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [adaptedResponse, setAdaptedResponse] = useState({
    Twitter: '',
    Facebook: '',
    Medium: '',
    LinkedIn: ''
  });
  const platforms = ['Twitter', 'Facebook', 'Medium', 'LinkedIn'];


  const handleGenerate = async () => {
    try {
      const contentRes = await fetch('http://localhost:4000/WORA/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!contentRes.ok) {
        throw new Error('Failed to fetch content');
      }

      const contentData = await contentRes.json();
      const contentString = contentData.content;

      const [headingRes, hashtagRes] = await Promise.all([
        fetch('http://localhost:4000/WORA/adaptHeading', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ responsePrompt: contentString }), 
        }),
        fetch('http://localhost:4000/WORA/adaptHashtags', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ responsePrompt: contentString }), 
        }),
      ]);

      if (!headingRes.ok || !hashtagRes.ok) {
        throw new Error('Failed to fetch heading or hashtags');
      }

      const [headingData, hashtagData] = await Promise.all([
        headingRes.json(),
        hashtagRes.json(),
      ]);

      const formattedContent = `
        <div class="prompt-style">${prompt}</div>
        <h3 class="heading-style">${headingData.adaptedHeading || 'No heading available'}</h3>
        <p class="content-style">${contentString}</p>
        <div class="hashtag-style">${hashtagData.adaptedHashtags || 'No hashtags available'}</div>
      `;

      setResponse(formattedContent);
      setPrompt('');
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponse('Error fetching data');
    }
  };

  const handleAdapt = async () => {
    try {
      const res = await fetch('http://localhost:4000/WORA/adaptContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ responsePrompt: response }), 
      });

      if (!res.ok) {
        throw new Error('Failed to fetch adapted content');
      }

      const adapted = await res.json();
      const adaptedContent = adapted.adaptedContent || 'No content available';

      setAdaptedResponse({
        Twitter: adaptedContent,
        Facebook: adaptedContent,
        Medium: adaptedContent,
        LinkedIn: adaptedContent
      });
    } catch (error) {
      console.error('Error fetching adapted content:', error);
      setAdaptedResponse({
        Twitter: 'Error fetching adapted content',
        Facebook: 'Error fetching adapted content',
        Medium: 'Error fetching adapted content',
        LinkedIn: 'Error fetching adapted content'
      });
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      await handleGenerate();
    }
  };
  return (
    <div className="container">
      <aside class="sidebar">
      <nav class="navigation">
        <a class="nav-item" href="#" rel="ugc">
          <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="18" height="7" x="3" y="3" rx="1"></rect>
            <rect width="9" height="7" x="3" y="14" rx="1"></rect>
            <rect width="5" height="7" x="16" y="14" rx="1"></rect>
          </svg>
          <span>Templates</span>
        </a>
        <a class="nav-item" href="#" rel="ugc">
          <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3v12"></path>
            <path d="m8 11 4 4 4-4"></path>
            <path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"></path>
          </svg>
          <span>Import</span>
        </a>
        <a class="nav-item" href="#" rel="ugc">
          <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          </svg>
          <span>Trash</span>
        </a>
        <div class="workspace">
          <h3 class="workspace-title">Workspace</h3>
          <a class="nav-item" href="#" rel="ugc">
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"></path>
              <path d="M15 3v4a2 2 0 0 0 2 2h4"></path>
            </svg>
            <span>Notes</span>
          </a>
          <a class="nav-item" href="#" rel="ugc">
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="10" x2="14" y1="2" y2="2"></line>
              <line x1="12" x2="15" y1="14" y2="11"></line>
              <circle cx="12" cy="14" r="8"></circle>
            </svg>
            <span>Reminders</span>
          </a>
          <a class="nav-item" href="#" rel="ugc">
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect width="18" height="18" x="3" y="4" rx="2"></rect>
              <path d="M3 10h18"></path>
            </svg>
            <span>Calendar</span>
          </a>
          <a class="nav-item" href="#" rel="ugc">
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="7" height="9" x="3" y="3" rx="1"></rect>
              <rect width="7" height="5" x="14" y="3" rx="1"></rect>
              <rect width="7" height="9" x="14" y="12" rx="1"></rect>
              <rect width="7" height="5" x="3" y="16" rx="1"></rect>
            </svg>
            <span>Dashboard</span>
          </a>
          <a class="nav-item" href="#" rel="ugc">
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <span>Settings</span>
          </a>
        </div>
        <a class="nav-item" href="#" rel="ugc">
          <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
          </svg>
          <span>New Page</span>
        </a>
      </nav>
    </aside>

        <main class="main-content">
      <header class="main-header">
        <h2>Notes</h2>
        <div class="header-actions">
          <input class="search-input" type="search" placeholder="Search notes" />
          <button>
            <svg class="header-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
          </svg> 
          </button>
          <button>
            <svg class="header-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          </button>
          <button>
          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512">
          <path fill="#666666" d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg>          </button>
        </div>
      </header>
      <div class="notes-grid">
        <div class="notes-content">
            <div class="content-header">
              <h2 class="content-title">Write down your ideas</h2>
              <div class="content-actions">
                <button class="button"><i class="fa-solid fa-music"></i></button>
                <button onClick={handleAdapt}class="button"><i class="fa-solid fa-arrow-up-from-bracket"></i></button>
                </div>
            </div>
            <div className="editor-background">
            <div id="textarea"
              className={`input shadow ${response ? 'content' : ''}`}
              dangerouslySetInnerHTML={{ __html: response || '<img src="" alt="Placeholder" class="editor-image"/>' }}
              contentEditable={true}
            />
          </div>
          <div className="input-section">
              <input
                className='prompt'
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here"
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        <div class="notes-column">
        {platforms.map((platform) => (
          <div class="card">
            <div class="card-header">
              <div class="card-title">
                <h3>{platform}</h3>
                </div>
              <p class="card-description">{adaptedResponse[platform] || 'Here goes your content...'}</p>
            </div>
            <div class="card-footer">
              <p class="card-footer-item">2 items</p>
              <p class="card-footer-item">San Francisco, CA</p>
            </div>
          </div>
        ))}
        </div>
      </div>
    </main>
    </div>
  )
}
