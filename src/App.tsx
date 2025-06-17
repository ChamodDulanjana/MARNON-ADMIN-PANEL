import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {

  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<div>Home Page</div>} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
