import {Link} from 'react-router-dom';
import React, {Component, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import AllProducts from './AllProducts.jsx';

const SearchBar = (products) => {
    const [search, setSearch] = useState('');

    function searchFunc(products) {
        return products.filter((currPro) => currPro.name.toLowerCase().indexOf(search) > -1);
    }
    return(
        <div>
            <input type='text' value={search} onChange={(evt) => setSearch(evt.target.value)} />
            <div>
                <AllProducts filterProducts = {searchFunc(products.products)} />
            </div>

        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        products: state.allProducts
    }
}

export default connect(mapStateToProps)(SearchBar);