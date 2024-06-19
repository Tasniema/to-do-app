import { NavLink } from 'react-router-dom';
import { BsCardChecklist } from 'react-icons/bs'
import './NavBar.css';

const NavBar = () => {

  const Links = [
    {
      id: 1,
      path: '/',
      text: 'Welcome',
    },
    {
      id: 2,
      path: '/register',
      text: 'Register',
    },
    {
      id: 3,
      path: '/login',
      text: 'Log in',
    },
  ];

  return (
    <nav className="navbar">
      <BsCardChecklist className='logo' />
      <div className="navbar-title"><h1 className="title"> TO DO LIST </h1></div>
      <ul className="menu">
        {Links.map((link) => (
          <li key={link.id} className="li-links">
            <NavLink to={link.path} className="links" activeclassname="active-link">
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;