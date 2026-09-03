const fs = require('fs');
const path = require('path');
// Resolve build-only deps from a local install if one exists, else fall back to
// the sibling widget package's node_modules (this package is source-coupled to
// it).
const AdmZip = require(
  require.resolve('adm-zip', {
    paths: [...module.paths, path.resolve(__dirname, '..', '..', 'components', 'node_modules')],
  })
);

// This script lives in the wmx package (code/packages/wmx-components). Resolve
// paths from the script location, not the caller's cwd, so it works whether
// invoked from within the package or delegated from the repo root.
const root = path.resolve(__dirname, '..');
const wmxDir = root;
// Also scan the sibling widget package for any co-located wmx.json widget
// metadata (parity with the original generator).
const componentsDir = path.resolve(root, '..', 'components');

const defaultWmxDir = path.join(root, 'dist', 'wmx', 'tabbar');

const parseZipCopyDestDir = () => {
  const argv = process.argv.slice(2);
  for (const arg of argv) {
    const m = /^--o=(.*)$/.exec(arg);
    if (m && m[1] !== '') {
      return path.resolve(root, m[1]);
    }
  }
  const first = argv[0];
  if (first && !first.startsWith('-')) {
    return path.resolve(root, first);
  }
  return null;
};

const zipCopyDestDir = parseZipCopyDestDir();

// Never descend into generated output or dependencies: the default output dir
// lives under this package (dist/), so scanning it would re-read generated
// wmx.json files and copy assets onto themselves (ERR_FS_CP_EINVAL).
const SKIP_DIRS = new Set(['node_modules', 'dist', 'build', '.git']);

const findWmxJsonFiles = (dir, handleFile) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (SKIP_DIRS.has(file)) return;
      findWmxJsonFiles(filePath, handleFile);
    } else if (file === 'wmx.json') {
      handleFile(filePath);
    }
  });
};

const log = (msg, ...args) => console.log(`[generate-wmx] ${msg}`, ...args);

const PACKAGE_JSON_KEYS = [
  'name',
  'version',
  'license',
  'repository',
  'homepage',
  'dependencies',
  'keywords',
  'displayName',
  'description',
];

const WMX_BODY_KEYS = [
  'name',
  'displayName',
  'description',
  'version',
  'iconUrl',
  'webSupport',
  'props',
  'events',
  'styles',
  'group',
  'marketplace',
];

const splitFlatWmxSource = (raw) => {
  const packageJSON = {};
  for (const key of PACKAGE_JSON_KEYS) {
    if (raw[key] !== undefined) {
      packageJSON[key] = raw[key];
    }
  }

  const wmxJSON = {};
  for (const key of WMX_BODY_KEYS) {
    if (raw[key] !== undefined) {
      wmxJSON[key] = raw[key];
    }
  }
  wmxJSON.name = raw.name;
  wmxJSON.version = raw.version;
  wmxJSON.displayName = raw.displayName;
  wmxJSON.description = raw.description;
  wmxJSON.iconUrl = raw.iconUrl;
  wmxJSON.webSupport = raw.webSupport !== false;

  return { packageJSON, wmxJSON };
};

const generateWMXZip = (wmxJsonPath, destBaseDir) => {
  log('Reading %s', wmxJsonPath);
  const wmxSrcDir = path.dirname(wmxJsonPath);
  const raw = JSON.parse(fs.readFileSync(wmxJsonPath, 'utf8'));
  const { packageJSON, wmxJSON } = splitFlatWmxSource(raw);
  const pkgOutDir = path.join(destBaseDir, packageJSON.name);
  fs.mkdirSync(pkgOutDir, { recursive: true });
  fs.writeFileSync(path.join(pkgOutDir, 'package.json'), JSON.stringify(packageJSON, null, 2));
  fs.copyFileSync(path.join(wmxSrcDir, wmxJSON.iconUrl), path.join(pkgOutDir, 'icon.svg'));
  fs.writeFileSync(path.join(pkgOutDir, 'wmx.json'), JSON.stringify(wmxJSON, null, 2));
  const indexTsxPath = path.join(wmxSrcDir, 'index.tsx');
  if (fs.existsSync(indexTsxPath)) {
    fs.copyFileSync(indexTsxPath, path.join(pkgOutDir, 'index.tsx'));
  }
  const assetsDir = path.join(wmxSrcDir, 'assets');
  if (fs.existsSync(assetsDir)) {
    fs.cpSync(assetsDir, path.join(pkgOutDir, 'assets'), { recursive: true });
    log('Copied assets/ for %s', packageJSON.name);
  } else if (raw.marketplace) {
    log(
      'Warning: %s has marketplace metadata but no assets/ folder',
      packageJSON.name
    );
  }
  wmxJSON.preview?.forEach((preview) => {
    fs.copyFileSync(path.join(wmxSrcDir, preview), path.join(pkgOutDir, preview));
  });
  const wmxZipPath = path.join(destBaseDir, packageJSON.name + '.zip');
  fs.mkdirSync(path.dirname(wmxZipPath), { recursive: true });
  const zip = new AdmZip();
  zip.addLocalFolder(pkgOutDir);
  zip.writeZip(wmxZipPath);
  log('Built %s (%s) -> %s', packageJSON.name, packageJSON.version, wmxZipPath);
};

const copyZipFilesToDir = (fromDir, toDir) => {
  fs.mkdirSync(toDir, { recursive: true });
  const names = fs.readdirSync(fromDir).filter((n) => n.endsWith('.zip'));
  for (const name of names) {
    fs.copyFileSync(path.join(fromDir, name), path.join(toDir, name));
  }
  log('Copied %d zip file(s) to %s', names.length, toDir);
};

const generateWMX = () => {
  log(
    'Starting WMX generation (sources: wmx + components, output: %s%s)',
    defaultWmxDir,
    zipCopyDestDir ? `, zip copy: ${zipCopyDestDir}` : ''
  );
  if (fs.existsSync(defaultWmxDir)) {
    log('Cleaning default output directory');
    fs.rmSync(defaultWmxDir, { recursive: true });
  }
  fs.mkdirSync(defaultWmxDir, { recursive: true });
  let count = 0;
  [wmxDir, componentsDir].forEach((dir) => {
    if (fs.existsSync(dir)) {
      findWmxJsonFiles(dir, (filePath) => {
        generateWMXZip(filePath, defaultWmxDir);
        count++;
      });
    }
  });
  if (
    zipCopyDestDir &&
    path.resolve(zipCopyDestDir) !== path.resolve(defaultWmxDir)
  ) {
    copyZipFilesToDir(defaultWmxDir, zipCopyDestDir);
  }
  log('Done. Generated %d WMX package(s)', count);
};

generateWMX();
