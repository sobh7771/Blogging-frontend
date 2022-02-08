import React from "react";
import PrivateRouter from "../components/PrivateRouter";
import ProfileDetails from "../components/ProfileDetails";
import ProfileTimeline from "../components/ProfileTimeline";

const ProfilePage = () => {
  return (
    <PrivateRouter>
      <>
        <ProfileDetails />
        <ProfileTimeline />
      </>
    </PrivateRouter>
  );
};

export default ProfilePage;
