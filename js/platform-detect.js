/**
 * Platform Detection Script
 * Detects user's OS for appropriate download links
 */

const PlatformDetector = (function() {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;

  function getOS() {
    const osMap = {
      'Win32': 'windows',
      'MacIntel': 'macos',
      'MacPPC': 'macos',
      'Linux x86_64': 'linux',
      'Linux i686': 'linux',
      'Linux armv7l': 'linux',
      'Linux aarch64': 'linux'
    };

    // Check mobile first
    if (/Android/.test(userAgent)) return 'android';
    if (/iPhone|iPad|iPod/.test(userAgent)) return 'ios';

    // Desktop OS detection
    const os = osMap[platform];
    return os || 'unknown';
  }

  function getOSInfo() {
    const os = getOS();
    
    const osData = {
      windows: {
        name: 'Windows',
        icon: '🪟',
        downloadUrl: 'https://minima.global/post/2024/04/10/minima-desktop-launch/',
        installCommand: null,
        guides: ['windows'],
        description: 'Download the Windows installer'
      },
      macos: {
        name: 'macOS',
        icon: '🍎',
        downloadUrl: 'https://minima.global/post/2024/04/10/minima-desktop-launch/',
        installCommand: null,
        guides: ['macos'],
        description: 'Download the macOS installer'
      },
      linux: {
        name: 'Linux',
        icon: '🐧',
        downloadUrl: 'https://minima.global/post/2024/04/10/minima-desktop-launch/',
        installCommand: 'java -jar minima.jar',
        guides: ['linux'],
        description: 'Download the JAR file'
      },
      android: {
        name: 'Android',
        icon: '📱',
        downloadUrl: 'https://play.google.com/store/apps/details?id=com.minima.global',
        installCommand: null,
        guides: ['android'],
        description: 'Get from Google Play or APK'
      },
      ios: {
        name: 'iOS',
        icon: '📱',
        downloadUrl: 'https://apps.apple.com/app/minima-wallet/id6443564057',
        installCommand: null,
        guides: ['ios'],
        description: 'Get from the App Store'
      }
    };

    return osData[os] || {
      name: 'Unknown',
      icon: '❓',
      downloadUrl: 'https://minima.global',
      installCommand: null,
      guides: [],
      description: 'Visit minima.global for downloads'
    };
  }

  function getBrowser() {
    if (/Chrome/.test(userAgent) && !/Edge/.test(userAgent)) return 'Chrome';
    if (/Firefox/.test(userAgent)) return 'Firefox';
    if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) return 'Safari';
    if (/Edge/.test(userAgent)) return 'Edge';
    if (/MSIE|Trident/.test(userAgent)) return 'IE';
    return 'Unknown';
  }

  function isMobile() {
    return /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  }

  function isDesktop() {
    return !isMobile();
  }

  function getAllPlatforms() {
    return [
      {
        id: 'android',
        name: 'Android',
        icon: '📱',
        downloadUrl: 'https://play.google.com/store/apps/details?id=com.minima.global',
        altDownload: 'https://minima.global/post/2024/04/10/minima-mobile-launch/',
        description: 'Google Play or direct APK',
        badge: 'Mobile'
      },
      {
        id: 'ios',
        name: 'iOS',
        icon: '🍎',
        downloadUrl: 'https://apps.apple.com/app/minima-wallet/id6443564057',
        description: 'App Store',
        badge: 'Mobile'
      },
      {
        id: 'macos',
        name: 'macOS',
        icon: '🍎',
        downloadUrl: 'https://minima.global/post/2024/04/10/minima-desktop-launch/',
        description: 'Intel & Apple Silicon',
        badge: 'Desktop'
      },
      {
        id: 'windows',
        name: 'Windows',
        icon: '🪟',
        downloadUrl: 'https://minima.global/post/2024/04/10/minima-desktop-launch/',
        description: 'x64 architecture',
        badge: 'Desktop'
      },
      {
        id: 'linux',
        name: 'Linux',
        icon: '🐧',
        downloadUrl: 'https://minima.global/post/2024/04/10/minima-desktop-launch/',
        description: 'JAR file (requires Java)',
        badge: 'Desktop'
      }
    ];
  }

  return {
    getOS,
    getOSInfo,
    getBrowser,
    isMobile,
    isDesktop,
    getAllPlatforms
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PlatformDetector;
}
