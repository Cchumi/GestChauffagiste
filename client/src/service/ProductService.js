import axios from 'axios';

export class ProductService {

    getProductsSmall() {
        return axios.get(process.env.PUBLIC_URL +'/assets/demo/data/products-small.json').then(res => res.data.data);
    }

    getProducts() {
        return axios.get(process.env.PUBLIC_URL +'/assets/demo/data/products.json').then(res => res.data.data);
    }

    getProductsWithOrdersSmall() {
        return axios.get(process.env.PUBLIC_URL +'/assets/demo/data/products-orders-small.json').then(res => res.data.data);
    }
}