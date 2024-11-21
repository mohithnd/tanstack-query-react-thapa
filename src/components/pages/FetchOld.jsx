import { useEffect, useState } from "react";
import { fetchPostsOld } from "../../api/api";

const FetchOld = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getPostsData = async () => {
    try {
      const res = await fetchPostsOld();
      if (res.status === 200) {
        setPosts(res.data);
      } else {
        throw new Error("Something Went Wrong");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostsData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-primary">Posts</h1>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <>
          {posts.length === 0 ? (
            <p className="text-gray-500">No posts available.</p>
          ) : (
            <ul className="space-y-4">
              {posts.map((p) => (
                <li
                  key={p.id}
                  className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
                >
                  <h2 className="text-xl font-semibold text-primary">
                    {p.title}
                  </h2>
                  <p className="text-gray-700">{p.body}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default FetchOld;
