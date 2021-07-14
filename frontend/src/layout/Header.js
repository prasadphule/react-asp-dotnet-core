import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header className="d-flex align-items-center pb-3 mb-5 border-bottom">
            <Link to="/" className="d-flex align-items-center text-dark text-decoration-none">
                <span className="fs-4"><i class="bi bi-battery-charging fs-4"></i> Sample App</span>
            </Link>
        </header>
    )
}
