
import Header from "./component/header.jsx";
import Footer from "./component/footer.jsx";

function App() {
  return (

      <body>
      <Header/>

          <main>
          <div className="container py-4 px-3 mx-auto">
              <h1>Hello, Bootstrap and Vite!</h1>
              <button className="btn btn-primary">Primary button</button>
          </div>

          </main>

      <Footer/>
      </body>
  );
}

export default App;
