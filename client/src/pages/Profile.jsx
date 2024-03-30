import React, { useState, useEffect } from "react";

import { useStateContext } from "../context";
import { DisplayCampaigns } from "../components";
import { CustomButton } from "../components";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns, deleteUserCampaigns } =
    useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const campaigns = await getUserCampaigns();
    setCampaigns(campaigns);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <div>
      <DisplayCampaigns
        isLoading={isLoading}
        campaigns={campaigns}
        title="All Campaigns"
      />
    </div>
  );
};

export default Profile;
