using Microsoft.JSInterop;
using nft_minter.Models;

namespace nft_minter.Services;

public class OnChainService
{
    private readonly IJSRuntime _jsRuntime;

    public OnChainService(IJSRuntime jsRuntime)
    {
        _jsRuntime = jsRuntime;
    }

    public async Task<string> ConnectWalletAsync()
    {
        return await _jsRuntime.InvokeAsync<string>("window.connectWallet");
    }

    public async Task<string> GetAddressAsync()
    {
        return await _jsRuntime.InvokeAsync<string>("window.getAddress");
    }

    public async Task<decimal> GetBalanceAsync()
    {
        var balance = await _jsRuntime.InvokeAsync<string>("window.getBalance");
        return decimal.Parse(balance);
    }

    public async Task MintNftAsync(string contractAddress)
    {
        await _jsRuntime.InvokeAsync<string>("window.mintNft", contractAddress);
    }

    public async Task<IEnumerable<NFT>> GetNftsAsync(string contractAddress)
    {
        return await _jsRuntime.InvokeAsync<IEnumerable<NFT>>("window.getNfts", contractAddress);
    }

    public async Task<string> GetNFTContractAddressAsync(string contractAddress)
    {
        return await _jsRuntime.InvokeAsync<string>("window.getNFTContractAddress", contractAddress);
    }
}