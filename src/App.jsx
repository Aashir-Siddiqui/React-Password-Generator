import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeLowercase, setIncludeLowercase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [password, setPassword] = useState('')
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = ''
    const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowerLetters = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+{}[]:;<>,.?~/-'

    if (includeUppercase) str += upperLetters
    if (includeLowercase) str += lowerLetters
    if (includeNumbers) str += numbers
    if (includeSymbols) str += symbols

    if (str === '') {
      setPassword('')
      return;
    }

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  useEffect(() => {
    passwordGenerator();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, passwordGenerator])

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select()
    navigator.clipboard.writeText(password)
  }, [password])

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto p-6 bg-gray-800 rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6">Password Generator</h1>

        <div className="mb-4 flex items-center justify-between bg-gray-700 p-3 rounded-lg">
          <input
            type="text"
            value={password}
            readOnly
            className="bg-transparent text-white w-full outline-none"
            placeholder="Your password"
            ref={passwordRef}
          />
          <button
            onClick={copyToClipboard}
            className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded cursor-pointer"
          >
            Copy
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password Length: {length}</label>
          <input
            type="range"
            min="4"
            max="40"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={() => setIncludeUppercase(!includeUppercase)}
              className="mr-2 h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
            />
            Uppercase
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={() => setIncludeLowercase(!includeLowercase)}
              className="mr-2 h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
            />
            Lowercase
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
              className="mr-2 h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
            />
            Numbers
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
              className="mr-2 h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
            />
            Symbols
          </label>
        </div>

        <button
          onClick={passwordGenerator}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition duration-200 ease-in-out"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App
