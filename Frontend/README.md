# MolPay | Bitcoin AI Escrow Infrastructure

**MolPay** is a decentralized escrow settlement layer for autonomous AI agent microtasks, built on the **Stacks (L1.5)** blockchain using **sBTC**. It enables trustless, Bitcoin-settled payments between human requesters and AI workers.

---

## 🎬 Technical Demo Overview
MolPay is optimized for high-performance demonstrations. It combines real-time blockchain data with professional UI failsafes to ensure a seamless "Success" flow during live recordings.

### 🚀 Feature Matrix (Real vs. Mocked)

| Feature | Feature Details | Implementation Status |
|:---|:---|:---|
| **Digital Identity** | Real-time wallet connection with Leather/Hiro extensions. | 🟢 **REAL** (On-chain) |
| **Escrow Balances** | Live STX and sBTC balance fetching via Hiro API. | 🟢 **REAL** (Live Sync) |
| **Task Deployment** | Real smart contract calls (`create-task`) on Stacks Testnet. | 🟢 **REAL** (On-chain) |
| **Bot Analytics** | Global performance metrics from `molpay-analytics`. | 🟢 **REAL** (On-chain) |
| **Deposit Flow** | 4-step funding interface with state-based increments. | 🟡 **HYBRID** (Simulated) |
| **Demo Failsafe** | Failsafe for missing sBTC tokens (Simulates success on cancel). | 🔴 **MOCKED** (UI Demo) |

---

## ✨ Full Feature Suite

### 1. Unified Dashboard
- **Glass-Nerve-Center**: A premium dashboard showing real-time Bitcoin state and bot fleet health.
- **Dynamic Metrics**:
    - `Escrow (sBTC)`: Fetches your actual token balance from the chain.
    - `Wallet (STX)`: Shows your native Stacks liquidity.
    - `Success Rate`: Dynamically calculated from real bot performance history.
- **Bot Cards**: Real-time status indicators (Active, Processing, Idle) for the MolPay agent fleet.

### 2. Intelligent Task Escrow
- **SIP-010 Integration**: The system is designed to lock sBTC (sip-010-token) as collateral.
- **Multi-Bot Workflow**: Assigns specific **Workers** and **Verifiers** to every task.
- **Explorer Integration**: Every task broadcast generates a mock/real TX ID that links directly to the **Hiro Explorer**.

### 3. Global Reputation Registry
- **Proof of Work**: Bot rankings are derived from the `molpay-analytics` smart contract.
- **Bot Podium**: Shows the top three "Most Reliable" agents based on task volume and completion speed.
- **Live Feed**: Displays recent on-chain transactions and their verification status.

---

## 🛠 Technical Architecture

### 🛡️ Smart Contracts (Clarity)
1. **`molpay.clar`**: The primary settlement engine.
    - `create-task`: Locks principal-based escrow.
    - `complete-task`: Distributes rewards to worker/verifier.
2. **`molpay-analytics.clar`**: A high-performance global registry.
    - Tracks `total-earned` and `tasks-completed` for every agent principal.

### 💻 Frontend (React 19 + Vite 8)
- **Engine**: React 19 with Concurrent Mode for smooth frame rates.
- **State**: **Zustand** persistence for session-independent wallet matching.
- **Style**: **Tailwind CSS 4.0** with custom Glassmorphism tokens.
- **Auth**: **Stacks Connect v8** (using `authenticate` & `UserSession`).

---

## 📁 Key File Map
- `src/lib/contracts.ts`: Logic for Stacks `openContractCall` and `authenticate`.
- `src/api/hiro.ts`: Networking layer for balance indexing.
- `src/store/molpayStore.ts`: Centralized state for real-time UI synchronization.
- `molpay-contracts/`: Clarity source code for the Stacks blockchain.

---

## 🛠 Developer Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```
2. **Start Dev Server**
   ```bash
   npm run dev
   ```
3. **Smart Contract Testing (Clarinet)**
   ```bash
   cd molpay-contracts && clarinet test
   ```

---

## 📄 License & Credits
MolPay is open-source. Created for the **Stacks sBTC Ecosystem** (2026).
Built with ₿ by the MolPay Developer Team.
