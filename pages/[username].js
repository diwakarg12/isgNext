import { useRouter } from 'next/router';
import { useEffect } from 'react';

const UserProfile = ({ user }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div className='flex flex-col items-center justify-center h-screen text-3xl font-semibold'>Loading...</div>;
    }

    if (user.message === "Not Found") {
        useEffect(() => {
            setTimeout(() => {
                router.replace('/');
            }, 2000)
        }, [])
        return <div className='flex flex-col items-center justify-center h-screen text-3xl'>User not found, Returning to Home....</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="">
                <img src={user.avatar_url} alt={user.login} width="250" height="200" className="rounded border-none mb-4" />
                <h1 className="text-xl font-medium">{`Name: ${user.name}`}</h1>
                <p className="text-xl font-medium">{`Public repos:  ${user.public_repos}`}</p>
                <p className="text-xl font-medium">{`Followers: ${user.followers}`}</p>
                <a href={user.html_url} target="_blank" rel="noopener noreferrer" className='underline decoration-yellow-600 text-blue-700 font-medium text-lg'>Visit profile on GitHub</a>
            </div>
        </div>
    );
};

export async function getStaticProps({ params }) {
    try {
        const res = await fetch(`https://api.github.com/users/${params.username}`);
        const user = await res.json();

        return {
            props: {
                user,
            },
            // revalidate: 5,
        };
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return {
            props: {
                user: null,
            },
        };
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    };
}

export default UserProfile;
