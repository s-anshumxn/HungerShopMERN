import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
export default function Home() {

    const [search, setSearch] = useState('')
    const [foodCat, setfoodCat] = useState([])
    const [foodItem, setfoodItem] = useState([])

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/fooditem", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        response = await response.json()
        setfoodItem(response[0])
        setfoodCat(response[1])
        //console.log(response[0],response[1])
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <>
            <div><Navbar /></div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner" id='carousel'>
                    <div className='carousel-caption' style={{ zIndex: "10" }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                            {/* <button className="btn btn-outline-success text-white" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="/images/burger.avif" className="d-block w-100" alt="..." style={{ filter: "brightness(40%)" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="/images/pizza.avif" className="d-block w-100" alt="..." style={{ filter: "brightness(40%)" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="/images/pasta.avif" className="d-block w-100" alt="..." style={{ filter: "brightness(40%)" }} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className='container'>
                {
                    Object.keys(foodCat).length !== 0 ?
                        foodCat.map((data) => {
                            return (<div className='row mb-3'>
                                <div key={data._id} className='fs-3 m-3'>
                                    {data.CategoryName}
                                </div>
                                <hr />
                                {Object.keys(foodItem).length !== 0 ?
                                    foodItem.filter((items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                                        .map((filterItem) => {
                                            return (
                                                <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
                                                    <Card foodItem = {filterItem}
                                                        options={filterItem.options[0]}
                                                     />
                                                </div>
                                            )
                                        })
                                    : <div>No such value found</div>}
                            </div>)
                        }) : ""
                }
            </div>
            <div><Footer /></div>
        </>
    )
}
