

export default function Product({ product }) {
    return (
            <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.description.slice(0,200)}...</td>
                <td>{product.category}</td>
                <td><img height={250} width={250} src={product.image} alt={product.title} /></td>
            </tr>
    )
}