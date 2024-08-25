import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import './App.css'
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async codeResponse => {
      console.log("codeResponse", codeResponse);
      const data = await axios.post("http://localhost:3021/v1/auth/login", {
        code: codeResponse.code,
      })

      setUser(data.data)

      console.log("token", data)
    },
    onError: errorResponse => console.log(errorResponse)
  })

  return (
    <>
      <div className="card">
        <button onClick={googleLogin}>
          Login
        </button>

        { user ? (
          <p>{JSON.stringify(user)}</p>
        ) : null }
      </div>
    </>
  )
}

export default App
