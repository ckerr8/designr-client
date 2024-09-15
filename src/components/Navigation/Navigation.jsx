import '../../styles/global.scss'
import './Navigation.scss'

export default function Navigation() {
    return (
        <>

        <header className="screen__header">
          <nav className="nav">
            <ul className="nav__ul">
              <li className="nav__ul--li">Projects</li>
              <li className="nav__ul--li">Assets</li>
              <li className="nav__ul--li">Clients</li>
            </ul>
          </nav>
        </header>
      </>
    )
}