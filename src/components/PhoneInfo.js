import React, { Component } from "react";

class PhoneInfo extends Component {

    static defaultProps = {
        info: {
            name: 'name',
            phone: '010-0000-0000',
            id:0
        }
    }

    state = {
        editing: false,
        name: '',
        phone: '',
    }

    handleRemove = () => {
        const {info, onRemove} = this.props;
        onRemove(info.id);
    }

    handleToggleEdit = () => {
        const { editing } = this.state;
        this.setState({ editing: !editing});
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {info, onUpdate} = this.props;
        // editing false -> true
        if(!prevState.editing && this.state.editing) {
            this.setState({
                name: info.name,
                phone:info.phone
            });
        }
        // editing true -> false
        if(prevState.editing && !this.state.editing) {
            onUpdate(info.id, {
                name: this.state.name,
                phone: this.state.phone
            });
        }

    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (!this.state.editing
            && !nextState.editing
            && nextProps.info === this.props.info) {
                return false;
            }
        return true;
    }

    render() {
        console.log('render PhoneInfo' + this.props.info.id);
        const style = {
            border: '1px solid white',
            padding: '8px',
            margin: '8px'
        }

        // edit mode
        const { editing } = this.state;
        if(editing) {
            return (
                <div style={style}>
                    <div>
                        <input
                            type="text"
                            value={this.state.name}
                            name='name'
                            placeholder='name'
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={this.state.phone}
                            name='phone'
                            placeholder='phone'
                            onChange={this.handleChange}
                        />
                    </div>
                    <button onClick={this.handleToggleEdit}>Edit</button>
                    <button onClick={this.handleRemove}>Delete</button>
                </div>
            );
        }

        // normal mode
        const {
            name, phone
        } = this.props.info;

        return (
            <div style={style}>
                <div><b>{name}</b></div>
                <div>{phone}</div>
                <button onClick={this.handleToggleEdit}>Edit</button>
                <button onClick={this.handleRemove}>Delete</button>
            </div>
        );
    }
}

export default PhoneInfo;