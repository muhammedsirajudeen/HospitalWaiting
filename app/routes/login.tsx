// app/routes/form-example.tsx
import { ActionFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { z } from "zod";
// import { zfd } from "zod-form-data";
import { Button } from "~/components/ui/button";
import AuthService from "~/services/AuthService";
import { CodeResponse, useGoogleLogin } from '@react-oauth/google';
import axios from "axios";

// Define your Zod schema
const FormSchema = z.object({
    email: z.string()
      .email("Invalid email address"),
    
    password: z.string()
      .min(8, "Password must be at least 8 characters long")
      .max(50, "Password must not exceed 50 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(/[@$!%*?&#^(){}[\]:;<>,./\\|_+=-]/, "Password must contain at least one special character"),
  
    // age: z.number().min(18, "You must be at least 18 years old"),
  });

// Action to handle form submission
interface ErrorMessage{
    password:string,
    email:string
}
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const result = FormSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
      const errors=result.error.errors??[]
      const errorMessage:ErrorMessage={password:"",email:""} 
      //setting it manually to the desired format
      for(const error of errors){
        if(error.path[0]==='password'){
            errorMessage['password']=error.message
        }else if(error.path[0]==='email'){
            errorMessage['email']=error.message
        }
      }
      return errorMessage
  }

  const { password, email } = result.data;

  // Perform your desired logic with validated data
  console.log({ password, email });
  const user=await AuthService.LoginUser(email,password)
  console.log(user)
  //here we connect with the database inorder to like perform logic
  return null
};

export default function FormExample() {
  const actionData = useActionData<ErrorMessage>();
  console.log("the action data is",actionData)
  const login = useGoogleLogin({
    onSuccess: (codeResponse:CodeResponse) => {
        console.log(codeResponse)
    },
    onError: (error) => console.log('Login Failed:', error)
});
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      {/* <h1>Form with Zod Validation</h1> */}
      <Form method="post" className="flex flex-col justify-center items-center " >
        <div>
          <label  >
            <p className="outfit-card-custom text-sm" >Email:</p>
            <input type="text" name="email" className="border border-gray-300 rounded-sm mt-2 p-1 w-80 placeholder:text-gray-400 placeholder:text-xs" placeholder="Email"  />
          </label>
          <p className="text-red-500 text-xs">{actionData?.email}</p>
        </div>

        <div className="mt-4" >
          <label>
            <p className="outfit-card-custom text-sm">Password</p>
            <input type="password" name="password" className="border border-gray-300 rounded-sm mt-2 p-1 w-80 placeholder:text-gray-400 placeholder:text-xs" placeholder="Password"/>
          </label>
          <p className="text-red-500 text-xs">{actionData?.password}</p>
        </div>


        <Button className="mt-10 bg-cardcolorprimary p-1 text-sm text-white rounded-sm w-40 h-8"  type="submit">Submit</Button>
      </Form>
      <hr className="font-bolder w-3/4 bg-black mt-10" />
      <p className="mt-10 text-xs text-gray-600">or continue with google</p>
      <button onClick={login}  className="mt-10 bg-white border border-hidden"  >
        <img src="/google.png"  alt="google login" />
      </button>
    </div>
  );
}
