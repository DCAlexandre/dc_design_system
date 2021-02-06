import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import mq from './../Breakpoints.js'

class Option extends React.Component {
	// Constructor ----------------------------------------------------------------
	constructor(props) {
		super(props)

		this._ref = React.createRef()
	}

	render() {
		const li = css(mq({
			padding: "7px 9px",
			borderBottom: "1px solid #e1e1e1",
			cursor: "pointer",
			color: "#6e6e6e",
			'&:hover': {
				backgroundColor: '#e8e8e8',
				color: '#333'
			}
		}))
		const liSelected = css(mq({
			backgroundColor: '#f1f1f1',
			color: '#333'
		}))

		return (
			<li className={(this.props.selected ? (li + ' ' + liSelected) : li)} value={this.props.value}
				ref={(node) => { if (node) this._ref = node }}
				onMouseDown={this.props.onMouseDown}>
				{this.props.text}
			</li>
		)
	}
}

class Select extends React.Component {
	// Constructor ----------------------------------------------------------------
	constructor(props) {
		super(props)

		this.state = {
			multiple: (props.multiple ? props.multiple : false),
			options: (props.options ? props.options : []),
			value: (props.defaultOption ? props.defaultOption : 0),
			inputValue: this.getOptionValue(props.options[props.defaultOption]),
			show: (props.show ? props.show : false)
		}
		this._options = props.options
		this._refs = []
	}

	componentDidUpdate(prevProps) {
		if (
			this.props.options !== prevProps.options ||
			prevProps.defaultOption !== this.props.defaultOption
		) {
			this.setState({
				value: this.props.defaultOption,
				inputValue: this.getOptionValue(this.props.options[this.props.defaultOption]),
				options: this.props.options
			}, () => this.scrollTo(this.state.value))
			this._options = this.props.options
		}
	}

	// Listeners ----------------------------------------------------------------
	onMouseDown = (iOption) => { this.selectOption(iOption) }

	handleKeyDown = (ev) => {
		if (ev.key === 'Enter') {
			this.selectOption(this.state.value)
		} else if (ev.key === 'ArrowUp') {
			if (this.state.value !== 0) {
				this.setState({ value: (this.state.value-1) })
				this.scrollTo(this.state.value-1)
			}
		} else if (ev.key === 'ArrowDown') {
			if (this.state.value !== this.state.options.length-1) {
				this.setState({ value: (this.state.value+1) })
				this.scrollTo(this.state.value+1)
			}
		} else if (ev.key === 'Escape') {
			this.setState({ show: false })
		}
	}

	scrollTo(index) {
		this._refs[index] && this._refs[index]._ref.scrollIntoView({block: 'center', behavior: 'instant'})
	}

	selectOption(iOption) {
		// Mise à jour de l'option actuellement sélectionnée
		const option = this.state.options[iOption]
		this.setState({
			value: iOption,
			inputValue: this.getOptionValue(option),
			show: false
		})

		if (this.props.onChange) this.props.onChange(option)
	}

	filter = (collection, filters, valueSearched) => {
		if (valueSearched) {
			const value = valueSearched.toLowerCase()
			const includes = collection.filter((data) => {
				return filters.some((key) => {
					const val = data[key].toString().toLowerCase()
					return val.includes(value)
				})
			})

			for (let index = 0; index < filters.length; index++) {
				const key = filters[index]
				includes.sort((a, b) => {
					const valA = a[key].toString().toLowerCase()
					const valB = a[key].toString().toLowerCase()
					return (valA.startsWith(value) ? -1 : valB.startsWith(value) ? 1 : 0)
				})
			}

			return includes
		} else {
			return collection
		}
	}

	onSearch = (ev) => {
		const result = this.filter(this._options, this.props.optionValue, ev.target.value)
		this.setState({	options: result, value: (result.indexOf(this.state.value) >= 0 ? this.state.value : 0), inputValue: ev.target.value })
	}

	getOptionValue(option) {
		if (!option) return ''

		var optionValue = ''
		for (var ioptionValue = 0; ioptionValue < this.props.optionValue.length; ioptionValue++) {
			const value = option[this.props.optionValue[ioptionValue]]
			optionValue += value + (ioptionValue === this.props.optionValue.length-1 ? '' : ' - ')
		}
		return optionValue
	}

	// Renderers ----------------------------------------------------------------
	renderOptions() {
		if (!this.state.options) return []

		let optionItems = []
		for (let index = 0; index < this.state.options.length; index++) {
			const option = this.state.options[index]
			const optionValue = this.getOptionValue(option)
			optionItems.push(
				<Option selected={(index === this.state.value)} value={index} text={optionValue}
					onMouseDown={this.onMouseDown.bind(this, index)}
					ref={(node) => { this._refs[index] = node }}
					key={option[this.props.name]+'-'+index}/>
			)
		}
		return optionItems
	}

	render() {
		const searchable = css(mq({
			position: 'relative',
			width: '-webkit-fill-available',
			// width:"300px",
			float:"left",
			margin:"0 15px"
		}))
		const input = css(mq({
			pointerEvents: (this.props.isLoading ? 'none' : 'all'),
			width:"100%",
			height:"50px",
			fontSize:"18px",
			padding:"10px",
			boxSizing:"border-box",
			display:"block",
			fontWeight:"400",
			lineHeight:"1.6",
			color:"#495057",
			backgroundColor:"#fff",
			backgroundClip:"padding-box",
			border:"1px solid #ced4da",
			borderRadius:".25rem",
			transition:"border-color .15s ease-in-out, box-shadow .15s ease-in-out",
			background:"url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E\") no-repeat right .75rem center/8px 10px"
		}))
		const ul = css(mq({
			display: (this.state.show ? 'block' : 'none'),
			position: 'absolute',
			width: '100%',
			zIndex: '9999',
			listStyleType:"none",
			backgroundColor:"#fff",
			borderRadius:"0 0 5px 5px",
			border:"1px solid #add8e6",
			borderTop:"none",
			maxHeight:"180px",
			margin:"0",
			overflowY:"scroll",
			overflowX:"hidden",
			padding:"0"
		}))

		return (
			<div className={searchable+(this.props.className ? ' '+this.props.className : '')}>
				<input type="text" placeholder={this.props.placeholder} className={input}
					value={this.state.inputValue}
					onChange={this.onSearch.bind(this)}
					onKeyDown={this.handleKeyDown}
					onFocus={() => this.setState({ show: true }, () => this.scrollTo(this.state.value))}
					onBlur={() => this.setState({ show: false })}/>
				<ul className={ul}>
					{this.renderOptions()}
				</ul>
			</div>
		)
	}
}

Select.propTypes = {
	name: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	optionValue: PropTypes.array.isRequired
}

export default Select
