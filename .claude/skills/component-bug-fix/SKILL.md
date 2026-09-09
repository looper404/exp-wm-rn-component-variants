---
name: component-bug-fix
description: Diagnose and fix a bug in an existing WaveMaker RN component (component/props/styles/style-hook) with a regression test, using this repo's typecheck/lint/test verification workflow. Use when a widget under packages/components or packages/wmx-components misbehaves, fails a test, renders incorrectly, or a user reports a defect.
---

# Component bug fix

Fixes a defect in an existing widget without drifting from the file-per-concern
convention the package uses (see `CLAUDE.md` and the `component-creation`
skill for that convention). Root-cause the bug in the right file rather than
patching around it in the component.

## 1. Locate the bug's actual layer

Every widget splits concerns across up to five files
(`<name>.component.tsx`, `<name>.props.ts`, `<name>.styles.ts`,
`use-<name>-styles.ts`, plus `<variant>.style-props.ts` for a variant-based
widget family). Before editing anything, work out which layer actually owns
the bug:

- Wrong resolved color/size/spacing → almost always `use-<name>-styles.ts`
  (check the merge order: `[static default, computed per-variant/size,
  caller override]` — a common bug class is an override being placed
  *before* a computed value, or a `disabled`/state branch not short-
  circuiting the variant lookup).
- Wrong default value or an override not taking effect → `<name>.props.ts`'s
  `create<Name>Props` factory, or the component destructuring a prop with
  its own conflicting default.
- Wrong render branch (icon position, badge visibility, loading vs. caption,
  accessibility label/role) → `<name>.component.tsx`'s conditional logic.
- Shared logic reused by multiple variants of a widget family → check that
  family's `shared/` folder first (e.g. `packages/components/src/<family>/shared/`);
  a fix there affects every consumer, not just the one you're debugging.
- A widget that only reproduces through the Studio wrapper (props arrive as
  lowercase runtime prop names, e.g. `iconclass`/`badgevalue`) → check the
  mapping in `packages/wmx-components/src/<name>/index.tsx` before assuming
  the underlying `@wavemaker/rn-components` widget is at fault.

## 2. Reproduce with a test first

Before changing implementation code, add or extend a test in
`packages/components/test/<name>/` that fails for the reported reason, using
the existing test's own tools:

- Component/render/interaction bugs → `<name>.component.test.tsx` with
  `@testing-library/react`'s `render`/`screen`/`fireEvent`.
- Resolved-style bugs → `use-<name>-styles.test.ts` with `renderHook` and the
  `StyleSheet.flatten(style as never)` pattern already used there — assert
  on the flattened, resolved value, not on the raw style array.
- Default/override bugs → `<name>.props.test.ts`.

Confirm the new test actually fails against the current code
(`npm run test`) before touching the implementation — this is what proves
you found the real bug, not a plausible-looking one.

## 3. Fix minimally

- Change only the layer identified in step 1. Don't "fix" a styles bug by
  adding conditional logic in the component, and don't fix a props-default
  bug by special-casing it in the style hook.
- Don't refactor unrelated code, rename things, or add abstractions while
  you're in there — a bug fix is not a cleanup pass.
- If the bug is in a widget family's shared logic, verify the fix against
  every variant that consumes it, not just the one that surfaced the report.
- Preserve existing behavior for every other test that currently passes —
  a fix that breaks a previously-passing case usually means the root cause
  was misdiagnosed in step 1.

## 4. Verify

From the repo root, in order:

```bash
npm run test         # the new regression test now passes, nothing else broke
npm run typecheck    # tsc --noEmit over packages/components
npm run lint         # if you touched types/props/exports
```

All three must be clean before considering the fix done. If the bug was
visible in Storybook, sanity-check the relevant story under
`storybook/stories/<name>/` still reflects correct behavior — add a new
story only if the bug represents a previously unrepresented case (e.g. a
`badgeCount={0}` edge case).

## 5. Report the root cause, not just the diff

Summarize: what was actually wrong (which file/layer, and why), the
regression test that now guards it, and confirmation that
typecheck/test/lint are clean. Don't just say "fixed" — the next person
debugging a similar report needs the root cause, not the patch.

## Out of bounds

- Never edit `build/` or `dist/` — they're generated, not source.
- Never bump `packages/components/package.json`'s version to "fix" a
  release issue — versioning is root-`package.json`-driven per CLAUDE.md.
- Don't add a hard dependency on `react-native`, `react-native-svg`, or
  `react-native-safe-area-context` to work around an import bug — they're
  peer deps by design.
