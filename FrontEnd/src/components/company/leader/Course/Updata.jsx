import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
    getCourseWithTaskListAction,
    resetNewTaskListAction,
  } from '../../../../redux/actions'
// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    //tao nhan ban cua nguon va diem den
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);

    //lay doi tuong tu nguon va xoa no ra khoi nguon
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    //them doi tuong vao diem den 
    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the taskItems look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'cream',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: 'white',
    padding: grid,
    width: 380,
    display: 'block',
    height: '60vh',
});

function TestComponent (props) {

    const { 
        tasksList, 
        notInCourseWithTask,
        setNewCourseWithTasks,
        } = props;

      useEffect( async() => {
          await setObjectList({
            taskItems: notInCourseWithTask,
            selected: tasksList,
          })
      }, [notInCourseWithTask, tasksList])


      
    const [objectList, setObjectList] = useState({
        taskItems: notInCourseWithTask,
        selected: tasksList,
    })

    useEffect(() => {
        setNewCourseWithTasks(objectList.selected)
    }, [objectList.selected])


    const [id2List, setId2List] = useState({
        droppable: 'taskItems',
        droppable2: 'selected'
    })

    
    const getList = id => objectList[id2List[id]];

    const onDragEnd = result => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const taskItems = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            );

            let newObjectList = {...objectList, taskItems };
            if (source.droppableId === 'droppable2') {
                newObjectList = { ...objectList, selected: taskItems };
            }
            setObjectList(newObjectList);
            

        } else {
            
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );

            setObjectList({
                taskItems: result.droppable,
                selected: result.droppable2
            });
        }
    };



    return (
        <div style={{display: 'flex', with: 960, alignItems: 'center', justifyContent: 'center'}}>
        <DragDropContext onDragEnd={onDragEnd} >
            <div className="dragDropContext dragDropContextOne">
            <h2>DANH SÁCH THÊM</h2>
            <div className="Droppable">
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}>
                        {objectList.taskItems.map((item, index) => (
                            <Draggable
                                key={item._id}
                                draggableId={item._id}
                                index={index}>
                                
                                {(provided, snapshot) => (
                                    <div
                                        className="draggableItem"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}>
                                        {item.taskName}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>   
            </div>
            </div>
            <div className="dragDropContext">
            <h2>DANH SÁCH MÔN HỌC</h2>
            <div className="Droppable">
            <Droppable droppableId="droppable2">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}>
                        {objectList.selected.map((item, index) => (
                            <Draggable
                                key={item._id}
                                draggableId={item._id}
                                index={index}>
                                {(provided, snapshot) => (
                                    <div
                                    className="draggableItem"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}>
                                        {item.taskName}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>  
            </div>             
            </div>
        </DragDropContext>
        </div>
    );
}

const mapStateToProps = (state) => {
    const {courseWithTaskList, courseId, notInCourseWithTask} = state.leaderReducer;
    return {
      tasksList: courseWithTaskList,
      courseId: courseId,
      notInCourseWithTask: notInCourseWithTask,
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getCourseWithTaskList: (params) => dispatch(getCourseWithTaskListAction(params)),
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);
  