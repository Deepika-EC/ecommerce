import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "./footer";
import UserAuth from "./user";


function Cart() {
    const [data, setData] = useState([])
    const [cart, setCart] = useState([])
    const [search, setSearch] = useState([])
    const [sort, setSort] = useState("")
    let navigate = useNavigate()
    let currentUser = UserAuth()
    // const [quantity, setquantity] = useState(1)

    // for sorting:
    let options = ["title", "price"]

    useEffect(() => {
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
        // or
        // axios.get("http://localhost:3003/product")
        //     .then((resp) => {
        //         setData(resp.data)
        //         console.log(resp)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })

        const storedCart = JSON.parse(localStorage.getItem("cart"));
        setCart(storedCart);
    }, [])

    useEffect(() => {
        // Save cart data to localStorage whenever it changes
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);


    const addToCart = (item) => {
        // setCart([...cart, item])
        // navigate("/Cart")
        if (!cart.includes(item)) {
            setCart([...cart, item]);
        }
    }

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId)
        setCart(updatedCart)
        setSearch(updatedCart)
        alert("are u sure to remove...!")
        // localStorage.removeItem("cart")
    }
    console.log("Data" + data)
    console.log("Cart" + cart)


    const logout = () => {
        alert("Successfully Logout...!");
        navigate("/login");
    };

    const countinc = (productId) => {
        // setquantity(quantity + 1)
        setCart(cart=>
            cart.map((item)=>
                productId === item.id ? {...item,quantity: item.quantity + (item.quantity < 10 ? 1 : 0)} : item
            )
        )
    }

    const countdec = (productId) => {
        // if (quantity > 1) {
        //     setquantity(quantity - 1)
        // }
        setCart(cart=>
            cart.map((item)=>
                productId === item.id ? {...item,quantity: item.quantity -(item.quantity > 1 ? 1 : 0)} : item
            )
        )
    }

    // total price
    const calculateTotalPrice = (item) => {
        return item.price * item.quantity;
    };

    return (
        <div>
            <div className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link to="/a">
                        <img src="https://cdn.dribbble.com/users/3267379/screenshots/6098927/e_shop.jpg" width="80" height="60" className="d-inline-block align-top" alt="" />
                        <span class="mx-5"></span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="input-group mb-3 mt-2" align="center">
                            <span className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></span>
                            <input type="text" className="rounded" style={{ width: "80%" }} placeholder="Search Items..." />
                        </div>
                        <div>
                            {/* Display the cart count in a badge */}
                            <span className="position-relative">
                                <button class="h3 me-5" style={{ border: "none" }}>
                                    <i class="fa-solid fa-cart-shopping"></i>
                                    {cart.length > 0 && (
                                        <span className="badge bg-danger rounded-circle position-absolute top-0 p-1 px-2 start-90 translate-middle">
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
                            <select className="form-select shadow-lg p-3 mb-5 bg-light rounded fw-bold fs-6">
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
                                {cart.length === 0 ? (
                                    <div className="col-12 text-center">No data found</div>
                                ) : (
                                    cart.map((item) => (
                                        <div className="col-sm-4 mb-3">
                                            <div className="card h-100" key={item.id}>
                                                <div className="card-body">
                                                    <img src={item.image} height="200px" width="100%" class="mb-2" alt="..." />
                                                    <div class="card-text text-center">
                                                        <h5 class="card-title h5 bold mb-3">Title : {item.title}</h5>
                                                        <p class="card-text h5 bold">Price : ${item.price}</p>
                                                        <div className="d-flex flex-column flex-md-row m-2">
                                                        <button onClick={()=>countdec(item.id)} className="btn btn-danger mx-3">-</button>
                                                        <p class="card-text h5 bold">Quantity :{item.quantity}</p>
                                                        <button onClick={()=>countinc(item.id)} className="btn btn-success mx-3">+</button>
                                                        </div>
                                                        <p class="card-text h5 bold">Total price :${calculateTotalPrice(item)} </p>
                                                        <a href="#" class="btn btn-dark" onClick={() => removeFromCart(item.id)}>Remove from Cart<i class="fa-solid fa-bag-shopping "></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div><br /><br />
            <div>
                <Footer />
            </div>
        </div >
    )
}
export default Cart;
