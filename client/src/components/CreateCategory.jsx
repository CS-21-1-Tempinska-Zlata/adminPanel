
import { useState } from 'react';
import '../App.css';

function CreateCategory(props) {

    const [name, setName] = useState("");
    const [parentCategory, setParentCategory] = useState("root");
    

    const handleCreateNewCategory = async () => {
        await fetch('http://localhost:3000/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, parentCategory})
        })
    }
    
    return (
        <div className='create-good-wrapper'>
            <div>
            <label>Name</label>
            <input value={name} onChange={e => setName(e.target.value)}/>
            </div>
            <div>
            <label>Parent Category</label>
            <select value={parentCategory} onChange={e => setParentCategory(e.target.value)}>
                <option key="root" value="root">root</option>
                {
                    props.categories.map((item) => (
                        <option key={item.partitionKey+item.rowKey} value={item.name}>{item.name}</option>
                    ))
                }
            </select>
            </div>
            <button className='good-manage-btn' onClick={handleCreateNewCategory}>Create</button>
        </div>
    );
}

export default CreateCategory;
