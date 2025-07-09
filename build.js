const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

const rootDir = __dirname;
const srcDir = path.join(rootDir, 'src');
const distDir = path.join(rootDir, 'dist');
const partialsDir = path.join(srcDir, 'partials');

// 1. Ensure the dist directory is clean
fs.emptyDirSync(distDir);

// 2. Read partials
const partials = {
    header: fs.readFileSync(path.join(partialsDir, '_header.html'), 'utf-8'),
    footer: fs.readFileSync(path.join(partialsDir, '_footer.html'), 'utf-8'),
    flyoutNav: fs.readFileSync(path.join(partialsDir, '_flyout-nav.html'), 'utf-8')
};

// 3. Find all HTML files to process
const htmlFiles = glob.sync('**/*.html', { 
    cwd: rootDir,
    ignore: ['node_modules/**', 'dist/**', 'src/partials/**'] 
});

// 4. Process each HTML file
htmlFiles.forEach(file => {
    const filePath = path.join(rootDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Replace placeholders
    content = content.replace(/<div id="header-placeholder"><\/div>/g, partials.header);
    content = content.replace(/<div id="footer-placeholder"><\/div>/g, partials.footer);
    content = content.replace(/<div id="flyout-nav-placeholder"><\/div>/g, partials.flyoutNav);
    
    // Determine destination path
    const relativePath = path.relative(rootDir, filePath);
    // Special case for root index.html, all others are in src
    const destPath = relativePath.startsWith('src/') 
        ? path.join(distDir, path.relative(srcDir, filePath)) 
        : path.join(distDir, relativePath);

    fs.ensureDirSync(path.dirname(destPath));
    fs.writeFileSync(destPath, content, 'utf-8');
});

// 5. Copy all non-HTML assets from src to dist
fs.copySync(srcDir, distDir, {
    filter: (src) => {
        const isHtml = src.endsWith('.html');
        const isPartial = src.includes(partialsDir);
        return !isHtml && !isPartial;
    }
});

console.log('Build successful! Files are in the /dist directory.'); 