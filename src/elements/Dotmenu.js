import React from 'react'
import { css } from 'emotion'
import MoreHoriz from './svg/MoreHoriz.js'

export default class Dotmenu extends React.Component {
	// Renderers ----------------------------------------------------------------
	render() {
		return (
			<div className='dropdown'>
				<span aria-hidden='true' id='dropdownMenuButton' className={css({ cursor: 'pointer' })}
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
		let style = { userSelect: 'none', '&:hover': {} }

		let items = []
		for (let index = 0; index < this.props.options.length; index++) {
			const option = this.props.options[index]
			const disabled = (option.disabled ? option.disabled(this.props.params) : false)

			style.color = (disabled ? '#aaaaaa !important' : 'auto')
			style['&:hover'] = {
				cursor: (disabled ? 'default' : 'pointer'),
				backgroundColor: (disabled ? 'transparent !important' : '#f8f9fa')
			}

			items.push(
				<div className={'dropdown-item '+css(style)}
					onClick={(event) => {
						if (disabled) return
						option.callback(this.props.params)
					}} key={index}>
					{(this.props.t ? this.props.t(option.name) : option.name)}
				</div>
			)
		}
		return items
	}
}
