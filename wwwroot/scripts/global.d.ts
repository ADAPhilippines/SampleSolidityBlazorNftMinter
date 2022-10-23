export {}
declare global {
    interface Window {
        connectWallet: () => Promise<string>,
        getBalance: () => Promise<string>,
        getAddress: () => Promise<string>,
        ethereum: any
    }
}