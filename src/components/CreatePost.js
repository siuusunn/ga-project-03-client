import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../lib/api';

import TextEditor from './common/TextEditor';

export default function CreatePost() {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    topic: '',
    content: '',
    timestamp: '',
    likes: 0,
    dislikes: 0
  });

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.POST(API.ENDPOINTS.allPosts, formFields, API.getHeaders())
      .then(({ data }) => navigate(`/posts/${data._id}`))
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Topic</label>
        <input
          type='text'
          id='topic'
          name='topic'
          value={formFields.topic}
          onChange={handleChange}
        ></input>
      </div>
      <div>
        <label>Content</label>
        <input
          type='text'
          id='content'
          name='content'
          value={formFields.content}
          onChange={handleChange}
        ></input>
        <TextEditor />
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
}
