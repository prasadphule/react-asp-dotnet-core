import { Link } from "react-router-dom"

export default function ObjectTypeItem({ item }) {
    return (
        <tr>
            <th scope="row">{item.objectTypeId}</th>
            <td>{item.objectTypeName}</td>
            <td>{item.description}</td>
            <td>{item.level}</td>
            <td>
                <Link to={`/edit/${item.objectTypeId}`} type="button" class="btn btn-link"> Edit </Link>
            </td>
        </tr>
    )
}