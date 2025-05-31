import ReactDOM from "react-dom/client";
import { DatepickerWrapper } from "../src/DatepickerWrapper"; // ⚠️ Путь на src, не dist

const App = () => (
  <div style={{ padding: 20 }}>
    <h1>🧪 Test Datepicker</h1>
    <DatepickerWrapper />
  </div>
);

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
