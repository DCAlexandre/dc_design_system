import React from 'react'
import { Select } from './../../index.js'

export default {
	title: 'Select',
	component: Select,
	argTypes: {
		onChange: { action: () => console.log('clicked') }
	}
}

export const Default = (args, { parameters }) => <Select {...args} name='name' options={parameters.users}
	optionValue={['name']} placeholder={'User'}/>
Default.args = {
	defaultOption: 18
}
