#!/usr/bin/env node

/**
 * Script to check for duplicate exports in icon files
 * Run with: node scripts/check-exports.js
 */

const fs = require('fs');
const path = require('path');

function checkDuplicateExports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  const exports = [];
  const duplicates = [];
  
  lines.forEach((line, index) => {
    // Match export statements
    const exportMatch = line.match(/export\s*\{([^}]+)\}/);
    if (exportMatch) {
      const exportList = exportMatch[1];
      const items = exportList.split(',').map(item => {
        // Handle "Item as Alias" syntax
        const trimmed = item.trim();
        const aliasMatch = trimmed.match(/^(\w+)\s+as\s+(\w+)$/);
        return aliasMatch ? aliasMatch[2] : trimmed;
      });
      
      items.forEach(item => {
        const cleanItem = item.trim();
        if (cleanItem && cleanItem !== '') {
          if (exports.includes(cleanItem)) {
            duplicates.push({
              item: cleanItem,
              line: index + 1,
              content: line.trim()
            });
          } else {
            exports.push(cleanItem);
          }
        }
      });
    }
  });
  
  return duplicates;
}

function main() {
  const iconFile = path.join(__dirname, '../src/components/icons/index.ts');
  
  if (!fs.existsSync(iconFile)) {
    console.log('❌ Icon file not found');
    process.exit(1);
  }
  
  console.log('🔍 Checking for duplicate exports in icons...');
  
  const duplicates = checkDuplicateExports(iconFile);
  
  if (duplicates.length > 0) {
    console.log('❌ Found duplicate exports:');
    duplicates.forEach(dup => {
      console.log(`   - "${dup.item}" on line ${dup.line}: ${dup.content}`);
    });
    process.exit(1);
  } else {
    console.log('✅ No duplicate exports found');
  }
}

if (require.main === module) {
  main();
}

module.exports = { checkDuplicateExports };
