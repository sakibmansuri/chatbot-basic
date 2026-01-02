import dayjs from 'dayjs';
import './ChatMessage.css';

export function ChatMessage({ message, sender, time }) {

    // const message = props.message;
    // const sender = props.sender;
    // const { message, sender } = props;
    /*
    if (sender === 'robot') {
      return (
        <div>
          <img src="robot.png" width="50" />
          {message}
        </div>
      );
    }
    */

    return (
        <div className={
            sender === 'user'
                ? 'chat-message-user'
                : 'chat-message-robot'
        }>
            {sender === 'robot' && (
                <img src="https://i.pinimg.com/736x/a1/51/b7/a151b738859875afc2e63a53f68572f4.jpg" className="chat-message-profile" />
            )}
            <div className="chat-message-text">
                {message}
                {time && (
                    <div className='chat-message-time'>
                        {dayjs(time).format('h:mma')}
                    </div>
                )}
            </div>
            {sender === 'user' && (
                <img src="https://tr.rbxcdn.com/180DAY-d4a6d1564bf7c0e65447501bdb3cc584/420/420/FaceAccessory/Png/noFilter" className="chat-message-profile" />
            )}
        </div>
    );
}