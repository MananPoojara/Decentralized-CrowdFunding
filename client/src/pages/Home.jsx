import React, { useState, useEffect } from 'react'

import { useStateContext } from '../context'
import { DisplayCampaigns } from '../components'

const Home = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [campaigns, setCampaigns] = useState([])

    const { address, contract, getCampaigns } = useStateContext()
    
    const fetchCampaigns = async () => {
        setIsLoading(true)
        const campaigns = await getCampaigns()
        setCampaigns(campaigns)
        setIsLoading(false)
    }

    useEffect(() => {
        if (contract) fetchCampaigns()
    }, [address, contract])

    return (
        <DisplayCampaigns 
            isLoading={isLoading}
            campaigns={campaigns}
            title="All Campaigns"
        />
    )
}

export default Home