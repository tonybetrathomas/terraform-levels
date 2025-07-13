import type { StorybookConfig } from '@storybook/angular';
import * as path from 'path';

const config: StorybookConfig = {
  "stories": [
    "../projects/**/src/lib/components/**/**/*.mdx",
    "../projects/**/src/lib/components/**/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../projects/**/src/stories/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions"
  ],
  "framework": {
    "name": "@storybook/angular",
    "options": {}
  },
  webpackFinal: async (config) => {
    config?.module?.rules?.push({
      test: /\.scss$/,
      include: /[\\/]\.storybook[\\/]/, // ✅ Only for .storybook folder
      use: ['style-loader', 'css-loader', 'sass-loader', {
        loader: 'sass-loader',
        options: {
          implementation: require('sass'),
          sassOptions: {
            includePaths: [
              path.resolve(__dirname, '../node_modules'),
              // Add any other paths where your SCSS partials or variables are located
            ],
          },
        },
      }],
    });

    return config;
  },
};
export default config;