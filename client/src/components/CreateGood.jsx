
import { useState } from 'react';
import '../App.css';

function CreateGood(props) {

	const [img, setImg] = useState(null);
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [category, setCategory] = useState(props.categories[0]?.name);
	

	const handleCreateGood = async (e) => {
		e.preventDefault();
		const imgFormData = new FormData();
		imgFormData.append("files", img);

		const imgUrl = (await (await fetch('http://localhost:3000/upload', {method: 'POST', body: imgFormData})).json())[0];
		
		await fetch('http://localhost:3000/goods', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, price, category, imgUrl})
        })
	}
	
	return (
		<div className='create-good-wrapper'>
			<div>
				<input type='file' onChange={e => setImg(e.target.files[0])}/>
			</div>
			<div>
				<label>Name</label>
				<input value={name} onChange={e => setName(e.target.value)}/>
			</div>
			<div>
				<label>Price</label>
				<input type='number' value={price} onChange={e => setPrice(e.target.value)}/>
			</div>
			<div>
				<label>Category</label>
				<select value={category} onChange={e => setCategory(e.target.value)}>
					{
						props.categories.map((item) => (
							<option key={item.partitionKey+item.rowKey} value={item.name}>{item.name}</option>
						))
					}
				</select>
			</div>
			<button className='good-manage-btn' onClick={handleCreateGood}>Create</button>
		</div>
	);
}

export default CreateGood;
