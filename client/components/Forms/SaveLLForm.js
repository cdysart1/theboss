import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { LLNodeArray_ } from '../../utils'

export default class SaveLLForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: name,
      content: null,
      userId: props.user.id
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.SaveDS = this.SaveDS.bind(this);

  }

  componentWillReceiveProps(nextProps){
    //this component receives props (LLinformation) from
    //LinkedList.js; we need the state to update when those
    //props passed down change
    if (this.props.content !== nextProps.content){
      this.setState({ content: nextProps.content });
    }
  }

  handleChange(evt) {
    const name = evt.target.value;
    this.setState({name})
  }

  handleSubmit(evt) {
    evt.preventDefault();

    var LLtoBeMod = this.state.content;//get information about the props off the state
    var LLModified = LLNodeArray_(LLtoBeMod);//modify that LL into the array with reference indices
    
    var LLtoSave = {
      name: this.state.name,
      content: LLModified,
      userId: this.state.userId,
    }; //the information to be saved to the database

    this.SaveDS(LLtoSave);
  }

  SaveDS(obj) {

    axios.post('/api/linkedlists', obj)
      .then(res => console.log(res))
      .catch(err => console.log(err))

  }

  render() {
    return (
      <div>
      <div>
      </div>
      <form id="form-group"  >
        <div>
          <input
            type="text"
            onChange={this.handleChange}
            placeholder="add name for your linked list"
          />
        </div>
        <br />
        <div className="input-group-btn">
          <button type="click" onClick={(evt) => this.handleSubmit(evt)} >Save</button>

        </div>
      </form>
    </div>
    )
  }


}

