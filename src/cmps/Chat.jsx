import { useRef, useState } from "react"

import '../assets/style/cmps/Chat.css'

export function Chat() {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")



    function addMsg(text, from) {
        const newMsg = {
            id: Date.now(),
            text,
            from,
            timestamp: new Date().toLocaleTimeString()
        }
        setMessages(prevMsgs => {
            const updatedMsgs = [...prevMsgs, newMsg]
            localStorage.setItem('chatMessages', JSON.stringify(updatedMsgs))
            return updatedMsgs
        })
    }

    function onSubmit(event) {
        event.preventDefault()
        addMsg(input, 'user')
        setInput("")
        setTimeout(() => {
            addMsg("Hello! How can I help you?", 'bot')
        }, 1000)
    }

    return (
        <div className="chat">
            <div className="chat__messages">
                {messages.map(msg => (
                    <div key={msg.id} className={`chat__message chat__message--${msg.from}`}>
                        <span className="chat__message timestamp">{msg.timestamp}</span>
                        <span className="chat__message from">{msg.from}</span>
                        <span className="chat__message divider">:</span>
                        <span className="chat__message text">{msg.text}</span>
                    </div>
                ))}
            </div>
            <div className="chat__input">

                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        from="user"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type your message..."
                    />
                </form>
                <button onClick={() => addMsg(input, 'user')}>Send</button>

            </div>
        </div>
    )

}