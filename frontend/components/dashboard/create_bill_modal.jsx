import React from 'react';
import { withRouter, Link } from 'react-router-dom';


class CreateBillModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      total_bill_amount: '',
      other_user_id: '',
      amount_originally_owed: '',
      owing_at_creation_user_id: '',
      owed_to_at_creation_user_id: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.errorsPresent = this.errorsPresent.bind(this);
  }

  // componentWillReceiveProps(newProps) {
    // debugger
    // if (this.errorsPresent(newProps)){
    //   this.props.history.push('/login_retry');
    //   this.props.closeModal();
    // }
  // }


  handleSubmit(e) {
// debugger
    e.preventDefault();
    const bill = Object.assign({}, this.state);
    if (bill.owed_to_at_creation_user_id === this.props.currentUser.id) {
      bill.owing_at_creation_user_id = bill.other_user_id;
    } else {
      bill.owing_at_creation_user_id = this.props.currentUser.id;
    }
    delete bill.other_user_id;
    this.props.createBill(bill);
    // this.props.closeModal();
  }

  handleChange(e) {
// debugger
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }

  errorsPresent(props) {
    // debugger
    if (Object.values(props.errors).length > 0) {
      return true;
    }
    return false;
  }

  render() {

      return(
        <div className='create-bill-modal-div'>
          <h2><div>Add a bill</div></h2>
          <form className='login-form' onSubmit = { this.handleSubmit }>

            <label> With <strong>you</strong> and:
              <input className='create-bill-user-search' placeholder='Enter id' type='text' name='other_user_id' value={this.state.other_user_id} onChange = { this.handleChange }>
              </input>
            </label>

            <label className='create-bill-amount-label'>$
              <input className='create-bill-amount' placeholder='0.00' type='text' name='total_bill_amount' value = {this.state.total_bill_amount} onChange = { this.handleChange }/>
            </label>

            <label>
              <input className='paid-by' placeholder='paid-by' name='owed_to_at_creation_user_id' value={this.state.owed_to_at_creation_user_id} onChange={ this.handleChange }></input>
            </label>

            <input className='create-bill-split' placeholder='Split' type='text' name='amount_originally_owed' value = {this.state.amount_originally_owed} onChange = { this.handleChange }/>

            <div className='cancel-or-save-buttons-div'>
              <button className="create-bill-cancel-button" onClick={this.props.closeModal}>Cancel</button>
              <button className="create-bill-save-button" onClick={this.handleSubmit}>Save</button>
            </div>

          </form>
        </div>
      );
  }
}

export default withRouter(CreateBillModal);
