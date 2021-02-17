export { default as Datatable } from './elements/Datatable'
export { default as DatetimePicker } from './elements/DatetimePicker'
export { default as Loading } from './elements/Loading'
export { default as Modal } from './elements/Modal'
export { default as Select } from './elements/Select'

export const replaceLineBy = (array, replace, key) => {
	const idx = array.findIndex((elem) => elem[key] === replace[key])
	array[idx] = {...array[idx], ...replace}
	return array
}

export const deleteLineBy = (array, value, key) => {
	const idx = array.findIndex((elem) => elem[key] === value)
	array.splice(idx, 1)
	return array
}
