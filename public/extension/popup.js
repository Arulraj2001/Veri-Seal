// Kagazo Chrome Extension Popup Engine (100% In-Browser RAM)

let selectedFile = null;
let targetMaxKb = 20;

// Tabs
const tabQuick = document.getElementById('tab-quick');
const tabTools = document.getElementById('tab-tools');
const panelQuick = document.getElementById('panel-quick');
const panelTools = document.getElementById('panel-tools');

tabQuick.addEventListener('click', () => {
  tabQuick.classList.add('active');
  tabTools.classList.remove('active');
  panelQuick.classList.add('active');
  panelTools.classList.remove('active');
});

tabTools.addEventListener('click', () => {
  tabTools.classList.add('active');
  tabQuick.classList.remove('active');
  panelTools.classList.add('active');
  panelQuick.classList.remove('active');
});

// Dropzone & File Input
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('file-input');
const fileLabel = document.getElementById('file-label');
const fileInfo = document.getElementById('file-info');
const compressBtn = document.getElementById('compress-btn');
const statusMsg = document.getElementById('status-msg');

dropzone.addEventListener('click', () => fileInput.click());

dropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropzone.style.borderColor = '#10b981';
  dropzone.style.background = '#f0fdf4';
});

dropzone.addEventListener('dragleave', () => {
  dropzone.style.borderColor = '#cbd5e1';
  dropzone.style.background = '#ffffff';
});

dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropzone.style.borderColor = '#cbd5e1';
  dropzone.style.background = '#ffffff';
  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    handleFileSelect(e.dataTransfer.files[0]);
  }
});

fileInput.addEventListener('change', (e) => {
  if (e.target.files && e.target.files.length > 0) {
    handleFileSelect(e.target.files[0]);
  }
});

function handleFileSelect(file) {
  if (!file.type.startsWith('image/')) {
    alert('Please select an image file (JPG, PNG, or WEBP).');
    return;
  }
  selectedFile = file;
  fileLabel.textContent = file.name;
  fileInfo.textContent = `${Math.round(file.size / 1024)} KB • Ready to compress`;
  compressBtn.disabled = false;
  statusMsg.textContent = '';
}

// Target Pills
const pills = document.querySelectorAll('.pill-btn');
pills.forEach((p) => {
  p.addEventListener('click', () => {
    pills.forEach((btn) => btn.classList.remove('active'));
    p.classList.add('active');
    targetMaxKb = parseInt(p.getAttribute('data-kb'), 10) || 20;
  });
});

// In-Browser Compression Engine (Binary Search on HTML5 Canvas)
compressBtn.addEventListener('click', async () => {
  if (!selectedFile) return;

  compressBtn.disabled = true;
  compressBtn.textContent = 'Compressing in RAM...';
  statusMsg.style.color = '#0284c7';
  statusMsg.textContent = 'Processing image in browser memory...';

  try {
    const img = new Image();
    const objectUrl = URL.createObjectURL(selectedFile);
    img.src = objectUrl;

    await new Promise((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Image failed to load'));
    });

    const canvas = document.createElement('canvas');
    let width = img.width;
    let height = img.height;

    // Scale down dimensions if huge (> 1600px)
    const maxDim = targetMaxKb <= 20 ? 800 : targetMaxKb <= 50 ? 1200 : 1800;
    if (width > maxDim || height > maxDim) {
      const ratio = Math.min(maxDim / width, maxDim / height);
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);
    }

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    // Binary search for JPEG quality
    let low = 0.05;
    let high = 0.98;
    let bestBlob = null;
    let bestQuality = 0.8;

    for (let i = 0; i < 7; i++) {
      const mid = (low + high) / 2;
      const blob = await new Promise((res) => canvas.toBlob(res, 'image/jpeg', mid));
      if (!blob) break;

      const sizeKb = blob.size / 1024;
      if (sizeKb <= targetMaxKb) {
        bestBlob = blob;
        bestQuality = mid;
        low = mid; // Try for higher quality
      } else {
        high = mid; // Too large, compress more
      }
    }

    if (!bestBlob) {
      // Fallback to lowest
      bestBlob = await new Promise((res) => canvas.toBlob(res, 'image/jpeg', 0.05));
    }

    URL.revokeObjectURL(objectUrl);

    const finalSizeKb = Math.round((bestBlob.size / 1024) * 10) / 10;

    // Trigger instant download
    const downloadUrl = URL.createObjectURL(bestBlob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `kagazo_${targetMaxKb}kb_${selectedFile.name.replace(/\.[^/.]+$/, '')}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);

    statusMsg.style.color = '#059669';
    statusMsg.textContent = `✓ Saved! Final size: ${finalSizeKb} KB (Target: <${targetMaxKb}KB)`;
  } catch (err) {
    statusMsg.style.color = '#dc2626';
    statusMsg.textContent = 'Compression error: ' + err.message;
  } finally {
    compressBtn.disabled = false;
    compressBtn.textContent = 'Compress & Download';
  }
});
