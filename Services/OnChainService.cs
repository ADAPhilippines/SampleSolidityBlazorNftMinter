using Microsoft.JSInterop;

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

    public async Task<string> GetAddress()
    {
        return await _jsRuntime.InvokeAsync<string>("window.getAddress");
    }

    public async Task<decimal> GetBalance()
    {
        var balance = await _jsRuntime.InvokeAsync<string>("window.getBalance");
        return decimal.Parse(balance);
    }
}