import { useEffect } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import axios from 'axios'
import { useForm } from "react-hook-form";

const initialValue = {
    objectTypeId: 0,
    objectTypeName: "",
    description: "",
    level: 0
}

export default function ObjectTypeForm() {

    const { id } = useParams();
    let history = useHistory();

    //TODO: Validation using yup is pending
    const { handleSubmit, register, setValue } = useForm({ initialValue });

    const getObjectTypeById = async () => {
        const response = await axios.get(`ObjectType/${id}`);
        if (response.status === 200) {
            Object.keys(initialValue).map(key => setValue(key, response.data[key]));
        }
    }

    useEffect(() => {
        if (id) {
            getObjectTypeById();
        }
    }, [id])

    const save = async (data) => {
        const response = await axios.post("objectType", data);
        history.push("/")
    }
    const update = async (data) => {
        const response = await axios.put("objectType", data);
        history.push("/")
    }

    const onSubmit = (data) => id ? update(data) : save(data);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="mb-3"> {`${id ? `Edit` : `Add`} ObjectType`}</h2>
                        <div class="mb-3">
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
                            {id && <button type="button" class="btn btn-danger me-3">Delete</button>}
                            <button type="submit" class="btn btn-primary">{id ? 'Update' : 'Save'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}