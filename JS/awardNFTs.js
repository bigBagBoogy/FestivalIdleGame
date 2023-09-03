async function awardPlayer1() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contractCheat = new ethers.Contract(
          contractAddressGameProgressAndTopFive,
          abiGameProgressAndTopFive,
          provider
        );
        const contractTrophya = new ethers.Contract(
            contractAddressTrophya,
            abiTrophya,
            provider
          );
    try {
    const player1address = await contractCheat.getTopFivePlayers().topPlayers[0]; // does this get the address?
    console.log(`player1address: ${player1address}`);
    const nftTop1image = "./images/favicon.png";  // replace with trophy image
    const imgUri = await encodeImageToBase64(nftTop1image);
    const signer = provider.getSigner();
        const contractWithSigner = contractCheat.connect(signer);
        const tx = await contractWithSigner.mintNFT(player1address, imgUri);
        await tx.wait();
        console.log("Progress saved successfully");
      } catch (error) {
        console.error("Error saving progress:", error);
        throw error;
      }
    }
}
}