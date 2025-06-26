
//import React, { useState, useEffect } from "react";
import {redirect, useRouter} from "next/navigation";
import {getSession} from "@/actions";
import SignupForm from "@/components/signupForm";




export default async function SignupPage() {

    const session = await getSession()

    if(session.isLoggedIn){
        console.log(`signup page session logged in`)
        redirect("/")
    }
    return (
        <div className="Page-Title">
            <h2>Welcome to the Signup Page</h2>
            <SignupForm/>
        </div>
    )

}
