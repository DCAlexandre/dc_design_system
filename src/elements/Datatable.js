import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import Dotmenu from './Dotmenu.js'
import Search from './Search.js'

class Thead extends React.Component {
	// Constructor ----------------------------------------------------------------
	constructor(props) {
		super(props)

		this.state = {
			sort: (props.sort ? props.sort : false)
		}
	}

	onClick = () => {
		if (this.props.onClick && this.props.name) {
			this.props.onClick(this.props.name, !this.state.sort)
			this.setState({ sort: !this.state.sort })
		}
	}

	render() {
		const headCols = css({
			zIndex: 2,
			position: 'sticky',
			top: 0,
			userSelect: 'none',
			paddingTop: '1rem',
			paddingBottom: '1rem',
			paddingLeft: '0.5rem',
			paddingRight: '0.5rem',
			backgroundColor: 'rgb(244,245,247)',
			color: 'rgb(102, 102, 102)',
			fontsize: '.8rem',
			fontWeight: 500,
			height: '2.375em',
			boxShadow: 'rgb(23 43 77 / 20%) 0px 1px 1px, rgb(23 43 77 / 20%) 0px 0px 1px',
			':hover': {
				backgroundColor: (this.props.name ? 'rgb(234,236,240)' : ''),
				cursor: (this.props.name ? 'pointer' : '')
			}
		})

		return (
			<th className={headCols} onClick={this.onClick.bind(this)}>
				<span>
					{this.props.text}
				</span>
			</th>
		)
	}
}

class Datatable extends React.Component {
	// Constructor ----------------------------------------------------------------
	constructor(props) {
		super(props)

		this.state = {
			data: props.data,
			hasScrollX: false,
			hasScrollY: false
		}
		this._datas = props.data
		this.refDatatable = React.createRef()
	}

	componentDidMount() {
		this.setState({
			hasScrollX: this.isOverflowX(this.refDatatable.current),
			hasScrollY: this.isOverflowY(this.refDatatable.current)
		})
	}

	componentDidUpdate(prevProps) {
		if (this.props.data !== prevProps.data) {
			this.setState({	data: this.props.data }, () => {
				this.setState({
					hasScrollX: this.isOverflowX(this.refDatatable.current),
					hasScrollY: this.isOverflowY(this.refDatatable.current)
				})
			})
			this._datas = this.props.data
		}
	}

	// Renderers ----------------------------------------------------------------
	render() {
		let wrapper = {
			maxHeight: (this.props.height ? this.props.height : ''),
			position: 'relative',
			overflowX: (this.props.height ? 'auto' : 'visible')
		}
		if (this.state.hasScrollX && this.props.height) { wrapper.overflowX = 'scroll' }
		if (this.state.hasScrollY && this.props.height) { wrapper.overflowY = 'scroll' }

		return (
			<React.Fragment>
				{this.renderSearch()}
				<div className={css(wrapper)} ref={this.refDatatable}>
					<table borderless='true' hover='true' responsive='true' className={css({ width: '100%' })}>
						<thead>{this.renderHead()}</thead>
						<tbody>{this.renderRow()}</tbody>
					</table>
				</div>
			</React.Fragment>
		)
	}

	renderSearch() {
		if (!this.props.search) return null

		return (
			<Search placeholder={this.props.t ? this.props.t('Search') : 'Search'}
				onChange={this.onSearch.bind(this)}/>
		)
	}

	renderHead() {
		var cols = []
		let cells = [] // Cellules affichant les données en fonction des colonnes

		for (let [key, value] of Object.entries(this.props.headCols)) {
			if (typeof value === 'string') {
				cells.push(
					<Thead name={key} text={(this.props.t ? this.props.t(value) : value)}
						onClick={this.onSort.bind(this)} key={key}/>
				)
			} else if (typeof value === 'object') {
				cells.push(
					<Thead name={key} text={(this.props.t ? this.props.t(value.text) : value.text)}
						onClick={this.onSort.bind(this)} key={key}/>
				)
			} else {
				console.error('headCols props invalid')
			}
		}

		if (this.props.options) {
			if (this.props.options.length) {
				cells.push(
					<Thead key='options'/>
				)
			}
		}

		// Ajout de la ligne
		cols.push( <tr key='row'>{cells}</tr> )

		return cols
	}

	renderRow() {
		if (this.props.isLoading) {
			return (
				<tr>
					<td style={{paddingLeft: '0.5rem', paddingRight: '0.5rem'}}
						colSpan={Object.keys(this.props.headCols).length}>
						{(this.props.t ? this.props.t('Loading...') : 'Loading...')}
					</td>
				</tr>
			)
		} else {
			if (this.state.data.length) {
				return this.renderDatas()
			} else {
				return (
					<tr>
						<td style={{paddingLeft: '0.5rem', paddingRight: '0.5rem'}}
							colSpan={Object.keys(this.props.headCols).length}>
							{(this.props.t ? this.props.t('No data available') : 'No data available')}
						</td>
					</tr>
				)
			}
		}
	}

	renderDatas() {
		const wrapperButtons = css({
			display: 'flex',
			flexFlow: 'row nowrap'
		})

		const txt = css({
			flex: '1 1 auto',
			lineHeight: 2
		})

		let rows = [] // Ligne contenant les données
		let cells = [] // Cellules affichant les données en fonction des colonnes
		let values = [] // Données affichées
		let colNb = 1

		// Boucle sur le tableau contenant les données de chaque ligne
		for (var ln = 0; ln < this.state.data.length; ln++) {
			colNb = 0
			cells = [] // Reset le contenu des cellule
			const row = this.state.data[ln] // Donnée de la ligne

			// Vérifie si le champ fait partie des colonnes à afficher
			for (let [key, value] of Object.entries(this.props.headCols)) {
				values = []
				colNb++

				if (typeof value === 'string') {
					values.push(
						<span className={txt} key={key}>
							{row[key]}
						</span>
					)
				} else if (typeof value === 'object') {
					values.push(
						<span className={txt+(value.className ? ' '+value.className : '')} key={key}>
							{(value.value ? value.value(row) : row[key])}
						</span>
					)
				} else {
					console.error('headCols props invalid')
				}

				// TODO: onMouseMove cancel on click
				// Ajout de la cellule
				cells.push(
					<td style={{paddingLeft: '0.5rem', paddingRight: '0.5rem'}} key={colNb}>
						<div className={wrapperButtons}>
							{values}
						</div>
					</td>
				)

				// Ajoute les options
				if (colNb === Object.keys(this.props.headCols).length && this.props.options) {
					if (this.props.options.length) {
						cells.push(
							<td style={{paddingLeft: '0.5rem', paddingRight: '0.5rem'}} key='dotmenu'>
								<div className={wrapperButtons+' '+css({ justifyContent: 'center' })}>
									<Dotmenu options={this.props.options} params={row} t={(this.props.t ? this.props.t : null)}/>
								</div>
							</td>
						)
					}
				}
			}

			// Ajout de la ligne
			const style = css({
				backgroundColor: (ln%2 === 0 ? 'inherit' : 'rgb(244,245,247)'),
				':hover': {
					backgroundColor: (this.props.onClick ? 'rgb(234,236,240)' : '')
				}
			})

			rows.push(
				<tr id={ln} className={style} onClick={(this.props.onClick ? this.props.onClick.bind(this, row) : null)} key={ln}>
					{cells}
				</tr>
			)
		}

		return rows
	}

	// Functions ----------------------------------------------------------------
	filter = (collection, filters, valueSearched) => {
		if (valueSearched) {
			const value = valueSearched.toLowerCase()
			const filterKeys = Object.keys(filters)
			const includes = collection.filter((data) => {
				return filterKeys.some((key) => {
					const val = data[key].toString().toLowerCase()
					return val.includes(value)
				})
			})

			for (let index = 0; index < filterKeys.length; index++) {
				const key = filterKeys[index]
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
		const result = this.filter(this._datas, this.props.headCols, ev.target.value)
		this.setState({	data: result })
	}

	sort = (collection, value, desc = true) => {
		return collection.sort((objA, objB) => {
			let a, b = ''
			const isNumber = (/^\d+$/.test(objA[value]) && /^\d+$/.test(objB[value]))

			if (isNumber) {
				a = parseInt(objA[value])
				b = parseInt(objB[value])
			} else if (typeof objA[value] === 'string') {
				a = objA[value].toLowerCase()
				b = objB[value].toLowerCase()
			} else {
				a = objA[value]
				b = objB[value]
			}

			if (desc) {
				return a > b ? 1 : b > a ? -1 : 0
			} else {
				return a > b ? -1 : b > a ? 1 : 0
			}
		})
	}

	onSort = (value, sort) => {
		this.sort(this._datas, value, sort)
		this.forceUpdate()
	}

	isOverflowX = (element) => {
		if (!element) return false
		return (element.scrollWidth > element.clientWidth)
	}

	isOverflowY = (element) => {
		if (!element) return false
		return (element.scrollHeight > element.clientHeight)
	}
}

Datatable.propTypes = {
    headCols: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired
}

export default Datatable
