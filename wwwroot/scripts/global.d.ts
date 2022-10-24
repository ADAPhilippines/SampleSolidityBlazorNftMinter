import { BigNumber } from 'ethers';
export { }
declare global {
    interface Window {
        connectWallet: () => Promise<string>,
        getBalance: () => Promise<string>,
        getAddress: () => Promise<string>,
        deployContract: () => Promise<void>,
        mintNft: (contractAddress: string) => Promise<void>,
        countNft: (contractAddress: string) => Promise<BigNumber>,
        getNfts: (contractAddress: string) => Promise<any[]>,
        getNFTContractAddress: (contractAddress: string) => Promise<string>
        ethereum: any
    }
}