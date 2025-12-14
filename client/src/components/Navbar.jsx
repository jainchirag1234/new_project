import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Navbar</a>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Registration
                                </a>
                                <ul class="dropdown-menu">
                                    <li><Link className='dropdown-item' to="/dash">Dashboard</Link></li>
                                    <li><Link className='dropdown-item' to="/reg">Registration</Link></li>
                                </ul>
                            </li>

                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Blog
                                </a>
                                <ul class="dropdown-menu">
                                    <li><Link className='dropdown-item' to="/blog/state">useState</Link></li>
                                    <li><Link className='dropdown-item' to="/blog/redux">Redux Toolkit</Link></li>
                                </ul>
                            </li>

                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Billing
                                </a>
                                <ul class="dropdown-menu">
                                    <li><Link className='dropdown-item' to="/billing/state">useState</Link></li>
                                    <li><Link className='dropdown-item' to="/billing/redux">Redux Toolkit</Link></li>
                                </ul>
                            </li>

                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Shopping Cart
                                </a>
                                <ul class="dropdown-menu">
                                    <li><Link className='dropdown-item' to="/cart/state">useState</Link></li>
                                    <li><Link className='dropdown-item' to="/cart/redux">Redux Toolkit</Link></li>
                                </ul>
                            </li>

                             <li class="nav-item">
                                <Link className='nav-link' to="/car">Car Rental site</Link>
                            </li>
                            
                            <form class="d-flex" role="search">
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button class="btn btn-outline-success" type="submit">Search</button>
                            </form>
                            </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
