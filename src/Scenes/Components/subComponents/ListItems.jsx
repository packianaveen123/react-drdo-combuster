import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';

function ListItems(props) {
  const items = props.items;
  // const unique = items.filter((value, index) => {
  //   return items.indexOf(value) === index;
  //   if (items(text) === value) {
  //     alert("exist")
  //   }
  // })
  // console.log(unique)

  const listItems = items.map(item => {
    console.log(item)
    console.log(items)

    return <div className="list" key={item.key}>
      <p>
        <input type="text" id={item.key} value={item.text} />
        <span>
          <DeleteOutlined className="faicons" onClick={() => {
            props.deleteItem(item.text)
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