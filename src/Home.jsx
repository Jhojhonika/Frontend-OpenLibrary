
import React, { useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import './assets/index.css';

import AddBookForm from './addbook';
import Footer from "./footer";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    // Handle search button click and navigate to SearchBook component
    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/searchbook/${searchQuery.trim()}`);
        }
    };


    return (

        <>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"></link>

            <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
            <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"></link>
            
            <section >
                <div className="main-navbar shadow-sm sticky-top ">
                    <div className="top-navbar">
                        <div className="container-fluid">
                            <div className=" d-flex justify-content-around ">

                                <div className="col-md-3 my-auto d-none d-sm-none d-md-block d-lg-block col-lg-4 ">

                                    <div class="input-group">
                                        <input type="text"
                                            className="form-control"
                                            placeholder="Search by author..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)} />
                                        <button class="btn bg-light" onClick={handleSearch} type="submit">
                                            <i class="fa fa-search"> </i>
                                        </button>
                                    </div>

                                </div>
                                <div className="col-md-6 my-auto d-md-block col-lg-2 col-9 ">
                                    <a href='./'><div className='d-flex justify-content-center'><img className='logo' src='./images/logo.png' ></img></div></a>
                                </div>
                                <div className='col-md-3 d-flex justify-content-center  col-3  col-lg-4'>

                                <li class="nav-item">
                                        <button class="nav-link" onClick={() => { navigate('./addbook') }}>
                                            <i class="fa fa-heart"></i> Add Book
                                        </button>
                                    </li>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </section>
            <Outlet />
            <Footer/>

        </>
    )
}

export default Home;

