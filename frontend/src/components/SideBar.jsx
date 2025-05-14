import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, LoaderPinwheel, UsersIcon } from "lucide-react"

const SideBar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;
  console.log("%cCurrent Path: %c" + currentPath,
    "color:red; font-size: 16px; font-weight: bold;",
    "color:cyan; font-size: 14px;font-weight: bold;")
  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 lg:flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-base-300">
        <Link to="/" className="flex items-center gap-2.5">
          <LoaderPinwheel className="size-9 text-primary" />
          <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">Vibe Call</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {/*Home Link*/}
        <Link to="/" className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case${currentPath === "/" ? " btn-active" : ""}`}>
          <HomeIcon className="size-5 text-base-content opacity-80" />
          <span className="text-base-content opacity-90">Home</span>
        </Link>
        {/*Friends Link*/}
        <Link to="/friends" className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case${currentPath === "/friends" ? " btn-active" : ""}`}>
          <UsersIcon className="size-5 text-base-content opacity-80" />
          <span className="text-base-content opacity-90">Friends</span>
        </Link>
        {/*Notifications Link*/}
        <Link to="/notifications" className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case${currentPath === "/notifications" ? " btn-active" : ""}`}>
          <BellIcon className="size-5 text-base-content opacity-80" />
          <span className="text-base-content opacity-90">Notifications</span>
        </Link>
      </nav>
      {/* User Profile Section */}
      <div className="p-4 border-t border-base-300 mt-auto">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={authUser ? authUser.profilePicture : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} alt="User avatar" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{authUser?.fullName}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block"/>
                Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default SideBar