import { useState } from "react";

// Enter a valid infura key here to avoid being rate limited
// You can get a key for free at https://infura.io/register
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const APIURL_OPENSEA = "https://api.thegraph.com/subgraphs/name/messari/opensea-v2-ethereum"

function useGraphClient() {
  const [client, setClient] = useState();

  const initiateClient = (netId) => {
    //if(!client && netId){
    let newClient = new ApolloClient({
      uri: APIURL_OPENSEA,
      cache: new InMemoryCache()
    });

    setClient(newClient);
  }
  const getTopCollections = async (address, netId) => {
    let tokensQuery = `
    {
        trades(first: 9,orderBy: priceETH,orderDirection:desc){
          id
          tokenId
          priceETH
          timestamp
          collection {
            id
            name
            totalSupply
            totalRevenueETH
            symbol
          }
        }
    }
   `;
    const results = await client.query({
      query: gql(tokensQuery)
    });
    return (results);
  }

  return ({ client, initiateClient, getTopCollections })
}

export default useGraphClient;
