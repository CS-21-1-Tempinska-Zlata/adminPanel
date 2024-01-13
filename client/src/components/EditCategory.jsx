
import { useState } from 'react';
import '../App.css';

function EditCategory(props) {
    const [name, setName] = useState(props.data.name);
	const [parentCategory, setParentCategory] = useState(props.data.parentCategory);

    const handleEditCategory = async () => {
		await fetch(`http://localhost:3000/categories/${props.data.partitionKey}/${props.data.rowKey}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, parentCategory})
        })
    }
    return (
		<form className='category-wrapper'>
			<input value={name} onChange={(e) => setName(e.target.value)} className='edit-category-name'/>
			<select value={parentCategory} onChange={e => setParentCategory(e.target.value)}>
                <option key="root" value="root">root</option>
                {
                    props.categories.map((item) => (
                        <option key={item.partitionKey+item.rowKey} value={item.name}>{item.name}</option>
                    ))
                }
            </select>
			<div>
				<button className='category-edit-btn' onClick={() => handleEditCategory()}>save</button>
				<button className='category-remove-btn' onClick={props.hideEditMode}>cancel</button>
			</div>
		</form>
    );
}

export default EditCategory;
