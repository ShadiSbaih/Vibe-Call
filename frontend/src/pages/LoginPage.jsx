import { useState } from "react";
import { LoaderPinwheel } from "lucide-react"
import { Link } from "react-router";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  // const queryClient = useQueryClient();

  // const { mutate: LoginMutation, isPending, error } = useMutation({
  //   mutationKey: ["loginPage"],
  //   mutationFn: login,
  //   onSuccess: (data) => {
  //     console.log("Login Success", data);
  //     queryClient.invalidateQueries({ queryKey: ["authUser"] });// this will invalidate the authUser query and refetch it
  //   },
  //   onError: (error) => {
  //     console.log("Login Error", error);
  //   },
  // });

  const { LoginMutation, isPending, error } = useLogin();//login hook

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login Data", loginData);
    LoginMutation(loginData);// this will call the login function from api.js
  }

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme="winter">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* Left form section */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* Logo */}
          <div className="mb-4 flex items-center justify-start gap-4">
            <LoaderPinwheel className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">Vibe Call</span>
          </div>
          {/* Error message */}
          {error && (
            <div className="alert alert-error mb-4 text-base">
              <span>{error?.response?.data?.message || "An error occurred during login."}</span>
            </div>
          )}
          {/* Login form */}
          <div className="w-full">
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Welcome back</h2>
                <p className="text-base opacity-70">
                  Sign in to your account to continue
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <div className="form-control w-full space-y-2">
                  <label htmlFor="email" className="label  ">
                    <span className="label-text text-base">Email</span>
                  </label>
                  <input
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    placeholder="shadi@gmail.com"
                    required
                    type="text"
                    className="input input-bordered w-full"
                    id="email" />
                </div>

                <div className="form-control w-full space-y-2">
                  <label htmlFor="Password" className="label ">
                    <span className="label-text text-base">Password</span>
                  </label>
                  <input
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    placeholder="********"
                    required
                    type="password"
                    className="input input-bordered w-full"
                    id="Password" />
                </div>
                
                <button disabled={isPending} className="btn btn-primary w-full text-base" type="submit">
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
                <div className="text-center mt-4">
                  <p className="text-sm">Don't have an account?
                    <Link to="/signup" className="text-primary hover:underline">     Create One</Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* Right image section */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/Video call-pana.svg" alt="Language connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="opacity-70 font-base text-base">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default LoginPage