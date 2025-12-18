import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { UsersIcon } from "lucide-react";

import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import { getOutgoingFriendReqs, getUserFriends } from "../lib/api";

const FriendsPage = () => {
  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: outgoingFriendReqs = [], isLoading: loadingOutgoing } =
    useQuery({
      queryKey: ["outgoingFriendReqs"],
      queryFn: getOutgoingFriendReqs,
    });

  const pendingOutgoing = Array.isArray(outgoingFriendReqs)
    ? outgoingFriendReqs.filter((req) => req?.status === "pending")
    : [];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Friends
          </h2>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        <section className="space-y-4">
          <h3 className="text-xl font-semibold">Pending Requests (Sent)</h3>

          {loadingOutgoing ? (
            <div className="flex justify-center py-8">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : pendingOutgoing.length === 0 ? (
            <div className="card bg-base-200 p-6">
              <p className="opacity-70">No pending outgoing requests.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingOutgoing.map((req) => (
                <div
                  key={req._id}
                  className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="card-body p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="avatar w-12 h-12 rounded-full bg-base-300">
                          <img
                            src={req?.recipient?.profilePicture}
                            alt={req?.recipient?.fullName}
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold">
                            {req?.recipient?.fullName}
                          </h4>
                          <p className="text-sm opacity-70">Request pending</p>
                        </div>
                      </div>
                      <span className="badge badge-outline">Pending</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default FriendsPage;
