import { ethers } from "hardhat";

async function main() {
  const signers = await ethers.getSigners();
  const Minter = await ethers.getContractFactory("Minter");
  const CustomNFT = await ethers.getContractFactory("CustomNFT");
  const minterDeployment = await Minter.deploy();

  const minterContract = await minterDeployment.deployed();
  const nftContractAddress = await minterContract.NFT();
  console.log(`NFT Minter Deployed at address: ${minterDeployment.address}`);
  console.log(`ERC721 Deployed at address: ${nftContractAddress}`);

  console.log(`Minting Sample NFT`);
  const mintTx = await minterContract.mint({value: ethers.utils.parseEther('1')});
  await mintTx.wait(1);

  console.log(`NFT Minted ${mintTx.hash}`);
  const customNFTContract = CustomNFT.attach(nftContractAddress);
  console.log(`Deployer NFT Count ${await customNFTContract.balanceOf(signers[0].address)}`);
  console.log(`Deployer NFT Data ${await customNFTContract.tokenURI(0)}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
