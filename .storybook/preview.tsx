import type { Preview } from "@storybook/react";
import "../src/ui-kit/css/components/index.css";
import "../src/ui-kit/css/variables/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
