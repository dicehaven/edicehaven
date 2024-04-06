import React, { useEffect, useState } from 'react';
import DropdownItem from '../components/DropdownItem';


const title = (
    <h2>Explore the Board Game World!</h2>
)
const desc = "We have the largest collections of boardgames!"
const divStyle = {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    zIndex: 10,
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    maxHeight: '250px',
    overflow: 'auto',
    paddingBottom: '5px',
    borderBottomLeftRadius: '15px',
    borderBottomRightRadius: '15px',
}


const Banner = () => {
    const [searchValue, setSearchValue] = useState('');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        // Fetch cart items from local storage
        const getAllProducts = async () => {
            const qCategory = '';
            const sortBy = 'name';
            const sortOrder = 'asc';
            try {
                const response = await fetch(`http://localhost:5000/api/products?searchValue=${searchValue}&qCategory=${qCategory}&sortBy=${sortBy}&sortOrder=${sortOrder}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();
                if (data && data.success) {
                    setFilteredItems(data.products);
                }
            }
            catch (err) {
                alert(err.message)
            }

        };

        getAllProducts();

    }, [searchValue]);

    const handleInputBlur = () => {
        setTimeout(() => {
            setIsDropdownVisible(false);
        }, 150);
    };

    return <div className="banner-section style-4">
        <div className="container">
            <div className="banner-content" style={{ position: 'relative' }}>
                {title}
                <form >
                    <input
                        autoComplete="false"
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search your board game"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setIsDropdownVisible(true)}
                        onBlur={handleInputBlur}
                    />
                    <button type="button">
                        <i className="icofont-search"></i>
                    </button>
                </form>
                {isDropdownVisible && (
                    <div style={divStyle}>
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <DropdownItem
                                    key={item._id}
                                    id={item._id}
                                    name={item.name}
                                    image={item.image}
                                    price={item.price}
                                />
                            ))
                        ) : (
                            <div className="dropdown-item">No results found</div>
                        )}
                    </div>
                )}
            </div>
            <p style={{ textAlign: 'center' }}>{desc}</p>
        </div>
    </div >
};

export default Banner
