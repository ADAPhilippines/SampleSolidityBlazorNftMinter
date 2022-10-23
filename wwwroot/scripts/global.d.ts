export { }
declare global {
    interface Window {
        connectWallet: () => Promise<string>,
        getBalance: () => Promise<string>,
        getAddress: () => Promise<string>,
        deployContract: () => Promise<void>,
        ethereum: any
    }
}