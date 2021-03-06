import React, { Component } from "react";
import axios from "axios";
const Context = React.createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };

    case "ADD_CONTACT":
      return {
        ...state,
        // contacts: state.contacts.filter(
        // contact => contact.id !== action.payload
        contacts: [action.payload, ...state.contacts]
      };

    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id
            ? (contact = action.payload)
            : contact
        )
      };
    default:
      return state;
  }
};
export class Provider extends Component {
  state = {
    /* contacts: [
      {
        id: 1,
        name: "jone Doe",
        email: "jonedoe@gmail.com",
        phone: "333-444-555"
      },
      {
        id: 2,
        name: "karen smith",
        email: "karen@gmail.com",
        phone: "444-555-888"
      },
      {
        id: 3,
        name: "kalvin kelli",
        email: "kalvin@gmail.com",
        phone: "666-777-999"
      }
    ],*/
    contacts: [],
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };
  async componentDidMount() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    //.then(res =>
    this.setState({
      contacts: res.data
    });
  }

  /*componentWillMount() {
    console.log("componentWillMount.......");
  }*/
  /* componentDidUpdate() {
    console.log("componentDidUpdate....");
  }*/
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
export const Consumer = Context.Consumer;
