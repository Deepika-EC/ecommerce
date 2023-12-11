import { BrowserRouter as Routers,Routes,Route } from "react-router-dom";
import Home from "./homepg.js";
import Cart from "./Cartpg.js";
import Register from "./Registration.js";
import Login from "./login.js";

function App(){
    return(
        <div>
            <Routers>
                <Routes>
                    <Route path="/" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/a" element={<Home/>}/>
                    <Route path="/Cartpg" element={<Cart/>}/>

                </Routes>
            </Routers>
        </div>
    )
}
export default App;