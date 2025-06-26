"use server";

import { sessionOptions, SessionData, defaultSession } from "@/lib";
import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import connect from "@/dbConfig/dbConfig";
import Expense from "@/models/expense";
import Labour from "@/models/labour"
import Fruit from "@/models/fruit"

connect()

export const getSession = async () => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);

    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }

    return session;
}

export const login = async (
    prevState: { error: undefined | string },
    formData: FormData
) => {
    console.log(`inside login func of actions.ts`)
    const session = await getSession();

    const formUsername = formData.get("username") as string;
    const formPassword = formData.get("password") as string;
    console.log(`username=${formUsername}`)


    try {

        const user = await User.findOne({ username: formUsername })
        console.log(`in action.ts after db query ${user}`)
        if (!user) {
            return { error: "User does not exist status: 400" };
        }
        console.log("user exists");

        const validPassword = await bcryptjs.compare(formPassword, user.password)
        if (!validPassword) {
            return { error: "Invalid password  status: 400" };
        }
        console.log(user);
        session.userId = user._id;
        session.username = formUsername;
        session.isLoggedIn = true;
    } catch (error: any) {
        console.log("Login failed", error.message);

        return { error: error.message };
    }
    await session.save();
    redirect("/");
};

export const signup = async (
    prevState: { error: undefined | string },
    formData: FormData
) => {
    console.log(`inside signup func of actions.ts`)
    const session = await getSession();

    const formUsername = formData.get("username") as string;
    const formEmail = formData.get("email") as string;
    const formPassword = formData.get("password") as string;
    console.log(`username=${formUsername}`)

    try {

        const user = await User.findOne({ username: formUsername })
        console.log(`in action.ts after db query ${user}`)
        if (user) {
            return { error: "Username already exist status: 400" };
        }
        console.log("actions signup Form user does not exists", formUsername);

        const user1 = await User.findOne({ email: formEmail })
        console.log(`in action.ts after db query ${user1}`)
        //email validation
        if (!formEmail) {
            return { error: "Email is required" };
        } else if (!/\S+@\S+\.\S+/.test(formEmail)) {
            return { error: "Email is invalid." };
        }

        if (user1) {
            return { error: "Email already in use exist status: 400" };
        }
        console.log("actions signup email does not exists", formEmail);


        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(formPassword, salt);

        // Create new user
        const newUser = new User({
            username: formUsername,
            email: formEmail,
            password: hashedPassword,
        });
        console.log("actions signup newUser", newUser);

        // Save user to the database
        const savedUser = await newUser.save();
        console.log("Saved user:", savedUser);

    } catch (error: any) {
        console.log("Signup failed", error.message);

        return { error: error.message };
    }

    return { error: "User created successfully. Please login" };

};

export const expenseEntry = async (
    prevState: { error: undefined | string },
    formData: FormData
) => {
    console.log(`inside expenseEntry func of actions.ts`);
    const session = await getSession();

    const formDate = formData.get("date") as string;
    const formAmount = formData.get("amount") as string;
    const formCategory = formData.get("category") as string;
    const formDescription = formData.get("description") as string;
    console.log(`formCategory=${formCategory}`);

    try {
        // To check if amount is not 0
        if (formAmount == "0") {
            return { error: "Amount cannot be 0." };
        }

        // To check if date is not a future date
        const currentDate = new Date();
        const parsedFormDate = new Date(formDate);

        if (isNaN(parsedFormDate.getTime())) {
            return { error: "Invalid date format." }; // Handle invalid date input
        }

        if (parsedFormDate > currentDate) {
            return { error: "Date cannot be in future" };
        }

        const newExpense = new Expense({
            date: formDate,
            amount: formAmount,
            description: formDescription,
            category: formCategory,
        });

        const savedExpense = await newExpense.save();
        console.log("Saved Expense:", savedExpense);
    } catch (error: any) {
        console.log("ExpenseEntry failed", error.message);

        return { error: error.message };
    }

    return { error: "Expense entry saved successfully." };
};

export const fruitEntry = async (
    prevState: { error: undefined | string },
    formData: FormData
) => {
    console.log(`inside fruitEntry func of actions.ts`);
    const session = await getSession();

    const formDate = formData.get("date") as string;
    const formRow = formData.get("row") as string;
    const formCollumn = formData.get("collumn") as string;
    const formCount = formData.get("count") as string;
    const formMessage = formData.get("message") as string;
    console.log(`formdate=${formDate}`);

   try {
        // To check if amount is not 0
        if (formCount == "0") {
            return { error: "Count cannot be 0." };
        }

        // To check if date is not a future date
        const currentDate = new Date();
        const parsedFormDate = new Date(formDate);

        if (isNaN(parsedFormDate.getTime())) {
            return { error: "Invalid date format." }; // Handle invalid date input
        }

        if (parsedFormDate > currentDate) {
            return { error: "Date cannot be in future" };
        }

        const newFruit = new Fruit({
            date: formDate,
            count: formCount,
            message: formMessage,
            row: formRow,
            collumn: formCollumn,
        });    

       const savedFruit = await newFruit.save();
        console.log("Saved Fruit:", savedFruit);
    } catch (error: any) {
        console.log("FruitEntry failed", error.message);

        return { error: error.message };
    }

    return { error: "Fruit entry saved successfully." };
};

export const fruitReport = async (
    prevState: { error: undefined | string },
    formData: FormData
) => {
    console.log(`inside expenseReport func of actions.ts`)
    const session = await getSession();
    const formDate = formData.get("date") as string;
    const formCount = formData.get("count") as string;
    const formRow = formData.get("row") as string;
    const formMessage = formData.get("message") as string;
    console.log(`formdate=${formDate}`)

    try {
        const fruit = await Fruit.find(); // Fetch all expenses from the database
        console.log("Fetched Expenses:", fruit);

        return NextResponse.json(fruit); // Return the list of expenses as JSON
    } catch (error: any) {
        console.error("Error fetching fruit:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export const expenseReport = async (
    prevState: { error: undefined | string },
    formData: FormData
) => {
    console.log(`inside expenseReport func of actions.ts`)
    const session = await getSession();
    const formDate = formData.get("date") as string;
    const formAmount = formData.get("amount") as string;
    const formCategory = formData.get("category") as string;
    const formDescription = formData.get("description") as string;
    console.log(`formCategory=${formCategory}`)

    try {
        const expenses = await Expense.find(); // Fetch all expenses from the database
        console.log("Fetched Expenses:", expenses);

        return NextResponse.json(expenses); // Return the list of expenses as JSON
    } catch (error: any) {
        console.error("Error fetching expenses:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export const fruitEdit = async (
  prevState: { error: undefined | string },
  formData: FormData
) => {
  const session = await getSession();
  const fruitId = formData.get("id") as string; // <-- Add this line
  const formDate = formData.get("date") as string;
  const formRow = formData.get("row") as string;
  const formCollumn = formData.get("collumn") as string;
  const formCount = formData.get("count") as string;
  const formMessage = formData.get("message") as string;
  console.log(`formdate=${formDate}`)
        try {
      const updatedFruit = await Fruit.findByIdAndUpdate(
        fruitId,
        {
          date: formDate,
          count: formCount,
          row: formRow,
          collumn: formCollumn,
          message: formMessage,
        },
        { new: true }
      );

      if (!updatedFruit) {
        return { error: "Fruit not found" };
      }

      return { success: "Fruit updated successfully", updatedFruit };
    } catch (error: any) {
      console.log("FruitEdit failed", error.message);
      return { error: error.message };
    }
  };


export const expenseEdit = async (
    prevState: { error: undefined | string },
    formData: FormData
  ) => {
    const session = await getSession();
    const expenseId = formData.get("id") as string;  // The expense ID to edit
    const formDate = formData.get("date") as string;
    const formAmount = formData.get("amount") as string;
    const formCategory = formData.get("category") as string;
    const formDescription = formData.get("description") as string;

    try {

      

      // Find the expense by its _id and update it
      const updatedExpense = await Expense.findByIdAndUpdate(
        expenseId,
        {
          date: formDate,
          amount: formAmount,
          description: formDescription,
          category: formCategory,
        },
        { new: true }
      );

      if (!updatedExpense) {
        return { error: "Expense not found" };
      }

      return { success: "Expense updated successfully", updatedExpense };
    } catch (error: any) {
      console.log("ExpenseEdit failed", error.message);
      return { error: error.message };
    }
  };

//   export const labourManagement = async (
//     prevState: { error: undefined | string },
//     formData: FormData
// ) => {
//     console.log(`inside labourManagement func of actions.ts`)
//     const session = await getSession();

//     const formDate = formData.get("date") as string;
//     const formShift = formData.get("shift") as string;
//     const formName = formData.get("name") as string;

//     console.log(`formName=${formName}`)

//     try {

//       // To check if date is not future date
//       const currentDate = new Date();
//       if(new Date(formDate).toUTCString() > currentDate.toUTCString()){
//         return { error: "Date cannot be in future" };
//       }

//         const newLabour = new Labour({
//             date: formDate,
//             shift: formShift,
//             name: formName,
//         });

//         const savedLabour = await newLabour.save();
//         console.log("Saved Expense:", savedLabour);

//     } catch (error: any) {
//         console.log("LabourEntry failed", error.message);

//         return { error: error.message };
//     }

//     return { error: "Labour saved successfully." };

// };

export const labourManagement = async (
    prevState: { error: undefined | string },
    formData: FormData
) => {
    console.log(`inside labourManagement func of actions.ts`);
    const session = await getSession();

    const formDate = formData.get("date") as string;
    const formShift = formData.get("shift") as string;
    const formName = formData.get("name") as string;

    console.log(`formName=${formName}`);

    try {
        // To check if date is not a future date
        const currentDate = new Date();
        const parsedFormDate = new Date(formDate);

        if (isNaN(parsedFormDate.getTime())) {
            return { error: "Invalid date format." }; // Handle invalid date input
        }

        if (parsedFormDate > currentDate) {
            return { error: "Date cannot be in future" };
        }

        const newLabour = new Labour({
            date: formDate,
            shift: formShift,
            name: formName,
        });

        const savedLabour = await newLabour.save();
        console.log("Saved Labour:", savedLabour);
    } catch (error: any) {
        console.log("LabourEntry failed", error.message);

        return { error: error.message };
    }

    return { error: "Labour saved successfully." };
};

export const logout = async () => {
    const session = await getSession();
    session.destroy();
    redirect("/");
}
