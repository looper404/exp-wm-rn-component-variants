import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Svg, { Circle, Path } from 'react-native-svg';
/** One glyph, drawn either as a solid silhouette or a stroked outline. */
export function TabbarGlyph({ name, size = 24, color, filled = false }) {
    const shapeProps = filled
        ? { fill: color, stroke: 'none' }
        : {
            fill: 'none',
            stroke: color,
            strokeWidth: 1.8,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
        };
    return (_jsx(Svg, { width: size, height: size, viewBox: "0 0 24 24", children: GLYPH_PATHS[name](shapeProps, color) }));
}
const GLYPH_PATHS = {
    home: (shapeProps) => (_jsx(Path, { d: "M4 11.5 12 4l8 7.5V19a1.5 1.5 0 0 1-1.5 1.5h-3.75v-6h-5.5v6H5.5A1.5 1.5 0 0 1 4 19z", ...shapeProps })),
    explore: (shapeProps) => (_jsxs(_Fragment, { children: [_jsx(Circle, { cx: 12, cy: 12, r: 8.2, ...shapeProps }), _jsx(Path, { d: "M15 9l-4.5 1.5L9 15l4.5-1.5z", ...shapeProps })] })),
    saved: (shapeProps) => (_jsx(Path, { d: "M6.5 3.5h11a.5.5 0 0 1 .5.5v16.2l-6-3.6-6 3.6V4a.5.5 0 0 1 .5-.5z", ...shapeProps })),
    profile: (shapeProps) => (_jsxs(_Fragment, { children: [_jsx(Circle, { cx: 12, cy: 8.3, r: 3.6, ...shapeProps }), _jsx(Path, { d: "M4.8 20c.6-3.8 3.8-6 7.2-6s6.6 2.2 7.2 6z", ...shapeProps })] })),
    settings: (shapeProps, color) => (_jsxs(_Fragment, { children: [_jsx(Circle, { cx: 12, cy: 12, r: 3.2, ...shapeProps }), _jsx(Path, { d: "M12 3.5v2.3M12 18.2v2.3M20.5 12h-2.3M5.8 12H3.5M17.8 6.2l-1.6 1.6M7.8 16.2l-1.6 1.6M17.8 17.8l-1.6-1.6M7.8 7.8 6.2 6.2", fill: "none", stroke: color, strokeWidth: 1.8, strokeLinecap: "round" })] })),
    more: (shapeProps) => (_jsxs(_Fragment, { children: [_jsx(Circle, { cx: 5.5, cy: 12, r: 1.8, ...shapeProps }), _jsx(Circle, { cx: 12, cy: 12, r: 1.8, ...shapeProps }), _jsx(Circle, { cx: 18.5, cy: 12, r: 1.8, ...shapeProps })] })),
};
//# sourceMappingURL=tabbar-icons.js.map