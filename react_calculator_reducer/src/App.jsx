/*  
   Author: David Bishop
   Creation Date: October 29, 2022
*/

import Buttons from "./components/Buttons";
import Footer from "./components/Footer";

function App() {
  return (
    <main className="appContainer">
      <header>
        <p>
          Welcome to my Calculator app using useReducer, thanks for the visit :)
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
