function SearchPage() {
  console.log(import.meta.env.VITE_DOG_API_KEY);
  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold text-blue-600">
          Install & Setup Vite + React + Typescript + Tailwind CSS 3
        </h1>
      </div>
    </>
  );
}

export default SearchPage;

export const ErrorBoundary = () => {
  return <h3>Some Error Boundary</h3>;
};
