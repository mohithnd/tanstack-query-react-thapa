import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4 text-primary">
        Welcome to ReactQuery
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Explore our posts and enhance your knowledge.
      </p>
      <NavLink
        to="/rq"
        className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-accent transition duration-300"
      >
        Get Started
      </NavLink>
    </div>
  );
};

export default Home;
