import { ethers } from 'ethers';
const minterJson = require('../../OnChain/artifacts/contracts/Minter.sol/Minter.json');
const customNFTJson = require('../../OnChain/artifacts/contracts/CustomNFT.sol/CustomNFT.json');

window.connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    return await signer.getAddress();
}

window.getBalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return ethers.utils.formatEther(await signer.getBalance());
}

window.getAddress = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return await signer.getAddress();
};

window.deployContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const Minter = new ethers.ContractFactory(minterJson['abi'], minterJson['bytecode'], signer);
    const CustomNFT = new ethers.ContractFactory(customNFTJson['abi'], customNFTJson['bytecode'], signer);
    console.log('Deploying Minter Contract');
    const minterContract = await Minter.deploy();
    await minterContract.deployTransaction.wait(1);
    console.log('Contract Deployed: ', minterContract.address);
    console.log('Minting NFT');

    const mintTx = await minterContract.mint({ value: ethers.utils.parseEther('1') });
    await mintTx.wait(1);

    console.log(`NFT Minted ${mintTx.hash}`);
    const nftContractAddress = await minterContract.NFT();
    const customNFTContract = CustomNFT.attach(nftContractAddress);
    console.log(`Deployer NFT Count ${await customNFTContract.balanceOf(await signer.getAddress())}`);
    console.log(`Deployer NFT Data ${await customNFTContract.tokenURI(0)}`);
}