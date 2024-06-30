import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRouter from "./router/AppRouter";
import AppLayout from "./Layout/AppLayout";
import ChannelService from "./ChannelService";


function App() {
  ChannelService.loadScript();
  ChannelService.boot({
    pluginKey: "e9460f81-7a6f-442d-8f93-23a70f8e892b",
    },
  );
  return (
      <AppLayout>
       <AppRouter />
      </AppLayout>
  );
}

export default App;
