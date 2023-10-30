


export default function NavBar({searchText,setSearchText, handleSearch }) {
    function handleKeyDown(){
        console.log("search")
    }
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <a href='/' className="navbar-brand">Home</a>
                <form className="d-flex" onSubmit={e=> e.preventDefault()} >
                    <input className="form-control me-2"
                        aria-label="Search"
                        type="text"
                        placeholder="Search for photos"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button className="btn btn-outline-success" type='button' onClick={handleSearch}>Search</button>
                </form>
            </div>
        </nav>
    )
}