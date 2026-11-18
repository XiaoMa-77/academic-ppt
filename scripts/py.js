// Cross-platform Python launcher for npm scripts.
// npm runs scripts through sh on Unix and cmd.exe on Windows, so shell-style
// `PYTHON=... npm test` syntax cannot be embedded in package.json. Reading the
// variable here keeps the README's documented override working on both.
// The value may contain arguments, e.g. PYTHON="py -3.12".
const { spawnSync } = require('node:child_process');

const [command, ...pythonArgs] = (process.env.PYTHON || 'python').trim().split(/\s+/);
const result = spawnSync(command, [...pythonArgs, ...process.argv.slice(2)], {
  stdio: 'inherit',
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}
process.exit(result.status === null ? 1 : result.status);
