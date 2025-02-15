// src/pages/index.js
import { signIn, signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <motion.h1
        className="text-4xl font-bold mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Haircut Visualizer
      </motion.h1>
      <motion.p
        className="mb-8 text-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        See how you’d look with a variety of stylish haircuts.
      </motion.p>

      {status === "loading" ? (
        <p>Loading...</p>
      ) : session ? (
        <div className="flex flex-col items-center">
          <motion.p
            className="mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Welcome, <span className="font-semibold">{session.user.name}</span>
          </motion.p>
          <motion.button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition"
            whileHover={{ scale: 1.05 }}
          >
            Sign Out
          </motion.button>
          <motion.a
            href="/dashboard"
            className="mt-6 underline hover:text-gray-300"
            whileHover={{ scale: 1.05 }}
          >
            Go to Dashboard
          </motion.a>
          <motion.a
            href="/profile"
            className="mt-4 underline hover:text-gray-300"
            whileHover={{ scale: 1.05 }}
          >
            View Profile
          </motion.a>
        </div>
      ) : (
        <motion.button
          onClick={() => signIn("google")}
          className="px-6 py-3 bg-blue-500 rounded hover:bg-blue-600 transition"
          whileHover={{ scale: 1.05 }}
        >
          Sign In with Google
        </motion.button>
      )}
    </div>
  );
}
