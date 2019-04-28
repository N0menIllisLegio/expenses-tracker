import React from 'react';
import { Modal } from 'react-bootstrap';

class EditProduct extends React.Component {
  state = {
    _id: Date.now() + '',
    title: '',
    description: '',
    cost: '',

    pageTitle: 'Add Product'
  }

  handleEnterModal = () => {
    const product = this.props.product;
  
    if (product !== null && product !== undefined) {
      this.setState({
        _id: product._id,
        title: product.name,
        description: product.description,
        cost: product.cost,

        pageTitle: 'Edit Product'
      })
    }
  }

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

  handleCostInput = (e) => {
    this.setState({
      cost: e.target.value,
    });
  }

  handleHide = () => {
    this.props.onHide();

    this.setState({
      _id: Date.now() + '',
      title: '',
      description: '',
      cost: '',
  
      pageTitle: 'Add Product'       
    });   
  }

  handleProductSaving = (e) => {
    e.preventDefault();

    const product = {
      _id: this.state._id,
      name: this.state.title,
      description: this.state.description,
      cost: this.state.cost
    }
    

    if (this.state.pageTitle === 'Add Product') {
      this.props.save(product, false);
    } else {
      this.props.save(product, true);
    }    

    this.handleHide();
  }

  render() {

    return (
      <Modal
        show={ this.props.show }
        onHide={ this.handleHide }
        onEnter={ this.handleEnterModal }
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <form onSubmit={ this.handleProductSaving }>  
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              <h5 className="modal-title" id="exampleModalLabel">{ this.state.pageTitle }</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          
              <div className="form-group">
                <label htmlFor="productTitle">Product's title:</label>
                <input type="text" className="form-control" id="productTitle" placeholder="Enter product's title..." 
                  onChange={ this.handleTitleInput } value={ this.state.title } required/>
              </div>
              <div className="form-group">
                <label htmlFor="productDescription">Product's description:</label>
                <textarea className="form-control " rows="5" id="productDescription" placeholder="Enter product's description..."
                onChange={ this.handleDescriptionInput } value={ this.state.description }/>
              </div>
              <div className="form-group">
                <label htmlFor="productCost">Product's cost:</label>
                <input type="number" className="form-control" id="productCost" placeholder="Enter product's cost..."
                  onChange={ this.handleCostInput } value={ this.state.cost } required/>
              </div>  
            
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className={this.state.pageTitle === 'Add Product' ? "btn btn-danger invisible" : "btn btn-danger"}
              onClick={ () => { this.props.delete(this.state._id); this.handleHide(); } }
            >Delete product</button>

            <button type="button" className="btn btn-secondary" onClick={ this.handleHide }>Cancel</button>
            <button type="submit" className="btn btn-success">Save</button>
          </Modal.Footer>
        </form>
      </Modal>
    )
  }
}

export default EditProduct