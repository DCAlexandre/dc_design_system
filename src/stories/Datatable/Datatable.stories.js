import React from 'react'
import { Datatable } from './../../index.js'

export default {
	title: 'Datatable',
	component: Datatable,
	argTypes: {
		onClick: { action: () => console.log('clicked') }
	}
}
let headCols = {
	name: 'Nom prénom',
	username: 'Identifiant',
	email: 'E-mail'
}
let options = [{
	name: 'Edit', callback: (item) => console.log('Edit', item)
}, {
	name: 'Delete', callback: (item) => console.log('Delete', item)
}]

export const Default = (args, { parameters }) => <Datatable {...args} data={parameters.users} headCols={headCols} options={options}/>
Default.args = {
	search: true
}
