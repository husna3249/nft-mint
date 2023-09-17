# 🎨 NFT Minting Smart Contract

 
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


 

## 📌 Overview

This repository contains a smart contract for minting NFTs with advanced functionalities. The contract is built using Hardhat and offers features like pausing, unpausing, allow lists, and public minting.

---

## 🌟 Features

### 🔒 Pause and Unpause

- **Pause**: Temporarily halts all activities related to the smart contract.
- **Unpause**: Resumes all activities that were previously paused.

### 📋 Allow List

- A curated list of addresses that are permitted to mint NFTs.

### 🌐 Public Mint

- Enables any user to mint NFTs, provided the contract is not paused and they are on the allow list.

---

## 🛠 Setup and Deployment

This project utilizes Hardhat for smart contract compilation and deployment.

### 📥 Installation

\`\`\`bash
npm install
\`\`\`

### 🖥 Compile

\`\`\`bash
npx hardhat compile
\`\`\`

### 🚀 Deploy

\`\`\`bash
npx hardhat run scripts/deploy.js
\`\`\`

---


## 📜 License

MIT License
