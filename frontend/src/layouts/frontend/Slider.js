import React from 'react'

function Slider() {

    return (
        <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://iqq6kf0xmf.gjirafa.net/images/c2a5cb11-d74c-4a1e-b7b9-de3c45165d7c/c2a5cb11-d74c-4a1e-b7b9-de3c45165d7c.jpeg" className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                    <img src="https://iqq6kf0xmf.gjirafa.net/images/a48513a1-f68c-4847-9f49-c372e78aa369/a48513a1-f68c-4847-9f49-c372e78aa369.jpeg" className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                    <img src="https://iqq6kf0xmf.gjirafa.net/images/ecd1f3bd-4696-4185-96ea-0c191b6c77b9/ecd1f3bd-4696-4185-96ea-0c191b6c77b9.jpeg" className="d-block w-100" alt="..."/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Slider