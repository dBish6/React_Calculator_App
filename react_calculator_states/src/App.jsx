import Buttons from "./components/Buttons";
import Footer from "./components/Footer";

function App() {
  return (
    <main className="appContainer">
      <header className="App-header">
        <p>
          Welcome to my Calculator app using useState, thanks for the visit :)
        </p>
      </header>

      <div className="calContainer">
        <Buttons />
      </div>

      <Footer />
    </main>
  );
}

export default App;
