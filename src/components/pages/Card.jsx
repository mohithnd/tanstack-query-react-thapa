import { useQuery } from "@tanstack/react-query";
import { fetchSinglePost } from "../../api/api";
import { useParams } from "react-router-dom";

const Card = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchSinglePost(id),
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-primary">Post Details</h1>

      {isLoading && <p className="text-gray-500">Loading...</p>}

      {isError && (
        <div className="mb-4">
          <p className="text-red-500">Error: {error.message}</p>
          <button
            onClick={refetch}
            className="mt-2 bg-secondary text-white p-2 rounded hover:bg-accent transition-colors duration-300"
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && !isError && data && (
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
          <h2 className="text-xl font-semibold text-primary">{data.title}</h2>
          <p className="text-gray-700">{data.body}</p>
        </div>
      )}
    </div>
  );
};

export default Card;
