/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login} from './auth-form'
export {Signup} from './sign-up'
export {default as ProductList} from './product-list'
export {default as AddProduct} from './add-product'
export {default as AddReview} from './add-review'
export {default as EditProduct} from './edit-product'
export {default as Home} from './home'
export {default as Checkout} from './checkout'
export {default as Admin} from './admin'
export {default as ConnectedCart} from './cart'
export {default as ConnectedSingleProduct} from './singleProduct'
export {default as ConnectedTypeProductList} from './typeProductList'
export {default as SearchProduct} from './search-product'
