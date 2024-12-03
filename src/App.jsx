import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import { useGetBooksQuery } from "./redux/features/userApi";
import {Route, useNavigate} from "react-router-dom"
import {Routes} from "react-router-dom"
import Create from "./components/Create";
import Home from "./components/Home";
import Update from "./components/Update";
import { useState } from "react";

function App() {
  const { data: users = [] } = useGetBooksQuery();

  const theme = useSelector((state) => state.themes.theme);
  const [filteredResults, setFilteredResults] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <>
    <Navbar setFilteredResults={setFilteredResults} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
    <main className={`${theme === 'light' ? "flex flex-col items-center justify-center maw-w-screen-2xl py-6 min-h-[calc(100vh-73px)]" : "flex flex-col items-center justify-center maw-w-screen-2xl py-6 bg-gray-900 min-h-[calc(100vh-73px)]"}`}>
    <Routes>
      <Route path="/create-user" element={<Create />}/>
      <Route path="/home" element={<Home filteredResults={filteredResults} searchTerm={searchTerm}/>}/>
      <Route path="/update-user/:id" element={<Update />}/>
    </Routes>
    </main>
    </>
  );
}

export default App;
