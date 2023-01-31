import { Link } from 'react-router-dom'

const AppHeader = () => {
  return (
    <nav className='header__nav'>
      <ul className='header__list'>
        <li>
          <Link className='header__list-item' to="/">Converter</Link>
        </li>
        <li>
          <Link className='header__list-item' to="/valutes">Exchange </Link>
        </li>
      </ul>
    </nav>
  )
}

export default AppHeader