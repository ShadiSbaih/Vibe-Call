import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, // Exclude current user
        { _id: { $nin: currentUser.friends } }, // Exclude  current user's friends
        { isOnboarded: true }, // Only include onboarded users
      ],
    });

    res.status(200).json({
      message: "Recommended users fetched successfully",
      recommendedUsers: recommendedUsers,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Internal server error- unable to fetch Recommended users",
      err: err.message,
    });
  }
}

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePicture  nativeLanguage learningLanguage location"
      );
    res.status(200).json({
      message: "My Friends fetched successfully",
      friends: user.friends,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal server error- unable to fetch My Friends",
      err: error.message,
    });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    console.log("Attempting friend request:", { myId, recipientId });

    // prevent sending req to yourself
    if (myId === recipientId) {
      console.log("Cannot send to self");
      return res.status(400).json({ 
        message: "You can't send friend request to yourself",
        errorType: "SELF_REQUEST" 
      });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      console.log("Recipient not found");
      return res.status(404).json({ 
        message: "Recipient not found",
        errorType: "USER_NOT_FOUND" 
      });
    }

    // Use proper ObjectId comparison for MongoDB
    const isFriendAlready = recipient.friends.some(
      friendId => friendId.toString() === myId.toString()
    );
    
    console.log("Is already friends:", isFriendAlready);
    
    if (isFriendAlready) {
      return res.status(400).json({ 
        message: "You are already friends with this user",
        errorType: "ALREADY_FRIENDS" 
      });
    }

    // Check for existing requests properly
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId, status: "pending" },
        { sender: recipientId, recipient: myId, status: "pending" },
      ],
    });

    console.log("Existing request:", existingRequest);

    if (existingRequest) {
      return res.status(400).json({ 
        message: "A friend request already exists between you and this user",
        errorType: "REQUEST_EXISTS" 
      });
    }

    // Create friend request
    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
      status: "pending"
    });

    console.log("Friend request created successfully");
    
    return res.status(201).json({
      message: "Friend request sent successfully",
      friendRequest
    });
  } catch (error) {
    console.error("Error in sendFriendRequest:", error);
    return res.status(500).json({ 
      message: "Internal Server Error",
      error: error.message 
    });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;
    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }
    //verify if the current user is the recipient of the request
    if (friendRequest.recipient.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to accept this friend request",
      });
    }
    friendRequest.status = "accepted";
    await friendRequest.save();

    //add each user to other's friends list
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });
    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    res
      .status(200)
      .json({ message: "Friend request accepted successfully", friendRequest });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal server error- unable to accept Friend Request",
      err: error.message,
    });
  }
}

export async function getFriendRequests(req, res) {
  try {
    const incomingReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate("sender", "fullName profilePicture nativeLanguage learningLanguage");

    const acceptedReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullName profilePicture");

    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    console.log("Error in getPendingFriendRequests controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
//this function is used to get the outgoing friend requests of the user
//it is used in the friend request screen to show the requests that are sent by the user
export async function getOutgoingFriendRequests(req, res) {
  try {
    const myId = req.user.id;
        // Get ALL outgoing requests, not just pending ones
    const outgoingReqs = await FriendRequest.find({
      sender: myId,
      // Remove status filter to get all requests
    }).populate(
      "recipient",
      "fullName profilePicture nativeLanguage learningLanguage location"
    );
        res.status(200).json(outgoingReqs);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal server error- unable to fetch outgoing Friend Requests",
      err: error.message,
    });
  }
}