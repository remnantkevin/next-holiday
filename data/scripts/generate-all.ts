import { join, fromFileUrl } from "https://deno.land/std@0.203.0/path/mod.ts";
import { ALLOWED_COUNTRY_CODES } from "../../shared/constants.ts";

// ---------------------------------------------------------------------------------------------------------------------
// CONSTANTS
// ---------------------------------------------------------------------------------------------------------------------

const GENERATORS_DIR_PATH = fromFileUrl(import.meta.resolve("../generators"));
const ALLOWED_GENERATOR_DIR_NAMES = ALLOWED_COUNTRY_CODES;
const GENERATOR_ENTRYPOINT_FILE_NAME = "main.ts" as const;

// const GENERATED_DATA_DIR_PATH = fromFileUrl(import.meta.resolve("../generated"));

// ---------------------------------------------------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------------------------------------------------

for (const generatorDirName of ALLOWED_GENERATOR_DIR_NAMES) {
  const pathToGenerator = join(GENERATORS_DIR_PATH, generatorDirName, GENERATOR_ENTRYPOINT_FILE_NAME);

  // Each generator module exports a `run` function.
  const { run } = await import(pathToGenerator);

  try {
    console.log(`${generatorDirName} - start`);
    await run();
    // await gzipDateFile(join(GENERATED_DATA_DIR_PATH, `${generatorDirName}.json`));
    console.log(`${generatorDirName} - done`);
  } catch (e) {
    console.log(`${generatorDirName} - failed`);
    console.error(e);
  } finally {
    console.log();
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------------------------------------------------

// async function gzipDateFile(inputFilePath: string): Promise<void> {
//   const inputFile = await Deno.open(inputFilePath, { read: true });
//   const outputFile = await Deno.open(`${inputFilePath}.gz`, {
//     write: true,
//     create: true,
//   });
//   await inputFile.readable.pipeThrough(new CompressionStream("gzip")).pipeTo(outputFile.writable);
// }
