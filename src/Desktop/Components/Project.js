import React, { Component } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd';
export default class Project extends Component {
    render() {
        if(this.props.element.item === undefined) return (
            <td className="drop">
                <Droppable droppableId={this.props.idx.toString()}>
                    {dropProvided => (
                        <div {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
                            {dropProvided.placeholder}
                        </div>
                    )}
                </Droppable>
            </td>
        )
        else{
            return (
                <Droppable droppableId={this.props.element.id}>
                {dropProvided => (
                    <div {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
                        <Draggable key={this.props.element.item.id} draggableId={this.props.element.item.name} index={this.props.idx}>
                        {dragProvided => (
                            <div
                            {...dragProvided.dragHandleProps}
                            {...dragProvided.draggableProps}
                            ref={dragProvided.innerRef}
                            >
                              <div className="icon" onDoubleClick={this.props.callback}>
                                    <i className="material-icons noselect">{this.props.element.item.icon}</i>
                                    <h3 className="noselect">{this.props.element.item.shortName}</h3>
                                </div>
                            </div>
                        )}
                        </Draggable>
                        {dropProvided.placeholder}
                    </div>
                )}
                </Droppable>
            )}
    }
}