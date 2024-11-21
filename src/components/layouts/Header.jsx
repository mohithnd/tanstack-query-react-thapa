import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-primary text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink
          to="/"
          className="text-2xl font-bold hover:text-accent transition duration-300"
        >
          ReactQuery
        </NavLink>
        <ul className="flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-accent transition duration-300 ${
                isActive ? "text-accent" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/trad"
            className={({ isActive }) =>
              `hover:text-accent transition duration-300 ${
                isActive ? "text-accent" : ""
              }`
            }
          >
            FetchOld
          </NavLink>
          <NavLink
            to="/rq"
            className={({ isActive }) =>
              `hover:text-accent transition duration-300 ${
                isActive ? "text-accent" : ""
              }`
            }
          >
            FetchRQ
          </NavLink>
          <NavLink
            to="/infinite"
            className={({ isActive }) =>
              `hover:text-accent transition duration-300 ${
                isActive ? "text-accent" : ""
              }`
            }
          >
            Infinite Scroll
          </NavLink>
        </ul>
      </div>
    </header>
  );
};

export default Header;
