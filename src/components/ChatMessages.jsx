import { useRef, useEffect } from 'react'
import { ChatMessage } from './ChatMessage';

function ChatMessages({ chatMessages }) {

    const chatMessagesRef = useAutoScroll([chatMessages]);

    return (
        <div className="chat-messages-container" ref={chatMessagesRef}>
            {chatMessages.map((chatMessage) => {
                return (
                    <ChatMessage
                        message={chatMessage.message}
                        sender={chatMessage.sender}
                        time={chatMessage.time}
                        key={chatMessage.id}
                    />
                );
            })}
        </div>
    );
}

function useAutoScroll() {
    // To use a function as a hook, the function name must start with "use".

    const containerRef = useRef(null);

    useEffect(() => {

        const containerElem = containerRef.current;

        if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight;
        }

    },);

    return containerRef;
}

export default ChatMessages;