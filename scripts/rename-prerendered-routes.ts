import fs from 'fs';
import path from 'path';

const clientDir = path.join(process.cwd(), 'build', 'client');

/**
 * This script finds all prerendered outputs like:
 *   build/client/pricing/index.html
 * and renames them to:
 *   build/client/pricing.html
 * then removes the old folder, so we don't get "/pricing/" trailing slash.
 */
function renamePrerenderedRoutes(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const folderName = entry.name;
      const folderPath = path.join(dir, folderName);
      const indexHtmlPath = path.join(folderPath, 'index.html');

      // If there's an "index.html", rename it to {folderName}.html
      if (fs.existsSync(indexHtmlPath)) {
        const newHtmlPath = path.join(dir, `${folderName}.html`);
        fs.renameSync(indexHtmlPath, newHtmlPath);

        // Optionally remove the old (now empty) folder
        fs.rmSync(folderPath, { recursive: true });
      } else {
        // Recursively process sub-directories
        renamePrerenderedRoutes(folderPath);
      }
    }
  }
}

renamePrerenderedRoutes(clientDir);

console.log('Successfully renamed pre-rendered route folders to single .html files.');
