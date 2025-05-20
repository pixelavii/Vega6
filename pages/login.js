// pages/login.js
import { useState } from "react";
import { useRouter } from "next/router";
import { Container, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userID", res.data.id);
      localStorage.setItem("user", res.data.user);
      router.push("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          className="bg-gray-500 rounded-xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          className="bg-gray-500 rounded-xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
      <Typography sx={{ mt: 2 }}>
        Don't have an account? <a href="/register">Register</a>
      </Typography>
    </Container>
  );
}
