import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ObjectTypeItem from "./ObjectTypeItem"

export default function ObjectTypeList() {

    const [objectTypes, setObjectTypes] = useState([]);

    const getObjectType = async () => {
        const response = await axios.get("ObjectType");
        if (response.status === 200) {
            setObjectTypes(response.data);
        }
    }

    useEffect(() => getObjectType(), [])

    return (
        <>
            <div className="float-end">
                <Link to="/add" type="button" class="btn btn-primary mb-3"> Add </Link>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ObjectType Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Level</th>
                        <th scope="col" style={{ width: "6em" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {objectTypes.map((item, index) => <ObjectTypeItem key={index} item={item} />)}
                </tbody>
            </table>
        </>
    )
}

