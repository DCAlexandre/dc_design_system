import React from 'react'
import { css } from 'emotion'
import mq from './../Breakpoints.js'

export default class Modal extends React.Component {
	// Constructor ----------------------------------------------------------------
	constructor(props) {
		super(props)

    	this.refModal = React.createRef()
	}

	// Renderers ----------------------------------------------------------------
	render() {
		const page = css(mq({
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			display: (this.props.show ? 'flex' : 'none'),
			alignItems: ['inherit', 'inherit', 'center'],
			justifyContent:  ['inherit', 'inherit', 'center'],
			backgroundColor: 'rgba(0, 0, 0, .8)',
			zIndex: '9999'
		}))
		const modal = css(mq({
			overflow: 'visible',
			maxHeight: '-webkit-fill-available',
			flex: ['1 0 auto', '1 0 auto', '0 0 auto'],
			display: 'flex',
			flexFlow: 'column nowrap',
			maxHeight: '100vh',
			width: (this.props.width ? this.props.width : 'auto'),
			backgroundColor: '#FFF',
			padding: '2em',
		    margin: '1em',
			zIndex: '9999'
		}))
		const close = css({
			marginLeft: '16px',
			color:"#aaa",
			fontSize:"28px",
			'&:hover': {
				"color":"black",
				"textDecoration":"none",
				"cursor":"pointer"
			}
		})
		const styleHeader = {
			userSelect: 'none',
			marginBottom: '1em',
			display: 'flex',
			placeContent: 'space-between'
		}

		let title = null
		if (this.props.title) {
			const styleTitle = {
				alignSelf: 'center',
				margin: 0
			}
			title = ( <h5 className={css(styleTitle)}>{this.props.title}</h5> )
		}

		return (
			<div className={page} ref={this.refModal} onClick={(event) => {
					if (this.refModal.current === event.target) this.props.onClose(event)
				}}>
				<div className={modal+(this.props.className ? ' '+this.props.className : '')}>
					<div className={'modal-header '+css(styleHeader)}>
						{title}
						<span className={close} onClick={(event) => this.props.onClose(event)}>&times;</span>
					</div>
					{[this.props.children]}
				</div>
			</div>
		)
	}
}
