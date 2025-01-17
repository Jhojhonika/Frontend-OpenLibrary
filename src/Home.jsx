
import React, { useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom';

import AddBookForm from './addbook';

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
            <link rel="stylesheet" href="index.css"></link>
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
                                    <nav className="navbar navbar-expand-lg   ">
                                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                                            <span class="navbar-toggler-icon"></span>
                                        </button>
                                        <div class=" collapse navbar-collapse  my-auto col-lg-4 " id="navbarSupportedConten">
                                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">


                                                <li class="nav-item">
                                                    <button class="nav-link" onClick={() => { navigate('./addbook') }}>
                                                        <i class="fa fa-heart"></i> Add Book
                                                    </button>
                                                </li>

                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </section>
            <Outlet />

        </>
    )
}

export default Home;

