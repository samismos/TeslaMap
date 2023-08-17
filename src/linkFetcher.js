import { useEffect, useState } from 'react';
import axios from 'axios';

const LinkFetcher = ({ onDataFetched }) => {
  useEffect(() => {
    const fetchLinkIds = async () => {
      try {
        const response = await axios.get('https://feed.opendata.imetb.gr/fcd/congestions.json?limit=50');
        const linkIds = response.data.map(item => item.Link_id);
        onDataFetched(linkIds);
      } catch (error) {
        console.error('Error fetching Link_ids', error);
      }
    };

    fetchLinkIds();
  }, []);

  return null; // This component doesn't render anything
};

export default LinkFetcher;