import { relative } from 'path';
import { buildConfigurationFields } from './buildConfigurationFields';
import { loadConfigurationFile } from './loadConfigurationFile';
import { searchConfigurationFile } from './searchConfigurationFile';
import type { CustomIntlayerConfig, IntlayerConfig } from './types';

let storedConfiguration: IntlayerConfig | undefined;
let storedConfigurationFilePath: string | undefined;
let storedNumCustomConfiguration: number | undefined;

export type GetConfigurationOptions = {
  baseDirPath: string;
  verbose: boolean;
};

const BASE_DIR_PATH = process.env.INTLAYER_BASE_DIR_PATH ?? process.cwd();
const defaultOptions: GetConfigurationOptions = {
  baseDirPath: BASE_DIR_PATH,
  verbose: false,
};

export const getConfiguration = (
  options?: Partial<GetConfigurationOptions>
): IntlayerConfig => {
  const mergedOptions = { ...defaultOptions, ...options };
  const { baseDirPath, verbose } = mergedOptions;

  if (!storedConfiguration) {
    // Search for configuration files
    const { configurationFilePath, numCustomConfiguration } =
      searchConfigurationFile(baseDirPath);

    // Load the custom configuration
    let customConfiguration: CustomIntlayerConfig | undefined;
    if (configurationFilePath) {
      customConfiguration = loadConfigurationFile(configurationFilePath);
    }

    // Save the configuration to avoid reading the file again
    storedConfiguration = buildConfigurationFields(
      mergedOptions,
      customConfiguration
    );
    storedConfigurationFilePath = configurationFilePath;
    storedNumCustomConfiguration = numCustomConfiguration;
  }

  // Log wa rning if multiple configuration files are found
  if (verbose)
    logConfigFileResult(
      storedNumCustomConfiguration,
      storedConfigurationFilePath
    );

  return storedConfiguration;
};

const logConfigFileResult = (
  numCustomConfiguration?: number,
  configurationFilePath?: string
) => {
  if (numCustomConfiguration === 0) {
    console.info('Configuration file not found, using default configuration.');
  } else {
    const relativeOutputPath = relative(BASE_DIR_PATH, configurationFilePath!);

    if (numCustomConfiguration === 1) {
      console.info(`Configuration file found: ${relativeOutputPath}.`);
    } else {
      console.warn(
        `Multiple configuration files found, using ${relativeOutputPath}.`
      );
    }
  }
};
