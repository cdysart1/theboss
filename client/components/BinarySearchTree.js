import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { breadthFirstForEach } from '../components'
import AddBSTNodeForm from './Forms/AddBSTNodeForm';
import DeleteNodeForm from './Forms/DeleteNodeForm';
import bstNode from '../store';

/**
 * COMPONENT
 */
const BinarySearchTree = (props) => {

  const { BST } = props;
  const bstArr = breadthFirstForEach(BST);
  // bstArr.sort((a, b) => {
  //   return a.level - b.level;
  // })

  let groups = []; // initialize array
  // [[node],[node, node],[node, node]] // each index is level

  bstArr.map(([node, level]) => {
    if (!groups[level]) groups[level] = [];
    groups[level].push(node);
  })

  // console.log('groups ', groups);
  return (

    <div>
      <h1> Binary Search Tree </h1>
      <div>
      <AddBSTNodeForm />
      <DeleteNodeForm />
      </div>
      <div className="container">
      {
          groups.map((ele, index) => {
            return (
              <div className={'bstlevel' + index} key={index}>
                {
                  ele.map((node) => {
                    return (<div>{node}</div>)
                  })
              }
              </div>)
          })
      }
      </div>
    </div>
  )
}


/*
 * CONTAINER
 */

const mapState = (state) => {
  return {
    BST: state.bstNode,
    NodeCount: state.bstNode.BSTNodeCount
  }
}

// const mapDispatch = (state) => {
//   //console.log('here is state', state)
//   return {
//     values: state
//   }
// }

export default connect(mapState, null)(BinarySearchTree);
