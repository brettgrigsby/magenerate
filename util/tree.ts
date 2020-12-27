import { grow, heat, identity, push, pull, TransformFunc } from './transformFunctions'
import { EdgeCombinator, simpleCompose, swapOrder, applyTwice, doNotApply } from './edgeCombinators'

const MAX_DEPTH = 30

export enum Element {
	Earth = "Earth",
	Air = "Air",
	Water = "Water",
	Stone = "Stone",
	Flesh = "Flesh",
	Source = "Source",
}

const getElementTypes = (): Element[] => {
	return Object.values(Element) as Element[]
}

function getRandomElementFromColl<T>(coll: T[]): T {
	return coll[Math.floor(Math.random() * coll.length)]
}

export interface WorldObject {
	element: Element
	mass: number
	temperature: number
	velocity: number[]
}

export interface MagicNode {
	element: Element
	transformFunc: TransformFunc
	parent: MagicNode | null
	edgeCombinator: EdgeCombinator
	children: MagicNode[]
}

// right now this applies combinators in reverse order (child-last)
// is that what I want? does it actually matter?
const getComposedTransforms = (node: MagicNode, distance: number): TransformFunc => {
	if (distance === 0 || !node.parent) return node.transformFunc
	if (distance === 1) return node.edgeCombinator(node.transformFunc, node.parent.transformFunc)
	return node.edgeCombinator(node.transformFunc, getComposedTransforms(node.parent, distance - 1))
}

export const executeSpell = (node: MagicNode, distance: number, wo: WorldObject): WorldObject => {
	const composed = getComposedTransforms(node, distance)
	return composed(wo)
}

const spawnChildren = (node: MagicNode, depth: number): void => {
	if (depth > MAX_DEPTH) return

	const childrenCounts = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2]
	const childrenCount = depth > 1 ? getRandomElementFromColl(childrenCounts) : 2

	const transformFunctions = [grow, heat, identity, push, pull]
	const edgeCombinators = [simpleCompose, simpleCompose, simpleCompose, swapOrder, swapOrder, applyTwice, applyTwice, doNotApply]

	const firstElement = childrenCount > 1
		? getRandomElementFromColl(getElementTypes().filter(et => et !== Element.Source))
		: node.element

	node.children.push({
		element: firstElement,
		transformFunc: getRandomElementFromColl(transformFunctions)(depth),
		parent: node,
		edgeCombinator: getRandomElementFromColl(edgeCombinators),
		children: []
	})
	if (childrenCount > 1) {
		node.children.push({
			element: getRandomElementFromColl(getElementTypes().filter(et => et !== Element.Source)),
			transformFunc: getRandomElementFromColl(transformFunctions)(depth),
			parent: node,
			edgeCombinator: getRandomElementFromColl(edgeCombinators),
			children: []
		})
	}

	for (let child of node.children) {
		spawnChildren(child, depth + 1)
	}
}

export const makeTree = (): MagicNode => {
	const head: MagicNode = {
		element: Element.Source,
		transformFunc: identity(0),
		parent: null,
		edgeCombinator: simpleCompose,
		children: []
	}
	spawnChildren(head, 1)
	return head

}

export const test = () => {
	const wo: WorldObject = {
		element: Element.Water,
		mass: 10,
		temperature: 100,
		velocity: [0,0,0]
	}

	const head = makeTree()
	console.log({ head })
}