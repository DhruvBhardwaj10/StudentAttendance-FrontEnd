
import React from 'react'
import { SignIn } from '@clerk/clerk-react'
export default function Login() {
  return (
    <div>
    <SignIn signUpUrl='/signup' forceRedirectUrl={"/dashboard"}/>

    </div>
      
  )
}