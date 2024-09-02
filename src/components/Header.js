import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-stone-100 text-white p-4 fixed w-full top-0 z-50 border shadow-sm">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="space-x-4">
          <Link
            href="/"
            className="hover:underline text-black rounded p-2 border shadow"
          >
            Home
          </Link>
        </div>
        <div className="space-x-4">
          {status === "authenticated" ? (
            <div className="flex justify-between gap-5">
              <span className="text-black text-lg">
                Welcome, {session.user.name}!
              </span>
              <button
                onClick={() => signOut()}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
