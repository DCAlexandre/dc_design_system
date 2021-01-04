import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import mq from './../Breakpoints.js'
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
		if (this.props.onClick) {
			this.props.onClick(this.props.name, !this.state.sort)
			this.setState({ sort: !this.state.sort })
		}
	}

	render() {
		const headCols = css(mq({
			userSelect: 'none',
			paddingTop: '1rem',
			paddingBottom: '1rem',
			paddingLeft: '0.5rem',
			paddingRight: '0.5rem',
			backgroundColor: 'rgb(250, 250, 252)',
			borderTop: '1px solid rgb(240, 240, 240) !important',
			borderBottom: '1px solid rgb(240, 240, 240) !important',
			color: 'rgb(102, 102, 102)',
			fontsize: '.8rem',
			fontWeight: 500,
			height: '2.375em',
			color: 'black'
		}))

		return (
			<th className={headCols} onClick={this.onClick.bind(this)}>
				<span className="text">
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
			data: props.data
		}
		this._datas = props.data
	}

	componentDidUpdate(prevProps) {
		if (this.props.data !== prevProps.data) {
			this.setState({	data: this.props.data })
			this._datas = this.props.data
		}
	}

	filter = (collection, filters, value) => {
		if (value) {
			const filterKeys = Object.keys(filters)
			return collection.filter(data => {
				return filterKeys.some(key => {
					const val = data[key].toString().toLowerCase()

					return val.includes(value.toLowerCase())
				})
			})
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
			if (typeof objA[value] === 'string') {
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

	// Renderers ----------------------------------------------------------------
	renderSearch() {
		if (!this.props.search) {
			return null
		} else {
			return (
				<Search placeholder={this.props.t ? this.props.t('Search') : 'Search'} onChange={this.onSearch.bind(this)} key='search'/>
			)
		}
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
					Loading ...
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
						No datas available
					</td>
				</tr>
				)
			}
		}
	}

	renderDatas() {
		const wrapperButtons = css(mq({
			display: 'flex',
			flexFlow: 'row nowrap',
			border: '0px solid red'
		}))

		const txt = css(mq({
			flex: '1 1 auto',
			lineHeight: 2,
			border: '0px solid blue'
		}))

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
					values.push( <span className={txt} key={key}>{row[key]}</span> )
				} else if (typeof value === 'object') {
					values.push( <span className={txt} key={key}>{value.value(row)}</span> )
				} else {
					console.error('headCols props invalid')
				}

				// Ajoute les options
				if (colNb === Object.keys(this.props.headCols).length && this.props.options) {
					if (this.props.options.length) {
						values.push(<Dotmenu options={this.props.options} params={row} t={(this.props.t ? this.props.t : null)} key='dotmenu'/>)
					}
				}

				// Ajout de la cellule
				cells.push(
					<td style={{paddingLeft: '0.5rem', paddingRight: '0.5rem'}} key={colNb}>
						<div className={wrapperButtons}>
							{values}
						</div>
					</td>
				)
			}

			// Ajout de la ligne
			const style = css(mq({
				backgroundColor: (ln%2 === 0 ? 'inherit' : 'rgba(189, 189, 189, .32)'),
				'&:hover': {
					backgroundColor: (this.props.onClick ? 'rgba(0, 0, 0, 0.1)' : '')
				}
			}))

			rows.push(
				<tr id={ln} className={style} onClick={(this.props.onClick ? this.props.onClick.bind(this, row) : null)} key={ln}>
					{cells}
				</tr>
			)
		}

		return rows
	}

	render() {
		let wrapper = {
			overflowY: (this.props.height ? 'scroll' : 'visible'),
			maxHeight: (this.props.height ? this.props.height : 'auto'),
			position: 'relative'
		}
		let table = {
			width: '100%'
		}

		return [
			this.renderSearch(),
			<div className={css(wrapper)} key='table'>
				<table borderless='true' hover='true' responsive='true' className={css(table)}>
					<thead>
						{this.renderHead()}
					</thead>
					<tbody>
						{this.renderRow()}
					</tbody>
				</table>
			</div>
		]
	}
}

Datatable.propTypes = {
    headCols: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired
}

export default Datatable
