import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import './question.css'
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

class QuestionChoice extends PureComponent {
    static propTypes = {
        isCorrect: PropTypes.bool.isRequired,
        isBlinking: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            visible: true,
            nBlinks: 0,
            wasChosen: false
        };

        this.blink = this.blink.bind(this);
    }

    componentDidMount() {
        if (this.props.isBlinking) {
            this.blink(0);
        }
    }

    componentDidUpdate() {
        if (this.state.nBlinks === 0 && this.props.isBlinking)
            this.blink(0);
    }

    blink(n) {
        if (this.state.nBlinks < 4) {
            this.setState({ 
                visible: !this.state.visible, 
                nBlinks: this.state.nBlinks + 1
            });
            setTimeout(this.blink, 200);
        } else {
            this.setState({ visible: true, nBlinks: -1});
        }    
    }

    getBackgroundColor() {
        if (this.props.isBlinking) {
            return this.props.isCorrect ? 'green':'darkred';
        } else {
            return '';
        }
    }

    getForegroundColor() {
        return this.props.isBlinking ? 'white' : '';
    }

    getIcon() {
        if (this.props.isBlinking && this.state.wasChosen) {
            if (this.props.isCorrect) {
                return (<FaCheck></FaCheck>);
            } else {
                return (<FaTimes></FaTimes>);
            }
        }
    }

    onClick() {
        this.setState({wasChosen: true});
        this.props.onClick(this.props.text);
    }

    render() {
        const divStyle = {
            visibility: this.state.visible ? 'visible':'hidden',
            background: this.getBackgroundColor(),
            color: this.getForegroundColor()
        };
            
        return (
            <div className="answer-pane" 
                style={divStyle}
                onClick={() => this.onClick()}>
                <span className="question-choice-icon">{this.getIcon()}</span>
                <span dangerouslySetInnerHTML={{ __html: this.props.text}}></span>
            </div>
        );
    }

}

export default QuestionChoice;