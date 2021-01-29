import { Button, Card, CardContent, List, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import db from '../firebase'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import '../component/Todo.css'

 const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        left: 540,
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        
  },
}));

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState()

    const handleDelete = () => {
        db.collection('todos').doc(props.todo.id).delete()
    }

    const updateTodo = () => {
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, {merge: true})
        setOpen(false)
    }
    return (
        <>
        <Modal open={open} onClose={e => setOpen(false)}>
            <div className={classes.paper}>
                <h1>Update To do</h1>
                <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)}/>
                <Button disabled={!input} onClick={updateTodo}>Update todo</Button>
            </div>
        </Modal>
        <List className="todo_list">
        <Card className={classes.root}>
            <CardContent>
            {/* <ListItem>
        
                <ListItemText className={classes.title} primary={props.todo.todo} secondary="Todo..." />
            </ListItem> */}
            <Typography color="textSecondary" gutterBottom>{props.todo.todo}</Typography>
            <Button className="edit-btn" onClick={e => setOpen(true)}>Edit</Button>
            <DeleteForeverIcon onClick={handleDelete} />
            </CardContent>  
        </Card>
        </List>

        </>
    )
}

export default Todo
