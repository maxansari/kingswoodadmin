import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../lib/firebaseConfig';

const withAuth = (Component) => {
    return (props) => {
        const [user, loading] = useAuthState(auth);
        const router = useRouter();

        useEffect(() => {
            if (!loading && !user) {
                router.push('/'); // Redirect to login if not authenticated
            }
        }, [user, loading, router]);

        if (loading || !user) return <p>Loading...</p>; // Show loading state

        return <Component {...props} />;
    };
};

export default withAuth;
