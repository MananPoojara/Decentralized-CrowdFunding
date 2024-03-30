import React, { createContext, useContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0x79a8FB1Bc264031ec1D5e78d09788896f41062a7"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
        args: [
          address,
          form.title,
          form.description,
          form.target,
          new Date(form.deadline).getTime(),
          form.image,
        ],
      });

      console.log("Contract Call Successful", data);
    } catch (error) {
      console.log("Contract Call Error", error);
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract.call("getCampaigns");

    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      pId: i,
    }));

    return parsedCampaigns;
  };

  const deleteUserCampaigns = async (campaignId) => {
    try {
      // Assuming useStateContext provides access to your contract instance and user address
      // Call the deleteCampaign function on the contract
      await contract.call("deleteCampaign", [campaignId]);
      // Refresh the user's campaigns after deleting the campaign
    } catch (error) {
      console.error("Error deleting user campaign:", error);
      // Handle errors as needed
    }
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const userCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );

    return userCampaigns;
  };

  const donate = async (pId, amount) => {
    const data = await contract.call("donateToCampaign", [pId], {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  const getDonations = async (pId) => {
    const donations = await contract.call("getDonators", [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  const getNumberOfCampaigns = async (user) => {
    const allCampaigns = await getCampaigns();

    const userCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === user
    );

    return userCampaigns.length;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        getNumberOfCampaigns,
        deleteUserCampaigns,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
