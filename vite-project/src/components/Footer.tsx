

interface FooterProps {
    onFilterChange: (filter:"all" | "active" | "completed") => void
    activeLenght:number
    clearActive: () => void
}

const Footer: React.FC<FooterProps> = ({onFilterChange, activeLenght, clearActive}) => {

    const handleAll = () => {
        onFilterChange("all")
    }

    const handleActive = () => {
        onFilterChange("active")
    }

    const handleCompleted = () => {
        onFilterChange("completed")
    }

    return (
        <div className="footer">
            <div className="container">
                <div className="footer__wrapper">
                    <span className="footer__counter">{activeLenght} items left</span>
                        <div className="footer__wrapper-button">
                            <button className="footer__button" type="button" onClick={handleAll}>All</button>
                            <button className="footer__button" type="button" onClick={handleActive}>Acive</button>
                            <button className="footer__button" type="button" onClick={handleCompleted}>Completed</button>
                        </div>
                    <button className="footer__clear" type="button" onClick={clearActive}>Clear completed</button>
                </div>
            </div>
        </div>
    )
}

export default Footer