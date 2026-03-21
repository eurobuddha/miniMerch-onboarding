/**
 * Node Detection Script
 * Detects if user has a Minima node running locally
 */

const NodeDetector = (function() {
  const MDS_PORT = 9003;
  const TIMEOUT_MS = 3000;

  async function checkNode(port = MDS_PORT) {
    return new Promise((resolve) => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

      fetch(`http://127.0.0.1:${port}/`, {
        signal: controller.signal,
        method: 'GET',
        mode: 'no-cors'
      })
      .then(() => {
        clearTimeout(timeout);
        resolve({ detected: true, port });
      })
      .catch(() => {
        clearTimeout(timeout);
        resolve({ detected: false, port });
      });
    });
  }

  async function getNodeStatus() {
    return new Promise((resolve) => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

      const formData = new URLSearchParams();
      formData.append('uid', 'check');

      fetch(`http://127.0.0.1:${MDS_PORT}/mdscommand_/cmd`, {
        signal: controller.signal,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
        mode: 'no-cors'
      })
      .then(() => {
        clearTimeout(timeout);
        resolve({ connected: true });
      })
      .catch(() => {
        clearTimeout(timeout);
        resolve({ connected: false });
      });
    });
  }

  async function getAddress() {
    return new Promise((resolve) => {
      const formData = new URLSearchParams();
      formData.append('uid', '0xCHECK');
      formData.append('cmd', 'getaddress');

      fetch(`http://127.0.0.1:${MDS_PORT}/mdscommand_/cmd`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
        mode: 'no-cors'
      })
      .then(response => response.json())
      .then(data => {
        if (data.response && data.response.address) {
          resolve({ success: true, address: data.response.address });
        } else {
          resolve({ success: false });
        }
      })
      .catch(() => resolve({ success: false }));
    });
  }

  async function detect() {
    const nodeCheck = await checkNode();
    if (!nodeCheck.detected) {
      return {
        hasNode: false,
        message: 'No node detected',
        status: 'not-detected'
      };
    }

    const statusCheck = await getNodeStatus();
    if (!statusCheck.connected) {
      return {
        hasNode: true,
        syncing: true,
        message: 'Node found but not fully connected',
        status: 'syncing'
      };
    }

    const addressCheck = await getAddress();
    
    return {
      hasNode: true,
      syncing: false,
      address: addressCheck.address || null,
      message: 'Node is running and connected',
      status: 'ready'
    };
  }

  return {
    detect,
    checkNode,
    getNodeStatus,
    getAddress
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = NodeDetector;
}
