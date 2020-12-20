import React from 'react'
import { css } from 'emotion'
import mq from './../Breakpoints.js'
import LogoReact from './svg/LogoReact.js'

export default class Loading extends React.Component {
	// Renderers ----------------------------------------------------------------
	render() {
		const wrapper = css(mq({
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			background: 'rgba(244, 244, 244, .92)',
			zIndex: 999
		}))
		const card = css(mq({
			display: 'flex',
			flexFlow: 'column nowrap',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: 'white',
			padding: '24px 32px',
			borderRadius: 2,
			border: '1px solid lightgrey',
		}))
		const svg = css(mq({ height: 64, marginBottom: 8, animation: 'App-logo-spin infinite 2s linear' }))

		return (
			<div className={wrapper}>
				<div className={card}>
					<LogoReact className={svg}/>
				</div>
			</div>
		)
	}
}
