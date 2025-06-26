
import { getSession } from "@/actions"
import LoginForm from "@/components/loginForm"
import { redirect } from "next/navigation"

const LoginPage = async () => {
    const session = await getSession()

    if(session.isLoggedIn){
        console.log(`session logged in`)
        redirect("/")
    }
    return (
        <div className="Page-Title">
            <h2>Welcome to the LoginPage</h2>
            <LoginForm/>
        </div>
    )
}

export default LoginPage
