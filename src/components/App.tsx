import { useState } from 'react';
import Toast from 'react-bootstrap/Toast';

import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <div>
        <Toast>
          <Toast.Header>
            <strong className="me-auto">Bootstrap</strong>
          </Toast.Header>
          <Toast.Body>Hello, boostrap is working fine</Toast.Body>
        </Toast>
      </div>
    </>
  );
}

export default App;
