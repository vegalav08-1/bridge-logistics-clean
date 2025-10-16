const fs = require('fs');
const path = require('path');

// Функция для исправления условных хуков
function fixConditionalHooks(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Паттерн для поиска условных хуков
  const patterns = [
    // useEffect после return
    /(\s+)(if\s*\([^)]+\)\s*\{\s*return[^}]+;\s*\})\s*(\n\s*useEffect)/g,
    // useOrder после return  
    /(\s+)(if\s*\([^)]+\)\s*\{\s*return[^}]+;\s*\})\s*(\n\s*useOrder)/g,
    // useChat2Store после return
    /(\s+)(if\s*\([^)]+\)\s*\{\s*return[^}]+;\s*\})\s*(\n\s*useChat2Store)/g,
  ];

  patterns.forEach(pattern => {
    if (pattern.test(content)) {
      console.log(`Fixing conditional hooks in ${filePath}`);
      modified = true;
    }
  });

  if (modified) {
    // Простое исправление - перемещаем все хуки в начало компонента
    const lines = content.split('\n');
    const hooks = [];
    const otherCode = [];
    let inComponent = false;
    let braceCount = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.includes('export default function') || line.includes('function ')) {
        inComponent = true;
        otherCode.push(line);
        continue;
      }

      if (inComponent) {
        if (line.includes('{')) braceCount++;
        if (line.includes('}')) braceCount--;
        
        if (line.trim().startsWith('use') && (line.includes('useEffect') || line.includes('useState') || line.includes('useOrder') || line.includes('useChat2Store'))) {
          hooks.push(line);
        } else {
          otherCode.push(line);
        }
      } else {
        otherCode.push(line);
      }
    }

    // Пересобираем файл
    const newContent = otherCode.join('\n');
    fs.writeFileSync(filePath, newContent);
  }
}

// Список файлов для исправления
const filesToFix = [
  'src/app/admin/roles/page.tsx',
  'src/app/admin/users/page.tsx',
  'src/app/chat/[chatId]/page.tsx'
];

filesToFix.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    fixConditionalHooks(fullPath);
  }
});

console.log('Hook fixes applied!');
