
import { useEffect, useState } from 'react';
import '../App.css';

function Good(props) {

	const [name, setName] = useState(props.data.name);
	const [img, setImg] = useState(null);
	const [price, setPrice] = useState(props.data.price);
	const [category, setCategory] = useState(props.data.category);

	const [imgSrc, setImgSrc] = useState('');


	const handleEditClick = async (e) => {
		e.preventDefault();
		let imgUrl = props.data.imgUrl;
		if (img != null) {
			const imgFormData = new FormData();
			imgFormData.append("files", img);
		
			imgUrl = (await (await fetch('http://localhost:3000/upload', {method: 'POST', body: imgFormData})).json())[0];
		}
		await fetch(`http://localhost:3000/goods/${props.data.partitionKey}/${props.data.rowKey}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({name, price, category, imgUrl})
		})
	}

	const handleRemoveClick = async () => {
		await fetch(`http://localhost:3000/goods/${props.data.partitionKey}/${props.data.rowKey}`, {
            method: 'DELETE',
        })
	}
	

	useEffect(() => {
		const getImgObj = async () => {
			const resp = await fetch(props.data.thumbImgUrl);
			const blob = await resp.blob();
			return URL.createObjectURL(blob);
		}
		getImgObj()
          .then(res => setImgSrc(res))
          .catch(err => console.log(err));
	}, []);
	
	return (
		<form className='good-wrapper'>
			<div className='good-info-wrapper'>
				<div>
					<label>Name</label>
					<input value={name} onChange={(e) => setName(e.target.value)}/>
				</div>
				<div>
					<label>Price</label>
					<input type='number' value={price} onChange={(e) => setPrice(e.target.value)}/>
				</div>
				<div>
					<label>Category</label>
					<select value={category} onChange={e => setCategory(e.target.value)}>
							<option key="root" value="root">root</option>
							{
								props.categories.map((item) => (
									<option key={item.partitionKey+item.rowKey} value={item.name}>{item.name}</option>
								))
							}
					</select>
				</div>
				<button onClick={handleEditClick}>Save</button>
				<button onClick={handleRemoveClick}>Remove</button>
			</div>
			<div>
				<img src={imgSrc} className='good-img' alt=''/>
				<br/>
				<input type='file' onChange={e => setImg(e.target.files[0])}/>
			</div>
		</form>
	);
}

export default Good;
