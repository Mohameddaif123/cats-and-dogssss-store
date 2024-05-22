import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import doc from '../images/doc.png';
import { selectCartCount } from '../components/Cart/cartSlice'; // Import selectCartCount
import { selectLogged, selectUsername } from '../components/loginSlice'; // Import selectors from loginSlice
import DefaultProfilePic from '../images/user.jpg'; // Import your default profile picture

// Define CSS styles as a string
const navbarStyles = `
.navbar {
  background-color: #ffffff !important; /* White background */
}

.navbar-nav .nav-link {
  color: #000000; /* Black font color */
  position: relative;
}

.navbar-nav .nav-link:hover {
  color: #007bff; /* Blue color on hover */
}

.navbar-nav .nav-link:hover i {
  color: #007bff; /* Blue color on hover */
}

.navbar-nav .nav-link::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 2px;
  background-color: transparent;
  transition: background-color 0.3s ease; /* Add transition for smoother effect */
}

.navbar-nav .nav-link:hover::before {
  background-color: #007bff; /* Blue color for underline on hover */
}
`;

class Navbar extends React.Component {
  toggleNavbar = () => {
    // Dispatch an action to toggle the navbar state
    this.props.dispatch({ type: "TOGGLE_NAVBAR" });
  };

  render() {
    const { isNavbarOpen, cartCount, logged, userName } = this.props;

    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <style>{navbarStyles}</style> {/* Include the CSS styles */}
        <div className="container-fluid">
          <div className="logo-frame">
            <a className="navbar-brand" href="/">
              <img src={doc} alt="Petstore Logo" width="60" height="auto" />
            </a>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleNavbar}
            aria-expanded={isNavbarOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={
              "collapse navbar-collapse" + (isNavbarOpen ? " show" : "")
            }
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  <i className="bi bi-house-door-fill text-danger"></i>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/Products">
                  <i className="bi bi-shop text-success"></i>
                  Products
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/AboutMe">
                  <i className="bi bi-file-person"></i>
                  About Us
                </a>
              </li>
            </ul>
            <div className="navbar-nav">
              {!logged ? (
                <>
                  <a className="nav-link btn btn-warning" href="/register">
                    <i className="bi bi-person-plus-fill text-info"></i>
                    Sign-up
                  </a>
                  <li className="nav-item">
                    <a className="nav-link btn btn-outline-light" href="/login">
                      <i className="bi bi-box-arrow-in-right text-primary"></i>
                      Login
                    </a>
                  </li>
                </>
              ) : (
                <div className="navbar-nav">
                  <Link to="/Login" className="nav-link">
                    <img
                      src={DefaultProfilePic}
                      alt="Profile"
                      className="rounded-circle"
                      style={{ width: '40px', height: '40px' }}
                    />
                    {userName}
                  </Link>
                </div>
              )}
            </div>
            <div className="navbar-nav">
              <Link to="/cart" className="nav-link"> {/* Make the cart icon a Link */}
                <i className="bi bi-cart-fill text-danger"></i>
                 ({cartCount}) {/* Display cart count */}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isNavbarOpen: state.navbar.isNavbarOpen, // Assuming your redux store has a slice named 'navbar'
    cartCount: selectCartCount(state), // Get the cart count from the store
    logged: selectLogged(state), // Get the logged status from the store
    userName: selectUsername(state), // Get the username from the store
  };
};

export default connect(mapStateToProps)(Navbar);
