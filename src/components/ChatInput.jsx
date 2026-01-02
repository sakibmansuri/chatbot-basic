import dayjs from 'dayjs';
import { useState } from 'react'
import { Chatbot } from 'supersimpledev';
import './ChatInput.css';

export function ChatInput({ chatMessages, setChatMessages }) {

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {

    if (isLoading || inputText === '') {
      return;
    }

    // Set isLoading to true at the start, and set it to false after everything is done.
    setIsLoading(true);

    // Clear the textbox at the top now because the Chatbot will take some time to load the response. We want to clear the textbox immediately rather waiting for the Chatbot to finish loading.
    setInputText('');

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ];

    setChatMessages([
      ...newChatMessages,
      // This creates a temporary gif spinner message because we don't save this message in newChatMessages it will be removed later, when we add the response.
      {
        message: <img
          src="https://supersimple.dev/images/loading-spinner.gif"
          className="loading-spinner"
        />,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    const response = await Chatbot.getResponseAsync(inputText);

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]);

    // Set isLoading to false after everything is done.
    setIsLoading(false);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      sendMessage();
    } else if (event.key === 'Escape') {
      setInputText('');
    } else if (event.key === 'Control') {
      clearTexts();
    }
  }

  function clearTexts() {
    setChatMessages([]);
  }

  return (
    <div className="chat-input-container">
      <input
        required
        placeholder="Send a message to Chatbot"
        size="30"
        onKeyDown={handleKeyDown}
        onChange={saveInputText}
        value={inputText}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        className="send-button"
      >Send</button>
      <button
        onClick={clearTexts}
        className='clear-btn'
      >Clear</button>
    </div>
  );
}