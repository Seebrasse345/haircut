// src/pages/profile.js
import { useSession, getSession } from "next-auth/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-4xl font-bold mb-6">Profile</h1>
      <div className="flex flex-col items-center">
        {session.user.image && (
          <img
            src={session.user.image}
            alt="User profile"
            className="w-32 h-32 rounded-full mb-4"
          />
        )}
        <p className="text-xl">
          <strong>Name:</strong> {session.user.name}
        </p>
        <p className="text-xl">
          <strong>Email:</strong> {session.user.email}
        </p>
        {session.user.bio && (
          <p className="text-xl mt-2">
            <strong>Bio:</strong> {session.user.bio}
          </p>
        )}
      </div>
      <a
        href="/dashboard"
        className="mt-6 underline text-blue-400 hover:text-blue-300"
      >
        Back to Dashboard
      </a>
    </motion.div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: { session } };
}
