namespace nft_minter.Models;

public record NFT(
    string TokenId,
    string Name,
    string Description,
    string Image
);