import type { Preview } from "@storybook/react";
import "./preview.css";
import { withWmRuntime } from "./decorators/wm-runtime";

const preview: Preview = {
  decorators: [withWmRuntime],
  parameters: {
    viewport: {
      viewports: {
        mobile390: {
          name: "iPhone 14 (390)",
          styles: { width: "390px", height: "844px" },
        },
      },
      defaultViewport: "mobile390",
    },
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#1a1d29" },
        { name: "light", value: "#f5f5f7" },
        { name: "purple", value: "#7B4FD4" },
        { name: "magenta", value: "#C2185B" },
      ],
    },
    options: {
      // Sidebar order: alphabetical at every level (categories and stories), but
      // pin the auto "Docs" page first and the "Default" story next within each
      // group. Storybook evaluates this function from source at index time, so it
      // must stay plain JS — inline `: type` annotations break that eval, so the
      // param types are inferred from the default values instead.
      storySort: (a = { title: "", name: "" }, b = { title: "", name: "" }) => {
        const PINNED = ["Docs", "Default"];
        const pathA = a.title.split("/").concat(a.name);
        const pathB = b.title.split("/").concat(b.name);
        const depth = Math.min(pathA.length, pathB.length);
        for (let i = 0; i < depth; i++) {
          if (pathA[i] === pathB[i]) continue;
          const ra = PINNED.indexOf(pathA[i]);
          const rb = PINNED.indexOf(pathB[i]);
          const weightA = ra === -1 ? PINNED.length : ra;
          const weightB = rb === -1 ? PINNED.length : rb;
          if (weightA !== weightB) return weightA - weightB;
          return pathA[i].localeCompare(pathB[i], undefined, { numeric: true });
        }
        return pathA.length - pathB.length;
      },
    },
  },
};

export default preview;
