import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';

function ListItems(props) {
  const items = props.items;

  function includes(items, target) {
    for (let i = 0; i < items.length; i++) {
      if (items[i] === target) {
        console.log("true")
      }
      else {
        console.log("false")
      }
    }
  }

}

export default ListItems;