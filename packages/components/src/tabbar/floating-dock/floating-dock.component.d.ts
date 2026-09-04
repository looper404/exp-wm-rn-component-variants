import { type FloatingDockTabbarProps } from './floating-dock.props';
/**
 * Floating Dock Tabbar — a dark, fully rounded pill that floats over the
 * screen with margin on every side, no notch or cutout. Five evenly spaced
 * tabs each show an icon and a label; the active tab's icon sits inside a
 * rounded-rectangle bubble, and its label turns the design's accent green
 * while every inactive icon/label shares one muted gray. No badges are drawn.
 *
 * This design has no overflow menu, so `maxvisibleitems`, `morebuttoniconclass`
 * and the `onMoreClick`/`onMoreItemClick` events stay declared and unwired —
 * nothing in this layout can fire them. `classname` and the
 * `itemicon`/`itemlabel`/`itembadge`/`itemlink` dataset-field selectors are
 * likewise declared for the Studio wrapper/metadata layer: resolving a class
 * name, an expression, or an icon-font class needs a runtime this standalone
 * package intentionally doesn't depend on. `dataset`, when supplied, still
 * drives the tab count and is handed back as the `item` payload on every
 * event.
 */
export declare function FloatingDockTabbar(partial?: FloatingDockTabbarProps): import("react/jsx-runtime").JSX.Element | null;
export default FloatingDockTabbar;
//# sourceMappingURL=floating-dock.component.d.ts.map