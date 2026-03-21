#!/usr/bin/env node

/**
 * miniMerch Installer
 * Downloads and installs the miniMerch CLI tool
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const GITHUB_REPO = 'eurobuddha/miniMerch';
const GITHUB_API = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`;

// Detect OS
function getOS() {
  const platform = process.platform;
  if (platform === 'win32') return 'windows';
  if (platform === 'darwin') return 'macos';
  if (platform === 'linux') return 'linux';
  return null;
}

// Detect architecture
function getArch() {
  return process.arch === 'x64' ? 'x64' : (process.arch === 'arm64' ? 'arm64' : 'x64');
}

// Get latest release info from GitHub
async function getLatestRelease() {
  console.log('📡 Fetching latest release info...\n');
  
  try {
    const response = require('https').request(GITHUB_API, {
      headers: { 'User-Agent': 'miniMerch-Installer' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const release = JSON.parse(data);
          console.log(`✅ Found version: ${release.tag_name}`);
          return release;
        } catch (e) {
          console.error('❌ Failed to parse release info');
          process.exit(1);
        }
      });
    });
    response.end();
  } catch (error) {
    console.error('❌ Failed to fetch release info:', error.message);
    console.log('\n💡 Try installing manually:');
    console.log('   npm install -g mini-merch\n');
    process.exit(1);
  }
}

// Check if npm is available
function checkNpm() {
  try {
    execSync('npm --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Main installation function
async function install() {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   🛒 miniMerch Installer                                      ║
║   The easiest way to set up your decentralized shop          ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
  `);

  const os = getOS();
  
  if (!os) {
    console.error('❌ Unsupported operating system');
    console.log('   Supported: Windows, macOS, Linux\n');
    process.exit(1);
  }

  console.log(`📦 Detected: ${os} (${getArch()})\n`);

  // Check for Node.js and npm
  console.log('🔍 Checking prerequisites...\n');
  
  let nodeVersion;
  try {
    nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
    console.log(`   ✅ Node.js ${nodeVersion}`);
  } catch {
    console.error('   ❌ Node.js is not installed');
    console.log('\n   💡 Install Node.js from: https://nodejs.org\n');
    process.exit(1);
  }

  if (!checkNpm()) {
    console.error('   ❌ npm is not installed');
    process.exit(1);
  }

  console.log('   ✅ npm available\n');

  // Install the miniMerch CLI package
  console.log('📥 Installing miniMerch CLI...\n');
  
  try {
    console.log('   Running: npm install -g mini-merch\n');
    execSync('npm install -g mini-merch', { 
      stdio: 'inherit',
      env: { ...process.env }
    });
  } catch (error) {
    console.error('\n❌ Installation failed');
    console.log('\n💡 Try one of these alternatives:\n');
    console.log('   1. Using npx (no install):');
    console.log('      npx mini-merch setup\n');
    console.log('   2. Manual install:');
    console.log('      npm install -g mini-merch --registry https://registry.npmjs.org\n');
    process.exit(1);
  }

  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   ✅ Installation complete!                                  ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

  Next steps:

  1. Run the setup wizard:
     mini-merch setup

  2. Or generate a new shop:
     mini-merch generate

  3. View all commands:
     mini-merch --help

  📖 Need help? Visit: https://minimerch.info/guides/mini-merch.html
  💬 Get support: https://discord.gg/minima
`);
}

// Check if we should use npx instead
function runWithNpx() {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   🛒 miniMerch                                                ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

  Using npx to run miniMerch...

  `);

  try {
    execSync('npx mini-merch --version', { stdio: 'inherit' });
    console.log('\n✅ miniMerch is available via npx!\n');
    console.log('  To run setup:');
    console.log('    npx mini-merch setup\n');
    console.log('  To install globally:');
    console.log('    npm install -g mini-merch\n');
  } catch {
    console.log('  ❌ miniMerch not found\n');
    console.log('  Let me try installing it...\n');
    install();
  }
}

// Run
if (require.main === module) {
  // Check if mini-merch is already installed
  try {
    execSync('mini-merch --version', { stdio: 'ignore' });
    console.log('✅ miniMerch is already installed!\n');
    console.log('  Run "mini-merch setup" to configure your shop.\n');
    process.exit(0);
  } catch {
    // Not installed, proceed with installation
    install();
  }
}

module.exports = { install, getOS, getArch };
