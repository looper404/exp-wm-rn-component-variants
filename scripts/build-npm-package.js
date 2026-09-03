const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

// This script lives in code/scripts; packages sit in code/packages.
const codeDir = path.resolve(__dirname, '..');
const packagesDir = path.join(codeDir, 'packages');
// All publishable widget packages under code/packages.
const PACKAGES = ['components', 'wmx-components'];
// Compiled JS + staged package.json live in <pkg>/build; packed tarballs
// collect in a single code/dist directory.
const distDir = path.join(codeDir, 'dist');
// Every published package takes its version from the root package.json so the
// whole widget set versions in lockstep.
const rootVersion = JSON.parse(
  fs.readFileSync(path.join(codeDir, 'package.json'), 'utf8'),
).version;

const log = (msg, ...args) => console.log(`[build-npm-package] ${msg}`, ...args);
const warn = (msg, ...args) => console.warn(`[build-npm-package] WARN ${msg}`, ...args);

// package.json fields carried into the generated dist/package.json. devDependencies
// and the private flag are intentionally dropped so dist/ is publishable as-is.
const KEEP_FIELDS = [
  'name', 'version', 'description', 'keywords', 'author', 'license',
  'repository', 'bugs', 'homepage', 'engines', 'sideEffects', 'publishConfig',
  'dependencies', 'peerDependencies', 'peerDependenciesMeta',
];

const rmrf = (target) => fs.rmSync(target, { recursive: true, force: true });

// build/ doubles as an npm cwd — it is what `npm pack` runs in, and what the
// wmx package resolves `file:../components/build` to — so npm can drop an
// install tree in there. None of it belongs in a published package.
const NON_SHIPPING = ['package-lock.json', 'npm-shrinkwrap.json', 'node_modules'];
const stripNpmArtifacts = (buildDir) => {
  for (const entry of NON_SHIPPING) {
    const target = path.join(buildDir, entry);
    if (fs.existsSync(target)) {
      rmrf(target);
      log(`removed stray ${entry} from ${path.relative(process.cwd(), buildDir)}`);
    }
  }
};

// Compile with the package's own TypeScript, falling back to npx if absent.
const runTsc = (pkgDir) => {
  const localTsc = path.join(pkgDir, 'node_modules', '.bin', 'tsc');
  const hasLocal = fs.existsSync(localTsc);
  const bin = hasLocal ? localTsc : 'npx';
  const args = hasLocal
    ? ['-p', 'tsconfig.build.json']
    : ['--no-install', 'tsc', '-p', 'tsconfig.build.json'];
  return spawnSync(bin, args, { cwd: pkgDir, stdio: 'inherit' }).status ?? 1;
};

// Build the trimmed, publishable package.json that ships inside dist/.
const makeDistPackageJson = (pkgJson) => {
  const out = {};
  for (const key of KEEP_FIELDS) {
    if (pkgJson[key] !== undefined) out[key] = pkgJson[key];
  }
  // Force the root package.json version onto every published package.
  out.version = rootVersion;
  // dist/ is flat (rootDir: src), so the entry points sit next to this file.
  out.main = 'index.js';
  out.module = 'index.js';
  out.types = 'index.d.ts';
  out['react-native'] = 'index.js';
  return out;
};

const buildPackage = (name, { pack }) => {
  const pkgDir = path.join(packagesDir, name);
  const buildDir = path.join(pkgDir, 'build');
  const pkgJson = JSON.parse(fs.readFileSync(path.join(pkgDir, 'package.json'), 'utf8'));

  log(`building ${pkgJson.name} ...`);
  rmrf(buildDir);

  const status = runTsc(pkgDir);
  if (!fs.existsSync(path.join(buildDir, 'index.js'))) {
    throw new Error(`${name}: tsc produced no build/index.js`);
  }
  if (status !== 0) {
    warn(`${name}: tsc reported type errors (exit ${status}); JS + d.ts emitted anyway.`);
  }

  fs.writeFileSync(
    path.join(buildDir, 'package.json'),
    JSON.stringify(makeDistPackageJson(pkgJson), null, 2) + '\n',
  );

  for (const file of ['README.md', 'LICENSE', 'LICENSE.md']) {
    const src = path.join(pkgDir, file);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(buildDir, file));
  }

  stripNpmArtifacts(buildDir);

  log(`OK  ${pkgJson.name} -> ${path.relative(process.cwd(), buildDir)}`);

  if (pack) {
    // Pack the staged build/ (not the package root) so the tarball layout is
    // flat, and collect every tarball in the shared code/dist directory.
    fs.mkdirSync(distDir, { recursive: true });
    const res = spawnSync('npm', ['pack', `--pack-destination=${distDir}`], {
      cwd: buildDir,
      stdio: 'inherit',
    });
    if (res.status !== 0) throw new Error(`${name}: npm pack failed`);
    // `npm pack` itself runs with build/ as its cwd and can leave a lockfile
    // behind, so sweep again once it is done.
    stripNpmArtifacts(buildDir);
    log(`OK  packed tarball into ${path.relative(process.cwd(), distDir)}/`);
  }
};

const main = () => {
  const argv = process.argv.slice(2);
  const pack = argv.includes('--pack');
  const all = argv.includes('--all');
  const named = argv.filter((a) => !a.startsWith('-'));

  let targets;
  if (all || named.length === 0) {
    // Run from a package dir -> build just that package; otherwise build all.
    const cwdName = path.basename(process.cwd());
    targets = !all && PACKAGES.includes(cwdName) ? [cwdName] : PACKAGES;
  } else {
    targets = named;
  }

  for (const name of targets) {
    if (!PACKAGES.includes(name)) {
      throw new Error(`unknown package "${name}" (expected one of: ${PACKAGES.join(', ')})`);
    }
  }

  log(`targets: ${targets.join(', ')}${pack ? ' (with npm pack)' : ''}`);
  for (const name of targets) buildPackage(name, { pack });
  log('done.');
};

main();
