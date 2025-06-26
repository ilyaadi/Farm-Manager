import { getSession } from "@/actions";
import HomePageForm from "@/components/HomePageForm";
const Homepage = async () => {
    const session = await getSession();
    return (
        <div className="Page-Title">
            <h2>Welcome to the homepage {session.isLoggedIn ? session.username : ""}</h2>
            <p>{session.isLoggedIn ? "" : "Please login to access features on this page!"} </p>
            <HomePageForm />
        </div>
    )
}

export default Homepage;
