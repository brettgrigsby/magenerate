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

export const heat: TransformConstructor = (depth) => {
	return (wo) => {
		const newWo = Object.assign({}, wo)
		newWo.temperature = wo.temperature + (wo.temperature * (1 / depth))
		return newWo
	}
}

export const identity: TransformConstructor = (_) => (wo) => wo
