import { useEffect } from "react"
import { Link } from "react-router-dom"
import ObjectTypeItem from "features/objectType/ObjectTypeItem"
import { useDispatch, useSelector } from "react-redux";
import { selectObjectTypeList } from "./objectTypeSlice";
import { getObjectTypeAll } from "./objectTypeThunk";

export default function ObjectTypeList() {

    const objectTypeList = useSelector(selectObjectTypeList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getObjectTypeAll())
    }, [])

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
                    {objectTypeList.map((item, index) => <ObjectTypeItem key={index} item={item} />)}
                </tbody>
            </table>
        </>
    )
}

