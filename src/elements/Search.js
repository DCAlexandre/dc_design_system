import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import SvgSearch from './svg/SvgSearch.js'

class Search extends React.Component {
	// Constructor ----------------------------------------------------------------
	constructor(props) {
		super(props)

		this.state = {
			hasFocus: false
		}
	}

	render() {
		const wrapper = {
			marginBottom: '20px',
			width: 'fit-content',
			border: '1px solid transparent',
			'&:hover': {
				// border: '1px solid #2196F3',
				boxShadow: '0 0 3px rgba(81, 203, 238, 1)',
				border: '1px solid rgba(81, 203, 238, 1)'
			}
		}
		const input = {
			transition: 'all 0.30s ease-in-out',
			outline: 'none',
			border: 'none',
			'&:focus': {
				borderStyle: 'hidden !important',
				border: 'none !important'
			}
		}
		const span = {
			fill: (this.state.hasFocus ? '#4691f6' : '#aaa'),
			position: 'relative',
			marginTop: '-5px',
			marginBottom: '0px',
			marginLeft: '5px',
			marginRight: '5px',
			width: '1.375rem',
			height: '1.375rem'
		}

		return (
			<div className={css(wrapper)}>
				<SvgSearch className={css(span)}/>
				<input type="text" className={css(input)} placeholder={this.props.placeholder}
					onFocus={() => this.setState({ hasFocus:true })}
					onBlur={() => this.setState({ hasFocus:false })}
					onChange={this.handleChange.bind(this)}/>
			</div>
		)
	}

	handleChange = (event) => this.props.onChange(event)
}

export default Search
