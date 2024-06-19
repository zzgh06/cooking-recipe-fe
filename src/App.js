import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRouter from "./router/AppRouter";
import AppLayout from "./Layout/AppLayout";


function App() {
  return (
      <AppLayout>
       <AppRouter />
      </AppLayout>
  );
}

export default App;
