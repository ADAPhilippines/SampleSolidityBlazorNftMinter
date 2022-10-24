import { ethers, BigNumber } from 'ethers';
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
}

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

window.mintNft = async (contractAddress: string) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const Minter = new ethers.ContractFactory(minterJson['abi'], minterJson['bytecode'], signer);
    const minterContract = Minter.attach(contractAddress);
    const mintTx = await minterContract.mint({ value: ethers.utils.parseEther('1') });
    await mintTx.wait(1);
}

window.countNft = async (contractAddress: string) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    const Minter = new ethers.ContractFactory(minterJson['abi'], minterJson['bytecode'], signer);
    const CustomNFT = new ethers.ContractFactory(customNFTJson['abi'], customNFTJson['bytecode'], signer);
    const minterContract = Minter.attach(contractAddress);
    const nftContractAddress = await minterContract.NFT();
    const customNFTContract = CustomNFT.attach(nftContractAddress);
    return customNFTContract.balanceOf(signerAddress);
}

window.getNfts = async (contractAddress: string) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    const nftCount = await window.countNft(contractAddress);
    const Minter = new ethers.ContractFactory(minterJson['abi'], minterJson['bytecode'], signer);
    const CustomNFT = new ethers.ContractFactory(customNFTJson['abi'], customNFTJson['bytecode'], signer);

    const minterContract = Minter.attach(contractAddress);
    const nftContractAddress = await minterContract.NFT();
    const customNFTContract = CustomNFT.attach(nftContractAddress);
    const result = [];

    for (let i = 0; i < nftCount.toNumber(); i++) {
        const tokenId = await customNFTContract.tokenOfOwnerByIndex(signerAddress, i) as BigNumber;
        const metadataReq = await fetch(await customNFTContract.tokenURI(tokenId));
        const metadata = await metadataReq.json();
        result.push({ tokenId: tokenId.toHexString(), ...metadata });
    }

    return result;
}

window.getNFTContractAddress = async (contractAddress: string) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const Minter = new ethers.ContractFactory(minterJson['abi'], minterJson['bytecode'], signer);
    const CustomNFT = new ethers.ContractFactory(customNFTJson['abi'], customNFTJson['bytecode'], signer);
    const minterContract = Minter.attach(contractAddress);
    return await minterContract.NFT();
}