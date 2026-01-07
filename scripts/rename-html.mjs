import fs from 'fs';
import path from 'path';

const mode = process.argv[2]; // 'landing' or 'store'

if (mode === 'landing') {
  const oldPath = path.resolve('dist-landing', 'index-landing.html');
  const newPath = path.resolve('dist-landing', 'index.html');
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log('✓ Renamed index-landing.html to index.html');
  }
} else if (mode === 'store') {
  const oldPath = path.resolve('dist-store', 'index-store.html');
  const newPath = path.resolve('dist-store', 'index.html');
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log('✓ Renamed index-store.html to index.html');
  }
}

