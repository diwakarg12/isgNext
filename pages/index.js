import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from 'react';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/${username}`);
  };
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center ${inter.className}`}
    >
      <div className="p-12 border bg-white text-black">
        <h1 className="text-6xl font-bold">User Github Info</h1>
        <form onSubmit={handleSubmit}>
          <input
            className='bg-slate-700 p-2 rounded w-[100%] font-medium text-white block m-auto my-4 focus:outline-none placeholder:text-slate-100'
            type="text"
            placeholder="Enter GitHub username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit" className="bg-green-500 p-2 rounded font-semibold hover:bg-green-800 hover:text-white">Go to Profile</button>
        </form>
      </div>
    </main>
  );
}
