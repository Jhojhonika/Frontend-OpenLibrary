import { Link } from "react-router-dom";
function Categories() {

    const genre = [
        {
            id: "0",
          
            genre_name: "Mystery",
            category_image: './images/mystery.jpeg',

        },
        {
            id: "1",
         
            genre_name: "Fantasy",
            category_image: './images/fantasy.jpeg',
            
        },
        {
            id: "2",
           
            genre_name: "Romance",
            category_image: './images/romance.jpeg'
        },
        {
            id: "3",
            
            genre_name: "Sci-Fi",
            category_image: './images/scifi.jpeg'
        },
        {
            id: "4",
           
            genre_name: "Fiction",
            category_image: './images/fiction.jpeg'
        },
        {
            id: "5",
           
            genre_name: "Non-Fiction",
            category_image: './images/nonfiction.jpeg'
        }

    ]


    return (
        <>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"></link>
            <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"></link>
            <link rel="stylesheet" href="index.css"></link>

            <div>
                <img src='./images/addhome.avif' className='img-fluid' alt="Image description"></img>
            </div>
            <div class="py-3 py-md-5 bg-light" >
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h4 class="mb-4 text-center text-warning-emphasis">Read by genre</h4>
                        </div>


                        {genre.map((genres, id) => {
                            return (
                                <div class="col-6 col-md-4 col-lg-2"key={id} >
                                    <div class="category-card" >
                                    <Link to="/productlist" state={{ genre: genres.genre_name }}>
                                            <div class="category-card-img">
                                                <img src={genres.category_image} class="w-100" alt="Laptop" />
                                            </div>
                                            <div class="category-card-body">
                                                <h5> {genres.genre_name}</h5>
                                            </div>
                                            </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            
        </>
    )
}

export default Categories;