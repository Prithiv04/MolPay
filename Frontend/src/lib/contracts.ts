import { openContractCall, UserSession, AppConfig } from '@stacks/connect';
const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });
// Note: In Connect v8, showConnect is replaced by authenticate or connect.
// We'll use authenticate for better compatibility if available, or handle versioning.

import { 
  uintCV, 
  principalCV, 
  PostConditionMode
} from '@stacks/transactions';
import { STACKS_TESTNET } from '@stacks/network';

const contractAddress = 'ST3KNZMD5GWXRX0B30T4XYJB6GQ9T2ZM4HEMDRN53'; // User's deployed contract address
const contractName = 'MolPay';

// ✅ Bot principals used for task delegation
export const BOT_ACCOUNTS = {
  WORKER: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',   // Clarinet devnet wallet_1
  VERIFIER: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG', // Clarinet devnet wallet_2
};

export const appDetails = {
  name: 'MolPay',
  icon: window.location.origin + '/logo.svg',
};

export async function createEscrowTask(
  taskId: number,
  worker: string,
  verifier: string,
  amount: number,
  onFinish: (data: any) => void,
  onCancel?: () => void
) {
  let functionArgs;
  try {
    // principalCV validates the c32check address — will throw if invalid
    functionArgs = [
      uintCV(taskId),
      principalCV(worker),
      principalCV(verifier),
      uintCV(amount)
    ];
  } catch (e) {
    console.error('Invalid principal address:', e);
    alert(`Task creation failed: Invalid bot address format.\nWorker: ${worker}\nVerifier: ${verifier}`);
    return;
  }

  console.log("Initiating Task Escrow:", { taskId, worker, verifier, amount });

  await openContractCall({
    contractAddress,
    contractName,
    functionName: 'create-task',
    functionArgs,
    network: STACKS_TESTNET,
    postConditionMode: PostConditionMode.Allow, 
    onFinish,
    onCancel: () => {
      console.warn('Transaction cancelled/rejected by user/wallet');
      if (onCancel) onCancel();
    },
  });
}

export async function completeTask(
  taskId: number,
  onFinish: (data: any) => void
) {
  console.log("Verifying & Completing Task:", taskId);
  await openContractCall({
    contractAddress,
    contractName,
    functionName: 'complete-task',
    functionArgs: [uintCV(taskId)],
    network: STACKS_TESTNET,
    postConditionMode: PostConditionMode.Allow,
    onFinish,
    onCancel: () => console.warn('Completion cancelled'),
  });
}

export async function claimReward(
  taskId: number,
  onFinish: (data: any) => void
) {
  console.log("Claiming Reward for Task:", taskId);
  await openContractCall({
    contractAddress,
    contractName,
    functionName: 'claim-reward',
    functionArgs: [uintCV(taskId)],
    network: STACKS_TESTNET,
    postConditionMode: PostConditionMode.Allow,
    onFinish,
    onCancel: () => console.warn('Claim cancelled'),
  });
}
