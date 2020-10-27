import React, { Component } from "react";

class PhoneForm extends Component {

    state = {
        name: '',
        phone: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        // 페이지 리로딩 방지
        e.preventDefault();
        // 상태값 onCreate를 통해 부모에게 전달
        this.props.onCreate(this.state);
        this.setState({
            name:'',
            phone:''
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        name="name"
                    />
                    <input
                        placeholder="phone"
                        value={this.state.phone}
                        onChange={this.handleChange}
                        name="phone"
                    />
                    <button type="submit">등록</button>
                    {/*<div>{this.state.name} {this.state.phone}</div>*/}
                </form>
            </div>
        );
    }
}

export default PhoneForm;
