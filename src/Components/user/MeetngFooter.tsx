import { useUser } from "@clerk/clerk-react";

const MeetngFooter = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div>
      <div>
        <p>PM</p>
        {isSignedIn && user && (
          <div className="flex items-center gap-2">
            <img
              src={user.imageUrl}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <span>{user.fullName}</span>
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default MeetngFooter;
