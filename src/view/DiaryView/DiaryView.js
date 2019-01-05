import React, {Component} from 'react';
import moment from 'moment';
import anime from 'animejs';
import LunarCalendar from 'lunar-calendar';
import './DiaryView.scss';

class CalendarHeader extends Component {
    constructor(props) {
        super(props);
        this.changeMoment = this.changeMoment.bind(this);
    }
    changeMoment(op) {
        let date = this.props.moment;
        switch (op) {
            case 'pre-year': {
                let momentChange = moment(date.subtract(1, 'years').format('YYYY-MM-DD'));
                this.props.onMomentChange(momentChange);
                break;
            }
            case 'next-year': {
                let momentChange = moment(date.add(1, 'years').format('YYYY-MM-DD'));
                this.props.onMomentChange(momentChange);
                break;
            }
            default: {
            }
        }
    }
    render() {
        return (
            <header className="calendar-header">
                <i className="switch-btn pre-year" onClick={this.changeMoment.bind(this, 'pre-year')}>《</i>
                <span>{this.props.moment.format('YYYY年 MM月')}</span>
                <i className="switch-btn next-year" onClick={this.changeMoment.bind(this, 'next-year')}>》</i>
            </header>
        )
    }
}


function WeekTitle() {
    const weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return (
        <ul className="week-title">{weekList.map((week) => (
            <li key={week}>{week}</li>
        ))}</ul>
    )
}

class DayBtn extends Component {
    render() {
        let dayData = this.props.dayData;
        let date = this.props.moment;
        let dayClass = '';
        if (dayData.month !== date.get('month') + 1) {
            dayClass += ' not-this-month';
        }
        if (dayData.solarFestival && dayData.solarFestival.length > 6) {
            dayData.solarFestival = undefined;
        }
        let showDayName = dayData.solarFestival || dayData.lunarFestival || dayData.term || dayData.lunarDayName;
        return (
            <div className={'day-btn' + dayClass}>
                <span className="normal-day">{dayData.day}</span>
                <span className="chinese-day">{showDayName}</span>
            </div>
        )
    }
}

class CalendarBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monthData: LunarCalendar.calendar(this.props.moment.get('year'), this.props.moment.get('month') + 1, true).monthData
        };
        this.handleWheelChange = this.handleWheelChange.bind(this);
    }
    componentWillReceiveProps(newProps) {
        let newMonent = newProps.moment;
        this.setState({
            monthData: LunarCalendar.calendar(newMonent.get('year'), newMonent.get('month') + 1, true).monthData
        })
    }
    handleWheelChange(e) {
        let date = this.props.moment;
        if (e.deltaY > 0) {
            let momentChange = moment(date.add(1, 'months').format('YYYY-MM-DD'));
            this.props.onMomentChange(momentChange);
        } else if (e.deltaY < 0) {
            let momentChange = moment(date.subtract(1, 'months').format('YYYY-MM-DD'));
            this.props.onMomentChange(momentChange);
        }
    }
    render() {
        const DayBtns = this.state.monthData.map((day) => (
            <DayBtn key={''+day.month+'-'+day.day}
                    dayData={day}
                    moment={this.props.moment}/>
        ));
        return (
            <div className="calendar-body" onWheel={this.handleWheelChange}>
                {DayBtns}
            </div>
        )
    }
}

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {moment: moment()};
        this.handleMomentChange = this.handleMomentChange.bind(this)
    }
    handleMomentChange(momentChange) {
        this.setState({
            moment: momentChange
        })
    }
    render() {
        return (
            <div className="calendar">
                <CalendarHeader moment={this.state.moment} onMomentChange={this.handleMomentChange}/>
                <WeekTitle/>
                <CalendarBody moment={this.state.moment} onMomentChange={this.handleMomentChange}/>
            </div>
        )
    }
}

class DiaryView extends Component {
    render() {
        return (
            <div className="diary-view">
                <Calendar/>
            </div>
        );
    }
}

export default DiaryView;
