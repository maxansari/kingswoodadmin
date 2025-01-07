import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig"; // Adjust the path as needed

const handleLogout = async () => {



    try {
        await signOut(auth);
        return true;
    } catch (error) {
        console.error("Error logging out:", error);
        return false;
    }
};

export default handleLogout;