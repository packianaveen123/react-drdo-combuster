import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';

function ListItems(props) {
  const items = props.items;
  console.log(items)
  const listItems = items.map((item, index) => {

    return <div className="list" key={index}>
      <p>
        <input type="text" id={item} value={item} />
        <span>
          <DeleteOutlined className="faicons" onClick={() => {
            props.deleteItem(item)
          }} icon="trash" />
        </span>
      </p>
    </div>
  })

  return <div>
    {listItems}
  </div>;
}

export default ListItems;

