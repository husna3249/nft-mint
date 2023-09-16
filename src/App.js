import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Web3 from 'web3';
import React, { useState, useEffect } from 'react';  // Import useState and useEffect

const ABI= [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Paused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Unpaused",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "allowList",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_mintAmount",
        "type": "uint256"
      }
    ],
    "name": "allowListMint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "allowListMintOpen",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_publicMintOpen",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "_allowListMintOpen",
        "type": "bool"
      }
    ],
    "name": "editMintWindows",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_mintAmount",
        "type": "uint256"
      }
    ],
    "name": "publicMint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "publicMintOpen",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "addresses",
        "type": "address[]"
      }
    ],
    "name": "setAllowlist",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unpause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_add",
        "type": "address"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
const ADDRESS = "0xb770634764DF524c75208cb6Bc55E53265c79Ed0";

var account = null;
var contract = null;

async function connectWallet() {
  if (window.ethereum) {
      var web3 = new Web3(window.ethereum);
      await window.ethereum.send('eth_requestAccounts');
      var accounts = await web3.eth.getAccounts();
      account = accounts[0];

      // Shorten the address to show only the first 6 and last 4 characters
      var shortAddress = account.slice(0, 6) + '...' + account.slice(-4);

      document.getElementById('wallet-address').textContent = shortAddress;

      contract = new web3.eth.Contract(ABI, ADDRESS);

      window.ethereum.on('accountsChanged', (accounts) => {
          account = accounts[0];

          // Shorten the address again if it changes
          shortAddress = account.slice(0, 6) + '...' + account.slice(-4);
          
          document.getElementById('wallet-address').textContent = shortAddress;
      });
  }
}

async function setNewAllowList() {
  const ownerAddress = await contract.methods.owner().call();
  
  
  const newAllowList = ["0x104281f4990Fde98171f855ab71934dCfFE9154f", "0xC8dE18810b3C93461337C77F2d395EDfdf42E1a2"];
  await contract.methods.setAllowlist(newAllowList).send({ from: '0xC8dE18810b3C93461337C77F2d395EDfdf42E1a2' });
}



async function mint() {
  if (!contract) {
    console.log("Contract is not initialized");
    return;
  }
   if (window.ethereum) {
    var _mintAmount = Number(document.querySelector("[name=amount]").value);
    
    contract.methods.publicMint(_mintAmount)
    .send({ from: account, value: Web3.utils.toWei('0.01', 'ether') })
    .then(receipt => {
        console.log("Public mint successful", receipt);
    })
    .catch(error => {
        console.log("Mint failed", error);
    });
  }
}

async function allowListMint() {
  if (!contract) {
    console.log("Contract is not initialized.");
    return;
  }

  if (!account) {
    console.log("Account is not initialized.");
    return;
  }

  if (window.ethereum) {
    
    const isAllowed = await contract.methods.allowList(account).call();

    if (isAllowed) {
      var _mintAmount = Number(document.querySelector("[name=amount]").value);

      contract.methods.allowListMint(_mintAmount)
          .send({ from: account, value: Web3.utils.toWei('0.001', 'ether') })
          .then(receipt => {
              console.log("Allowlist mint successful", receipt);
          })
          .catch(error => {
              console.log("Allowlist mint failed", error);
          });
    } else {
      alert("Your account is not on the allowlist.");
    }
  }
}






function App() {
    const [isPaused, setIsPaused] = useState(false);
   
	const [isOwner, setIsOwner] = useState(true); 

    useEffect(() => {
        async function checkPauseStatus() {
            if (contract) {
                const paused = await contract.methods.paused().call();
                setIsPaused(paused);

                const ownerAddress = await contract.methods.owner().call();
                setIsOwner(account === ownerAddress);
            }
        }

        checkPauseStatus();
    }, [contract, account]);

	async function toggleContractPause() {
		try {
			if (isPaused) {
				await contract.methods.unpause().send({ from: account });
			} else {
				await contract.methods.pause().send({ from: account });
			}
			const paused = await contract.methods.paused().call();
			setIsPaused(paused);
		} catch (error) {
			console.error('Error toggling pause:', error);
		}
	}
	


 
    return (
        <div className="App">
            <div className='container'>
                <div className='row'>
                    <form className="col-lg-5">
                        <h4>Mint Portal</h4>
                        <div id="background-container"></div>

                        <h5>Please connect your wallet</h5>
                        <Button onClick={connectWallet}>CONNECT WALLET</Button>
                        <div className='card' id='wallet-address'>
                            <label htmlFor="floatingInput">Wallet Address</label>
                        </div>
                        <div className='card'>
                            <input type='number' name='amount' defaultValue={1} min={1} max={5} />
                            <label>Select the amount of nfts to mint</label>
                            <Button className='pause' onClick={mint} disabled={isPaused}> Public Mint </Button>
                            <Button className='pause' onClick={allowListMint} disabled={isPaused}>AllowListMint</Button>
                            {isOwner && 
                                
								<Button  
    className={`pause-button ${!isOwner ? "disabled-button" : ""}`}
    onClick={isOwner ? toggleContractPause : undefined}
    disabled={!isOwner}
>
    {isPaused ? "Unpause Contract" : "Pause Contract"}
</Button>

								
                            }
 

 

                        </div>
                        <label>Price 0.005 ETH</label>
                    </form>
                </div>
            </div>
        </div>
    );
	
 
}

export default App;
