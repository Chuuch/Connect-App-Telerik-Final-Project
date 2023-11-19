// import { Navigate, useLocation } from 'react-router-dom';
// import { auth } from '../config/firebase-config';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { toast } from 'react-hot-toast';

// interface AuthenticatedProps {
//   children: React.ReactNode;
// }

// const Authenticated: React.FC<AuthenticatedProps> = ({ children }) => {
//   const location = useLocation();
//   const [user, loading, error] = useAuthState(auth);

//   if (loading) {
//     return <div>{toast.success('Initialising user..')}</div>;
//   }

//   if (error) {
//     return <div>{toast.error('Something went wrong!')}</div>;
//   }

//   if (user) {
//     return children;
//   } else {
//     return <Navigate to="/login" state={{ from: location }} />;
//   }
// };

// export default Authenticated;
