import React from 'react'
import PropTypes from 'prop-types'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
// import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import fr from 'date-fns/locale/fr'
import { css } from 'emotion'

registerLocale('fr', fr)
// moment.locale('fr')

class DatetimePicker extends React.Component {
	render() {
		return (
			<DatePicker locale='fr'
				wrapperClassName={css({ margin: '0 1rem' })}
				popperClassName={css({ zIndex: '99999' })}
				selected={this.props.selected}
				startDate={this.props.startDate}
				endDate={this.props.endDate}
				selectsStart={this.props.selectsStart}
				onChange={(date) => this.props.onChange(date)}
				dateFormat='dd/MM/yyyy'/>
		)
	}
}

DatetimePicker.propTypes = {
    onChange: PropTypes.func.isRequired
}

export default DatetimePicker
