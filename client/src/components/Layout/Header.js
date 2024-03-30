import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { CiUser } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { BsBag } from "react-icons/bs";
import './Header.css';
import logo from '../../assets/bello_logo.webp'
import SearchInput from "../Form/SearchInput";
import { useAuth } from "../../context/auth";
import { NavLink,Link } from 'react-router-dom';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from 'react-icons/ri';



const Menu = () =>(
  <>
  <p><NavLink to="/store" href="#store">Store</NavLink></p>
  <p><NavLink to="/" href="#backpack">Backpacks</NavLink></p>
  <p><NavLink to="/" href="#apparels">Apparels</NavLink></p>
  <p><NavLink to="/" href="#about us">About us</NavLink></p>
  <p><NavLink to="/" href="#contact">Contact</NavLink></p>
  </>
)
const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  

  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <NavLink to='/'><img src={logo} alt="logo" /></NavLink>
        </div>
        <div className="gpt3__navbar-links_container">
          <Menu />
        </div>
        
      </div>
      
      <div className="gpt3__navbar-sign">
        
        {/* Conditional rendering to hide icons when toggleSearch is true */}
        {!toggleSearch && (
          <>
            <CiSearch color='#fff' size={30} onClick={() => setToggleSearch(true)}/>
            {auth?.user?(
              <>
            <div className="dropdown">
                    <CiUser size={27} color='#fff' onClick={toggleDropdown} className='profile'/> {/* Icon */}
                  {isOpen && (
                    <div className="dropdown-content">
                      {/* Dropdown content */}
                      <a href="#">{auth?.user?.name}</a><br/>
                      <a href="#">Profile</a><br/>
                      <NavLink onClick={handleLogout}>Log Out</NavLink><br/>
                    </div>
                  )}
                </div>              
                </>
            ):(
              <>
    <div className="dropdown">
        <CiUser onClick={toggleDropdown} size={27} color='#fff' className='profile'/> {/* Icon */}
      {isOpen && (
        <div className="dropdown-content">
          {/* Dropdown content */}
          <Link to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
        </div>
      )}
    </div>               </>
            )}
            <Link to='/cart'><BsBag color='white' className='bag'/></Link>
          </>
        )}


       

      </div>
      <div className="gpt3__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color='#fff' size={27} onClick={() => setToggleMenu(false)}/>
          : <RiMenu3Line color='#fff' size={27} onClick={() => setToggleMenu(true)}/>
        }
        
        {toggleMenu && (
          <div className='gpt3__navbar-menu_container scale-up-center'>
            <div className='gpt3__navbar-menu_container-links'>
              <Menu />
              {/* menu eta */}
              {!toggleSearch && (
          <>
            <CiSearch color='#fff' size={30} onClick={() => setToggleSearch(true)}/>
            {auth?.user?(
              <>
            <div className="dropdown">
                    <CiUser size={27} color='#fff' onClick={toggleDropdown} className='profile'/> {/* Icon */}
                  {isOpen && (
                    <div className="dropdown-content">
                      {/* Dropdown content */}
                      <a href="#">{auth?.user?.name}</a><br/>
                      <a href="#">Profile</a><br/>
                      <NavLink onClick={handleLogout}>Log Out</NavLink><br/>
                    </div>
                  )}
                </div>              
                </>
            ):(
              <>
    <div className="dropdown">
        <CiUser onClick={toggleDropdown} size={27} color='#fff' className='profile'/> {/* Icon */}
      {isOpen && (
        <div className="dropdown-content">
          {/* Dropdown content */}
          <Link to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
        </div>
      )}
    </div>               </>
            )}
            <Link to='/cart'><BsBag color='white' className='bag'/></Link>
          </>
        )}
            </div>
          </div>
        )}
      </div>

      <div className='gpt3__navbar-search'>
        {toggleSearch && (
          <div className='search-bar'>
              <SearchInput />
            <RiCloseLine color='#fff' size={30} onClick={() => setToggleSearch(false)}/>
          </div>
        )}
      </div>
    </div>
  );
};


export default Header;
