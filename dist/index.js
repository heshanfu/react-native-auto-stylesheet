"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const { width, height } = react_native_1.Dimensions.get('window');
let guidelineBaseWidth = 375;
let guidelineBaseHeight = 667;
let scalingFactor = 1;
let horizontalFactor;
let verticalFactor;
let adimensionalFactor;
const calculateFactors = () => {
    horizontalFactor = (width / guidelineBaseWidth) * scalingFactor;
    verticalFactor = (height / guidelineBaseHeight) * scalingFactor;
    adimensionalFactor = (horizontalFactor + verticalFactor) / 2;
};
calculateFactors();
const PROPERTIES_DEPENDING_ON_WIDTH = [
    'width',
    'marginLeft',
    'marginRight',
    'marginHorizontal',
    'paddingLeft',
    'paddingRight',
    'paddingHorizontal',
    'borderLeftWidth',
    'borderRightWidth',
    'left',
    'right'
];
const PROPERTIES_DEPENDING_ON_HEIGHT = [
    'height',
    'marginTop',
    'marginBottom',
    'marginVertical',
    'paddingTop',
    'paddingBottom',
    'paddingVertical',
    'borderTopWidth',
    'borderBottomWidth',
    'top',
    'bottom'
];
const PROPERTIES_DEPENDING_ON_NEITHER = ['fontSize', 'margin', 'padding', 'borderWidth'];
exports.StyleSheet = Object.assign({}, react_native_1.StyleSheet, { scaleHorizontally(size) {
        return react_native_1.PixelRatio.roundToNearestPixel(size * horizontalFactor);
    },
    scaleVertically(size) {
        return react_native_1.PixelRatio.roundToNearestPixel(size * verticalFactor);
    },
    scaleWithAverageRatio(size) {
        return react_native_1.PixelRatio.roundToNearestPixel(size * adimensionalFactor);
    },
    create(styles) {
        const newStyles = {};
        for (const key in styles) {
            let style = styles[key];
            newStyles[key] = Object.assign({}, style);
            for (const property in style) {
                const propName = property;
                const value = style[propName];
                if (PROPERTIES_DEPENDING_ON_WIDTH.includes(propName) && typeof value === 'number') {
                    newStyles[key][propName] = this.scaleHorizontally(value);
                }
                if (PROPERTIES_DEPENDING_ON_HEIGHT.includes(propName) && typeof value === 'number') {
                    newStyles[key][propName] = this.scaleVertically(value);
                }
                if (PROPERTIES_DEPENDING_ON_NEITHER.includes(propName) && typeof value === 'number') {
                    newStyles[key][propName] = this.scaleWithAverageRatio(value);
                }
            }
        }
        return react_native_1.StyleSheet.create(newStyles);
    },
    setGuidelineBaseDimensions(newWidth = 375, newHeight = 667) {
        guidelineBaseWidth = newWidth;
        guidelineBaseHeight = newHeight;
        calculateFactors();
    },
    setFactor(factor) {
        scalingFactor = factor;
        calculateFactors();
    }, createUnscaled: react_native_1.StyleSheet.create });
