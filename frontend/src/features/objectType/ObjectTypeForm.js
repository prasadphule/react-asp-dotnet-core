import { useEffect } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { string, number, object } from "yup"
import { initialStateObjectType, selectObjectType, setObjectType } from 'features/objectType/objectTypeSlice'
import { getObjectTypeById, saveObjectType, deleteObjectTypeById } from 'features/objectType/objectTypeThunk'
import { useDispatch, useSelector } from 'react-redux'

//yup validation
const schema = object().shape({
    objectTypeName: string().required("Name is required"),
    description: string().required(),
    level: number().positive().integer().required("Please select level"),
});

export default function ObjectTypeForm() {

    const { id } = useParams();
    let history = useHistory();
    const dispatch = useDispatch();
    const objectType = useSelector(selectObjectType)

    //react hooks form
    const { handleSubmit, register, setValue } = useForm({
        defaultValues: initialStateObjectType,
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        if (id) {
            dispatch(getObjectTypeById(id))
        }
        return () => {
            dispatch(setObjectType(initialStateObjectType))
        }
    }, [id])

    useEffect(() => Object.keys(initialStateObjectType).map(key => setValue(key, objectType[key])), [objectType])

    const onSubmit = async (data) => {
        await dispatch(saveObjectType(data))
        history.push("/")
    };

    const handleDelete = async () => {
        await dispatch(deleteObjectTypeById(id))
        history.push("/")
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="mb-3"> {`${id ? `Edit` : `Add`} ObjectType`}</h2>
                        <div class="mb-3">
                            {/* we can create reusable component i.e. TextBox etc. for another form */}
                            <label for="name" class="form-label">Name</label>
                            <input
                                {...register("objectTypeName")}
                                class="form-control"
                            />
                        </div>
                        <div class="mb-3">
                            <label for="desc" class="form-label">Description</label>
                            <textarea
                                {...register("description")}
                                class="form-control"
                                rows="3"></textarea>
                        </div>
                        <select
                            {...register("level")}
                            class="form-select mb-3"
                            aria-label="Default select example">
                            <option selected>Levels</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <div className="float-end">
                            <Link to="/" type="button" class="btn btn-light me-3">Cancel</Link>
                            {id && <button type="button" class="btn btn-danger me-3" onClick={handleDelete}>Delete</button>}
                            <button type="submit" class="btn btn-primary">{id ? 'Update' : 'Save'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}