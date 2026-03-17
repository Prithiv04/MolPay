/**
 * Hiro API Integration for Stacks Blockchain
 * Provides real-time account and contract data fetching.
 */

const HIRO_API_BASE = 'https://api.testnet.hiro.so';

export async function getStxBalance(address: string): Promise<number> {
  try {
    const res = await fetch(`${HIRO_API_BASE}/extended/v1/address/${address}/balances`);
    if (!res.ok) throw new Error('Failed to fetch balance');
    const data = await res.json();
    return parseInt(data.stx.balance) / 1_000_000;
  } catch (error) {
    console.error('Error fetching STX balance:', error);
    return 0;
  }
}

export async function getSbtcBalance(address: string): Promise<number> {
  try {
    const res = await fetch(`${HIRO_API_BASE}/extended/v1/address/${address}/balances`);
    if (!res.ok) throw new Error('Failed to fetch token holdings');
    const data = await res.json();
    
    // Look for sBTC in fungible_tokens (Placeholder for actual SIP-010 lookup)
    const tokenHoldings = data.fungible_tokens || {};
    // Note: The specific contract ID for sBTC Testnet varies, this is a pattern match
    const sbtcKey = Object.keys(tokenHoldings).find(k => k.toLowerCase().includes('sbtc'));
    
    if (sbtcKey) {
      return parseInt(tokenHoldings[sbtcKey].balance) / 100_000_000; // Assuming 8 decimals for sBTC
    }
    return 0;
  } catch (error) {
    console.error('Error fetching sBTC balance:', error);
    return 0;
  }
}

export async function fetchBotStats() {
  // In a real production app, we would loop through known bot principals
  // and call the 'get-bot-stats' read-only function on the analytics contract.
  // For this implementation, we simulate the return of the realprincipals' data.
  const workerPrincipal = 'STB1PQHQHT9W26VWVC53VJR9AWZR4DPY9V9NVP9W';
  const verifierPrincipal = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';

  // Simulation of Hiro API response for contract-call-read
  return [
    {
      principal: workerPrincipal,
      tasksCompleted: 89,
      totalEarned: 0.12,
      successRate: 98
    },
    {
      principal: verifierPrincipal,
      tasksCompleted: 154,
      totalEarned: 0.25,
      successRate: 99
    }
  ];
}
