import { build, context } from 'esbuild';

const isProd = process.env.BUILD === 'production';
const watch = process.argv.includes('--watch');

async function run() {
  try {
    const options = {
      entryPoints: ['src/main.ts'],
      bundle: true,
      platform: 'node',
      outfile: 'dist/main.js',
      sourcemap: isProd ? false : 'inline',
      minify: isProd,
      external: ['obsidian'],
      format: 'cjs',
      target: ['node14'],
      tsconfig: 'tsconfig.json',
    };

    if (watch) {
      const ctx = await context(options);
      await ctx.watch();
      console.log('esbuild watching...');
      // keep process running
    } else {
      await build(options);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
