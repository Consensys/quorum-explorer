import detectEthereumProvider from "@metamask/detect-provider";

export async function connectMetaMask() {
  const provider = await detectEthereumProvider();

  if (provider) {
    console.log("MetaMask successfully detected!");
    const accounts = await (window as any).ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .catch((err: any) => {
        if (err.code === 4001)
          console.log("User rejected connection request to MetaMask");
        return err.code; // 4001 code means user rejected request
      });
    const account = accounts[0];
    return account;
  } else {
    // if the provider is not detected, detectEthereumProvider resolves to null
    console.error("Please install MetaMask!");
    return null;
  }
}
