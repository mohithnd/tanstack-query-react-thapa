import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deletePost, fetchPosts, updatePost } from "../../api/api";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const FetchRQ = () => {
  const [number, setNumber] = useState(0);
  let currentPage = Math.floor(number / 5) + 1;

  const queryClient = useQueryClient();

  useEffect(() => {
    currentPage = Math.floor(number / 5) + 1;
  }, [number]);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["posts", number],
    queryFn: () => fetchPosts(number),
    placeholderData: keepPreviousData,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => {
      queryClient.setQueryData(["posts", number], (curr) => {
        return curr.filter((post) => post.id !== id);
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data) => updatePost(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["posts", number], (curr) => {
        return curr.map((post) =>
          post.id === data.id ? { ...post, ...data } : { ...post }
        );
      });
    },
  });

  const [form, setForm] = useState({ title: "", body: "", id: "", userId: "" });
  const [enabled, setEnabled] = useState(false);

  const handleOnUpdate = (e) => {
    e.preventDefault();
    updateMutation.mutate(form);
    setEnabled(false);
  };

  return (
    <>
      <div>
        {enabled && (
          <form onSubmit={handleOnUpdate} className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={form.title}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, title: e.target.value }))
              }
              className="border border-gray-300 rounded p-2 mb-2 w-full"
              required
            />
            <label
              htmlFor="body"
              className="block text-sm font-medium text-gray-700"
            >
              Body
            </label>
            <input
              type="text"
              name="body"
              id="body"
              value={form.body}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, body: e.target.value }))
              }
              className="border border-gray-300 rounded p-2 mb-2 w-full"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Update
            </button>
          </form>
        )}
      </div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-primary">Posts</h1>

        {isLoading && (
          <div className="flex justify-center items-center">
            <p className="text-gray-500">Loading...</p>
          </div>
        )}

        {isError && (
          <div className="mb-4">
            <p className="text-red-500">
              Oops! Something went wrong: {error.message}. Please try again.
            </p>
            <button
              onClick={refetch}
              className="mt-2 bg-secondary text-white p-2 rounded hover:bg-accent transition-colors duration-300"
              aria-label="Retry fetching posts"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !isError && (
          <>
            {data?.length === 0 ? (
              <p className="text-gray-500">No posts available.</p>
            ) : (
              <>
                <ul className="space-y-4">
                  {data.map((post) => (
                    <div key={post.id} className="relative">
                      <NavLink to={`/rq/${post.id}`}>
                        <li className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                          <h2 className="text-xl font-semibold text-primary">
                            {post.title}
                          </h2>
                          <p className="text-gray-700">{post.body}</p>
                        </li>
                      </NavLink>
                      <div className="absolute right-0 top-0 mt-2 space-x-2">
                        <button
                          onClick={() => deleteMutation.mutate(post.id)}
                          disabled={deleteMutation.isLoading}
                          className={`bg-red-500 text-white p-1 rounded hover:bg-red-600 transition-colors duration-300 ${
                            deleteMutation.isLoading
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          aria-label={`Delete post ${post.title}`}
                        >
                          {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                        </button>
                        <button
                          onClick={() => {
                            setForm({ ...post });
                            setEnabled(true);
                          }}
                          className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 transition-colors duration-300"
                          aria-label={`Update post ${post.title}`}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  ))}
                </ul>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setNumber((prev) => Math.max(prev - 5, 0))}
                    disabled={currentPage === 1}
                    className={`bg-secondary text-white p-2 rounded ${
                      currentPage === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-accent transition-colors duration-300"
                    }`}
                    aria-label="Go to previous page"
                  >
                    Prev
                  </button>

                  <h2>{currentPage}</h2>

                  <button
                    onClick={() => setNumber((prev) => prev + 5)}
                    disabled={currentPage === 20}
                    className={`bg-secondary text-white p-2 rounded ${
                      currentPage === 20
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-accent transition-colors duration-300"
                    }`}
                    aria-label="Go to next page"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default FetchRQ;
