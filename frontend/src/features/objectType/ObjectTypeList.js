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
        <div className="container">
            <div className="row">
                <div className="col-md-12 d-flex flex-row justify-content-between">
                    <h3 class="text-muted">All ObjectTypes</h3>
                    <Link to="/add" type="button" class="btn btn-primary mb-3"><i class="bi bi-plus-lg"></i> Add </Link>
                </div>
                <div className="col-md-12">
                    {objectTypeList.length ?
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
                        :
                        <div class="card p-5 text-center">
                            <h3 className="my-5">
                                No record Found
                                <small class="text-muted ms-3">Please add new one</small>
                            </h3>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

