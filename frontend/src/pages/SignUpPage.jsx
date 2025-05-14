import { useState } from "react"
import { LoaderPinwheel } from "lucide-react"
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp";
const SignUpPage = () => {

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // const queryClient = useQueryClient();
  // const { isPending, mutate: signUpMutation, error } = useMutation({
  //   mutationKey: ["signup"],
  //   mutationFn: signUp,
  //   onSuccess: () => {
  //     // After the mutation is successful, invalidate the "authUser" query
  //     // to ensure the latest authenticated user data is fetched from the server.
  //     // This helps keep the UI in sync with the backend changes.
  //     queryClient.invalidateQueries({ queryKey: ["authUser"] });// Invalidate the authUser query to refetch user data
  //     toast.success("Account created successfully.");
  //   },
  //   onError: (error) => {
  //     // Handle error case
  //     console.error("Error during signup:", error);
  //     toast.error(error?.response?.data?.message || "An error occurred during signup.");
  //   },
  // });

const {isPending,error,signUpMutation} = useSignUp();// custom hook for signup
  const handleSignup = (e) => {
    e.preventDefault();
    signUpMutation(signupData)
    console.log(signupData);
  }

  return (
    <div data-theme="winter" className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden ">
        {/*Signup form  - Left Side*/}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/*LOGO*/}
          <div className="mb-4 flex items-center justify-start gap-2 ">
            <LoaderPinwheel className="size-9  text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">Vibe Call</span>
          </div>
          {/*Error message*/}

          {/* ERROR MESSAGE IF ANY */}
          {error && (
            <div className="alert alert-error mb-4 text-base">
              <span>{error.response.data.message}</span>
            </div>
          )}

          {/*Signup form*/}
          <div className="w-full">
            <form onSubmit={handleSignup} className="">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold"> Create an Account</h2>
                <p className="text-sm opacity-80">Join to Vibe Call and start your language learning adventure!</p>
                <div className="space-y-3">
                  {/*Full Name*/}
                  <div className="form-control w-full">
                    <label htmlFor="fullName" className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input type="text"
                      required
                      id="fullName"
                      placeholder="Shadi Sbaih"
                      className="input input-bordered w-full"
                      value={signupData.fullName} onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })} />
                  </div>
                  {/*Email*/}
                  <div className="form-control w-full">
                    <label htmlFor="email" className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input type="text"
                      required
                      id="email"
                      placeholder="shadi@hotmail.com"
                      className="input input-bordered w-full"
                      value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} />
                  </div>
                  {/*Password*/}
                  <div className="form-control w-full">
                    <label htmlFor="password" className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input type="password"
                      required
                      id="password"
                      placeholder="********"
                      className="input input-bordered w-full"
                      value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} />
                    <p className="text-sm opacity-70 mt-1">Password must be at least 6 characters long</p>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input type="checkbox" className="checkbox checkbox-sm" required />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline">terms of service</span> and{" "}
                        <span className="text-primary hover:underline">privacy policy</span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <button className="btn btn-primary w-full" type="submit">
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Loading...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
              <div className="text-center mt-4">
                <p className="text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        {/* SIGNUP FORM - RIGHT SIDE */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/Video call-pana.svg" alt="Language connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="opacity-70 text-base">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
