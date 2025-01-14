import AppSidenav from "./components/Layout/AppSidenav/AppSidenav";

const App: React.FC = () => {
  return (
    <>
      <div className="App">
        <h1 className="text-2xl font-bold">Welcome to My Vite React App!</h1>
        <AppSidenav />
      </div>
    </>
  );
};

export default App;
