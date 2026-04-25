import { execFileSync } from "node:child_process";
import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import esbuild from "esbuild";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const tmpDir = path.join(rootDir, ".build-tmp");
const tokenPluginDistDir = path.join(rootDir, "token", "dist");

await rm(distDir, { recursive: true, force: true });
await rm(tmpDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });

execFileSync(
  path.join(rootDir, "node_modules", ".bin", "tsc"),
  ["-p", path.join(rootDir, "tsconfig.build.json")],
  {
    cwd: rootDir,
    stdio: "inherit",
  },
);

await esbuild.build({
  entryPoints: [path.join(tmpDir, "code.js")],
  bundle: true,
  format: "iife",
  outfile: path.join(distDir, "code.js"),
  target: "es5",
  sourcemap: false,
  logLevel: "info",
});

const uiBundle = await esbuild.build({
  entryPoints: [path.join(tmpDir, "ui.js")],
  bundle: true,
  format: "iife",
  target: "es5",
  write: false,
  sourcemap: false,
  logLevel: "info",
});

const uiTemplate = await readFile(path.join(rootDir, "src/ui.html"), "utf8");
const uiScript = uiBundle.outputFiles[0].text.replace(/<\/script>/g, "<\\/script>");
const uiHtml = uiTemplate.replace("/* __UI_SCRIPT__ */", uiScript);

await writeFile(path.join(distDir, "ui.html"), uiHtml, "utf8");
await mkdir(tokenPluginDistDir, { recursive: true });
await copyFile(path.join(distDir, "code.js"), path.join(tokenPluginDistDir, "code.js"));
await writeFile(path.join(tokenPluginDistDir, "ui.html"), uiHtml, "utf8");
await rm(tmpDir, { recursive: true, force: true });

console.log("Build completed.");
