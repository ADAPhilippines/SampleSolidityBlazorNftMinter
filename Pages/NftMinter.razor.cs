using Microsoft.AspNetCore.Components;
using nft_minter.Services;
using nft_minter.Models;

namespace nft_minter.Pages;

public partial class NftMinter
{
    [Inject]
    protected OnChainService? OnChainService { get; set; }

    protected string WalletAddress { get; set; } = string.Empty;
    protected string Balance { get; set; } = "0";
    protected string MinterAddress { get; set; } = string.Empty;
    protected string NFTContractAddress { get; set; } = string.Empty;
    protected IEnumerable<NFT> NFTs { get; set; } = new List<NFT>();

    protected async Task OnBtnConnectWalletClicked()
    {
        if (OnChainService is not null)
        {
            WalletAddress = await OnChainService.ConnectWalletAsync();
            Balance = (await OnChainService.GetBalanceAsync()).ToString();
            await InvokeAsync(StateHasChanged);
        }
    }

    protected async Task OnBtnMintNftClicked()
    {
        if (OnChainService is not null)
        {
            await OnChainService.MintNftAsync(MinterAddress);
            Balance = (await OnChainService.GetBalanceAsync()).ToString();
            await RefreshNftsAsync();
            await InvokeAsync(StateHasChanged);
        }
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await base.OnAfterRenderAsync(firstRender);

        if (firstRender)
        {
            if (OnChainService is not null)
            {
                try
                {
                    WalletAddress = await OnChainService.GetAddressAsync();
                    Balance = (await OnChainService.GetBalanceAsync()).ToString();
                    await RefreshNftsAsync();
                    await InvokeAsync(StateHasChanged);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }
    }

    protected async Task RefreshNftsAsync()
    {
        try
        {
            if (OnChainService is not null &&
                !string.IsNullOrWhiteSpace(MinterAddress) &&
                !string.IsNullOrEmpty(MinterAddress))
            {
                NFTs = await OnChainService.GetNftsAsync(MinterAddress);
                await RefreshNFTContractAddressAsync();
                await InvokeAsync(StateHasChanged);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
    }

    protected async Task RefreshNFTContractAddressAsync()
    {
        if (OnChainService is not null &&
            !string.IsNullOrWhiteSpace(MinterAddress) &&
            !string.IsNullOrEmpty(MinterAddress)
        ) NFTContractAddress = await OnChainService.GetNFTContractAddressAsync(MinterAddress);
    }
}