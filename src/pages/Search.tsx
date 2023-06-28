import { useState, useEffect } from "react";
import { debounce, sortBy } from "lodash";

import Image from "components/Image";

import { Dog, searchDogByBreed } from "api/dog";

function SearchPage() {
  const [keyword, setKeyword] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [breeds, setBreeds] = useState<Dog[] | null>([]);

  const filterBreed = (filterName: keyof Dog = "name") => {
    if (filterName === "height") {
      setBreeds(sortBy(breeds, (each) => each[`${filterName}`]["imperial"]));
    } else {
      setBreeds(sortBy(breeds, (each) => each[`${filterName}`]));
    }
  };

  useEffect(() => {
    searchDogByBreed({
      q: keyword,
      page: page,
      limit: limit,
    })
      .then((response) => setBreeds(response.data))
      .catch(() => {
        /* if null, we identify it as error */
        setBreeds(null);
      });
  }, [keyword, limit, page]);

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">
            <input
              onChange={debounce(
                (e: React.ChangeEvent<HTMLInputElement>) =>
                  setKeyword(e.target.value),
                1000
              )}
              placeholder="search your dog here"
              className="border-gray-700 border-2 rounded p-4 box-border font-medium w-full"
            />
          </h1>
          <div className="bg-slate-500 mx-0 w-full rounded">
            <label className="text-white text-sm ml-1" htmlFor="sort">
              Sortby:
            </label>
            <select
              id="sort"
              onChange={(e) => filterBreed(e.target.value as keyof Dog)}
              className="px-2 py-4 bg-slate-500 text-white rounded cursor-pointer"
            >
              <option disabled selected>
                {" "}
                -- select an option --{" "}
              </option>
              <option value={"name"}>Name</option>
              <option value={"height"}>Height</option>
              <option value={"life_span"}>Lifespan</option>
            </select>
          </div>
          <div className="bg-slate-500 mx-0 w-full rounded">
            <label className="text-white text-sm ml-1" htmlFor="limit">
              Set limit:
            </label>
            <select
              id="limit"
              onChange={(e) => setLimit(Number(e.target.value))}
              className="px-2 py-4 bg-slate-500 text-white rounded cursor-pointer"
              value={limit}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button
              className="px-12 py-4 bg-slate-500 text-white rounded cursor-pointer disabled:opacity-75 disabled:pointer-events-none"
              onClick={() => setPage(Math.max(page - 1, 0))}
              disabled={page === 0}
            >
              PREV
            </button>
            <button
              className="px-12 py-4 bg-slate-500 text-white rounded cursor-pointer disabled:opacity-75 disabled:pointer-events-none"
              onClick={() => setPage(page + 1)}
              disabled={Array.isArray(breeds) && breeds.length < limit}
            >
              Next
            </button>
          </div>
        </div>
        <div className="w-3/4 grid-cols-3 gap-10">
          {Array.isArray(breeds) &&
            breeds.length > 0 &&
            breeds.map((eachBreed) => (
              <div className="w-96">
                <Image
                  key={eachBreed.reference_image_id}
                  id={eachBreed.reference_image_id}
                  alt={eachBreed.name}
                  size={"small"}
                />
              </div>
            ))}
        </div>
        {breeds === null && <div>Oops! something went wrong</div>}
      </div>
    </>
  );
}

export default SearchPage;

export const ErrorBoundary = () => {
  return <h3>Some Error Boundary</h3>;
};
