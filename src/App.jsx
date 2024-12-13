import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Chat from "./components/Chat";
import ChatButton from "./components/ChatButton";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<ChatButton />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
