import detectEthereumProvider from "@metamask/detect-provider";

export async function connectMetaMask() {
  const metaMaskExist = await detectMetaMask();

  if (metaMaskExist) {
    console.log("MetaMask successfully detected!");
    try {
      await (window as any).ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((newAcct: any) => newAcct)
        .catch((err: any) => {
          if (err.code === 4001)
            console.log("User rejected connection request to MetaMask");
          return err.code; // 4001 code means user rejected request
        });
    } catch (err) {
      console.error(err);
    }
  } else {
    // if the provider is not detected, detectEthereumProvider resolves to null
    console.error("Please install MetaMask!");
    return null;
  }
}

export async function detectMetaMask() {
  const provider = await detectEthereumProvider();

  if (provider) {
    // console.log("MetaMask successfully detected!");
    return true;
  } else {
    return false;
  }
}
