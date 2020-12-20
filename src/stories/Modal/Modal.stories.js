import React from 'react'
import { Modal, Datatable } from './../../index.js'

export default {
	title: 'Modal',
	component: Modal,
	argTypes: {
		onClose: { action: () => console.log('onClose') }
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

export const Default = (args, { parameters }) => {
	return (
		<Modal {...args}>
			<div className='modal-body'>
				<div className='row'>
					<div className='col'>
						<Datatable data={parameters.users} headCols={headCols} options={options}/>
					</div>
				</div>
			</div>
		</Modal>
	)
}
Default.args = {
	show: true,
	title: 'Users'
}
