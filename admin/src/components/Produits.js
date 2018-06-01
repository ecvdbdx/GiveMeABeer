import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResearchBar from './shared/ResearchBar';

class Produits extends Component {
  constructor(props) {
    super(props);

    this.state
  }

  hanlderHover = () => {

  }

  renderArray = (datas) => {
    const allergies = datas;
    return datas.map((element, index) =>
      <span key={index}>{element}</span>
    )
  }

  renderListProduit = () => {
    const { produits } = this.props;

    return produits.map((produit) => 
        <tr className="product-row" key={produit.id}>
          <td>{produit.image}</td>
          <td>{produit.label}</td>
          <td>{produit.description}</td>
          <td>{produit.quantite}</td>
          <td>{produit.price}</td>
          <td>{this.renderArray(produit.allergies)}</td>
          <td>{produit.Kcal}</td>
          <td>{this.renderArray(produit.categories)}</td>
        </tr>
    );
  }
  

  render() {
    return (
    <div>
        <span className="title">
            Produits
        </span>
        <ResearchBar placeholder='Recherchez un produit'/>
        <table className="product-table">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>NOM</th>
              <th>QTE</th>
              <th>PRIX</th>
              <th>ALLERGIE</th>
              <th>Kcal</th>
              <th>CATEGORIE</th>
            </tr>
          </thead>
          <tbody>
            {this.renderListProduit()}
          </tbody>
        </table>
    </div>
    );
  }
}

Produits.propTypes = {

};

export default Produits;
