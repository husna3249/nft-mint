const hre = require("hardhat");

async function main() {
  const Doggos = await hre.ethers.getContractFactory("Doggos");
  const myNFT = await Doggos.deploy();
  await myNFT.deployed();

  console.log("Doggos deployed to:", myNFT.address);
 
  console.log("Before: ", await myNFT.allowListMintOpen());
 
  await myNFT.editMintWindows(true, true)
  .then((receipt) => {
    console.log("Successfully opened the mint window", receipt);
  })
  .catch((error) => {
    console.log("Failed to open the mint window", error);
  });

  const newAllowList = ["0x104281f4990Fde98171f855ab71934dCfFE9154f","0xC8dE18810b3C93461337C77F2d395EDfdf42E1a2"];
  await myNFT.setAllowlist(newAllowList);


  // Number of tokens to mint
  let _mintAmount = 1;

  // Perform an allowListMint
  await myNFT.allowListMint(_mintAmount, { value: hre.ethers.utils.parseEther("0.001") });

  // Perform a publicMint
  await myNFT.publicMint(_mintAmount, { value: hre.ethers.utils.parseEther("0.01") });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
