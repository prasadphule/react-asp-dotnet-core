import React from 'react'
import { useSelector } from 'react-redux'
import { SelectApp } from 'app/appSlice'
import './Spinner.css'

export default function Spinner() {
    const spinner = useSelector(SelectApp)
    const dis = spinner ? "" : "none";
    return (
        <div id="overlay" style={{ display: dis }}>
            <div className="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                </div>
            </div>
        </div>
    )
}