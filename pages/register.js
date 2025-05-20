// pages/register.js
import { useState } from "react";
import { useRouter } from "next/router";
import { Container, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

export default function Register() {
  const [username, setUsername]   = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [error, setError]         = useState("");
  const router                  = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/register", { username, email, password });
      alert(response.data.message);
      router.push("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          className="bg-gray-500 rounded-xl"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Register</Button>
      </form>
      <Typography sx={{ mt: 2 }}>Already have an account? <a href="/login">Login</a></Typography>
    </Container>
  );
}
