import { useState } from "react";
import { useRouter } from "next/router";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Sign up successful", data);
      router.push("/auth/login");
    } catch (error) {
      console.error("Error during sign up:", error);
      alert("Sign up failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center mt-[8vw] h-fit">
      <form
        className="p-6 bg-white shadow-md rounded-lg"
        onSubmit={handleSignUp}
      >
        <h2 className="text-2xl mb-4">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded border shadow">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
