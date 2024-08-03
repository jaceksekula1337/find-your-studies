import Header from "./Header";
export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="flex flex-col justify-center items-center">
        {children}
      </main>
    </div>
  );
}
