import { useNavigate } from 'react-router-dom';

type Props = { children: React.ReactNode };

export default function ProtectedRoute({ children }: Props) {
    const navigate = useNavigate(); // Move this line inside the component

    const token = localStorage.getItem("token");
    if (token) {
        return children;
    }

    // You should navigate inside the function, not at the module level
    navigate('/');

    // You might want to return null or a message here as well
    return null;
}
