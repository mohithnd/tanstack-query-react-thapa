import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchUsers } from "../../api/api";
import { useInView } from "react-intersection-observer";

const InfiniteScroll = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, error } =
    useInfiniteQuery({
      queryKey: ["users"],
      queryFn: fetchUsers,
      getNextPageParam: (lastPage) => {
        return lastPage.length === 10 ? lastPage.length + 1 : undefined;
      },
    });

  // const handleScroll = () => {
  //   const bottom =
  //     window.innerHeight + window.scrollY >=
  //     document.documentElement.scrollHeight - 1;

  //   if (bottom && hasNextPage) {
  //     fetchNextPage();
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [hasNextPage]);

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (error)
    return (
      <p className="text-red-500 text-center">
        Error fetching users: {error.message}
      </p>
    );

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-primary text-center">
        Infinite Scroll
      </h1>
      <ul className="space-y-4">
        {data?.pages
          .flatMap((page) => page)
          .map((user) => (
            <li
              key={user.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 flex items-center space-x-4"
            >
              <img
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
                className="w-24 h-24 rounded-full mb-2"
              />
              <p className="text-lg font-semibold">{user.login}</p>
            </li>
          ))}
      </ul>
      {isFetchingNextPage && (
        <div className="flex justify-center items-center mt-4">
          <p className="text-gray-500">Loading more users...</p>
          <svg
            className="animate-spin h-5 w-5 text-gray-500 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z"
            ></path>
          </svg>
        </div>
      )}
      <div ref={ref}></div>
    </>
  );
};

export default InfiniteScroll;
