import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const tokenABI = [
  // Add the relevant parts of the ABI here
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

async function main() {
  const tokenContractAddress = process.env.NEXT_CONTRACT_ADDRESS;
  if (!tokenContractAddress || tokenContractAddress.length <= 0) {
    throw new Error("error check env file, invalid contract address");
  }
  const infuraApiKey = process.env.INFURA_API_KEY;
  if (!infuraApiKey || infuraApiKey.length <= 0) {
    throw new Error("error check env file, invalid infura api key");
  }

  const provider = new ethers.providers.InfuraProvider(
    "arbitrum",
    process.env.INFURA_API_KEY
  );

  // Create a contract instance
  let tokenContract = new ethers.Contract(
    tokenContractAddress,
    tokenABI,
    provider
  );

  // Call the totalSupply function
  let totalSupply = await tokenContract.totalSupply();

  // The total supply is a BigNumber; format it
  console.log(ethers.utils.formatUnits(totalSupply));
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
