import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCountries,
  filterByRegion,
  loadMore,
  selectFilteredCountries,
} from "../../features/countrySlice";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const countries = useSelector(selectFilteredCountries);
  const visibleCount = useSelector((state) => state.countries.visibleCount);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(1);
  const [dotIndex, setDotIndex] = useState(0);
  const [leftImage, setLeftImage] = useState(null);
  const [rightImage, setRightImage] = useState(null);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    if (countries.length >= 2) {
      setLeftImage(countries[0]?.flag);
      setRightImage(countries[1]?.flag);
      setCurrentIndex(1);
      setDotIndex(0); // initial dot active
    }
  }, [countries]);

  const handleFilterClick = (region) => {
    setActiveFilter(region);
    dispatch(filterByRegion(region));
  };

  const handleLoadMore = () => {
    dispatch(loadMore());
  };

  const handleLeftArrow = () => {
    const nextIdx = currentIndex + 1;
    if (nextIdx < countries.length) {
      setLeftImage(rightImage);
      setRightImage(countries[nextIdx]?.flag);
      setCurrentIndex(nextIdx);
      setDotIndex((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleRightArrow = () => {
    const prevIdx = currentIndex - 1;
    if (prevIdx > 0) {
      setRightImage(leftImage);
      setLeftImage(countries[prevIdx - 1]?.flag);
      setCurrentIndex(prevIdx);
      setDotIndex((prev) => Math.max(prev - 1, 0));
    }
  };
  const regions = ["All", "Asia", "Europe"];

  return (
    <div className="home-page">
      <header className="top-header">
        <h4>Countries</h4>

        {/* Desktop Region Filters */}
        <div className="region-filters desktop-only">
          {regions.map((region) => (
            <button
              key={region}
              className={`region-button ${
                activeFilter === region ? "active" : ""
              }`}
              onClick={() => handleFilterClick(region)}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="mobile-only">
          <button
            className="hamburger-button"
            onClick={() => setShowMobileMenu((prev) => !prev)}
          >
            <FaBars />
          </button>
          {showMobileMenu && (
            <div className="mobile-menu-popup">
              {regions.map((region) => (
                <button
                  key={region}
                  className={`region-button ${
                    activeFilter === region ? "active" : ""
                  }`}
                  onClick={() => handleFilterClick(region)}
                >
                  {region}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <section className="welcome-section">
        <div className="line-1"></div>
        <div className="welcome-heading">
          <h2>WELCOME</h2>
        </div>
        <div className="line-2"></div>
      </section>

      {leftImage && rightImage && (
        <section className="custom-slider-section">
          <div className="slider-row">
            <div className="slider-left-with-controls">
              <img
                src={leftImage}
                alt="Left Flag"
                className="slider-main-image"
              />
              <div className="slider-controls">
                <span onClick={handleRightArrow} className="slider-arrow">
                  &#8592;
                </span>
                {[0, 1, 2, 3].map((idx) => (
                  <span
                    key={idx}
                    className={`dot ${dotIndex === idx ? "active" : ""}`}
                  />
                ))}
                <span onClick={handleLeftArrow} className="slider-arrow">
                  &#8594;
                </span>
              </div>
            </div>
            <div className="slider-right mobile-hidden">
              <img
                src={rightImage}
                alt="Right Flag"
                className="slider-frame-image"
              />
            </div>
          </div>
        </section>
      )}

      <Container className="countries-container">
        <Row>
          {countries.slice(0, visibleCount).map((country, idx) => (
            <Col md={6} key={idx} className="mb-4">
              <div className="country-card">
                <img src={country.flag} alt={country.name} className="flag" />
                <div className="country-details">
                  <strong>{country.name}</strong>
                  <div className="region">{country.region}</div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        {visibleCount < countries.length && (
          <div className="text-center mt-3">
            <Button variant="dark" onClick={handleLoadMore}>
              Load more
            </Button>
          </div>
        )}
      </Container>

      <footer className="footer">
        <div className="footer-icons">
          <i className="bi bi-facebook" />
          <i className="bi bi-twitter" />
          <i className="bi bi-instagram" />
          <i className="bi bi-github" />
        </div>
        <p>murshidwork@gmail.com</p>
        <p>Copyright © 2020 Murshid KM. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
