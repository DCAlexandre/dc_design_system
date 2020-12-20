import React from 'react'
import { css } from 'emotion'
import mq from '../Breakpoints.js'
import MoreHoriz from './svg/MoreHoriz.js'

export default class Dotmenu extends React.Component {
	// Renderers ----------------------------------------------------------------
	render() {
		let style = { cursor: 'pointer' }

		return (
			<div className={'dropdown '+css(style)}>
				<span aria-hidden='true' id='dropdownMenuButton'
					data-bs-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
					<MoreHoriz/>
				</span>
				<div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
					{this.renderItems()}
				</div>
			</div>
		)
	}

	renderItems() {
		let style = { userSelect: 'none', cursor: 'pointer' }

		let items = []
		for (let index = 0; index < this.props.options.length; index++) {
			const option = this.props.options[index]

			items.push(
				<div className={'dropdown-item '+css(style)}
					onClick={(ev) => option.callback(this.props.params)} key={index}>
					{(this.props.t ? this.props.t(option.name) : option.name)}
				</div>
			)
		}
		return items
	}
}
