import React from 'react'
import { css } from 'emotion'
import mq from './../Breakpoints.js'

export default class Modal extends React.Component {
	// Constructor ----------------------------------------------------------------
	constructor(props) {
		super(props)

		this.state = {
			currentTarget: null,
			hasScrollX: false,
			hasScrollY: false
		}
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
			flex: ['1 0 auto', '1 0 auto', '0 0 auto'],
			display: 'flex',
			flexFlow: 'column nowrap',
			maxHeight: '90vh',
			width: (this.props.width ? this.props.width : 'auto'),
			minWidth: '35vw',
			maxWidth: '80vw',
			backgroundColor: '#FFFFFF',
			padding: '1em 2em 2em 2em',
		    margin: '.5rem',
			zIndex: '1000'
		}))
		const close = css({
			userSelect: 'none',
			marginLeft: '16px',
			color: "#000000",
			fontSize: "28px",
			'&:hover': {
				"color": "#aaaaaa",
				"textDecoration": "none",
				"cursor": "pointer"
			}
		})
		const styleHeader = {
			paddingBottom: '1em',
			display: 'flex',
			placeContent: 'space-between'
		}
		const styleBody = {
			// marginTop: '1em',
			padding: '1em',
			overflowY: 'auto',
			overflowX: 'hidden'
		}

		let title = null
		if (this.props.title) {
			const styleTitle = { alignSelf: 'center', margin: 0 }
			title = ( <h5 className={css(styleTitle)}>{this.props.title}</h5> )
		}

		return (
			<div className={page} ref={this.refModal}
				onMouseDown={(event) => this.setState({ currentTarget: event.target })}
				onMouseUp={(event) => {
					if ((this.refModal.current === event.target) && (this.refModal.current === this.state.currentTarget)) {
						this.props.onClose(event)
					}
				}}>
				<div className={modal}>
					<div className={'modal-header '+css(styleHeader)}>
						{title}
						<span className={close} onClick={(event) => this.props.onClose(event)}>&times;</span>
					</div>
					<div className={'modal-body '+css(styleBody)+(this.props.className ? ' '+this.props.className : '')}>
						{[this.props.children]}
					</div>
				</div>
			</div>
		)
	}
}
