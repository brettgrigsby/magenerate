import { WorldObject } from './tree'

export type TransformFunc = (x: WorldObject) => WorldObject

type TransformConstructor = (depth: number) => TransformFunc

export const grow: TransformConstructor = (depth) => {
	return (wo) => {
		const newWo = Object.assign({}, wo)
		newWo.mass = wo.mass + (wo.mass * (1 / depth))
		return newWo
	}
}

export const shrink: TransformConstructor = (depth) => {
	return (wo) => {
		const newWo = Object.assign({}, wo)
		newWo.mass = wo.mass - (wo.mass * (1 / depth))
		return newWo
	}
}

export const heat: TransformConstructor = (depth) => {
	return (wo) => {
		const newWo = Object.assign({}, wo)
		newWo.temperature = wo.temperature + (wo.temperature * (1 / depth))
		return newWo
	}
}

export const chill: TransformConstructor = (depth) => {
	return (wo) => {
		const newWo = Object.assign({}, wo)
		newWo.temperature = wo.temperature - (wo.temperature * (1 / depth))
		return newWo
	}
}

export const push: TransformConstructor = (depth) => (wo) => {
	const newWo = Object.assign({}, wo)
	newWo.velocity[0] = wo.velocity[0] + (10 / depth)
	return newWo
}

export const pull: TransformConstructor = (depth) => (wo) => {
	const newWo = Object.assign({}, wo)
	newWo.velocity[0] = wo.velocity[0] - (10 / depth)
	return newWo
}

export const identity: TransformConstructor = (_) => (wo) => wo
