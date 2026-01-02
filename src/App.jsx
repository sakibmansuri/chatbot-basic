import { useState, useEffect } from 'react'
import { Chatbot } from 'supersimpledev';
import { ChatInput } from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import './App.css'

function App() {

  const [chatMessages, setChatMessages] =
  useState(JSON.parse(localStorage.getItem('messages')) || []);
  // const [chatMessages, setChatMessages] = array;
  // const chatMessages = array[0];
  // const setChatMessages = array[1];

  
  useEffect(() => {
    Chatbot.addResponses({
      'hi': 'Hi! How are you?',
      "I'm fine": 'How can I help you?',
      'Hey': "Hey! What's up? How can I help you?",
      'Goodbye': 'Goodbye. Have a great day!!',
      'What is my name?': 'Your name is Sakib',
      'What is the name of my sister?': 'Taiba',
      'What is the name of my father & mother?': 'Fauzan & Rafiya',
      'What season is currently there?': 'Its Winter season now',
      'What is my favourite show?': 'Brooklyn Nine NIne',
      'Noice': 'Toit',
      'Give me a unique id': function () {
        return `Sure! Here's a Unique ID: ${crypto.randomUUID()}`;
      }
    });
  });
  
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages]);
  
  return (
    <div className="app-container">
      {chatMessages.length === 0 && (
        <p className="welcome-message">
          Welcome to my chatbot. It can say Hello, Flip a Coin & Roll a Dice.
        </p>
      )}
      <ChatMessages
        chatMessages={chatMessages}
      />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App
