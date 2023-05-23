// src/App.js
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [logo, setLogo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('email', email);
      formData.append('logo', logo);

      await axios.post('/api/aicarrers', formData);

      setMessage('Job listing submitted successfully');
    } catch (error) {
      console.error('Job listing submission error:', error);
      setMessage('Failed to submit job listing');
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h1>Job Listing Website</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="logo">Logo:</label>
        <input
          type="file"
          id="logo"
          accept="image/png, image/jpeg"
          onChange={(e) => setLogo(e.target.files[0])}
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
