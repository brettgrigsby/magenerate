import { TransformFunc } from './transformFunctions'

export type EdgeCombinator = (x: TransformFunc, y: TransformFunc) => TransformFunc

export const simpleCompose: EdgeCombinator = (f1, f2) => (wo) => f2(f1(wo))
export const swapOrder: EdgeCombinator = (f1, f2) => (wo) => f1(f2(wo))
export const applyTwice: EdgeCombinator = (f1, f2) => (wo) => f2(f2(f1(wo)))