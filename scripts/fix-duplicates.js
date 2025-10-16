#!/usr/bin/env node

/**
 * Script to automatically fix duplicate exports in icon files
 * Run with: node scripts/fix-duplicates.js
 */

const fs = require('fs');
const path = require('path');

function fixDuplicateExports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  const seenExports = new Set();
  const fixedLines = [];
  
  lines.forEach((line, index) => {
    // Match export statements
    const exportMatch = line.match(/export\s*\{([^}]+)\}/);
    if (exportMatch) {
      const exportList = exportMatch[1];
      const items = exportList.split(',').map(item => item.trim());
      
      const uniqueItems = [];
      items.forEach(item => {
        if (item && item !== '') {
          // Handle "Item as Alias" syntax
          const aliasMatch = item.match(/^(\w+)\s+as\s+(\w+)$/);
          const key = aliasMatch ? aliasMatch[2] : item;
          
          if (!seenExports.has(key)) {
            seenExports.add(key);
            uniqueItems.push(item);
          }
        }
      });
      
      if (uniqueItems.length > 0) {
        const newLine = line.replace(exportMatch[1], uniqueItems.join(', '));
        fixedLines.push(newLine);
      } else {
        // Skip empty export
        console.log(`⚠️  Skipping empty export on line ${index + 1}`);
      }
    } else {
      fixedLines.push(line);
    }
  });
  
  const fixedContent = fixedLines.join('\n');
  
  if (content !== fixedContent) {
    fs.writeFileSync(filePath, fixedContent);
    console.log('✅ Fixed duplicate exports');
    return true;
  } else {
    console.log('✅ No duplicates found');
    return false;
  }
}

function main() {
  const iconFile = path.join(__dirname, '../src/components/icons/index.ts');
  
  if (!fs.existsSync(iconFile)) {
    console.log('❌ Icon file not found');
    process.exit(1);
  }
  
  console.log('🔧 Fixing duplicate exports in icons...');
  
  const wasFixed = fixDuplicateExports(iconFile);
  
  if (wasFixed) {
    console.log('✅ Duplicates fixed successfully');
  } else {
    console.log('✅ No fixes needed');
  }
}

if (require.main === module) {
  main();
}

module.exports = { fixDuplicateExports };
