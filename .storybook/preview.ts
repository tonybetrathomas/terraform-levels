import { applicationConfig, moduleMetadata, type Preview } from '@storybook/angular'
import { setCompodocJson } from "@storybook/addon-docs/angular";
// import '!style-loader!css-loader!sass-loader!./preview.scss';
import docJson from "./documentation.json";
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  // decorators: [
  //   moduleMetadata({
  //     imports: [
  //       BrowserAnimationsModule // Apply globally
  //     ],
  //   }),
  // ]
};

export default preview;