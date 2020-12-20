import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import mq from './../Breakpoints.js'
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
			marginBottom: '20px'
		}
		const input = css(mq({
			// height: '30px',
			paddingLeft: '2.375rem',
			'&:hover': {
				fill: '#4691f6',
				border: '1px solid #2196F3'
			}
		}))
		const span = css(mq({
			fill: (this.state.hasFocus ? '#4691f6' : '#aaa'),
			position: 'absolute',
			marginTop: '3px',
		    marginLeft: '10px',
		    width: '1.375rem',
		    height: '1.375rem',
		    lineHeight: '2.375rem',
		    textAlign: 'center',
		    pointerEvents: 'none',
		    color: '#aaa',
			zIndex: '0'
		}))

		return (
			<div className={css(wrapper)}>
				<SvgSearch className={span}/>
				<input type="text" className={input} placeholder={this.props.placeholder}
					onFocus={() => this.setState({ hasFocus:true })}
					onBlur={() => this.setState({ hasFocus:false })}
					onChange={this.handleChange.bind(this)}/>
			</div>
		)
	}

	handleChange = (event) => {
		this.props.onChange(event)
	}
}

export default Search
