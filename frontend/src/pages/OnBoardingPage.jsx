import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeBoarding } from "../lib/api";
import { CameraIcon, ShuffleIcon, LoaderPinwheel, LoaderIcon, MapPinIcon } from "lucide-react";
import { LANGUAGES } from "../constants";

const OnBoardingPage = () => {

  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    learningLanguage: authUser?.learningLanguage || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    location: authUser?.location || "",
    profilePicture: authUser?.profilePicture || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeBoarding,
    onSuccess: (data) => {
      toast.success("Profile onboarded successfully:", data?.fullName);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error("Error in onboarding:", error?.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);

  const handleRandomAvatar = () => {
    setIsAvatarLoading(true);
    const idx = Math.floor(Math.random() * 100) + 1;
    let randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    // Create a new Image to preload
    const img = new Image();
    img.src = randomAvatar;

    img.onload = () => {
      setFormState((prevState) => ({
        ...prevState,
        profilePicture: randomAvatar,
      }));
      toast.success("Random Avatar Generated");
      setIsAvatarLoading(false);
    };

    img.onerror = () => {
      toast.error("Failed to load avatar image");
      setIsAvatarLoading(false);
    };
  }
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card w-full max-w-3xl shadow-2xl bg-base-200">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Complete Your Profile </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/*Profile Picture Container*/}
            <div className="flex flex-col items-center justify-center space-y-6">
              {/* Profile Picture Preview */}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden" >
                {isAvatarLoading ? (
                  // Skeleton loader
                  <div className="flex items-center justify-center h-full w-full animate-pulse bg-base-300">
                    <LoaderIcon className="size-12 text-base-content opacity-40 animate-spin" />
                  </div>
                ) : formState?.profilePicture ? (
                  <img src={formState.profilePicture} alt="Profile Preview Image" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>
              {/* Generate Random avatar image button */}
              <div className="flex items-center gap-2">
                <button className="btn btn-accent" type="button" onClick={handleRandomAvatar}>
                  <ShuffleIcon className="size-6 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
            </div>
            {/*Full Name*/}
            <div className="form-control">
              <label htmlFor="fullName" className="label">
                <span className="label-text text-base">Full Name</span>
              </label>
              <input type="text"
                required
                autoComplete="off"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                className="input input-bordered w-full "
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
              />
            </div>
            {/*Bio*/}
            <div className="form-control">
              <label htmlFor="bio" className="label">
                <span className="label-text text-base">Bio</span>
              </label>
              <textarea
                id="bio"
                name="bio"
                placeholder="Tell us about yourself"
                className="textarea textarea-bordered h-24 text-base"
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
              />
            </div>

            {/* Languages*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/*Native Language*/}
              <div className="form-control">
                <label className="label" htmlFor="nativeLanguage">
                  <span className="label-text text-base">Native Language</span>
                </label>
                <select
                 value={formState.nativeLanguage} 
                  name="nativeLanguage"
                  id="nativeLanguage"
                  className="select select-bordered w-full"
                  onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}>
                  <option value="" disabled>Select your native Language </option>
                  {LANGUAGES.map((language) => (
                    <option key={`native-${language}`} value={language.toLowerCase}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>

              {/* Learning Language*/}
              <div className="form-control">
                <label className="label" htmlFor="learningLanguage">
                  <span className="label-text text-base">Learning Language</span>
                </label>
                <select
                 value={formState.learningLanguage}
                  name="learningLanguage"
                  id="learningLanguage"
                  className="select select-bordered w-full"
                  onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}>
                  <option value="" disabled>Select your learning Language </option>
                  {LANGUAGES.map((language) => (
                    <option key={`learning-${language}`} value={language.toLowerCase}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* LOCATION */}
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70 mt-1" />
                <input
                  required
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className="input input-bordered w-full pl-10"
                  placeholder=" Country"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}

            <button className="btn btn-primary w-full !mt-14" disabled={isPending} type="submit">
              {!isPending ? (
                <>
                  <LoaderPinwheel className="size-5 mr-2" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OnBoardingPage