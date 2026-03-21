#!/usr/bin/env node

/**
 * miniMerch Setup Wizard
 * Interactive configuration for miniMerch CLI
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// Check for inquirer (optional - falls back to readline)
let inquirer;
try {
  inquirer = require('inquirer');
} catch {
  // inquirer not available, use simple prompts
  inquirer = null;
}

// Simple prompt fallback using readline
function simplePrompt(question) {
  return new Promise((resolve) => {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// Banner
function printBanner() {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   🛒 miniMerch Setup Wizard                                  ║
║   Configure your decentralized shop                           ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
`);
}

// Get config file path
function getConfigPath() {
  const homeDir = os.homedir();
  return path.join(homeDir, '.mini-merch', 'config.json');
}

// Ensure config directory exists
function ensureConfigDir() {
  const configDir = path.dirname(getConfigPath());
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
  return configDir;
}

// Validate Minima address (0x...)
function isValidAddress(address) {
  return address && address.startsWith('0x') && address.length >= 40;
}

// Validate public key (Mx...)
function isValidPublicKey(key) {
  return key && key.startsWith('Mx') && key.length >= 40;
}

// Validate URL
function isValidUrl(string) {
  if (!string || string.trim() === '') return true; // Optional
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

// Save configuration
function saveConfig(config) {
  const configPath = getConfigPath();
  ensureConfigDir();
  
  const existingConfig = {};
  if (fs.existsSync(configPath)) {
    try {
      Object.assign(existingConfig, JSON.parse(fs.readFileSync(configPath, 'utf8')));
    } catch (e) {}
  }
  
  const newConfig = { ...existingConfig, ...config };
  fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2));
  
  return configPath;
}

// Load existing config
function loadConfig() {
  const configPath = getConfigPath();
  if (fs.existsSync(configPath)) {
    try {
      return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (e) {
      return {};
    }
  }
  return {};
}

// Show current config
function showCurrentConfig() {
  const config = loadConfig();
  
  console.log('\n📋 Current Configuration:\n');
  
  if (Object.keys(config).length === 0) {
    console.log('   No configuration found.\n');
    return;
  }
  
  if (config.address) console.log(`   Address: ${config.address}`);
  if (config.publicKey) console.log(`   Public Key: ${config.publicKey}`);
  if (config.cmcKey) console.log(`   CMC Key: ${'•'.repeat(20)} (set)`);
  if (config.productName) console.log(`   Product: ${config.productName}`);
  if (config.pricePerGram) console.log(`   Price: $${config.pricePerGram}/g`);
  
  console.log('');
}

// Main wizard
async function runWizard() {
  printBanner();
  
  const existingConfig = loadConfig();
  showCurrentConfig();
  
  console.log('Let\'s configure your miniMerch setup.\n');
  console.log('Press Enter to keep the current value.\n');
  
  let answers = {};
  
  // Step 1: Minima Address
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Step 1: Your Minima Address\n');
  console.log('   Your Minima wallet address (starts with 0x)\n');
  console.log('   Find it in Minima: Settings → My Addresses → Default');
  
  const address = await simplePrompt(`   [${existingConfig.address || 'required'}] > `);
  
  if (address.trim()) {
    if (!isValidAddress(address.trim())) {
      console.log('\n❌ Invalid address format. Must start with 0x and be at least 40 characters.\n');
      process.exit(1);
    }
    answers.address = address.trim();
  } else if (existingConfig.address) {
    answers.address = existingConfig.address;
  } else {
    console.log('\n❌ Address is required.\n');
    process.exit(1);
  }
  
  // Step 2: Public Key
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Step 2: Your Vendor Public Key\n');
  console.log('   Your Maxima public key for encrypting orders (starts with Mx)\n');
  console.log('   Find it in Minima: Maxima → Your public key');
  
  const publicKey = await simplePrompt(`   [${existingConfig.publicKey || 'required'}] > `);
  
  if (publicKey.trim()) {
    if (!isValidPublicKey(publicKey.trim())) {
      console.log('\n❌ Invalid public key format. Must start with Mx.\n');
      process.exit(1);
    }
    answers.publicKey = publicKey.trim();
  } else if (existingConfig.publicKey) {
    answers.publicKey = existingConfig.publicKey;
  } else {
    console.log('\n❌ Public key is required.\n');
    process.exit(1);
  }
  
  // Step 3: CoinMarketCap API Key (optional)
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Step 3: CoinMarketCap API Key (Optional)\n');
  console.log('   For accurate Minima pricing. Get a free key at:');
  console.log('   https://coinmarketcap.com/api/\n');
  
  const cmcKey = await simplePrompt(`   [${existingConfig.cmcKey ? '••••••••' : 'skip'}] > `);
  
  if (cmcKey.trim()) {
    answers.cmcKey = cmcKey.trim();
  } else if (existingConfig.cmcKey) {
    answers.cmcKey = existingConfig.cmcKey;
  }
  
  // Step 4: Obfuscated address (for MiniDapp)
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Step 4: Obfuscated Address\n');
  console.log('   This encrypts your address in the MiniDapp.\n');
  console.log('   Leave blank to auto-generate.\n');
  
  const obfuscated = await simplePrompt(`   [auto-generate] > `);
  
  if (obfuscated.trim()) {
    answers.obfuscatedAddress = obfuscated.trim();
  }
  
  // Save configuration
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  const configPath = saveConfig(answers);
  
  console.log('✅ Configuration saved!\n');
  console.log(`   Location: ${configPath}\n`);
  
  // Next steps
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Next Steps:\n');
  console.log('   1. Generate your shop:');
  console.log('      mini-merch generate\n');
  console.log('   2. Install MiniDapps to your node:');
  console.log('      mini-merch install\n');
  console.log('   3. View your shop at:');
  console.log('      https://127.0.0.1:9003/minidapp?mds=shop\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// Show help
function showHelp() {
  console.log(`
miniMerch Setup Wizard

Usage:
  wizard.js           Run interactive setup
  wizard.js --show    Show current configuration
  wizard.js --reset   Reset configuration

Configuration is stored at:
  ~/.mini-merch/config.json
`);
}

// Main
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    process.exit(0);
  }
  
  if (args.includes('--show')) {
    printBanner();
    showCurrentConfig();
    process.exit(0);
  }
  
  if (args.includes('--reset')) {
    const configPath = getConfigPath();
    if (fs.existsSync(configPath)) {
      fs.unlinkSync(configPath);
      console.log('✅ Configuration reset.\n');
    } else {
      console.log('No configuration to reset.\n');
    }
    process.exit(0);
  }
  
  await runWizard();
}

main().catch((error) => {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
});
