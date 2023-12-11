import React from "react";
// import "./estyle.css"
function Footer() {
    return (
        <div className="bg-light py-4">
            <div className="row mx-0">
                <div className="col-md-3 col-sm-12 text-center">
                    <h4>Logo</h4>
                    <p>Subline</p>
                </div>
                <div className="col-md-2 col-sm-6 text-center">
                    <h4>Pages</h4>
                    <p>About us</p>
                    <p>Our Expertise</p>
                    <p>Testimonials</p>
                    <p>Skin and hair</p>
                    <p>Shop</p>
                </div>
                <div className="col-md-2 col-sm-6 text-center">
                    <h4>Legal and help</h4>
                    <p>FAQs</p>
                    <p>Terms of use</p>
                    <p>Privacy policy</p>
                </div>
                <div className="col-md-2 col-sm-6 text-center">
                    <h4>Contact Us</h4>
                    <p className="mt-2"><span><i class="fa-solid fa-location-dot h4"></i></span>&nbsp; Address</p>
                    <p className="mt-2"><span><i class="fa-solid fa-phone h4"></i></span>&nbsp; Phone numbers</p>
                    <p className="mt-2"><span><i class="fa-regular fa-envelope h4"></i></span>&nbsp; mail id</p>
                </div>
                <div className="col-md-3 col-sm-6 text-center">
                    <h4>Social Links</h4>
                    <p class="mt-2">
                        <span class="pr-3">
                            <i class="fa-brands fa-facebook h4"></i>
                        </span>
                        <span class="px-3">
                            <i class="fa-brands fa-twitter h4"></i>
                        </span>
                        <span class="px-3">
                            <i class="fa-brands fa-linkedin h4"></i>
                        </span>
                        <span class="px-3">
                            <i class="fa-brands fa-youtube h4"></i>
                        </span>
                    </p>
                    <p>
                        <i class="fa-brands fa-google-play h4"></i> Google Play
                    </p>
                    <p>
                        <i class="fa-brands fa-apple h4"></i> Apple Store
                    </p>
                </div>

            </div>
        </div>
    )
}
export default Footer;