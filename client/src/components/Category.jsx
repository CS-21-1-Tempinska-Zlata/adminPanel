
import { useState } from 'react';
import '../App.css';
import EditCategory from './EditCategory';

function Category(props) {
    const [showEdit, setShowEdit] = useState(false);


    const showEditMode = (e) => {
        e.preventDefault();
        setShowEdit(true);
    }
    const hideEditMode = () => {
        setShowEdit(false);
    }

    const handleRemoveClick = async () => {
        await fetch(`http://localhost:3000/categories/${props.data.partitionKey}/${props.data.rowKey}`, {
            method: 'DELETE',
        })
    }
    
    return (
        <div>
            {
                showEdit
                ?
                <></>
                :
                <form className='category-wrapper'>
                    <button className='category-name'>{props.data.name}</button>
                    <div>
                        <button className='category-edit-btn' onClick={(e) => showEditMode(e)}>edit</button>
                        <button className='category-remove-btn' onClick={() => handleRemoveClick()}>remove</button>
                    </div>
                </form>
            }
            {
                showEdit
                ?
                <EditCategory data={props.data} categories={props.categories} hideEditMode={hideEditMode}/>
                :
                <></>
            }
        </div>
    );
}

export default Category;
