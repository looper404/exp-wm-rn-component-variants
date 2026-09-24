---
name: wmx-contract-audit
description: Audit a packages/wmx-components/src/<name>/index.tsx Studio wrapper against the full prop/event/method contract of the WaveMaker widget it extends (per docs.wavemaker.com/learn/react-native/widget-library-mobile), and report gaps in prop passthrough, event wiring, or exposed methods with file:line. Use when reviewing an existing or newly built wmx-components wrapper for completeness against the widget it's meant to override.
---

# WMX wrapper contract audit

Checks whether a `packages/wmx-components/src/<name>/index.tsx` Studio wrapper
actually exposes/forwards everything the WaveMaker widget it extends promises
— every documented property, event, and method. This skill **audits and
reports gaps; it does not fix them.** Read `CLAUDE.md` at the repo root first
if it isn't already in context.

## 1. Identify what the wrapper actually extends

Open `packages/wmx-components/src/<name>/index.tsx` and look at the `Props`
class the wrapper's `BaseComponent` is parameterized with:

- **Case A — extends an existing runtime widget's own Props class.**
  `sample_button` is the example: its `WmSampleButton` is built on
  `WmButtonProps` imported from
  `@wavemaker-ai/app-rn-runtime/components/basic/button/button.props`, and
  the file's own doc comment says it "override[s] the built-in `wm-button`
  widget." When this is the shape, the "extended wm component" is that
  runtime widget, and its full contract lives in WaveMaker's docs — go to
  step 2.
- **Case B — bespoke `Props` class extending only `BaseProps` directly.**
  `dock_tabbar` is the example: `WmDockTabbarProps extends BaseProps`, with
  no runtime widget's own props class involved. This means there is no
  single existing WaveMaker Studio widget this wrapper is overriding — it's
  a new widget category. There's nothing to diff a contract against; skip to
  step 4 (self-consistency check) instead of step 2/3.

If you can't tell which case you're in from the imports alone (this should be
rare — the `Props` class's own `extends` clause is normally decisive), read
the wrapper file's doc comment, which conventionally states in prose whether
it overrides a built-in widget. `wmx.json` has no structured field for this
(its `description`/`keywords` are free text, not reliable to grep) — don't
rely on it. If it's still ambiguous, ask the user rather than guessing.

## 2. Pull the full contract (Case A only)

`https://docs.wavemaker.com/learn/react-native/widget-library-mobile` is only
a **catalog/index** — icon, name, one-line description, and a link out. It
does not itself contain property/event/method tables. Fetch the *linked*
per-widget page (e.g. Button is at
`/learn/app-development/widgets/form-widgets/button`) to get the actual
contract: its Properties table and Events table. There is no separate
Methods table — methods (including widget-specific imperative ones) show up
only as inline prose/code snippets under "Use Cases," so read that section
rather than looking for a table; don't conclude "no table found → no
widget-specific methods."

Then pull the **installed runtime Props class** as ground truth, since the
web doc can drift from the version actually installed:
`node_modules/@wavemaker/app-rn-runtime/components/<group>/<name>/<name>.props.d.ts`
(e.g. `.../basic/button/button.props.d.ts` for Button). Cross-check every
doc-listed property/event against this file before flagging a gap — a
property or event the doc lists but that doesn't exist on the installed
`.d.ts` at all is a doc/runtime-version mismatch, not a wrapper gap; don't
report it as one. Conversely a field present on the installed `.d.ts` is in
scope even if you're unsure whether the doc still lists it.

Note this about the doc page's format:
- Each widget/prop typically carries **Web App / Mobile App platform
  badges**. This repo is React Native only — a documented prop or event
  that's marked web-only (e.g. hover-based `onMouseEnter`/`onMouseLeave`, or
  keyboard events like `onKeyPress` when the widget has no RN keyboard
  affordance) is legitimately not applicable here. Don't flag its absence as
  a gap; note it as N/A with the reason. Conversely, anything the doc calls
  out as RN-specific (e.g. Button's `onLongTap` is explicitly annotated
  "React Native only") is squarely in scope and its absence *is* a gap. Don't
  assume a field is web-only just because it isn't wired in the wrapper —
  check the installed Props class and the platform badge before deciding;
  plenty of fields absent from a wrapper (e.g. Button's `onFocus`/`onBlur`)
  are present on the installed Props class and are RN-applicable, not N/A.

## 3. Diff the contract against the wrapper (Case A only)

Go through every documented property, event, and method and locate its
concrete handling in the wrapper's `renderWidget`:

- **Property**: does `renderWidget(props)` read `props.<x>` (note runtime
  prop names are lowercase, e.g. `iconclass` not `iconClass`) and pass it
  into the underlying `@wavemaker/rn-components/<name>` widget's own prop?
  A property that's inherited onto the wrapper's state via the base Props
  class (e.g. via `new WmButtonProps()`) but never read inside
  `renderWidget` is a silent gap.
- **Event**: is there an `on<X>` callback passed into the
  `@wavemaker/rn-components` widget that calls
  `this.invokeEventCallback('<eventName>', [...])`? An event with no
  matching `invokeEventCallback` call is a gap.
- **Method**: for widget-specific methods only (see Out of bounds) — is it
  implemented as a class method on the wrapper?

When a property/event is missing, check *why* by also looking at the
underlying `@wavemaker/rn-components/<name>` widget's own `<name>.props.ts`
(`packages/components/src/<name>/`) — this distinguishes two different gaps
that need different follow-up scope:
- **Wrapper-only gap**: the underlying `rn-components` widget already
  exposes the prop/callback, but `renderWidget` just doesn't read/wire it.
  Fixable by editing the wrapper alone.
- **Two-layer gap**: the underlying `rn-components` widget has no equivalent
  prop/callback either — the wrapper can't forward what the widget it wraps
  doesn't support. Fixing this needs a change to the `rn-components` widget
  first, then the wrapper.

Note both when reporting (see step 5).

## 4. Self-consistency check (Case B, or as a supplement to Case A)

When there's no existing widget to diff against (Case B), or as a sanity
pass alongside step 3, check the wrapper against itself:

- Every field declared on the wrapper's own `Props` class is actually read
  in `renderWidget` and forwarded to the underlying component.
- Every event the underlying `@wavemaker/rn-components` widget can fire
  (check its own `<name>.props.ts` in `packages/components/src/<name>/`)
  has a corresponding wrapper prop wired through `invokeEventCallback`.
- Every imperative method the underlying component exposes (if any, via
  ref) is surfaced if the wrapper's `Props` class implies it should be
  (e.g. an `onChange`-adjacent prop suggests Studio expects a matching
  event name — verify the wrapper doesn't silently rename or drop it).

## 5. Report gaps with file:line

Report as a table, one row per contract item:

| Item | Type | Status | Location | Notes |
|---|---|---|---|---|

- `Status` is one of: Forwarded, **Not forwarded — wrapper-only gap**,
  **Not forwarded — two-layer gap** (see step 3), N/A (with the
  platform/generic-method reason from step 2).
- `Location` is the `file:line` where it's forwarded (or, for a gap, the
  `file:line` in `renderWidget` where it would need to be added).
- Do not edit the wrapper to close gaps as part of this audit — report them,
  and if the user wants them fixed, that's separate follow-up work (file a
  child issue rather than patching silently).

## 6. Worked examples

**`sample_button` (Case A, partial wrapper)** — extends the Button widget's
`WmButtonProps`. Cross-checking the doc against the installed
`button.props.d.ts` first (step 2) matters here: the doc page can list
properties like `type`, `tabIndex`, `shortcutKey`, or `horizontalAlign` that
aren't actually on the installed `WmButtonProps` at all (a
doc/runtime-version mismatch) — don't report these as wrapper gaps, since
there's no field for `renderWidget` to read in the first place. The
installed `WmButtonProps` does declare `onTap`, `onDoubleTap`, `onLongTap`,
`onFocus`, and `onBlur`; of these only `onTap` is wired via
`invokeEventCallback` in `renderWidget`. Checking the underlying
`SampleButtonProps` (`packages/components/src/sample_button/sample_button.props.ts`)
shows it only exposes `onPress` — no hook for double-tap, long-tap, focus,
or blur at all. So `onDoubleTap`/`onLongTap`/`onFocus`/`onBlur` are all
**two-layer gaps** (not "plausibly N/A" — `onFocus`/`onBlur` are real,
non-web-only fields on the installed Props class, and `onLongTap` is
explicitly RN-flagged on the doc): the underlying `rn-components` widget
would need a matching callback prop before the wrapper could forward
anything. `onClick`/`onMouseEnter`/`onMouseLeave`/`onKeyDown`/`onKeyPress`/
`onKeyUp`, if the doc lists them, are web/DOM-oriented and legitimately N/A
on RN — verify against current platform badges before deciding, since docs
can change.

**`dock_tabbar` (Case B, bespoke widget, complete wrapper)** — its
`WmDockTabbarProps extends BaseProps` directly; there is no single existing
WaveMaker widget it overrides, so step 2/3 don't apply. Running the
self-consistency check (step 4) instead: every field on `WmDockTabbarProps`
(`activeindex`, `dotcolor`, `accessibilitylabel`, the five `item<N>*` slots,
`onChange`, `onItemLongPress`, `onTap`) is read in `renderWidget` and
forwarded into `DockTabbar`'s own props, and all three events are wired
through `invokeEventCallback`. This is what a complete wrapper looks like
under the self-consistency check.

## Out of bounds

- Never fix a gap found by this audit inline — report it, and route the fix
  as its own follow-up (a child issue, or explicit user confirmation) rather
  than silently patching a wrapper while "just auditing" it.
- Don't invent contract items that aren't actually on the fetched doc page
  in Case A, and don't demand Case B wrappers match a widget they were never
  meant to extend.
- Don't flag generic `BaseComponent`-provided plumbing (`testID`/`name`/
  `id`, style region wiring, `setWidgetProperty()`) as wrapper-specific
  gaps — those come from the base class for every widget, not from
  `renderWidget` itself.
