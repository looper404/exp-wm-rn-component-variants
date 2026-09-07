/**
 * Dock Tab Bar — generated skeleton, filled in by hand.
 * Source design: dock-tabbar. Regenerating overwrites nothing that exists.
 */
// GENERATED from the design spec's merged component API. Every prop and event
// the widget exposes is listed here once: the props file, the Storybook stories,
// the unit tests and the Studio metadata are all expected to agree with it.
// Regenerate by re-running the scaffolder; do not hand-edit.

/** Shape of the manifest below. Declared locally so this file depends on nothing. */
export type DockTabbarApiProp = {
  name: string;
  kind: 'string' | 'number' | 'boolean' | 'color' | 'list' | 'style' | 'function';
  required: boolean;
  default: string | number | boolean | null;
  description: string;
  source: 'family' | 'repo' | 'design';
};
export type DockTabbarApiEvent = {
  name: string;
  payload: string;
  description: string;
  source: 'family' | 'repo' | 'design';
};

export const DOCK_TABBAR_API: { props: DockTabbarApiProp[]; events: DockTabbarApiEvent[] } =
{
  "props": [
    {
      "name": "activeIndex",
      "kind": "number",
      "required": false,
      "default": 0,
      "description": "Index of the selected tab.",
      "source": "family"
    },
    {
      "name": "classname",
      "kind": "string",
      "required": false,
      "default": null,
      "description": "Extra class names merged into the root style resolution.",
      "source": "family"
    },
    {
      "name": "dataset",
      "kind": "list",
      "required": false,
      "default": null,
      "description": "Items to render as tabs. Overrides numberOfItems when supplied.",
      "source": "family"
    },
    {
      "name": "disabled",
      "kind": "boolean",
      "required": false,
      "default": false,
      "description": "Disables every tab.",
      "source": "family"
    },
    {
      "name": "getIcon",
      "kind": "function",
      "required": false,
      "default": null,
      "description": "Render override returning a tab’s icon node.",
      "source": "family"
    },
    {
      "name": "getLabel",
      "kind": "function",
      "required": false,
      "default": null,
      "description": "Render override returning a tab’s label.",
      "source": "family"
    },
    {
      "name": "iconPalette",
      "kind": "style",
      "required": false,
      "default": null,
      "description": "Active and inactive icon colours.",
      "source": "family"
    },
    {
      "name": "itembadge",
      "kind": "string",
      "required": false,
      "default": null,
      "description": "Dataset field, or expression, giving each tab its badge value.",
      "source": "family"
    },
    {
      "name": "itemicon",
      "kind": "string",
      "required": false,
      "default": null,
      "description": "Dataset field, or expression, giving each tab its icon class.",
      "source": "family"
    },
    {
      "name": "itemlabel",
      "kind": "string",
      "required": false,
      "default": null,
      "description": "Dataset field, or expression, giving each tab its label.",
      "source": "family"
    },
    {
      "name": "itemlink",
      "kind": "string",
      "required": false,
      "default": null,
      "description": "Dataset field, or expression, giving each tab its navigation target.",
      "source": "family"
    },
    {
      "name": "layout.barFill",
      "kind": "color",
      "required": false,
      "default": null,
      "description": "Fill for the barFill surface. Defaults to the barFill constant in the styles file.",
      "source": "design"
    },
    {
      "name": "maxvisibleitems",
      "kind": "number",
      "required": false,
      "default": null,
      "description": "Tabs shown before the rest collapse into the overflow menu.",
      "source": "family"
    },
    {
      "name": "morebuttoniconclass",
      "kind": "string",
      "required": false,
      "default": null,
      "description": "Icon class for the overflow button.",
      "source": "family"
    },
    {
      "name": "morebuttonlabel",
      "kind": "string",
      "required": false,
      "default": "more",
      "description": "Label under the overflow button.",
      "source": "family"
    },
    {
      "name": "name",
      "kind": "string",
      "required": true,
      "default": null,
      "description": "Widget name, unique within the page.",
      "source": "family"
    },
    {
      "name": "numberOfItems",
      "kind": "number",
      "required": false,
      "default": 4,
      "description": "Tab count when no dataset is bound.",
      "source": "family"
    },
    {
      "name": "show",
      "kind": "boolean",
      "required": false,
      "default": true,
      "description": "Whether the tab bar renders at all.",
      "source": "family"
    },
    {
      "name": "showLabels",
      "kind": "boolean",
      "required": false,
      "default": true,
      "description": "Show tab labels. This design draws them: active-only.",
      "source": "design"
    },
    {
      "name": "styles",
      "kind": "style",
      "required": false,
      "default": null,
      "description": "Per-region style overrides, keyed by the design’s style regions.",
      "source": "family"
    }
  ],
  "events": [
    {
      "name": "onItemClick",
      "payload": "(index: number, item?: unknown)",
      "description": "A tab was tapped.",
      "source": "family"
    },
    {
      "name": "onItemSelect",
      "payload": "(index: number, item?: unknown)",
      "description": "The active tab changed, however it changed.",
      "source": "family"
    },
    {
      "name": "onLongPress",
      "payload": "(index: number, item?: unknown)",
      "description": "A tab was long-pressed.",
      "source": "family"
    },
    {
      "name": "onMoreClick",
      "payload": "()",
      "description": "The overflow button was tapped.",
      "source": "family"
    },
    {
      "name": "onMoreItemClick",
      "payload": "(index: number, item?: unknown)",
      "description": "An item inside the overflow menu was tapped.",
      "source": "family"
    }
  ]
};

/** Prop names, for tests and metadata that must stay exhaustive. */
export const DOCK_TABBAR_PROP_NAMES = ["activeIndex","classname","dataset","disabled","getIcon","getLabel","iconPalette","itembadge","itemicon","itemlabel","itemlink","layout.barFill","maxvisibleitems","morebuttoniconclass","morebuttonlabel","name","numberOfItems","show","showLabels","styles"] as const;

/** Event names, same reason. */
export const DOCK_TABBAR_EVENT_NAMES = ["onItemClick","onItemSelect","onLongPress","onMoreClick","onMoreItemClick"] as const;
