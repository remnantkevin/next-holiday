import { join, fromFileUrl } from "https://deno.land/std@0.203.0/path/mod.ts";

// ---------------------------------------------------------------------------------------------------------------------
// CONSTANTS
// ---------------------------------------------------------------------------------------------------------------------

const GENERATORS_DIR_PATH = fromFileUrl(import.meta.resolve("../generators"));
const ALLOWED_GENERATOR_DIR_NAMES = ["au", "za"] as const;
const GENERATOR_ENTRYPOINT_FILE_NAME = "main.ts" as const;

// ---------------------------------------------------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------------------------------------------------

for (const generatorDirName of ALLOWED_GENERATOR_DIR_NAMES) {
  const pathToGenerator = join(
    GENERATORS_DIR_PATH,
    generatorDirName,
    GENERATOR_ENTRYPOINT_FILE_NAME
  );

  // Each generator module exports a `run` function.
  const { run } = await import(pathToGenerator);

  try {
    console.log(`${generatorDirName} - start`);
    await run();
    console.log(`${generatorDirName} - done`);
  } catch (e) {
    console.log(`${generatorDirName} - failed`);
    console.error(e);
  } finally {
    console.log();
  }
}
