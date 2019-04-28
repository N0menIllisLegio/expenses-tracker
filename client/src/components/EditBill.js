import React from 'react';
import Navigation from './Navigation'
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Axios from 'axios'
import ProductModal from './EditProduct'

class EditBill extends React.Component {
  state = {
    _id: '',
    selectedDay: new Date(),
    title: '',
    description: '',
    products: [],

    edit: false,

    modalShow: false,
    modalProduct: null,

    pageTitle: 'Add Bill',
    noProducts: false
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    if (id !== '-1') {
      this.setState({
        edit: true,
        pageTitle: 'Edit Bill'
      });

      Axios.get(`http://localhost:5000/api/bill/?billId=${id}`, { 
          headers: { 'authorization-token': localStorage.getItem('authToken') }
        }).then(response => {
          this.setState({
            _id: response.data._id,
            selectedDay: new Date(response.data.date),
            title: response.data.name,
            description: response.data.description,
            products: response.data.products,
          })
        }).catch(error => {
            if (error.response.status === 401) {
              this.props.history.push('/login');
            } else {
              console.error(error);
            }
          })
    }
  }

  modalClose = () => this.setState({ modalShow: false });

  handleTitleInput = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  handleDescriptionInput = (e) => {
    this.setState({
      description: e.target.value
    })
  }

  handleDayClick = (day, { selected }) => {
    this.setState({
      selectedDay: day,
    });
  }

  handleModalDelete = (id) => {
    this.setState({ 
      products: this.state.products.filter(product => product._id !== id) 
    })
  }

  handleModalSave = (saveProduct, update) => {
    let products = [...this.state.products];

    if (update) {
      products.forEach(product => {

        if (product._id === saveProduct._id) {
          product.name = saveProduct.name;
          product.description = saveProduct.description;
          product.cost = saveProduct.cost;
        }
      });
    } else {
      products.push(saveProduct)
    }
    
    this.setState({
      modalProduct: null,
      products: products
    })
  }

  handleModalHide = () => {
    this.setState({ modalShow: false })
  }

  handleDeleteBill = () => {
    Axios.delete('http://localhost:5000/api/bill', { 
      data: { id: this.state._id }, 
      headers: { 'authorization-token': localStorage.getItem('authToken') }
    }).then(response => {
      this.props.history.push('/bills');
    }).catch(error => {
        if (error.response.status === 401) {
          this.props.history.push('/login');
        } else {
          console.error(error);
        }
      })
  }

  handleBillSaving = (e) => {
    e.preventDefault();

    if (this.state.products.length > 0) {
      if (this.state.edit) {
        //UPD
        Axios.patch('http://localhost:5000/api/bill', { 
          id: this.state._id,
          name: this.state.title, 
          description: this.state.description, 
          date: this.state.selectedDay, 
          products: this.state.products 
        }, { 
          headers: { 'authorization-token': localStorage.getItem('authToken') }
        }).then(response => {
              this.props.history.push('/bills');
        }).catch(error => {
            if (error.response.status === 401) {
              this.props.history.push('/login');
            } else {
              console.error(error);
            }
          })
      } else {
        //NEW
        Axios.post('http://localhost:5000/api/bill', { 
          name: this.state.title, 
          description: this.state.description, 
          date: this.state.selectedDay, 
          products: this.state.products 
        }, { 
          headers: { 'authorization-token': localStorage.getItem('authToken') }
        }).then(response => {
            this.props.history.push('/bills');
        }).catch(error => {
            if (error.response.status === 401) {
              this.props.history.push('/login');
            } else {
              console.error(error);
            }
          })
      }
    } else {
      this.setState({
        noProducts: true
      })
    }
  }

  fillTable = () => {
    const component = this.state.products.map(product => ((
      <tr className="pointer" onClick={() => { this.setState({ modalProduct: product, modalShow: true, noProducts: false })}} key={ product._id }>
        <td>{ product.name }</td>
        <td>{ product.description }</td>
        <td>{ product.cost }</td>
      </tr>
    )))

    return component
  }

  render() {
    var component = null
    const errorProducts = this.state.noProducts ? (
      <small id="productHelp" className="form-text text-danger text-left ml-3">Bill should have at least one product!</small>
    ) : (<div></div>)

    if (this.state.edit && this.state._id === '') {
      component = (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>)
    } else {
      component = (
        <div>
          <form onSubmit={ this.handleBillSaving }>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="title">Bill's title:</label>
                  <input type="text" className="form-control" id="title" placeholder="Enter bill's title..." 
                    onChange={ this.handleTitleInput } value={ this.state.title } required/>
                </div>

                <div className="form-group">
                  <label htmlFor="Description">Bill's description:</label>
                  <textarea className="form-control" rows="6" placeholder="Enter bill's description..." id="Description"
                    onChange={ this.handleDescriptionInput } value={ this.state.description }/>
                </div>              
              </div>

              <div className="col d-flex justify-content-center">
                <DayPicker showOutsideDays showWeekNumbers
                  selectedDays={ this.state.selectedDay }
                  onDayClick={ this.handleDayClick }
                  month={ this.state.selectedDay }
                />
              </div>
            </div>

            <div className="row my-4">
              <div className="col">
              <table className="table table-hover">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>

                  { this.fillTable() }
                  
                </tbody>
              </table>
              { errorProducts }
              </div>
            </div>

            <div className="row d-flex justify-content-center">
              <div>
                <div className="col btn-group">
                  <button type="submit" className="btn btn-primary">Save Bill</button>
                  <button type="button" className="btn btn-primary" onClick={() => this.setState({ modalShow: true, modalProduct: null, noProducts: false })}>Add product to bill</button>
                </div>
              </div>
            </div>
          </form>

          <ProductModal 
            show={ this.state.modalShow }
            onHide={ this.handleModalHide }

            save={ this.handleModalSave }
            delete={ this.handleModalDelete }
            product={ this.state.modalProduct }
          />

        </div>
      )
    }

    return(
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2 ml-4">{ this.state.pageTitle }</h1>
          <button type="button" className={this.state.pageTitle === 'Add Bill' ? "btn btn-danger invisible" : "btn btn-danger mr-4"}
            onClick={ this.handleDeleteBill }
          >Delete Bill</button>
        </div>
        { component }
      </div>
    )
  }
}

export default Navigation(EditBill)