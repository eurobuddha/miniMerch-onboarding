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
    // No iOS - Minima can't run on Apple devices

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
        downloadUrl: 'guides/windows.html',
        guides: ['windows'],
        description: 'Install Minima on Windows'
      },
      macos: {
        name: 'macOS',
        icon: '🍎',
        downloadUrl: 'guides/macos.html',
        guides: ['macos'],
        description: 'Install Minima on macOS'
      },
      linux: {
        name: 'Linux',
        icon: '🐧',
        downloadUrl: 'https://docs.minima.global/docs/run-a-node',
        installCommand: 'java -jar minima.jar',
        guides: ['linux'],
        description: 'JAR file (requires Java)'
      },
      android: {
        name: 'Android',
        icon: '📱',
        downloadUrl: 'https://play.google.com/store/apps/details?id=com.minima.android&utm_source=emea_Med',
        guides: ['android'],
        description: 'Google Play Store'
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
    return /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
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
        downloadUrl: 'https://play.google.com/store/apps/details?id=com.minima.android&utm_source=emea_Med',
        description: 'Google Play Store',
        badge: 'Mobile'
      },
      {
        id: 'macos',
        name: 'macOS',
        icon: '🍎',
        downloadUrl: 'guides/macos.html',
        description: 'Step-by-step guide',
        badge: 'Desktop'
      },
      {
        id: 'windows',
        name: 'Windows',
        icon: '🪟',
        downloadUrl: 'guides/windows.html',
        description: 'Step-by-step guide',
        badge: 'Desktop'
      },
      {
        id: 'linux',
        name: 'Linux',
        icon: '🐧',
        downloadUrl: 'https://docs.minima.global/docs/run-a-node',
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
