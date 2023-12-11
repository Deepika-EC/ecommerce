import { useEffect, useState } from "react";
import { signOut,getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import Footer from "./footer";
import axios from "axios";
import UserAuth from "./user";
import Pagination from "./pagination";

function Home() {
    const [data, setData] = useState([])
    const [cart, setCart] = useState([])
    const [search, setSearch] = useState([])
    const [sort, setSort] = useState("")
    let navigate = useNavigate()

let currentUser=UserAuth()

    // for sorting:
    let options = ["title", "price"]

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart"));
        setCart(savedCart);

        fetch("https://ecommerces-tes-api.onrender.com/products")
            .then((resp) => {
                return resp.json()
            })
            .then((res) => {
                console.log(res)
                setData(res)
                setSearch(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    // when we remove cart the cart will be removed even refresh also
    useEffect(() => {
        // Save cart data to localStorage whenever it changes
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (id) => {
        // setCart([...cart, id])
        if (!cart.includes(id)) {
            setCart([...cart, id]);
        }
        // navigate("/Cart/") 
    }

    const handleCartClick = () => {
        // the cart visibility when the cart icon is clicked
        localStorage.setItem("cart", JSON.stringify(cart));
        navigate("/Cartpg");
    };

    const filter = (e) => {
        setSearch(data.filter(item => item.title.toLowerCase().includes(e.target.value)))
    }

    const sortData = async (e) => {
        e.preventDefault()
        let value = e.target.value
        setSort(value)
        return await axios.get(`https://ecommerces-tes-api.onrender.com/products?_sort=${value}&_order=asc`)
            .then((res) => {
                setData(res.data)
                setSearch(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const firebaseConfig = {
        apiKey: "AIzaSyBRwpa1nvwlZpzdA9vQwbogLLA-bM6oRYQ",
        authDomain: "cart-a65f3.firebaseapp.com",
        projectId: "cart-a65f3",
        storageBucket: "cart-a65f3.appspot.com",
        messagingSenderId: "934653575495",
        appId: "1:934653575495:web:5d4802f0e419b1d67c0c62",
        measurementId: "G-20837Z7NNV"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth()
    const logout = (e) => {
        e.preventDefault()
        signOut(auth)
        .then(()=>{
            alert("Successfully Logout...!");
        navigate("/login");
        })
        .catch((err)=>{
            alert("error",err)
        })
    };

    // pagination : 

    const[page,setPage]=useState(1)
    const[records,setRecords]=useState(5)   // set 5 in 1st page

    let lr=page*records // last record = 5
    let fr=lr-records  // first record = 0
    let show=search.slice(fr,lr)

    const npage=Math.ceil(data.length / records)
    const number=[...Array(npage+1).keys()].slice(1)

    const updatePages=(num)=>{
        setPage(num)
    }

    const prev=()=>{
        if(page!==1){
            setPage(page - 1)
        }
    }

    const next=()=>{
        if(page!==npage){
            setPage(page + 1)
        }
    }

    // const prev=()=>{
    //     setPage(page-1)
    // }
    // const next=()=>{
    //     setPage(page+1)
    // }

    
    return (
        <div>
            <div className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <img src="https://cdn.dribbble.com/users/3267379/screenshots/6098927/e_shop.jpg" width="80" height="60" className="d-inline-block align-top" alt="" />
                    <span class="mx-5"></span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="input-group mb-3 mt-2">
                            <span className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></span>
                            <input type="text" onChange={filter} className="rounded" style={{ width: "80%" }} placeholder="Search Items..." />
                        </div>
                        <div>
                            {/* Display the cart count in a badge */}
                            <span className="position-relative">
                                <button class="h3 me-5" style={{ border: "none" }} onClick={handleCartClick}>
                                    <i class="fa-solid fa-cart-shopping"></i>
                                    {cart.length > 0 && (
                                        <span className="badge bg-success rounded-circle position-absolute top-0 p-1 px-2 start-90 translate-middle">
                                            {cart.length}
                                        </span>
                                    )}
                                </button>
                            </span>
                        </div>

                        <div class="rounded-circle d-flex" style={{ marginRight: "50px" }}>
                            <div class="btn-group">
                                <button class="btn btn-light btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-regular fa-circle-user"></i>
                                    {currentUser?.email}
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li>
                                        <a class="dropdown-item " href="#" onClick={logout}>Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <br />
            <div class="row mx-2 ">
                {/* Left side */}
                <div class="col-md-3 p-1 ">
                    <div className="card card-table mb-2 shadow-sm p-3 mb-5 bg-white rounded">
                        <div className="card-body rounded" style={{ backgroundColor: "rgb(255, 228, 228)" }}>
                            <div>
                                <select className="form-select p-2 mb-3 bg-light">
                                    <option>Shop by Concern</option>
                                    <option>Shop by Concern</option>
                                </select>
                            </div>
                            <div>
                                <select className="form-select p-2 mb-3 bg-light">
                                    <option>Shop by Category</option>
                                    <option>Shop by Category</option>
                                </select>
                            </div>
                            <div>
                                <select className="form-select p-2 mb-3 bg-light">
                                    <option>Shop by Product</option>
                                    <option>Shop by Product</option>
                                </select>
                            </div>
                            <div>
                                <select className="form-select p-2 mb-2 bg-light ">
                                    <option>Shop All</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="card card-table border-0 w-100">
                        <div className="card-body p-0 ">
                            <select value={sort} onChange={sortData} className="form-select shadow-lg p-3 mb-5 bg-light rounded fw-bold fs-6">
                                <option>Sort All</option>
                                {options.map((item) => (
                                    <option>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="card px-3 card-table mb-2 shadow-sm p-3 mb-5 bg-white rounded rbg">
                        <div className="card-body m-0 p-4 rounded" style={{ backgroundColor: "rgb(255, 228, 228)" }}>
                            <div>
                                <input type="range" class="form-range" min="0" max="100" step="1" />
                                <label for="customRange3" class="form-label h6">Price</label>
                            </div>
                            <div>
                                <input type="range" class="form-range" min="0" max="100" step="1" />
                                <label for="customRange3" class="form-label h6">Offers %</label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* right side */}
                <div className=" col-md-9 container-fluid-md">
                    <div className="card px-2 card-table border-0">
                        <div className="card-body pt-0">
                            <div className="row my-2">
                                {show.map((item) => (
                                    <div className="col-sm-4 mb-3">
                                        <div className="card h-100" key={item.id}>
                                            <div className="card-body">
                                                <img src={item.image} height="200px" width="100%" class="mb-2" alt="..." />
                                                <div class="card-text text-center">
                                                    <h5 class="card-title h5 bold mb-3">Title : {item.title}</h5>
                                                    <p class="card-text h5 bold">Price : ${item.price}</p>
                                                    {/* <p class="card-text h5 bold">Quantity : {item.quantity}</p> */}
                                                    <a href="#" class="btn btn-dark" onClick={() => addToCart(item)}>Add to Cart<i class="fa-solid fa-bag-shopping "></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div><br />
            <Pagination total={data.length}
            records={npage}
            update={updatePages}
            next={next}
            prev={prev}
            activePage={page}
            />
            <br/>
            <div>
                <Footer />
            </div>

        </div>
    )
}
export default Home;