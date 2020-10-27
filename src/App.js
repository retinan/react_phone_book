import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import PhoneForm from "./components/PhoneForm";
import PhoneInfoList from "./components/PhoneInfoList";

class App extends Component {

    id = 2
    state = {
        information: [
            {
                id:0,
                name: 'name01',
                phone: '010-1111-1111'
            },
            {
                id:1,
                name: 'name02',
                phone: '010-2222-2222'
            }
        ],
        keyword: ''
    }

    handleChange = (e) => {
        this.setState({
            keyword: e.target.value
        })
    }

    handleCreate = (data) => {
        console.log('handleCreate ::: ', data);
        const { information } = this.state;
        this.setState({
            information: information.concat({id: this.id++, ...data})
        })
    }

    handleRemove = (id) => {
        const { information } = this.state;
        this.setState({
            information: information.filter(info => info.id !== id)
        })
    }

    handleUpdate = (id, data) => {
        const { information } = this.state;
        this.setState({
            information: information.map(
                info => info.id === id
                    ? {...info, ...data} // 새 객체를 만들어서 기존의 값과 전달받은 data를 덮어씀
                    : info // 기존 값링을 그대로 랜더
            )
        })
    }

    render() {
        const { information, keyword } = this.state;
        const filteredList = information.filter(
            info => info.name.indexOf(keyword) !== -1
        );

        return (
            <div className='App'>
                <div className="App-header">
                    <PhoneForm
                        onCreate={this.handleCreate}
                    />
                    <p>
                        <input
                            type="text"
                            placeholder="searching..."
                            onChange={this.handleChange}
                            value={keyword}
                        />
                    </p>
                    {/*{JSON.stringify(information)}*/}
                    <PhoneInfoList
                        data={filteredList}
                        onRemove={this.handleRemove}
                        onUpdate={this.handleUpdate}
                    />
                </div>
            </div>
        );
    }
}

export default App;
