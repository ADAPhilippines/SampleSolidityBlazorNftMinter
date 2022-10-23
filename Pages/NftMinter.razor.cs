using Microsoft.AspNetCore.Components;
using nft_minter.Services;

namespace nft_minter.Pages;

public partial class NftMinter
{
    [Inject]
    protected OnChainService? OnChainService { get; set; }

    protected string WalletAddress { get; set; } = string.Empty;
    protected string Balance { get; set; } = "0";
    protected string Name { get; set; } = "Clark";

    protected void Test()
    {
        Name = "Hello World";
    }

    protected async Task OnBtnConnectWalletClicked()
    {
        if (OnChainService is not null)
        {
            WalletAddress = await OnChainService.ConnectWalletAsync();
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
                    WalletAddress = await OnChainService.GetAddress();
                    Balance = (await OnChainService.GetBalance()).ToString();
                    await InvokeAsync(StateHasChanged);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }
    }
}