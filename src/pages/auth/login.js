import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      alert("Sign in successful");
      router.push("/");
    } catch (error) {
      console.error("Error during sign in:", error);
      alert("Sign in failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center mt-[10vw] h-fit">
      <form className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl mb-4">Sign In</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-center">
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded border shadow"
            onClick={() => handleLogin()}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
