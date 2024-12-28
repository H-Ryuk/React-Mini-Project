import { useEffect, useState } from "react"
import Product from "./Products"


export default function ProductList() {

    const [productList, setProduct] = useState([])
    const [categorie, setCategory] = useState([])
    const [currentCategory, setCurrentCategory] = useState()
    const [loading, setLoading] = useState(true)
    const [searchValue, setSearchValue] = useState('')


    useEffect(() => {
        getProduct()
        getCategorie()
    }, [])


    const getProduct = () => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => {
                setProduct(data)
                setLoading(false)
            })
    }

    const getCategorie = () => {
        fetch('https://fakestoreapi.com/products/categories')
            .then(res => res.json())
            .then(data => {
                setCategory(data)
                setLoading(false)
            })
    }




    const displayCategories = () => {
        return categorie.map((category, index) =>
            <button className="btn btn-secondary" key={index}
                onClick={(e) => {
                    e.preventDefault()
                    setCurrentCategory(category)
                }}>
                {category}
            </button>
        )
    }



    const displayProducts = () => {
        let productTemp = productList

        if (searchValue !== undefined && currentCategory !== undefined) {
            productTemp = productList.filter(product =>
                product.category === currentCategory
                && (product.id.toString().includes(searchValue)
                    || product.title.includes(searchValue)
                    || product.description.includes(searchValue))
            )
        }

        if (searchValue !== undefined && currentCategory === undefined) {
            productTemp = productList.filter(product =>
                product.id.toString().includes(searchValue)
                || product.title.includes(searchValue)
                || product.description.includes(searchValue)
            )
        }

        if (currentCategory !== undefined && searchValue === undefined) {
            productTemp = productList.filter(product => {
                return product.category === currentCategory
            })
        }


        if (productTemp.length > 0) {
            return productTemp.map((product, key) => {
                return <Product product={product} key={key} />
            })
        }

        return (
            <tr>
                <td colSpan={6} >No Items</td>
            </tr>
        )
    }



    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <h1>Loading...</h1>
            </div>
        );
    }


    const handleSearch = (e) => {
        e.preventDefault()
        const searching = document.querySelector('#search').value
        setSearchValue(searching)
    }



    return (
        <div>
            <div className="container-fluix mx-auto w-75 my-5">
                <h2>Search: </h2>
                <form>
                    <div className="row g-3 align-items-center">
                        <div className="col-auto">
                            <label className="col-form-label">Search</label>
                        </div>
                        <div className="col-auto">
                            <input
                                type="text"
                                id="search"
                                className="form-control"
                            />
                        </div>
                        <div className="col-auto">
                            <input className="btn btn-primary m-2" type="submit" value={'Search'} onClick={handleSearch} />
                            <input className="btn btn-primary m-2" type="submit" value={'Show All'} onClick={() => setCurrentCategory(undefined)} />
                        </div>
                    </div>
                    <hr />
                    <h3>Categorie:</h3>
                    <div className="row g-3 align-items-center">
                        <div className="btn-group">
                            {displayCategories()}
                        </div>
                    </div>
                </form>

                <hr />
                <h1>Product List: </h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayProducts()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}