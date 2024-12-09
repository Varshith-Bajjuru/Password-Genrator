import { useState, useCallback } from 'react';

function App() {
  const [length, updateLength] = useState(6);
  const [numberAllowed, setPermissionN] = useState(false);
  const [charAllowed, setPermissionC] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";
  
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 px-4">
      <div className="w-full max-w-md shadow-lg rounded-lg bg-gray-700 p-6">
        <h1 className="text-center text-3xl font-bold text-white mb-6">
          Password Generator
        </h1>
        <div className="mb-4">
          <input
            type="text"
            value={password}
            className="w-full p-3 rounded-md bg-gray-900 text-white outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Generated password"
            readOnly
          />
          <button
            className="mt-2 w-full bg-violet-600 text-white py-2 rounded-md hover:bg-violet-500 focus:outline-none"
            onClick={() =>{
              return navigator.clipboard.writeText(password)
            }}
          >
            Copy to Clipboard
          </button>
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-300">
            Password Length: {length}
          </label>
          <input
            type="range"
            min={4}
            max={50}
            value={length}
            className="w-full mt-1"
            onChange={(e) => updateLength(parseInt(e.target.value))}
          />
        </div>
        <div className="flex items-center gap-4 mb-4">
          <label className="flex items-center gap-2 text-gray-300">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setPermissionN((prev)=> !prev)}
              className="accent-violet-600"
            />
            Include Numbers
          </label>
          <label className="flex items-center gap-2 text-gray-300">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setPermissionC((prev)=> !prev)}
              className="accent-violet-600"
            />
            Include Special Characters
          </label>
        </div>
        <button
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-500 focus:outline-none"
          onClick={passwordGenerator}
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}


export default App;
