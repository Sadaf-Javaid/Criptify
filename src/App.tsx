import { useState } from "react";
import CopyIcon from "./icons/CopyIcon";
import ArrowIcon from "./icons/ArrowIcon";
import CheckIcon from "./icons/CheckIcon";
import { UC, LC, NC, SC } from "./PasswordChars";

function App() {
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [lowercase, setLowercase] = useState<boolean>(false);
  const [numbers, setNumbers] = useState<boolean>(false);
  const [symbols, setSymbols] = useState<boolean>(false);
  const [passwordLength, setPasswordLength] = useState<string>("12");
  const [password, setPassword] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Generate Password
  function generatePassword() {
    let finalPassword = "";
    let charSet = "";
    if (uppercase || lowercase || numbers || symbols) {
      if (uppercase) charSet += UC;
      if (lowercase) charSet += LC;
      if (numbers) charSet += NC;
      if (symbols) charSet += SC;

      for (let i = 0; i < parseInt(passwordLength); i++) {
        finalPassword += charSet.charAt(
          Math.floor(Math.random() * charSet.length)
        );
      }

      setPassword(finalPassword);
    } else {
      alert("Please select an option.");
    }
  }

  // Copy to Clipboard
  function copyToClipboard() {
    if (password) {
      navigator.clipboard.writeText(password);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  }

  return (
    <div>
      <h1 className="text-almost-white/60 text-base font-bold">
        Password Generator
      </h1>

      {/* Final Password */}
      <div className="h-16 bg-dark-gray flex items-center justify-between p-4 w-full mb-4">
        <input type="text" value={password} readOnly placeholder="P4$5W0rD!" className="bg-transparent outline-none border-none" />
        <div className="flex items-center justify-center gap-4">
          {isCopied && (
            <p className="uppercase text-base md:text-lg text-neon-green font-bold">
              Copied
            </p>
          )}
          <button onClick={copyToClipboard}>
            <CopyIcon />
          </button>
        </div>
      </div>

      <div className="bg-dark-gray p-4 w-full">
        {/* Password Length */}
        <div>
          <div>
            <label htmlFor="password-length">Character Length</label>
            <p>{passwordLength}</p>
          </div>
          <input
            type="range"
            id="password-length"
            name="password-length"
            value={passwordLength}
            min={8}
            max={20}
            onChange={(event) => setPasswordLength(event.target.value)}
          />
        </div>

        {/* Options */}
        <div className="flex flex-col gap-4">
          {/* Uppercase Letters */}
          <label className="flex items-center gap-5">
            <div className="relative flex items-center justify-center w-5 h-5">
              <input
                type="checkbox"
                className="checkbox checked:bg-neon-green checked:border-neon-green"
                checked={uppercase}
                onChange={() => setUppercase(!uppercase)}
              />
              {uppercase && <CheckIcon className="checkIcon" />}
            </div>
            <span className="text-almost-white text-base font-bold">
              Include Uppercase Letters
            </span>
          </label>

          {/* Lowercase Letters */}
          <label className="flex items-center gap-5">
            <div className="relative flex items-center justify-center w-5 h-5">
              <input
                type="checkbox"
                className="checkbox checked:bg-neon-green checked:border-neon-green"
                checked={lowercase}
                onChange={() => setLowercase(!lowercase)}
              />
              {lowercase && <CheckIcon className="checkIcon" />}
            </div>
            <span className="text-almost-white text-base font-bold">
              Include Lowercase Letters
            </span>
          </label>

          {/* Numbers */}
          <label className="flex items-center gap-5">
            <div className="relative flex items-center justify-center w-5 h-5">
              <input
                type="checkbox"
                className="checkbox checked:bg-neon-green checked:border-neon-green"
                checked={numbers}
                onChange={() => setNumbers(!numbers)}
              />
              {numbers && <CheckIcon className="checkIcon" />}
            </div>
            <span className="text-almost-white text-base font-bold">
              Include Numbers
            </span>
          </label>

          {/* Symbols */}
          <label className="flex items-center gap-5">
            <div className="relative flex items-center justify-center w-5 h-5">
              <input
                type="checkbox"
                className="checkbox checked:bg-neon-green checked:border-neon-green"
                checked={symbols}
                onChange={() => setSymbols(!symbols)}
              />
              {symbols && <CheckIcon className="checkIcon" />}
            </div>
            <span className="text-almost-white text-base font-bold">
              Include Symbols
            </span>
          </label>
        </div>

        <button className="btn group" onClick={generatePassword}>
          <p className="btn-text">Generate</p>
          <ArrowIcon className="group-active:fill-neon-green fill-dark-gray" />
        </button>
      </div>
    </div>
  );
}

export default App;
