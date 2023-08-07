async function connect() {
  if (window.ethereum) {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      // Metamask is connected, update the image source
      document.getElementById("metamaskImg").src =
        "images/metamaskConnected.svg";
    } catch (e) {
      console.log(e);
    }
    // connectButton.innerHTML = "Connected!";
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts);
  } else {
    connectButton.innerHTML = "Install Metamask";
  }
}
