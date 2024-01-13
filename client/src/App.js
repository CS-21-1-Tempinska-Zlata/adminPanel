
import { useEffect, useState } from 'react';
import './App.css';
import Category from './components/Category';
import CreateCategory from './components/CreateCategory';
import CreateGood from './components/CreateGood';
import Good from './components/Good';

function App() {
  
  const [categories, setCategories] = useState([]);
  const [goods, setGoods] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch('http://localhost:3000/categories');
      return await res.json();
    }
    const getGoods = async () => {
      const res = await fetch('http://localhost:3000/goods');
      return await res.json();
    }

    getCategories()
      .then(res => setCategories(res))
      .catch(err => console.log(err));
    getGoods()
      .then(res => setGoods(res))
      .catch(err => console.log(err));
  }, []);
  
  
  return (
    <div className="App">
      <div className='main'>
        <div className='categories-container'>
          <div className='create-wrapper'>
            <p>Create Category</p>
            <CreateCategory categories={categories}/>
          </div>
          {
            categories.map((item) => (
              <div key={item.partitionKey+item.rowKey} className='category'>
                <Category data={item} categories={categories}/>
              </div>
            ))
          }
          
        </div>
        <div className='goods-container'>
          <div className='create-wrapper'>
            <p>Create Good</p>
            <CreateGood categories={categories}/>
          </div>
          <p>All Goods</p>
          {
            goods.map((item) => (
              <div key={item.partitionKey+item.rowKey} className='good'>
                <Good data={item} categories={categories}/>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
