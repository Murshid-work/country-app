import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import loginImage from "../../assets/images/login-illustration.svg";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(password)) {
      setError(
        "Password must be at least 8 characters with 1 uppercase, 1 number, and 1 symbol"
      );
    } else {
      setError("");
      navigate("/home");
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2>Sign In</h2>
        <p className="subtext">
          New user? <a href="#">Create an account</a>
        </p>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email" className="mb-3">
            <Form.Control
              type="email"
              placeholder="Username or email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="password" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Check label="Keep me signed in" className="mb-3" />
          <Button type="submit" className="w-100 btn-dark">
            Sign In
          </Button>
          {error && <p className="text-danger mt-2">{error}</p>}
        </Form>

        <p className="or-divider">or Sign in With</p>
        <div className="social-icons">
          <i className="bi bi-google" />
          <i className="bi bi-facebook" />
          <i className="bi bi-github" />
        </div>
      </div>

      <div className="login-image-container">
        <img src={loginImage} alt="Login Illustration" />
      </div>
    </div>
  );
};

export default Login;
