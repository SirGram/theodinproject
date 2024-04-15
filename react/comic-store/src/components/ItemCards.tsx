import React from 'react';
import Comic from "../interfaces/Comic";
import Card from "./Card";
import { Link } from 'react-router-dom';

const ItemCards: React.FC<{ items: Comic[] }> = ({ items }) => {
  return (
    <div className="grid grid-cols-auto-fit gap-2">
      {items.map((item) => (
        <div key={item.id} className='flex  justify-center '>
          <Link to={`/store/${item.id}`}>
          <Card
            path={`${item.thumbnail?.path}.${item.thumbnail?.extension}`}
            title={item.title}
            price={item.price}
          />
          </Link>
        </div>
        
      ))}
    </div>
  );
}

export default ItemCards;
