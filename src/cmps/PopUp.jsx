import { AppHeader } from "./AppHeader";
import { Chat } from "./Chat";
import '../assets/style/cmps/PopUp.css'



export function PopUp({ isOpen = false, onClose, children, footer }) {
    if (!isOpen) return null

    function onClosePopUp() {
        if (onClose) onClose()
    }

    return (
        <div onClick={onClosePopUp} className="popup-backdrop">
            <div onClick={ev => ev.stopPropagation()} className="popup-container">
                <header className="popup-header"></header>
                <main className="popup-main">
                    {/* {children} */}
                    <Chat />
                </main>
                {/* {footer && <footer className="popup-footer">{footer}</footer>} */}
            </div>
        </div>
    )

}