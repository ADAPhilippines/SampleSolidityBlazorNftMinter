import { ethers } from "hardhat";

async function main() {
    const signers = await ethers.getSigners();
    console.log(`Airdrop Balance: ${await ethers.provider.getBalance(signers[0].address)}`);
    const tx = signers[0].sendTransaction({
        to: "0x48D51ebfd87d2ec655A77BdC7E798DbF42Eab770",
        value: ethers.utils.parseEther("100.0")
    });
    (await tx).wait(1);
    console.log(`Airdrop Sent: ${(await tx).hash}`);
    console.log(`Airdrop Balance: ${await ethers.provider.getBalance(signers[0].address)}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
